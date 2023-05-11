<div id="glicrx-drug-results">

    <div id="search-glic-spinner">
        <div class="lds-ripple"><div></div><div></div></div>
    </div>
</div>

    <form action="<?php echo get_home_url(); ?>/petgenius-result/" method="POST" id="data-attriform">
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

    <!-- Quantity -->
    <div class="glicrx-zipcode-hldr">
        <label for="Quantity">Zipcode</label>
        <input autocomplete="off" id="getzipcode" maxlength="5" placeholder="Type zipcode" type="tel" required>
    </div>    
    
    <button type="submit">Find Lowest Price</button>

</form>   
