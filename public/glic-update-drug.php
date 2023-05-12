<?php if($_SERVER['REQUEST_METHOD'] == 'POST') { ?>
    <form action="#" method="POST" id="data-attriform">
        
        <!-- Drug Type -->
        <div class="glic-rx-brandhldr">
            <label for="DrugType">Type</label>
            <select id="DrugType" name="DrugType" required>
            </select>
        </div>
        <!-- Form -->
        <div class="glic-rx-formhldr">
            <label for="FormType">Form</label>
            <select id="FormType" name="FormType" required> 
            </select>
        </div>
        <!-- Dosage/Strength -->
        <div class="glicrx-strength-hldr">
            <label for="Dosage">Dosage</label>
            <select id="Dosage" name="Dosage" required>
            </select>
        </div>
        <!-- Quantity -->
        <div class="glicrx-strength-hldr">
            <label for="Quantity">Quantity</label>
            <select id="qty" name="qty" required>
            </select>
        </div>
        <!-- Zipcode -->
        <div class="glicrx-zipcode-hldr">
            <label for="Zipcode">Zipcode</label>
            <input autocomplete="off" value="<?php echo $ziptype; ?>" id="getzipcode" name="getzipcode" maxlength="5" placeholder="Type zipcode" type="tel" required>
        </div>
        <button type="submit">Find Lowest Price</button>
    </form>
<?php } ?> 