<?php
function search_drugs() {
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