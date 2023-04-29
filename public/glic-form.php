<?php
// Get the absolute path to the plugin directory
$plugin_dir_path = plugin_dir_path( __FILE__ );
// Include the curl-helper.php file
require_once( $plugin_dir_path . 'curl-helper.php' );

//Get Token
$current_token = glicrx_token();

$search_type = 'Anti';

$search_response = curlRequest('https://api.glichealth.com/pricing/v3/searchdrug', 'POST', ['stext' => $search_type], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);
// handle the response
$search_data = json_decode($search_response, true);

?>

<div class="glic-container">
    <form id="glic-form" action="#">
        <input type="text" placeholder="Search for a drug..." id="glic-search-input">
        <ul class="glic-autocomplete-results"></ul>
        <button type="submit">Search</button>
    </form>

    <?php
        echo "<pre>";
        //print_r($search_data);
        echo "</pre>";

        foreach ($search_data[0]['data'] as $drug) { 
                echo $drug['DrugName'] . "<br>"; 
        }
    ?>


</div>
    