<?php
//======================================================================
// INCLUDES
//======================================================================
include(get_stylesheet_directory() . '/includes/custom_post_slider.php');
include(get_stylesheet_directory() . '/includes/blog-ajax.php');

//======================================================================
// STYLES AND SCRIPTS
// - Disable Gutenberg
// - Frontend Styles and Scripts
// - Remove unneeded styles and scripts
// - Remove Emojis
//======================================================================

//-----------------------------------------------------
// Disable Gutenberg
//-----------------------------------------------------
// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);

// Disables the block editor from managing widgets in the Gutenberg plugin.
add_filter( 'gutenberg_use_widgets_block_editor', '__return_false', 100 );

// Disables the block editor from managing widgets.
add_filter( 'use_widgets_block_editor', '__return_false' );

//-----------------------------------------------------
// Frontend Styles and Scripts
//-----------------------------------------------------
function theme_enqueue_styles() {

    /*scripts*/
    wp_enqueue_script( 'custom-child-script', get_stylesheet_directory_uri() . '/assets/js/custom.js', '', null, true );
    $admin_ajax_url = admin_url('admin-ajax.php');
    $custom_translation_array = array(
        'admin_ajax_url' => __( $admin_ajax_url, '' ),
    );
    wp_localize_script( 'custom-child-script', 'custom_localize_script', $custom_translation_array );
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', false );
    
    /* Font Awesome KIT */
    //wp_enqueue_script( 'custom-fontawesome', 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', '');

   
    /* Styles */
    //load the parent stylesheet
    wp_enqueue_style( 'divi-style-eq-parent', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'custom-child-style', get_stylesheet_directory_uri() . '/assets/css/theme.css', '');
    wp_enqueue_style( 'font-awesome', 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css' );

    wp_dequeue_style( 'divi-style-parent' );

}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles',999999999);


//-----------------------------------------------------
// Remove unneeded styles and scripts
//-----------------------------------------------------
function custom_remove_enqueue_styles() {

    //dequeue open sans font
    wp_dequeue_style( 'divi-fonts' );
    wp_dequeue_style( 'et-gf-open-sans' );

}
add_action( 'wp_enqueue_scripts', 'custom_remove_enqueue_styles',999);

//-----------------------------------------------------
// Remove Emojis
//-----------------------------------------------------
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

// Remove Dashicons in WordPress front-end for logged out users
add_action( 'wp_enqueue_scripts', 'theme_dequeue_dashicons', 999 );
function theme_dequeue_dashicons() {
    if ( ! is_user_logged_in() ) {
        wp_deregister_style( 'dashicons' );
    }
}

//-----------------------------------------------------
// enqueue admin styles and scripts
//-----------------------------------------------------
function load_custom_wp_admin_style() {
    wp_enqueue_style( 'custom_wp_admin_css' ,  get_stylesheet_directory_uri() . '/assets/css/admin-theme.css', false, '');
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_style' );

//-----------------------------------------------------
// Remove script and styles version
//-----------------------------------------------------
// remove version from head
remove_action('wp_head', 'wp_generator');

// remove version from rss
add_filter('the_generator', '__return_empty_string');

// remove version from scripts and styles
function remove_version_scripts_styles($src) {
    if (strpos($src, 'ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'remove_version_scripts_styles', 9999);
add_filter('script_loader_src', 'remove_version_scripts_styles', 9999);

//-----------------------------------------------------
// After Theme Setup
//-----------------------------------------------------
add_action( 'after_setup_theme', 'register_custom_theme_setup' );
function register_custom_theme_setup() {

    //add additional menus
    register_nav_menus( array(
        'custom-social-icons'   => esc_html__( 'Social Icons', 'Divi' ),
    ) );

    //add image size
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'thumbnail-single-post', 1140, 740, true );

}

// --------------------------------------------------
// Turn off SRC SET Wordpress
// --------------------------------------------------
add_filter( 'wp_calculate_image_srcset', 'custom_wp_disable_srcset' );
function custom_wp_disable_srcset( $sources ) {
    return false;
}

//======================================================================
// GRAVITY FORMS
//======================================================================
//-----------------------------------------------------
// Gravity Form Buttons
//-----------------------------------------------------
add_filter( 'gform_next_button', 'input_to_button', 10, 2 );
add_filter( 'gform_previous_button', 'input_to_button', 10, 2 );
add_filter( 'gform_submit_button', 'input_to_button', 10, 2 );
function input_to_button( $button, $form ) {
    $dom = new DOMDocument();
    $dom->loadHTML( '<?xml encoding="utf-8" ?>' . $button );
    $input = $dom->getElementsByTagName( 'input' )->item(0);
    $classes = $input->getAttribute( 'class' );
    $classes .= " button et_pb_button";
    $input->setAttribute( 'class', $classes );

    $new_button = $dom->createElement( 'button' );
    $new_button->appendChild( $dom->createTextNode( $input->getAttribute( 'value' ) ) );
    $input->removeAttribute( 'value' );
    foreach( $input->attributes as $attribute ) {
        $new_button->setAttribute( $attribute->name, $attribute->value );
    }
    $input->parentNode->replaceChild( $new_button, $input );

    return $dom->saveHtml( $new_button );
}

//-----------------------------------------------------
// Body class
//-----------------------------------------------------
add_filter( 'body_class', 'custom_body_class', 99999999, 2 );
function custom_body_class( $wp_classes ){
    $whitelist =array();
    $blacklist = array();
    
    // Filter the body classes
    // Whitelist result: add class
    if(!empty($whitelist)){
        foreach ($whitelist as $item):
            if (!in_array($item,  $wp_classes )) {
                $wp_classes[] = $item;
            }
        endforeach;
    }


    //black list - remove classes
    if(!empty($blacklist)) {
        foreach ($blacklist as $item):
            if (in_array($item, $wp_classes)) {
                unset($wp_classes[array_search($item, $wp_classes)]);
            }
        endforeach;
    }

    // Add the extra classes back untouched
    return $wp_classes;

}

//-----------------------------------------------------
// Auto update Current Year Shortcode
//-----------------------------------------------------
add_shortcode ('current_year','current_year_func');
function current_year_func () {
    ob_start();
    echo date('Y');
    $html_content = ob_get_contents();
    ob_end_clean();
    return $html_content;
}

//======================================================================
// CPT
//======================================================================
//-----------------------------------------------------
// Post Type
//-----------------------------------------------------
add_action('init', 'custom_post_type_and_taxonomy_init');
function custom_post_type_and_taxonomy_init(){

    /*
    //CPT - Team
    $args_cpt_team = array(
        'public' => true,
        'label' => __('Team', 'textdomain'),
        'menu_icon' => 'dashicons-groups',
        'has_archive' => false,
        'supports' => array('title', 'thumbnail', 'editor', 'excerpt', 'author'),
        'hierarchical' => false,
        'exclude_from_search' => false,
        'show_in_nav_menus' => false,
        'publicly_queryable' => false
    );
    register_post_type('team', $args_cpt_team);

    //team - taxonomy (role)
    $args_team_role = array(
        'label' => __( 'Type' ),
        'rewrite' => array( 'slug' => 'team-type' ),
        'hierarchical' => true,
        'show_admin_column' => true,
    );
    register_taxonomy('team_type', 'team', $args_team_role );
    */
    
    flush_rewrite_rules( false );
}