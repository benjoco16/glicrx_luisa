<?php
  //For Popup Drug with ajax query function
  add_action( 'wp_ajax_nopriv_form_components', 'handle_form_components' );
  add_action( 'wp_ajax_form_components', 'handle_form_components' );

  function handle_form_components() {
    // Get the absolute path to the plugin directory
    $plugin_dir_path = plugin_dir_path(__FILE__);
    // Include the curl-helper.php file
    require_once($plugin_dir_path . 'curl-helper.php');

    // Get Token
    $current_token = glicrx_token();

    // Came from Ajaxfunc.js getDrugComponents data->Drugname
    $drug_name = isset($_POST['DrugName']) ? sanitize_text_field($_POST['DrugName']) : '';
    // Retrieve the doseType parameter
    $dose_type = isset($_POST['DoseType']) ? sanitize_text_field($_POST['DoseType']) : '';

    // Make the API call using cURL
    $search_response = curlRequest('https://api.glichealth.com/pricing/v3/drugcomponents', 'POST', ['DrugName' => $drug_name], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);

    // handle the response
    $drug_data = json_decode($search_response, true);

    // Pass the drug_data and dose_type to the AJAX response
    $response = array(
      'drug_data' => $drug_data,
      'dose_type' => $dose_type
    );

    wp_send_json_success($response);
    wp_die();
  }

  
?>