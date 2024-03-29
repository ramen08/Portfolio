<?php if ( 'on' == et_get_option( 'divi_back_to_top', 'false' ) ) : ?>

    <span class="et_pb_scroll_top et-pb-icon"></span>

<?php endif;

if ( ! is_page_template( 'page-template-blank.php' ) ) : ?>

    <footer id="main-footer">
        <?php get_sidebar( 'footer' ); ?>


        <div id="footer-bottom">
            <div class="container clearfix">
                <?php
                if ( false !== et_get_option( 'show_footer_social_icons', true ) ):
                    get_template_part( 'includes/social_icons', 'footer' );
                endif;
                ?>

                <div class="footer-info">

                    <?php
                    if ( has_nav_menu( 'footer-menu' ) ) :
                        wp_nav_menu( array(
                            'theme_location' => 'footer-menu',
                            'depth'          => '1',
                            'menu_class'     => 'bottom-nav',
                            'container'      => '',
                            'fallback_cb'    => '',
                        ) );
                    endif;
                    ?>
                    <?php
                    $footer_text = et_get_footer_credits();
                    echo do_shortcode($footer_text); ?>
                </div>

            </div>	<!-- .container -->
        </div>

    </footer> <!-- #main-footer -->
    </div> <!-- #et-main-area -->

<?php endif; // ! is_page_template( 'page-template-blank.php' ) ?>

</div> <!-- #page-container -->

<?php wp_footer(); ?>
</body>
</html>