jQuery(function(){
    
    //functions
    initFullHeightBanner();
});


jQuery(window).on('load resize orientationchange', function(){
    initFullHeightBanner();
});
//-----------------------------------------------------
// Full Height Banner
//-----------------------------------------------------
function initFullHeightBanner(){

    var $screenHeight = jQuery(window).height(),
        $largebanner = jQuery('.banner-section, .animation-wrapper, .banner-bg');

    $largebanner.css({
        'height' : $screenHeight,
    });
}