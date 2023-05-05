<div id="glicrx-drug-results">

    <div id="search-glic-spinner">
        <div class="lds-ripple"><div></div><div></div></div>
    </div>
</div>

<form action="" id="data-attriform">
                    <!-- Drug Type -->
                    <div class="glic-rx-brandhldr">
                        <label for="DrugType">Type</label>
                        <select id="DrugType" name="DrugType">
                            <?php  
                                //echo "<option value=''>" . $drug['generic'][0]['sub_drug_name'] . " (Generic Drug) </option>";
                                   ?>
                        </select>
                    </div>

                    <!-- Form -->
                    <div class="glic-rx-formhldr">
                        <label for="FormType">Form</label>
                        <select id="FormType" name="FormType">
                        <?php  
                              //echo "<option value=''>" . $drug['brand'][0]['types'][0]['dose'] . " </option>";
                        ?>
                        </select>
                    </div>

                    <!-- Dosage/Strength -->
                    <div class="glicrx-strength-hldr">
                        <label for="Dosage">Dosage</label>
                        <select id="Dosage" name="Dosage">
                        <?php  
                            //Change based on DrugType (Generic or Brand)
                            /* $strngth = $drug['generic'][0]['types'][0]['strength']; //Generic
                            //$strngth = $drug['brand'][0]['types'][0]['strength']; //Brand
                           
                            foreach ($strngth as $strg) {        
                           echo "<option value=''>" . $strg['Strength'] . "</option>";
                            }
                            */

                        ?>
                        </select>
                    </div>

                    <!-- Quantity -->
                    <div class="glicrx-strength-hldr">
                        <label for="Quantity">Quantity</label>
                        <select id="qty" name="qty">
                        <?php  
                            //Change based on DrugType (Generic or Brand)
                            /* $quantity = $drug['generic'][0]['types'][0]['strength'][0]['Quantity']; //Generic
                            //$quantity = $drug['brand'][0]['types'][0]['strength'][0]['Quantity']; //Brand
                           
                            foreach ($quantity as $qty) {        
                                echo "<option value=''>" . $qty['Quantity'] . "</option>";
                            }*/
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