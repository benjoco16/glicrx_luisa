<?php
add_action('wp_ajax_nopriv_search_drugs', 'search_drugs');
add_action('wp_ajax_search_drugs', 'search_drugs');

function search_drugs() {
  $plugin_dir_path = plugin_dir_path( __FILE__ );
  // Include the curl-helper.php file
  require_once( $plugin_dir_path . 'curl-helper.php' );

  //Get Token
  $current_token = glicrx_token();

  $url = 'https://api.glichealth.com/pricing/v3/searchdrug';
  $data = array('stext' => $_POST['stext']);

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

?>