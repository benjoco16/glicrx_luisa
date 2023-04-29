<h4>Popular Searches</h4>
<?php
// Get the absolute path to the plugin directory
$plugin_dir_path = plugin_dir_path( __FILE__ );

// Include the curl-helper.php file
require_once( $plugin_dir_path . 'curl-helper.php' );

$response = curlRequest('https://api.glichealth.com/pricing/v3/populardrug', 'POST', ['key' => 'value']);

// handle the response
$data = json_decode($response, true);

//List data and generate
$html = '<div class="glic-container">';
    $html = '<div class="glic-hldr">';
    foreach ($data[0]['data'] as $drug) {
        $html .= '<div class="drug-card" onclick="DrugInfo(\''.$drug['DrugName'].'\')">';
            
            $html .= '<div class="drug-name">'.$drug['DrugName'].'</div>';
            
        $html .= '</div>'; // close drug-card
    }
    $html .= '</div>'; // close glic-hldr
$html .= '</div>'; // close glic-container

echo $html;

//include modal
include ('glicrx-popup.php');
?>

