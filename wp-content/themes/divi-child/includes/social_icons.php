<?php

$menu_location = 'custom-social-icons';

if ( has_nav_menu( $menu_location ) ) :
    wp_nav_menu(
        array(
            'depth'=> 1,
            'theme_location' => $menu_location,
            'container' => '',
            'fallback_cb' => '',
            'menu_class' => 'et-social-icons',
            'menu_id' => '',
            'echo' => true
        )
    );
endif;
