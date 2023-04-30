<?php
/*
    Plugin Name: GlicRX API
    Description: Genius Avenue and GlicRX prescription discount
    Version: 1.0
    Author: Benjamin Co
*/

//ShortCode
function GlicFunction( $atts ) {
    // Code to generate output for the shortcode
    //$a = shortcode_atts( array(  'member_id' => '1115392467', 'group'=>'1115', 'rxbin'=>'015673',    'rxpcn'=>'SS'), $atts );
    ob_start();
        include( dirname ( __FILE__ ) . '/public/glic-form.php' );
        include( dirname( __FILE__ ) . '/public/popular-drug.php');
    return ob_get_clean();
}
add_shortcode( 'GlicRx', 'GlicFunction' );

//Shortcode for Search Result Page
function glicResultPage( $atts ) {
    ob_start();
        include( dirname ( __FILE__ ) . '/public/glicrx-popup.php' );
    return ob_get_clean();
}
add_shortcode( 'GlicResultPage', 'glicResultPage' );

//CSS AND JS ASSETS
function Glic_Assets() {
    //Public Assets
    wp_enqueue_style( 'glic-style', plugins_url( '/public/css/glic-public.css', __FILE__ ) );

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'glic-js-modal', plugins_url( '/public/js/modal.js', __FILE__ ), array( 'jquery' ), '1.0.0', true );
    wp_enqueue_script( 'glic-js-autocomplete', plugins_url( '/public/js/search-autocomplete.js', __FILE__ ), array( 'jquery' ), '1.0.0', true );
}   
add_action( 'wp_enqueue_scripts', 'Glic_Assets' );

//Activation and deactivation hooks
require_once( plugin_dir_path( __FILE__ ) . 'admin/glicrx-activate.php');
register_activation_hook( __FILE__, 'glic_activate' );

require_once( plugin_dir_path( __FILE__ ) . 'admin/glicrx-deactivate.php' );
register_deactivation_hook( __FILE__, 'glic_deactivate' );

//Admin Settings
require_once( plugin_dir_path( __FILE__ ) . 'admin/glicrx-admin-navigation.php' );


//For Ajax autocomplete function
add_action('wp_ajax_nopriv_search_drugs', 'search_drugs');
add_action('wp_ajax_search_drugs', 'search_drugs');

require_once( plugin_dir_path( __FILE__ ) . 'public/autocomplete.php' );

?>
