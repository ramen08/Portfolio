<?php 
class CPL_Endpoint {
    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

    /**
     * Register routes
     * 
     * @return void
     */
    public function register_routes() {
        register_rest_route( 'custom-post-library', '/get-posts', array(
            'methods' => 'POST',
            'callback' => array( $this, 'route_get_ui' )
        ) );
    }

    /**
     * Fetch list ui
     * 
     * @return WP_REST_Response
     */
    public function route_get_ui(WP_REST_Request $request) {
        $params  = $request->get_params();
        $control = new CPL_Controller( $params ); 

        $posts = $params["layout"] === "overall" 
            ? $control->reset_ui() 
            : $control->get_rows( array(
                "page" => $params["page"]
            ) );

        $response = new WP_REST_Response( $posts );
        
        return $response;
    }
}

new CPL_Endpoint;
?>