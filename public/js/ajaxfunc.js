//Active in popupform and search result page

        var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        var $searchSpinner = jQuery('#search-glic-spinner');
        var base_url = baseUrl + "/wp-admin/admin-ajax.php";

        // Function to show spinner
        function showSpinner() {  $searchSpinner.show();  }
        // Function to hide spinner
        function hideSpinner() {  $searchSpinner.hide();  }
        
        
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
                    displayResults(response);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }
        

        //Autocomplete Function
        function AutoComplete(searchTerm) { 
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



