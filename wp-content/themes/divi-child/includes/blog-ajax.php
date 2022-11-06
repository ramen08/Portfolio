<?php
//-----------------------------------------------------
// Blog Post Item
//-----------------------------------------------------
function blog_post_item_html( $post_id, $item_class_arr, $excerpt_count = 120 ){
    ob_start();

    $post_title     = get_the_title( $post_id );
    $pub_date       = get_the_date('F j, Y', $post_id);
    $permalink      = get_the_permalink($post_id);
    $excerpt        = truncate_post( $excerpt_count, false ) ;

    //banner image

    $featured_image = get_the_post_thumbnail_url( $post_id, 'full' );
    $display_image  = $featured_image ? "style='background-image: url(" . $featured_image . ")';" : '';

    $category_detail = get_the_category($post_id);
    $item_class_arr[] = 'post-item';

    ?>


    <div <?php post_class( $item_class_arr ); ?>>
        <div class="post-container clearfix">
            <a href="<?php echo $permalink?>" <?php echo $display_image?> class="post-thumbnail mobile">
            </a>
            <div class="post-content-col col">
                <div class="post-title">
                    <?php
                    foreach($category_detail as $cd): ?>
                        <span class="category"><?php echo $cd->cat_name; ?></span>
                    <?php endforeach; ?>
                    <h2 class="title"><a href="<?php echo $permalink?>"><?php echo $post_title; ?></a></h2>
                </div>
                <div class="content-description">
                    <?php echo $excerpt; ?>
                </div>
                <div class="content-info">
                    <p class="post-info"><?php echo $pub_date; ?> · <?php echo $display_reading_time; ?></p>
                </div>
            </div>
            <a href="<?php echo $permalink?>" <?php echo $display_image?> class="post-thumbnail col desktop">
            </a>
        </div>

    </div>


    <?php
    $html_content = ob_get_contents();
    ob_end_clean();
    return $html_content;
}


//-----------------------------------------------------
// ALL POSTS: Blog Filter Ajax + Load More
//-----------------------------------------------------
add_action( 'wp_ajax_blog_filter_ajax', 'blog_filter_ajax' );
add_action( 'wp_ajax_nopriv_blog_filter_ajax', 'blog_filter_ajax' );
function blog_filter_ajax(){
    ob_start();

    $count = 5;
  
    $function    = $_POST['function'];
    $page_number = $_POST['page_number'];
    $category    = $_POST['category'];
    $topics      = $_POST['topics'];
    $products    = $_POST['products'];
    $sort_by     = $_POST['sort_by'];
    $search      = $_POST['search'];

    if( $function == 'load_more' ){
        $paged = $page_number + 1;
    }else{
        $paged = 1; // on filter it should be always on page 1
    }

    $args = array(
        'post_type' => array('post'),
        'post_status' => array('publish'),
        'paged' => $paged,
        'orderby' => 'date',
        'order' => $sort_by,
        'posts_per_page' => $count,
    );

    /* A to Z */
    if( $sort_by == 'a_z_asc' ){
        $args['orderby'] = 'title';
        $args['order'] = 'ASC';
    }elseif( $sort_by == 'a_z_desc' ){
        $args['orderby'] = 'title';
        $args['order'] = 'DESC';
    }else{
        $args['orderby'] = 'date';
    }
    /* A to Z */

    if( !empty($search) ){
        $args['s'] = $search;

        if( empty( $sort_by ) ){
            $args['orderby'] = 'relevance';
        }
    }

    if( !empty($category) ) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => $category,
            ),
        );
    }

    if( !empty( $topics )){
        $args['tax_query']['relation'] = 'AND';
        $args['tax_query'][] = array(
                'taxonomy'=> 'post-topic',
                'field' => 'slug',
                'terms'=> $topics
        );
    }

    if( !empty( $products )){

        $args['tax_query']['relation'] = 'AND';
        $args['tax_query'][] = array(
            'taxonomy'=> 'post-product',
            'field' => 'slug',
            'terms'=> $products
        );
       
    }

    $loop = new WP_Query($args);

    $search_post_count = $loop->found_posts;
    $max_num_page = $loop->max_num_pages;

    if ( $loop->have_posts() ) :
        while ( $loop->have_posts() ) : $loop->the_post();
            $post_id = get_the_ID();
            $item_class_arr[] = 'post-item';

            echo blog_post_item_html( $post_id, $item_class_arr );
        endwhile;
    endif;
    wp_reset_postdata();

    //check if load more must be added
    $load_more = '';
    if( $max_num_page > $paged ):
        $load_more = '<a id="ajax_more_posts_blog" class="et_pb_button red-btn-inverse">LOAD MORE</a>';
    endif;

    $html_content = ob_get_contents();
    ob_end_clean();

    //return
    $return = array(
        'result_items'  => $html_content,
        'load_more'     => $load_more
    );

    wp_send_json_success( $return );
    die();
}