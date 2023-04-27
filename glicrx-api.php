<?php
/*
    Plugin Name: GlicRX API
    Description: Genius Avenue with GlicRX prescription discount
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

//CSS AND JS ASSETS
function Glic_Assets() {
    wp_enqueue_style( 'glic-style', plugins_url( '/public/css/glic-public.css', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'Glic_Assets' );

?>
