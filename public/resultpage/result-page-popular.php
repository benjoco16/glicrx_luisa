<?php

$plugin_dir_path = WP_PLUGIN_DIR . '/glicrx-api';
// Include the curl-helper.php file
require_once( $plugin_dir_path . '/public/curl-helper.php' );

//Get Token
  $current_token = glicrx_token();

//$response = curlRequest('https://api.glichealth.com/pricing/v3/populardrug', 'POST', ['key' => 'value']);
$response = curlRequest('https://api.glichealth.com/pricing/v3/populardrug', 'POST', [''], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);

// handle the response  
$data = json_decode($response, true);

//List data and generate
$html = '<div class="glic-container">';
    $html = '<div class="glic-hldr">';
    foreach ($data[0]['data'] as $drug) {
        /*
        echo "<pre>";
        print_r($drug);
        echo "</pre>";
        */

        //Use the CallerName instead of DrugName to pass in the popup
        //$html .= '<div class="drug-card" onclick="DrugInfo(\''.$drug['DrugName'].'\')">';  
        $html .= '<div class="drug-card">';         
            $html .= '<div class="drug-name" data-info="' . $drug['CallerName'] . '">' . $drug['DrugName'] . '</div>';
        $html .= '</div>'; // close drug-card
    }
    $html .= '</div>'; // close glic-hldr
$html .= '</div>'; // close glic-container

echo $html;
?>