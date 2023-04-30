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

$search_type = 'Adderall (Amphetamine-Dextroamphetamine)';

$search_response = curlRequest('https://api.glichealth.com/pricing/v3/drugcomponents', 'POST', ['DrugName' => $search_type], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);

/*
    Next Task* : Find a way to secure the Token Auth by using
    add_option('glic_access_token', 'your_access_token_here');
*/

// handle the response
$search_data = json_decode($search_response, true);

?>
<div class="glicrx-modal glicrx-show-modal">
    <div class="glicrx-modal-content">

   <!-- <h1>Auto Search on type</h1> -->

        <span class="glicrx-close-button">×</span>       
        <?php
            //echo "<pre>";
            //print_r($search_data);
            //echo "</pre>";

            foreach ($search_data[0]['data'] as $drug) { 

                echo "<strong>Result for ; </strong>" . $drug['drugname'];            
            ?>
                <form action="">
                    <div class="glic-rx-brandhldr">
                        <label for="DrugType">Type</label>
                        <select id="DrugType" name="DrugType">
                            <?php  
                                echo "<option value=''>" . $drug['generic'][0]['sub_drug_name'] . " (Generic Drug) </option>";
                                echo "<option value=''>" . $drug['brand'][0]['sub_drug_name'] . " (Brand Drug) </option>";
                            ?>
                        </select>
                    </div>
                    <div class="glic-rx-formhldr">
                        <label for="FormType">Form</label>
                        <select id="FormType" name="FormType">
                        <?php  
                             echo "<option value=''>" . $drug['generic'][0]['types'][0]['dose'] . "</option>";
                             echo "<option value=''>" . $drug['brand'][0]['types'][0]['dose'] . " </option>";
                        ?>
                        </select>
                    </div>

                    <div class="glicrx-strength-hldr">
                        <label for="FormType">Dosage</label>
                        <select id="FormType" name="FormType">
                        <?php  
                            //Change based on DrugType (Generic or Brand)
                             echo "<option value=''>" . $drug['generic'][0]['types'][0]['strength'][0] . "</option>";
                             echo "<option value=''>" . $drug['brand'][0]['types'][0]['strength'] . " </option>";
                        ?>
                        </select>
                    </div>
                </form>
                   
        <?php    
            }//End Foreach
        ?>
        
    </div>
</div>