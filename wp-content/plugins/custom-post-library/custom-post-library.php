<?php
/**
* Plugin Name: Siro - Custom Posts Library
* Description: Create a custom list using APIs
* Version: 1.0
* Author: Siro Solutions
*/

include_once plugin_dir_path( __FILE__ ) . "classes/class_controller.php";
include_once plugin_dir_path( __FILE__ ) . "classes/class_endpoint.php";

/* Enqueue assets */
add_action( 'wp_enqueue_scripts', 'plugin_assets' );
function plugin_assets() {
    wp_enqueue_script( 'cpl-scripts', plugins_url( '/assets/js/custom.js', __FILE__ ), array( 'jquery' ) );

    wp_enqueue_style( 'cpl-style', plugins_url( '/assets/css/theme.css', __FILE__ ) );
}