// Function to display search results
function displayResults(response) {

    console.log(response);

    //Get ID of each select option
    var DrugType = jQuery('#DrugType'),
    DrugFormType = jQuery('#FormType'),
    DrugDosage= jQuery('#Dosage'),
    DrugDisplayQuantity= jQuery('#qty'),
    DrugNdc= jQuery('#ndcode'),
    DrugResults = jQuery();

    //Clear All Form Fields
    DrugResults.add(DrugType).add(DrugFormType).add(DrugDosage).add(DrugDisplayQuantity).add(DrugNdc).empty();

    console.log(response.data[0].data.length);

    if (response.length === 0 || response.data[0].data.length === 0) {
        DrugResults.append('<p>No results found</p>');
        //console.log("Replace the form with text!");
        jQuery('#glicrx-drug-results').html('<p class="noglicdata">No results found</div>');;
        jQuery('form#data-attriform').css('display', 'none');
        //data-attriform
    } else {
        jQuery('p.noglicdata').remove();
        jQuery('form#data-attriform').css('display', 'block');
        //console.log("response text is here");
        //console.log(response);

        //GET brandnamecode set it to variable and use it in different conditions
        brandress = response.data.flatMap(druglist => druglist.data.map(drname => drname.brand_name_code)); //Response Generic or Brand
        
        brandres = brandress.map(str => str.toLowerCase());
        const drug_generic_name = String(brandres[0]); 
        brand_var = null;

        if (drug_generic_name === 'generic') {
            var brand_vars = response.data.flatMap(druglist => druglist.data.map(drname => drname.generic));
            var brand_var = brand_vars[0];
        } else {
            var brand_vars = response.data.flatMap(druglist => druglist.data.map(drname => drname.brand));
            var brand_var = brand_vars[0];
        }

        //Try to use this for cleaner Codes because you have huge arrays
        //Get all default and set it in Dropdown
        const drName = response.data.flatMap(druglist => druglist.data.map(drname => drname.drugname));
        
        //Pull Type Dose Data
        const dose = response.data.flatMap(druglist => druglist.data.map(drname => drname.dose));

        if (!brand_var) {   
            //If empty
            console.log("Need to display : No details available for this drug Name.");
        } else { 
            //FORM Type
            brand_var.forEach(sub_brand => {
                const uniqueTypes = new Set(sub_brand.types.map(type => type.dose));
                uniqueTypes.forEach(type => {
                    if(!DrugFormType.find(`option[value="${type}"]`).length) {
                        DrugFormType.append(`<option value="${type}">${type}</option>`);
                    }
                });
            });
            //Dosage Strength
            brand_var.forEach(sub_dos => {
                const uniquecomblist = new Set(sub_dos.comblist.map(comblist => comblist.strengthname));
                uniquecomblist.forEach(comblist => {
                    if(!DrugDosage.find(`option[value="${comblist}"]`).length) {
                        DrugDosage.append(`<option value="${comblist}">${comblist}</option>`);
                    }
                });
            });
        }

        //Get Static Dosage Strength
        const strength = response.data.flatMap(druglist => druglist.data.map(drname => drname.strength));
        //DrugDosage.append(`<option value="${strength}">${strength}</option>`);

        //Get Quantity
        const DisplayQuantity = response.data.flatMap(druglist => druglist.data.map(drname => drname.DisplayQuantity));
        DrugDisplayQuantity.append(`<option value="${DisplayQuantity}">${DisplayQuantity}</option>`);

        //Get Brand function
        const drug_brand_arr = response.data.flatMap(druglist => druglist.data.map(drname => drname.brand));
        const drug_sub_brand_name = drug_brand_arr[0]; //Get data->brand array
        
        const drug_generic_arr = response.data.flatMap(druglist => druglist.data.map(drname => drname.generic));
        const drug_sub_generic_name = drug_generic_arr[0]; //Get data->brand array

        //Pull NDC Data
        const ndcode = response.data.flatMap(druglist => druglist.data.map(drname => drname.ndcode));
        
        //Condition for Brand Name
        if (!drug_sub_brand_name) {   //If empty
            console.log("Need to display : No details available for this Sub drug Name (BRAND).");
        } else { 
            drug_sub_brand_name.forEach(sub_brand => {
                DrugType.append(`<option value="${sub_brand.sub_drug_name}">${sub_brand.sub_drug_name} (Brand Drug)</option>`);  
            });
        }

        //Condition for Generic Name
        if (!drug_sub_generic_name) { //If empty
            console.log("Need to display : No details available for this Sub drug Name (GENERIC).");
        } else { 
            drug_sub_generic_name.forEach(sub_generic => {
                DrugType.append(`<option value="${sub_generic.sub_drug_name}">${sub_generic.sub_drug_name} (Generic Drug)</option>`);     
                //console.log(sub_brand.sub_drug_name);
                //console.log(sub_generic.types);
                //console.log(sub_generic.comblist);
                //console.log(sub_generic.prerset);
                
            });
        }
        
        //Set Active Value
        DrugType.val(drName);
        DrugFormType.val(dose);
        DrugDosage.val(strength);
        DrugNdc.val(ndcode);
        

        var $result = jQuery('<option value="' + drName + '">Drug Name:' + drName + '</option>');
        DrugResults.append($result);
    }
}

// Function to display search results
function displaySearchResults(response) {
    //AutoComplete Var
    var $searchResults = jQuery('#search-results');
    var $searchInput = jQuery('#search-input');
    var $searchResults = jQuery('#search-results');

    $searchResults.empty();
    if (response.length === 0) {
        $searchResults.append('<p>No results found</p>');
    } else {
        jQuery.each(response, function(index, drug) {
            jQuery.each(drug.data, function(keyfirst, druglist) {

                //console.log(druglist);
                $searchResults.show();

                if (druglist.DrugName) {
                    var $result = jQuery('<p>' + druglist.DrugName + '</p>');
                } else {
                    var $result = jQuery('<p>No results found</p>');
                }
                
                $result.on('click', function() {
                    console.log(druglist.DrugName);
                    $searchInput.val(druglist.DrugName);
                    $searchResults.empty();
                    $searchResults.hide();
                    toggleModal();

                    getDrugComponents(druglist.DrugName);
                    //You can use this if you like to submit the form and create popup
                    //handleSearch(new jQuery.Event('submit'));
                });
                $searchResults.append($result);
            });
        });
    }
}