//======================================================================
// CUSTOM SMOOTH SCROLL
//======================================================================
(function($){
    var et_pb_smooth_scroll = window.et_pb_smooth_scroll;

    window.et_pb_smooth_scroll = function( $target, $top_section, speed, easing ) {
        var $window_width = $( window ).width(),
            $scroll_position = 0;

        var $menu_offset =  $( '#main-header' ).outerHeight() - 1;


        if ( $ ('#wpadminbar').length && $window_width > 600 ) {
            $menu_offset += $( '#wpadminbar' ).outerHeight();
        }

        if ( $ ('#top-header').length ) {
            $menu_offset += $( '#top-header' ).outerHeight();
        }

        //fix sidenav scroll to top
        if ( $top_section ) {
            $scroll_position = 0;
        } else {
            $scroll_position = $target.offset().top - $menu_offset;
        }

        // set swing (animate's scrollTop default) as default value
        if( typeof easing === 'undefined' ){
            easing = 'swing';
        }

        $( 'html, body' ).animate( { scrollTop :  $scroll_position }, speed, easing );
    }
})(jQuery);
