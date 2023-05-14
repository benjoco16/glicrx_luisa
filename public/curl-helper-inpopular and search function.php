<?php
    /* 
        This function takes multiple parameters:

        $url: the URL of the endpoint you want to call
        $method: the HTTP method you want to use (e.g. GET, POST, PUT, DELETE)
        $Search: Used in popup.php to search and can used max of 3 par any data you want to send with the request (optional) 
        $data: any data you want to send with the request (optional) 
        $maxRedirects: This parameter optional and set to 10
        $maxTime: This parameter also optional and set to 30
    */

    function curlRequest($url, $method, $data = [], $headers = [], $timeout = 10, $connectTimeout = 0) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $connectTimeout);
        if (!empty($data)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        if (!empty($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }


    //Query DB tp get value in custom table
    function glicrx_token() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'glicrx_st';
        $current_token = $wpdb->get_var( "SELECT token FROM $table_name ORDER BY id DESC LIMIT 1" );
        return $current_token;
    }
?>