<?php
$topics = get_terms( 'post-topic', array(
    'hide_empty' => false,
) );

$products = get_terms( 'post-product', array(
    'hide_empty' => false,
) );

$categories = get_categories( array(
    'orderby' => 'name',
    'order'   => 'ASC'
) );

?>

<div class="blog-filter-section">
    <div class="reset-row">
        <a href="#" class="blog-filter-reset">Reset Filters</a>
    </div>
    <div class="blog-filter-row">

        <div class="filters-wrapper clearfix">
            <div class="filter category-filter">
                <select name="category" id="category" class="category-select" aria-required="true" aria-invalid="false">
                    <option class="hideme" value="" selected="selected" >Category</option>
                    <?php foreach( $categories as $category ) : ?>
                        <option value="<?php echo $category->slug ?>"><?php echo $category->name ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="filter topic-filter">
                <select name="topic" id="topic" class="topic-select" aria-required="true" aria-invalid="false">
                    <option class="hideme" value="" selected="selected" >Topic</option>
                    <?php foreach( $topics as $topic ) : ?>
                        <option value="<?php echo $topic->slug ?>"><?php echo $topic->name ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="filter product-filter">
                <select name="product" id="product" class="product-select" aria-required="true" aria-invalid="false">
                    <option class="hideme" value="" selected="selected" >Product</option>
                    <?php foreach( $products as $product ) : ?>
                        <option value="<?php echo $product->slug ?>"><?php echo $product->name ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="filter sort-filter">
                <select name="sort" id="sort" class="sort-select" aria-required="true" aria-invalid="false">
                    <option class="hideme" value="" selected="selected" >Sort By</option>
                    <option value="DESC">Newest to Oldest</option>
                    <option value="ASC">Oldest to Newest</option>
                    <option value="a_z_asc">A-Z</option>
                    <option value="a_z_desc">Z-A</option>
                </select>
            </div>
            <div class="filter search-filter">
                <input type="text" class="field" name="s" id="blog-search-form-text" placeholder="<?php esc_attr_e( 'Search Blogs...', '' ); ?>" value="<?php echo get_search_query() ?>" />
            </div>
        </div>
    </div>
</div>