<?php
// Get the absolute path to the plugin directory
$plugin_dir_path = plugin_dir_path( __FILE__ );
// Include the curl-helper.php file
require_once( $plugin_dir_path . 'curl-helper.php' );


//Adderall (Amphetamine-Dextroamphetamine)

//Name of drug to search. Minimum of three characters to be passed
//USED THIS FOR AUTO SUGGESTION
//$search_response = curlRequest('https://api.glichealth.com/pricing/v3/searchdrug', 'POST', ['stext' => 'adde'], [], 10, 0);

$search_type = 'Anti';

/*
Next Task* : Find a way to secure the Token Auth by using
add_option('glic_access_token', 'your_access_token_here');

*/
$search_response = curlRequest('https://api.glichealth.com/pricing/v3/searchdrug', 'POST', ['stext' => $search_type], ['Authorization: Basic RXk2YTdicEcyeXNTU2dIaTpWbUlBa0hDU3RWMFlQMVd3', 'Content-Type: application/json']);

// handle the response
$search_data = json_decode($search_response, true);

?>
<div class="glicrx-modal glicrx-show-modal">
    <div class="glicrx-modal-content">

    <h1>NEED I HIDE PAG NAG LALABAS NA NG DATA</h1>

        <span class="glicrx-close-button">×</span>  
        
        
        
        <?php
            echo "<pre>";
            print_r($search_data);
            echo "</pre>";
            
        ?>
    </div>
</div>