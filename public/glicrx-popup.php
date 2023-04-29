<?php
// Get the absolute path to the plugin directory
$plugin_dir_path = plugin_dir_path( __FILE__ );
// Include the curl-helper.php file
require_once( $plugin_dir_path . 'curl-helper.php' );

//Get Token
$current_token = glicrx_token();

//Adderall (Amphetamine-Dextroamphetamine)

//Name of drug to search. Minimum of three characters to be passed
//USED THIS FOR AUTO SUGGESTION
//$search_response = curlRequest('https://api.glichealth.com/pricing/v3/searchdrug', 'POST', ['stext' => 'adde'], [], 10, 0);

$search_type = 'Anti';

$search_response = curlRequest('https://api.glichealth.com/pricing/v3/searchdrug', 'POST', ['stext' => $search_type], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);

/*
    Next Task* : Find a way to secure the Token Auth by using
    add_option('glic_access_token', 'your_access_token_here');
*/

// handle the response
$search_data = json_decode($search_response, true);

?>
<div class="glicrx-modal glicrx-show-modal">
    <div class="glicrx-modal-content">

    <h1>Auto Search on type</h1>

        <span class="glicrx-close-button">×</span>       
        <?php
            echo "<pre>";
            //print_r($search_data);
            echo "</pre>";

            foreach ($search_data[0]['data'] as $drug) { 
                   echo $drug['DrugName'] . "<br>"; 
            }
        ?>
        
    </div>
</div>