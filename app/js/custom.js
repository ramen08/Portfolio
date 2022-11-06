jQuery(function(){
    //scroll to top of the page on load
    window.scrollTo(0, 0);
    
    //functions
    initCustomForms();
    initFormFn();
    initFlexContentColumn();
    initHeaderAccordionMenu();
});

//======================================================================
// Page Loader
//======================================================================
jQuery(window).load(function() {
    // Animate loader off screen
    setTimeout(function(){
        var $preloader = jQuery(".page-preloader");
        if( $preloader.length ){
            $preloader.fadeOut(300);
        }
    },300);
});

//======================================================================
// FORMS
//======================================================================
//-----------------------------------------------------
// JCF Init
//-----------------------------------------------------

function initCustomForms(){

    jcf.setOptions('Select', {
        wrapNative: false,
        maxVisibleItems: 8
    });

    jcf.destroyAll("select");

    jcf.destroyAll('input[type="checkbox"]');

    jcf.destroyAll('input[type="radio"]');

    jcf.destroyAll('input[type="file"]');

    jcf.replaceAll();
    jcf.destroyAll('.custom-jcf-ignore');

}


//-----------------------------------------------------
// Gravity Form
//-----------------------------------------------------
function initFormFn(){
    jQuery( document ).bind( 'gform_post_render', function( event, formId ){
        initCustomForms();

        /* if needed scroll functionality to form comment out just replace the numbers with the correct form id
         setTimeout(function(){
             var $wrapper = '',
                 $confirmation = '';

             if( formId == 1 ){
                 $wrapper = jQuery('#gform_wrapper_1');
                 $confirmation = jQuery('#gform_confirmation_wrapper_1');
             }

             if( $wrapper.length ){
                 if( $wrapper.hasClass('gform_validation_error') ){
                     et_pb_smooth_scroll( $wrapper, false, 40, 'linear' );
                 }
             }

             if( $confirmation.length ){
                 et_pb_smooth_scroll( $confirmation, false, 40, 'linear' );
             }

         },800);
         */
    });
}

jQuery(window).load(function(){
    setTimeout(initSmoothScrollPage(),3000);
});

function initSmoothScrollPage(){

    var $target_hash = window.location.hash;
    if($target_hash){
        var $this_link = jQuery($target_hash),
            has_closest_smooth_scroll_disabled = $this_link.closest( '.et_smooth_scroll_disabled' ).length,
            has_closest_woocommerce_tabs = ( $this_link.closest( '.woocommerce-tabs' ).length && $this_link.closest( '.tabs' ).length ),
            has_closest_eab_cal_link = $this_link.closest( '.eab-shortcode_calendar-navigation-link' ).length,
            has_acomment_reply = $this_link.hasClass( 'acomment-reply' ),
            disable_scroll = has_closest_smooth_scroll_disabled || has_closest_woocommerce_tabs || has_closest_eab_cal_link || has_acomment_reply;

        if(! disable_scroll){
            if( $this_link.length ){
                et_pb_smooth_scroll( $this_link, false, 800, 'swing');

                if ( ! jQuery( '#main-header' ).hasClass( 'et-fixed-header' ) && jQuery( 'body' ).hasClass( 'et_fixed_nav' ) && jQuery( window ).width() > 980 ) {
                    setTimeout(function(){
                        et_pb_smooth_scroll( $this_link, false, 40, 'linear' );
                    }, 450 );
                }

            }
        }

    }

}

//-----------------------------------------------------
// Flex content column
//-----------------------------------------------------
function initFlexContentColumn(){
    jQuery('.flex-content-column').each(function(){
        var $this = jQuery(this);

        $this.wrapInner('<div class="fcc-wrap"><div class="fcc-content"></div></div>');
    });
}


//-----------------------------------------------------
// Header
//-----------------------------------------------------
function initHeaderAccordionMenu() {
    setTimeout(function () {
        /*jQuery('#mobile_menu').each(function () {
         var $this = jQuery(this);
         $this.addClass('et_mobile_menu_custom');
         $this.removeClass('et_mobile_menu');
         });
         */

        //header
        /* jQuery(document).on('click', '#et_mobile_nav_menu .menu-item-has-children>a', function(e) {
         e.preventDefault();
         var $this = jQuery(this);
         $this.closest('#mobile_menu').stop().slideDown( 500 );

         $this.next('.sub-menu').slideToggle(350);
         $this.toggleClass('show-sub-menu');

         setTimeout(function () {
         $this.closest('.mobile_nav').addClass('opened');
         $this.closest('.mobile_nav').removeClass('closed');
         },550);
         });*/

    },800);


    //add bar icon to mobile menu bar
    jQuery('.mobile_menu_bar').each(function () {
        jQuery(this).append('<span class="bar-icon"></span>');
    });


    //if homepage - remove all home that has current menu item
    var $body = jQuery( 'body' );
    if( $body.hasClass('home') ){
        jQuery('#top-menu li.menu-item-home').removeClass('current_page_item');
        jQuery('#top-menu li.menu-item-home').removeClass('current-menu-item');
    }
}