// Function to display search results
//Global Variable to use in each fucntion
DrugFormType = jQuery('#FormType'),
DrugDosage= jQuery('#Dosage'),
DrugDisplayQuantity= jQuery('#qty');


//function displayResults(response, DrugTerm, doseType) {
// Function to display search results
function displayResults(response) {

    console.log(response);

    //Get ID of each select option
    var DrugType = jQuery('#DrugType'),
    
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
           // drug_sub_brand_name.forEach(sub_brand => {
                //DrugType.append(`<option value="${sub_brand.sub_drug_name}">${sub_brand.sub_drug_name} (Brand Drug)</option>`);  
            //});

            var brandArr = 0;
            drug_sub_brand_name.forEach(sub_brand => {
                DrugType.append(`<option data-array="${brandArr}" data-brand="brand" value="${sub_brand.sub_drug_name}">${sub_brand.sub_drug_name} (Brand Drug)</option>`);
                brandArr++;
            });
        }

        //Condition for Generic Name
        if (!drug_sub_generic_name) { //If empty
            console.log("Need to display : No details available for this Sub drug Name (GENERIC).");
        } else { 
            var GenArr = 0;
            drug_sub_generic_name.forEach(sub_generic => {
                DrugType.append(`<option data-array="${GenArr}" data-brand="generic" value="${sub_generic.sub_drug_name}">${sub_generic.sub_drug_name} (Generic Drug)</option>`);     
                //console.log(sub_brand.sub_drug_name);
                //console.log(sub_generic.types);
                //console.log(sub_generic.comblist);
                //console.log(sub_generic.prerset);
                GenArr++;
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
                    getDrugComponents(druglist.DrugName, []);


                    toggleModal();
                    
                    //You can use this if you like to submit the form and create popup
                    //handleSearch(new jQuery.Event('submit'));
                });
                $searchResults.append($result);
            });
        });
    }
}


/** 
 * Response - Complete Data
 * DrugTerm - Caller name
 * ArrValue - Number value of array
 * brandType - Generic or Brand
 * doseType - Get the Sub Drug Name (Found inside the Generic or Brand Name)
 * **/
function UpdateFormResult(response, DrugTerm, ArrValue, brandType, doseType) {
  
  console.log("Loaded from UpdateFormResult function")
    console.log(DrugTerm + ',' + ArrValue + ',' + brandType + ',' + doseType);
  console.log(response);

  //var DataDir = response.data[0].data[0];

  //Response Generic or Brand (New Code)
  //brandress = DataDir.brand_name_code;

  //Kelangan dynamic yung huling brand at subdrugname
  console.log(response.data[0].data[0][brandType][ArrValue].types);
  
    const DrugArrType = response.data[0].data[0][brandType][ArrValue].types;
    
    //const DrugArrDosage = response.data[0].data[0][brandType][ArrValue].types; 

    DrugFormType.empty(); //Clear Form TYpe
    DrugDosage.empty(); //Clear Dosage TYpe'
    DrugDisplayQuantity.empty(); //Clear Quantity TYpe'

    //Append Dose Data
    DrugArrType.forEach(function(drugType) {
        DrugFormType.append(`<option value="${drugType.dose}">${drugType.dose}</option>`);
    });

    //Default Parameter after selecting Drug Type
    const DefaultDrugArrDosage = response.data[0].data[0][brandType][ArrValue].types[0].strength;
    DefaultDrugArrDosage.forEach(function(dosageType) {
        DrugDosage.append(`<option value="${dosageType.Strength}">${dosageType.Strength}</option>`);
    });

    //Default Parameter after selecting Drug Type
    const DefaultDrugArrqty = response.data[0].data[0][brandType][ArrValue].types[0].strength[0].Quantity;
    DefaultDrugArrqty.forEach(function(qtyType) {
        DrugDisplayQuantity.append(`<option value="${qtyType.Quantity}">${qtyType.DisplayQuantity}</option>`);
    });


    

    //USE THIS TO DETECT THE ARRAY NUMBER this code is for test puspose
    /*

    var targetSubDrugName = doseType;
    var arrayParentNumber = null;

    jQuery.each(response.data.drug_data, function(i, item) {
    var data = item.data;
    if (brandType in data[0]) {
        var subDrugArray = data[0][brandType];
        jQuery.each(subDrugArray, function(j, subDrugItem) {
        if (subDrugItem.sub_drug_name === targetSubDrugName) {
            arrayParentNumber = j;
            return false; // Exit the loop
        }
        });
        if (arrayParentNumber !== null) {
            return false; // Exit the loop
        }
    }
    });

    if (arrayParentNumber !== null) {
        console.log("Array parent number:", arrayParentNumber);
        console.log(response.data.drug_data[0].data[0][brandType][0].sub_drug_name);
    } else {
        console.log("Target sub_drug_name not found.");
    }
    */

}
