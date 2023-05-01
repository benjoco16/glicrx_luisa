<?php
/*
function drug_components() {
  $url = 'https://api.glichealth.com/pricing/v3/drugcomponents';
  $data = array('DrugName' => $_POST['DrugName']); //change stext in autocomplete.js

  $options = array(
    'http' => array(
      'header' => "Content-Type: application/x-www-form-urlencoded\r\n" .
                  "Authorization: Basic RXk2YTdicEcyeXNTU2dIaTpWbUlBa0hDU3RWMFlQMVd3\r\n",
      'method' => 'POST',
      'content' => http_build_query($data),
    ),
  );

  $context = stream_context_create($options);
  $response = file_get_contents($url, false, $context);

  wp_send_json(json_decode($response));
  
}
*/

function handle_drug_components() {
  // Get the absolute path to the plugin directory
  $plugin_dir_path = plugin_dir_path( __FILE__ );
  // Include the curl-helper.php file
  require_once( $plugin_dir_path . 'curl-helper.php' );

  //Get Token
  $current_token = glicrx_token();
  
    $drug_name = isset( $_POST['DrugName'] ) ? sanitize_text_field( $_POST['DrugName'] ) : '';

    // Make the API call using cURL
    $search_response = curlRequest('https://api.glichealth.com/pricing/v3/drugcomponents', 'POST', ['DrugName' => $drug_name], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);

    // handle the response
    $drug_data = json_decode( $search_response, true );
    wp_send_json_success( $drug_data );
    wp_die();
}


?>

