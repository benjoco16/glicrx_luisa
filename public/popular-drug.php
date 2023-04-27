<h4>Popular Searches</h4>
<?php
// set up cURL
$ch = curl_init();
$url = "https://api.glichealth.com/pricing/v3/populardrug";

// set cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    "param1" => "value1",
    "param2" => "value2"
)));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Basic RXk2YTdicEcyeXNTU2dIaTpWbUlBa0hDU3RWMFlQMVd3",
    "Content-Type: application/json"
));

//make the API request
$response = curl_exec($ch);

//check for errors
if (curl_errno($ch)) {
    echo "Error: " . curl_error($ch);
} else {
    // handle the response
    $data = json_decode($response, true);

    echo "<pre>";
    //print_r($data);
    echo "</pre>";

    //List data and generate
    $html = '<div class="glic-container">';
        $html = '<div class="glic-hldr">';
        foreach ($data[0]['data'] as $drug) {
            $html .= '<div class="drug-card">';
                $html .= '<div class="drug-name">' . $drug['DrugName'] . '</div>';
            $html .= '</div>'; // close drug-card
        }
        $html .= '</div>'; // close glic-hldr
    $html .= '</div>'; // close glic-container
    
    echo $html;
}

// close the cURL session
curl_close($ch);

//include modal
include ('glicrx-popup.php');
?>


<script>
    //create modal function
    var modal = document.querySelector(".glicrx-modal");
    var trigger = document.querySelector(".drug-name");
    var closeButton = document.querySelector(".glicrx-close-button");

    function toggleModal() {
        modal.classList.toggle("glicrx-show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

</script>