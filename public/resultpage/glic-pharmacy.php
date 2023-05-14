<?php
    //List static here based on click 
    $curl = curl_init();

    $plugin_dir_path = WP_PLUGIN_DIR . '/glicrx-api';
    // Include the curl-helper.php file
    require_once( $plugin_dir_path . '/public/curl-helper.php' );

    //Get Token
    $current_token = glicrx_token();

    $headers = array(
        "Content-Type: application/x-www-form-urlencoded",
        "Authorization: " . $current_token
    );

    // Get the NDC, Quant, and ZipCode from the POST request
    $ndcode = isset( $_POST['ndcode'] ) ? sanitize_text_field( $_POST['ndcode'] ) : '';
    $qty = isset( $_POST['qty'] ) ? sanitize_text_field( $_POST['qty'] ) : '';
    $getzipcode = isset( $_POST['getzipcode'] ) ? sanitize_text_field( $_POST['getzipcode'] ) : '';

    // Create the data string to be sent in the POST request
    $data = 'NDC=' . urlencode( $ndcode ) . '&Quant=' . urlencode( $qty ) . '&ZipCode=' . urlencode( $getzipcode );
    
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.glichealth.com/pricing/v3/searchndc',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_HTTPHEADER => $headers,
    ));

    
    $response = curl_exec($curl);
    
   // curl_close($curl);

    //print_r( $response );
?>

<div id="pharmacy_hldr">
    <ul>
        <?php
            $response = json_decode($response, true);
            $pharmacies = $response[0]['data'];

            foreach ($pharmacies as $pharmacy) {
                echo '<li>';
                    $pharmacyLogo = $pharmacy['PharmacyLogo'];
                    $pharmacyName = $pharmacy['PharmacyName'];
                    $price = $pharmacy['Price'];
                    $fdistance = $pharmacy['Fdistance'];
                    $percentSaved = $pharmacy['PercentSaved'];
                    $address = $pharmacy['Address'];
                    $phone = $pharmacy['PBMPhone'];
                    $lat = $pharmacy['Lat'];
                    $lng = $pharmacy['Long'];

                    echo '<button class="accordion">';
                    echo '<img src="' . $pharmacyLogo . '" width="50" height="50">';
                    echo '<div class="title">' . $pharmacyName . ', $' . $price . ', ' . $fdistance . ' mi, ' . $percentSaved . '</div>';
                    echo '<i class="fa fa-angle-down"></i>';
                    echo '</button>';

                    echo '<div class="panel">';
                        echo '<p><i class="fa fa-map-marker icon"></i>' . $address . '</p>';
                        echo '<p><i class="fa fa-phone icon"></i>' . $phone . '</p>';
                        echo '<div>';
                            echo '<input type="email" placeholder="Enter your email">';
                            echo '<button class="discount-btn">Get Discount</button>';
                            echo '<button class="print-btn">Print Card</button>';
                        echo '</div>';
                    echo '</div>';
                echo '</li>';


                //Set Up for Maps
                // Add marker information to the markers array
                $markers[] = array(
                    'name' => $pharmacyName,
                    'price' => $price,
                    'lat' => $lat,
                    'lng' => $lng
                );

                // Convert the markers array to a JSON string
                $markersJson = json_encode($markers);
            }
            
        ?>
  </ul>
</div>

<!-- Display the map -->
<div id="map-hldr">
    <div id="map" style="height: 400px;"></div>
</div>

<script>
// Initialize the map
function initMap() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(<?php echo $pharmacies[0]['Lat'] ?>, <?php echo $pharmacies[0]['Long'] ?>)
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Create markers for each location
  var markers = <?php echo $markersJson ?>;
  for (var i = 0; i < markers.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
      map: map,
      title: markers[i].name + ' ($' + markers[i].price + ')'
    });
  }
}
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrACbxX-oKErwSmzV_t86FsKEx6VsSEOM&callback=initMap"></script>