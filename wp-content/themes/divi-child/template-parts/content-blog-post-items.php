<?php
if ( have_posts() ) :

?>
    <div id="content-area" class="post-item-section clearfix">
        <h3>ALL POSTS</h3>
        <div class="post-item-row clearfix" id="post-item-row">
            <input type="hidden" name="blog-number-of-post" value="5" >
            <input type="hidden" name="blog-page-number" value="1">
           
            <div class="post-items">
                <?php
                while ( have_posts() ) : the_post();
                    $item_class_arr = array('post-item');
                    $post_id = get_the_ID();
                    echo blog_post_item_html( $post_id, $item_class_arr );
                endwhile;
                wp_reset_postdata();
                ?>
            </div>

        </div>
        <div class="show-more-wrapper clearfix">
            <a id="ajax_more_posts_blog" class="et_pb_button red-btn-inverse"><?php _e( 'LOAD MORE', 'textdomain' ); ?></a>
        </div>

    </div>
<?php
else:
    get_template_part( 'includes/no-results', 'index' );
endif;
