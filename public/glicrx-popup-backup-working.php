
<?php
// Get the absolute path to the plugin directory
$plugin_dir_path = plugin_dir_path( __FILE__ );
// Include the curl-helper.php file
require_once( $plugin_dir_path . 'curl-helper.php' );

//Get Token
$current_token = glicrx_token();

//$search_type = 'Adderall (Amphetamine-Dextroamphetamine)'; //Make this Dynamic After the Result
$search_type = isset($_POST['search_type']) ? sanitize_text_field($_POST['search_type']) : 'Adderall (Amphetamine-Dextroamphetamine)';

$search_response = curlRequest('https://api.glichealth.com/pricing/v3/drugcomponents', 'POST', ['DrugName' => $search_type], ['Authorization: '.$current_token.'', 'Content-Type: application/json']);

// handle the response
$search_data = json_decode($search_response, true);

?>
<!--<div class="glicrx-modal glicrx-show-modal">-->
<div class="glicrx-modal">
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
                <form action="" id="data-attriform">
                    <!-- Drug Type -->
                    <div class="glic-rx-brandhldr">
                        <label for="DrugType">Type</label>
                        <select id="DrugType" name="DrugType">
                            <?php  
                                echo "<option value=''>" . $drug['generic'][0]['sub_drug_name'] . " (Generic Drug) </option>";
                                echo "<option value=''>" . $drug['brand'][0]['sub_drug_name'] . " (Brand Drug) </option>";
                            ?>
                        </select>
                    </div>

                    <!-- Form -->
                    <div class="glic-rx-formhldr">
                        <label for="FormType">Form</label>
                        <select id="FormType" name="FormType">
                        <?php  
                             echo "<option value=''>" . $drug['generic'][0]['types'][0]['dose'] . "</option>";
                             echo "<option value=''>" . $drug['brand'][0]['types'][0]['dose'] . " </option>";
                        ?>
                        </select>
                    </div>

                    <!-- Dosage/Strength -->
                    <div class="glicrx-strength-hldr">
                        <label for="Dosage">Dosage</label>
                        <select id="Dosage" name="Dosage">
                        <?php  
                            //Change based on DrugType (Generic or Brand)
                            $strngth = $drug['generic'][0]['types'][0]['strength']; //Generic
                            //$strngth = $drug['brand'][0]['types'][0]['strength']; //Brand
                           
                            foreach ($strngth as $strg) {        
                                echo "<option value=''>" . $strg['Strength'] . "</option>";
                            }

                        ?>
                        </select>
                    </div>

                    <!-- Quantity -->
                    <div class="glicrx-strength-hldr">
                        <label for="Quantity">Quantity</label>
                        <select id="qty" name="qty">
                        <?php  
                            //Change based on DrugType (Generic or Brand)
                            $quantity = $drug['generic'][0]['types'][0]['strength'][0]['Quantity']; //Generic
                            //$quantity = $drug['brand'][0]['types'][0]['strength'][0]['Quantity']; //Brand
                           
                            foreach ($quantity as $qty) {        
                                echo "<option value=''>" . $qty['Quantity'] . "</option>";
                            }
                        ?>
                        </select>
                    </div>

                    <!-- Quantity -->
                    <div class="glicrx-zipcode-hldr">
                        <label for="Quantity">Zipcode</label>
                        <input autocomplete="off" id="getzipcode" maxlength="5" placeholder="Type zipcode" type="tel">
                    </div>    
                    
                    <button type="submit">Find Lowest Price</button>

                </form>   
        <?php    
            }//End Foreach
        ?>
        
    </div>
</div>