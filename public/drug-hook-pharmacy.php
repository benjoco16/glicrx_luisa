<?php
  //For Popup Drug with ajax query function
  add_action( 'wp_ajax_nopriv_pharmacy', 'handle_pharmacy' );
  add_action( 'wp_ajax_pharmacy', 'handle_pharmacy' );

  function handle_pharmacy() {
    // Get the absolute path to the plugin directory
    $plugin_dir_path = plugin_dir_path( __FILE__ );
    // Include the curl-helper.php file
    require_once( $plugin_dir_path . 'curl-helper.php' );

    //Get Token
    $current_token = glicrx_token();

    $ndcode = isset( $_POST['ndcode'] ) ? sanitize_text_field( $_POST['ndcode'] ) : '';
    $qty = isset( $_POST['qty'] ) ? sanitize_text_field( $_POST['qty'] ) : '';
    $getzipcode = isset( $_POST['getzipcode'] ) ? sanitize_text_field( $_POST['getzipcode'] ) : '';

    // Make the API call using cURL
    $search_pharmacy = curlRequest('https://api.glichealth.com/pricing/v3/searchndc', 'POST', ['NDC' => $ndcode, 'Quant' => $qty, 'ZipCode' => $getzipcode], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);

    // handle the response
    $pharmacy_data = json_decode( $search_pharmacy, true );
    
    wp_send_json_success( $pharmacy_data );
    wp_die();
  }
  
?>