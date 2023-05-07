
    // Function to display search results
    function displayResults(response) {
        //Get ID of each select option
        var DrugType = jQuery('#DrugType'),
        DrugFormType = jQuery('#FormType'),
        DrugDosage= jQuery('#Dosage'),
        DrugDisplayQuantity= jQuery('#qty'),
        DrugResults = jQuery();

        //Clear All Form Fields
        DrugResults.add(DrugType).add(DrugFormType).add(DrugDosage).add(DrugDisplayQuantity).empty();

        if (response.length === 0) {
            DrugResults.append('<p>No results found</p>');
        } else {
            console.log("response text is here");
            console.log(response);

            //Try to use this for cleaner Codes because you have huge arrays
            //Get all default and set it in Dropdown
            const drName = response.data.flatMap(druglist => druglist.data.map(drname => drname.drugname));

            //Get Static Form Dose
            const dose = response.data.flatMap(druglist => druglist.data.map(drname => drname.dose));
            DrugFormType.append(`<option value="${dose}">${dose}</option>`);

            //Get Static Dosage Strength
            const strength = response.data.flatMap(druglist => druglist.data.map(drname => drname.strength));
            DrugDosage.append(`<option value="${strength}">${strength}</option>`);

            //Get Quantity
            const DisplayQuantity = response.data.flatMap(druglist => druglist.data.map(drname => drname.DisplayQuantity));
            DrugDisplayQuantity.append(`<option value="${DisplayQuantity}">${DisplayQuantity}</option>`);

            //Get Brand function
            const drug_brand_arr = response.data.flatMap(druglist => druglist.data.map(drname => drname.brand));
            const drug_sub_brand_name = drug_brand_arr[0]; //Get data->brand array
            
            const drug_generic_arr = response.data.flatMap(druglist => druglist.data.map(drname => drname.generic));
            const drug_sub_generic_name = drug_generic_arr[0]; //Get data->brand array
            
            //Condition for Brand Name
            if (!drug_sub_brand_name) {   //If empty
                console.log("Need to display : No details available for this drug.");
            } else { 
                drug_sub_brand_name.forEach(sub_brand => {
                    DrugType.append(`<option value="${sub_brand.sub_drug_name}">${sub_brand.sub_drug_name} (Brand Drug)</option>`);           
                    //console.log(sub_brand.sub_drug_name); //console.log(sub_brand.comblist); //console.log(sub_brand.prerset);
                });
            }

            //Condition for Generic Name
            if (!drug_sub_generic_name) { //If empty
                console.log("Need to display : No details available for this drug.");
            } else { 
                drug_sub_generic_name.forEach(sub_generic => {

                    DrugType.append(`<option value="${sub_generic.sub_drug_name}">${sub_generic.sub_drug_name} (Generic Drug)</option>`); 
                    
                    //console.log(sub_brand.sub_drug_name);
                    //console.log(sub_generic.types);
                    //console.log(sub_generic.comblist);
                    //console.log(sub_generic.prerset);
                });
            }
            
            var $result = jQuery('<option value="' + drName + '">Drug Name:' + drName + '</option>');
            DrugResults.append($result);

        }
    }
