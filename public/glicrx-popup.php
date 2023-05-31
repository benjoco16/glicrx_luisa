

<div class="glicrx-modal">
    <div class="glicrx-modal-content">
        <button class="glicrx-close-button">&times;</button>
        <!-- Modal content goes here -->


            <div id="glicrx-drug-results">

                <div id="search-glic-spinner">
                    <div class="lds-ripple"><div></div><div></div></div>
                </div>
            </div>

            <form action="<?php echo get_home_url(); ?>/glicrx-result/" method="POST" id="data-attriform">
                <!-- input fields to pass in the next result page -->
                <div class="form-hidden">
                    <label for="Caller Name">Caller Name</label>
                    <input type="text" id="caller_name" name="caller_name" placeholder="Caller Name">
                </div>
                <div class="form-hidden">
                    <label for="NDCODE">NDCODE</label>
                    <input type="text" id="ndcode" name="ndcode" placeholder="ndcode">
                </div>

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
                    <input autocomplete="off" id="getzipcode" name="getzipcode" maxlength="5" placeholder="Type zipcode" type="tel" required>
                </div>
                <button type="submit">Find Lowest Price</button>
            </form>
        </div>
</div>