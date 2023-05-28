//Active in popupform and search result page
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
var $searchSpinner = jQuery('#search-glic-spinner');
var base_url = baseUrl + "/wp-admin/admin-ajax.php";

// Function to show spinner
function showSpinner() { $searchSpinner.show(); }
// Function to hide spinner
function hideSpinner() { $searchSpinner.hide(); }

/* GUMAGANA*/
function getDrugComponents(DrugTerm) {
    showSpinner();
    jQuery.ajax({
        url: base_url,
        type: 'POST',
        data: {
            action: 'drug_components',
            DrugName: DrugTerm
        },
        dataType: 'json',
        success: function(response) {
            hideSpinner();
            displayResults(response); //display-result.js
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

//Autocomplete Function
function AutoComplete(searchTerm) {
    var $searchResults = jQuery('#search-results');
    if (searchTerm.length >= 3) {
        //console.log(searchTerm);
        showSpinner();
        $searchResults.show();
        
        jQuery.ajax({
            url: base_url,
            type: 'POST',
            data: {
                action: 'search_drugs',
                stext: searchTerm
            },
            dataType: 'json',
            success: function(response) {
                hideSpinner();
                displaySearchResults(response); 
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }
}

// Update Form Type
function ResultOfFormType(DrugTerm, arrayNum, brandType, doseType) {
    showSpinner();
    jQuery.ajax({
      url: base_url,
      type: 'POST',
      data: {
        action: 'drug_components', // call from drug-hook-components.php
        DrugName: DrugTerm, // Send DATA to POST
        ArrayNum: arrayNum, //SEND ARRAY NUMBER
        brandType: brandType, // Add Branded
        DoseType: doseType // Add the Sub Drug Name parameter
      },
      dataType: 'json',
      success: function(response) {
        hideSpinner();
        //ResultOnChange(response, DrugTerm, doseType); // Pass the doseType parameter to ResultOnChange
        UpdateFormResult(response, DrugTerm, arrayNum, brandType, doseType);
        FormTypeOnchange(response, DrugTerm, arrayNum, brandType, doseType);
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  }