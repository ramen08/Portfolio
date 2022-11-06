<form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
    <div class="search-form-wrap">
        <label for="s" class="screen-reader-text"><?php _e( 'Search', '' ); ?></label>
        <input type="text" class="field" name="s" id="default-search-form-text" placeholder="<?php esc_attr_e( 'Search', '' ); ?>" />
        <button class="btn-search"></button>
    </div>
</form>