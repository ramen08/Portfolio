jQuery(function(){
    blog_filters();
});


function blog_filters(){

    //reset filters
    jQuery('.blog-filter-reset').on('click',function(e){
        e.preventDefault();

        blog_reset_fields();
        jQuery('.blog-filter-row select').trigger('change'); //to refresh dropdowns

        setTimeout(function(){
            get_blog_posts( 'blog_filter_ajax', 'reset' );
        }, 500 );
        
    });

    //on filter
    jQuery('.blog-filter-row select').on('change',function(){
        jQuery('input[name="blog-page-number"]').val(1); //should always reset on filter
        setTimeout(function(){
            get_blog_posts( 'blog_filter_ajax', 'filter' );
        },300);
    });

    //on search
    jQuery('#blog-search-form-text').on('input',function(){
        jQuery('input[name="blog-page-number"]').val(1); //should always reset on filter
        
        setTimeout(function(){
            get_blog_posts( 'blog_filter_ajax', 'filter' );
        },300);
    });

    //load more 
    jQuery(document).on('click', '#ajax_more_posts_blog',function(e){
        get_blog_posts( 'blog_filter_ajax', 'load_more' );
    });
}

function blog_reset_fields(){
    //reset fields
    jQuery('.blog-filter-row select').val("");
    jQuery('#blog-search-form-text').val("");
    jQuery('input[name="blog-page-number"]').val(1);
}

//-----------------------------------------------------
// AJAX functions tht pulls all blog posts
//-----------------------------------------------------
function get_blog_posts( $action , $function ){

    /* fields */
    $category       = jQuery('#category').val();
    $topics         = jQuery('#topic').val();
    $products       = jQuery('#product').val();
    $sort_by        = jQuery('#sort').val();
    $search         = jQuery('#blog-search-form-text').val();
    $page_number    = jQuery('input[name="blog-page-number"]').val();

    /* pass fields to data variable */
    var $data = {
        action      : $action,
        page_number : $page_number,
        category    : $category, 
        topics      : $topics,
        products    : $products,
        sort_by     : $sort_by,
        search      : $search,
        function    : $function
    };

    jQuery.ajax({
        type: 'POST',
        url:  custom_localize_script.admin_ajax_url,
        data: $data,
        beforeSend:function() {
            jQuery('body').addClass('blog-loading');
        },
        success:function( code ) {
            var $load_more = jQuery('.show-more-wrapper');

            if( $function == 'load_more' ){
                jQuery('.post-item-section .post-items').append(code.data.result_items); 
                jQuery('input[name="blog-page-number"]').val( parseInt($page_number)+1 );
            }else{
                jQuery('.post-item-section .post-items').html(code.data.result_items);
            }

            setTimeout(function(){
                $load_more.html(code.data.load_more);
                
                setTimeout(function(){
                    jQuery('body').removeClass('blog-loading');
                },300);
            },300);
        }
    });
}