<?php 
class CPL_Controller {
	public $posts = array();
    
    // Generally used WP_Query params
    private $post_args;
    
	public function __construct( $args = array() ) {
        $this->init_vars( $args ); // set variables
		$this->run_query(); // run query
	}

    /**
     * Initialize variables passed from themes.
     * 
     * @param array $args arguments passed from themes.
     * 
     * @return void
     */
    private function init_vars( $args ) {
        $this->post_args = $args;

        return;
    }
    
    /**
     * Run initial query.
     * 
     * @return void
     */
	private function run_query() {
        $meta_query_values = $this->post_args["meta_query"] ? explode( "|", $this->post_args["meta_query"] ) : null;
        $tax_query_values  = $this->post_args["tax_query"] ? explode( "|", $this->post_args["tax_query"] ) : null;

        $args = array(
            'posts_per_page' => -1,
            'post_type'      => $this->post_args["post_type"],
            'orderby'        => $this->post_args["orderby"],
            'order'          => $this->post_args["order"],
            'meta_query'     => $meta_query_values && count( $meta_query_values ) === 3 ? array(
                array(
                    'key'	 	=> $meta_query_values[0],
                    'value'	  	=> $meta_query_values[1] === "bool(true)" ? TRUE : $meta_query_values[1],
                    'compare' 	=> $meta_query_values[2],
                )
            ) : null,
            'tax_query'      => $tax_query_values && count( $tax_query_values ) === 3 ? array(
                array(
                    'taxonomy' => $tax_query_values[0],
                    'field'    => $tax_query_values[1],
                    'terms'    => $tax_query_values[2]
                )
            ) : null,
            'post_status'    => 'publish',
        );
    
        $query = new WP_Query( $args );
        
        /* Assign query->posts to class variable posts */
        $this->posts = $query->posts;

        return;
	}

    /**
     * Fetch posts
     * 
     * @param integer $page current list page number
     * @param integer $max posts limit per page
     * 
     * @return array
     */
	public function get_posts( $args ) {
        $page   = $args["page"];
        $max    = $this->post_args["posts_per_page"];
		$offset = $page == 1 ? 0 : ( $page - 1 ) * $max;
		$count  = count( $this->posts );
		
		return array(
            "count"     => $count,
			"page"      => (int) $page,
            "last_page" => ceil( $count / $max ),
            "limit"     => $max,
			"results"   => array_slice( $this->posts, $offset, $max )
		);
    }
	
    /**
     * Get item elements inside the list.
     * 
     * @return string
     */
    public function get_rows( $args = array() ) {
        ob_start();

        $posts = $this->get_posts( $args );

        if( count( $posts["results"] ) > 0 ) {
            foreach( $posts["results"] as $post ) {
                include $this->post_args["ui"];
            }
        } else {
            echo "<span class='h3 no-results'>No results found.</span>";
        }

        wp_reset_postdata();

        $html_content = ob_get_contents();
        ob_end_clean();

        return array(
            "page"      => $posts["page"],
            "last_page" => $posts["last_page"],
            "count"     => $posts["count"],
            "html"      => $html_content
        );
    }

    /**
     * Get structured ui to be displayed initially in themes.
     * 
     * @return string
     */
    public function get_ui() {
        ob_start();

        $rows = $this->get_rows( array( "page" => 1 ) );

        $cpt_args = array(
            "posts_per_page" => $this->post_args["posts_per_page"],
            "post_type"      => $this->post_args["post_type"],
            "orderby"        => $this->post_args["orderby"],
            "order"          => $this->post_args["order"],
            "ui"             => $this->post_args["ui"],
            "meta_query"     => $this->post_args["meta_query"],
            "tax_query"      => $this->post_args["tax_query"]
        );
        ?>

        <div class="cpl-custom-list <?php echo $this->post_args["classes"] ? $this->post_args["classes"] :  "" ?>">
            <input type="hidden" class="cpl-data" value='<?php echo json_encode( $cpt_args ) ?>' />

			<div class="posts-items">
				<?php echo $rows["html"] ?>
			</div>
			
			<?php 
            if( $rows["page"] < $rows["last_page"] ) {
                $load_more_text = $this->post_args["load_more_text"];

                include WP_PLUGIN_DIR . "/custom-post-library/templates/pagination.php";
            }
            ?>
		</div>

        <?php
        $html_content = ob_get_contents();
        ob_end_clean();
        return $html_content;
    }

    /**
     * Get general layout.
     * 
     * @return string
     */
    public function reset_ui() {
        ob_start();

        $rows = $this->get_rows( array( "page" => 1 ) );

        $cpt_args = array(
            "posts_per_page" => $this->post_args["posts_per_page"],
            "post_type"      => $this->post_args["post_type"],
            "orderby"        => $this->post_args["orderby"],
            "order"          => $this->post_args["order"],
            "ui"             => $this->post_args["ui"],
            "meta_query"     => $this->post_args["meta_query"],
            "tax_query"      => $this->post_args["tax_query"]
        );
        ?>

        <input type="hidden" class="cpl-data" value='<?php echo json_encode( $cpt_args ) ?>' />

        <div class="posts-items">
            <?php echo $rows["html"] ?>
        </div>

        <?php 
        if( $rows["page"] < $rows["last_page"] ) {
            $load_more_text = $this->post_args["load_more_text"];

            include WP_PLUGIN_DIR . "/custom-post-library/templates/pagination.php";
        }
        ?>

        <?php
        $html_content = ob_get_contents();
        ob_end_clean();

        return array(
            "page"      => $rows["page"],
            "last_page" => $rows["last_page"],
            "count"     => $rows["count"],
            "html"      => $html_content
        );
    }
}
?>