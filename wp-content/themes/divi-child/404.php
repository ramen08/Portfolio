<?php
get_header();
?>

    <div id="main-content">
        <div class="main-content-wrap">
            <div class="container et_pb_text_align_center">
                <h1><?php _e( 'Oops! That page can&rsquo;t be found.', '' ); ?></h1>
                <p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', '' ); ?></p>
                <?php get_search_form(); ?>
            </div> <!-- .container -->
        </div>
    </div> <!-- #main-content -->

<?php

get_footer();