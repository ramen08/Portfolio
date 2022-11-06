<?php
// Add Shortcode
add_shortcode( 'custom_post_slider', 'custom_post_slider_func' );
function custom_post_slider_func( $atts ) {

    //check if shortcode is running in the backend, if it is exit function
    if( is_admin() ):
        return false;
    endif;

    // Attributes
    $atts = shortcode_atts(
        array(
            'count' => 12,
        ),
        $atts
    );

    ob_start();

    $count = $atts['count'];

    global $post;

    $args = array(
        'post_type' => array('post'),
        'posts_per_page' => $count,
        'orderby'        => 'date',
        'order'          => 'DESC',
        'post_status' => array('publish'),
    );

    $latest_posts = get_posts( $args );

    if( !empty( $latest_posts ) ):
    ?>
        <div class="articles-section">
            <div class="articles-row">

                <?php
                foreach ( $latest_posts as $post ) :
                    setup_postdata($post);

                    $post_id = $post->ID;

                    $title = get_the_title($post_id);
                    $publication_date = get_the_date('F j, Y');

                    //image
                    $featured_image_id = get_post_thumbnail_id( $post_id );
                    $image_attributes = wp_get_attachment_image_src( $featured_image_id, 'full' );
                    $image_attributes_url = !empty( $image_attributes ) ? $image_attributes[0] : '';
                    $image_attributes_width = !empty( $image_attributes ) ? $image_attributes[1]/2 : ''; //retina
                    $image_attributes_height = !empty( $image_attributes ) ? $image_attributes[2]/2 : ''; //retina
                    $image_style = 'style="background-image:url('.$image_attributes_url.');"';

                    //link
                    $link =  get_permalink($post_id);
                    ?>
                    <div class="articles-item">

                        <a href="<?php echo $link; ?>" class="img-wrap" <?php echo $image_style; ?> title="Link for <?php echo $title; ?>"></a>
                        <time><?php echo $publication_date; ?></time>
                        <h2><a href="<?php echo $link; ?>" title="Link for <?php echo $title; ?>" ><?php echo $title; ?></a></h2>
                    </div>
                <?php
                endforeach;
                ?>
            </div>
        </div>
        <?php
        // Third, reset post data after end of the foreach function
        wp_reset_postdata();
    endif;

    $html_content = ob_get_contents();
    ob_end_clean();
    return $html_content;
}