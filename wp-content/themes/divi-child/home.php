<?php

get_header();

$is_page_builder_used = et_pb_is_pagebuilder_used( get_the_ID() );

?>

    <div id="main-content">
        <div class="container">
            <h1>BLOG</h1>
            <?php get_template_part( 'template-parts/content','blog-filter-nav' ); ?>
            <?php get_template_part( 'template-parts/content','blog-post-items' ); ?>
        </div>
    </div>

<?php

get_footer();
