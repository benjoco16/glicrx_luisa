/** 
 * Response - Complete Data
 * DrugTerm - Caller name
 * ArrValue - Number value of array
 * brandType - Generic or Brand
 * doseType - Get the Sub Drug Name (Found inside the Generic or Brand Name)
 * **/
var responseApi, DrugTermApi, ArrValueApi, brandTypeApi, doseTypeApi;

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
        jQuery('#glicrx-drug-results').html('<p class="noglicdata">No results found</div>');
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

        console.log(drug_generic_name); //use drug_generic_name for dynamic
        brand_var = null;

        //Set Brand_vars as dynamic
        var brand_vars = response.data.flatMap(druglist => druglist.data.map(drname => drname[drug_generic_name]));
        var brand_var = brand_vars[0];

        //Try to use this for cleaner Codes because you have huge arrays
        //Get all default and set it in Dropdown
        const drName = response.data.flatMap(druglist => druglist.data.map(drname => drname.drugname));
        
        //Pull Type Dose Data
        const dose = response.data.flatMap(druglist => druglist.data.map(drname => drname.dose));

        if (!brand_var) {   
            //If empty
            console.log("Need to display : No details available for this drug Name.");
        } else { 

            
            /*
            //FORM Type
            brand_var.forEach(sub_brand => {
                const uniqueTypes = new Set(sub_brand.types.map(type => type.dose));
                console.log(uniqueTypes);
                uniqueTypes.forEach(type => {
                    if(!DrugFormType.find(`option[value="${type}"]`).length) {
                        DrugFormType.append(`<option value="${type}">${type}</option>`);
                    }
                });
            });
            */

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
                //console.log(sub_brand.sub_drug_name);//console.log(sub_generic.types); //console.log(sub_generic.comblist); //console.log(sub_generic.prerset);
                GenArr++;
            });
        }
        
        //Set Active Value
        DrugType.val(drName).find('option:selected').addClass("active-selective-drug");
        DrugFormType.val(dose);
        DrugDosage.val(strength);
        DrugNdc.val(ndcode);

        var $result = jQuery('<option value="' + drName + '">Drug Name:' + drName + '</option>');
        DrugResults.append($result);

        //New Form Type that will replace the static one FORM Type 
        DrugFormType.empty(); //CLEAR DATA OF FORM TYPE
        var active_drugarr = jQuery('.active-selective-drug').data('array');
        var new_FormData = brand_var[active_drugarr];
        
        
        var newFormArr = 0;
        new_FormData.types.forEach(type => {
            if (type.dose) {
              //console.log(type.dose); // Or perform any other operations
                if(!DrugFormType.find(`option[value="${type.dose}"]`).length) {
                    DrugFormType.append(`<option data-FormArr="${newFormArr}" value="${type.dose}">${type.dose}</option>`);
                }
            }
            newFormArr++;
        });

        //Default Form Style
        var ActiveFormArr = DrugFormType.find('option:selected');
        var dataFormArr = ActiveFormArr.data('formarr');
        var ActiveNewForm = new_FormData.types[dataFormArr].strength;

        console.log(ActiveNewForm);

        DrugDosage.empty();

        var FstDosageArr = 0;
        ActiveNewForm.forEach(item => {
            var strength = item.Strength;
            DrugDosage.append(`<option data-fDosageArr="${FstDosageArr}" value="${strength}">${strength}</option>`);
            FstDosageArr++;
        });


        //Default Quantity
        

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


function UpdateFormResult(response, DrugTerm, ArrValue, brandType, doseType) {
  
    console.log("Loaded from UpdateFormResult function")
    console.log(DrugTerm + ',' + ArrValue + ',' + brandType + ',' + doseType);
    console.log(response);

    responseApi = response;
    DrugTermApi = DrugTerm;
    ArrValueApi = ArrValue;
    brandTypeApi = brandType;
    doseTypeApi = doseType;

  //var DataDir = response.data[0].data[0];

  //Response Generic or Brand (New Code)
  //brandress = DataDir.brand_name_code;

  //Kelangan dynamic yung huling brand at subdrugname
  //console.log(response.data[0].data[0][brandType][ArrValue].types); //DITO GUMAGANA PAG AUTOCOMLETE
  
    const DrugArrType = response.data[0].data[0][brandType][ArrValue].types;
    
    //const DrugArrDosage = response.data[0].data[0][brandType][ArrValue].types; 

    DrugFormType.empty(); //Clear Form TYpe
    DrugDosage.empty(); //Clear Dosage TYpe'
    DrugDisplayQuantity.empty(); //Clear Quantity TYpe'

    //Append Dose Data
    var newdoseArr = 0;
    DrugArrType.forEach(function(drugType) {
        DrugFormType.append(`<option data-newdoseArr="${newdoseArr}"value="${drugType.dose}">${drugType.dose}</option>`);
        newdoseArr++
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

jQuery('#FormType').on('change', FormTypeOnchange);
var new_Str_Val;
//Popup Form Type Onchange
function FormTypeOnchange() {
    
    //UpdateFormResult(responseApi, DrugTermApi, ArrValueApi, brandTypeApi, doseTypeApi);
    
    // Get the selected option
    var selectedOption = jQuery(this).find('option:selected');
    
    // Get the value of the data-newdosearr attribute
    var newDataDoseArr = selectedOption.data('newdosearr');

    new_Str_Val = responseApi.data[0].data[0][brandTypeApi][0].types[newDataDoseArr].strength;

    DrugDosage.empty(); //Clear Quantity TYpe'

    var newdosageArr = 0;
    new_Str_Val.forEach(function(dosageType) {
        DrugDosage.append(`<option data-osageArr="${newdosageArr}" value="${dosageType.Strength}">${dosageType.Strength}</option>`);
        newdosageArr++;
    });

}

DrugDosage.on('change', DosageOnchange);
var NewQtyData; 
function DosageOnchange() { 
    // Get the selected option
    var selectedDosage = jQuery(this).find('option:selected');
    // Get the value of the data-osagearr attribute
    var DataDosageArr = selectedDosage.data('osagearr');
 
    
    NewQtyData = new_Str_Val[DataDosageArr].Quantity; //Get the data on prev 

    DrugDisplayQuantity.empty();
   //Default Parameter after selecting Drug Type
   NewQtyData.forEach(function(qtyType) {
       DrugDisplayQuantity.append(`<option data-ndcode="${qtyType.NDCCode}" value="${qtyType.Quantity}">${qtyType.DisplayQuantity}</option>`);
   });
    
}

DrugDisplayQuantity.on('change', QtyOnchange);
function QtyOnchange() {
    var selectedqty = jQuery(this).find('option:selected');
    var DataQTYndc = selectedqty.data('ndcode');

    console.log(NewQtyData);
    console.log(DataQTYndc);

}
