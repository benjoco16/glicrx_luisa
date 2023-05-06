//create modal function
/*
var modal = document.querySelector(".glicrx-modal");
var closeButton = document.querySelector(".glicrx-close-button");

function toggleModal() {
    modal.classList.toggle("glicrx-show-modal");
}
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

//Function to include everything inside Popup
//Use
function DrugInfo(data) {  
    toggleModal(); 
    console.log(data);

     // Set the text to be sent to the popup
     var textToSend = 'Hello, World!';

} //Open Modal

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

*/



(function($) {
    $(document).ready(function() {
      // Define variables
        var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        var $DrugID = $('.drug-name');
        var $DrugResults = $('#glicrx-drug-results');
        var $searchSpinner = $('#search-glic-spinner');
        var base_url = baseUrl + "/wp-admin/admin-ajax.php";
        var $DrugType = $('#DrugType');

        function getDrugComponents(DrugTerm) {
            $.ajax({
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

        // Function to show spinner
        function showSpinner() {
            $searchSpinner.show();
        }

        // Function to hide spinner
        function hideSpinner() {
            $searchSpinner.hide();
        }

        // Function to display search results
        function displayResults(response) {
            $DrugResults.empty(); 
            $DrugType.empty(); //Empty Type Select Option
            if (response.length === 0) {
                $DrugResults.append('<p>No results found</p>');
            } else {
                console.log(response);
                $.each(response.data, function(keyfirst, druglist) {  
                    $.each(druglist.data, function(keysecond, drname) {  
                        //console.log(drname.ndcode);
                    });
                });

                //Try to use this for cleaner Codes because you have huge arrays
                //Get all default and set it in Dropdown
                const drName = response.data.flatMap(druglist => druglist.data.map(drname => drname.drugname));
               // const qty = response.data.flatMap(druglist => druglist.data.map(drname => drname.Quantity));
                //const strength = response.data.flatMap(druglist => druglist.data.map(drname => drname.strength));
                //const dose = response.data.flatMap(druglist => druglist.data.map(drname => drname.dose));
                //const brand_name_code = response.data.flatMap(druglist => druglist.data.map(drname => drname.brand_name_code));

                const drug_brand_arr = response.data.flatMap(druglist => druglist.data.map(drname => drname.brand));
                const drug_sub_brand_name = drug_brand_arr[0]; //Get data->brand array

                
                const drug_generic_arr = response.data.flatMap(druglist => druglist.data.map(drname => drname.generic));
                const drug_sub_generic_name = drug_generic_arr[0]; //Get data->brand array
                
                //create 3 codition for Brand, if walang laman, if maraming array or kung isa lang gamiting yung nandito sa baba
                //Condition for Brand Name
                if (drug_sub_brand_name.length === 0) { 
                    console.log("Empty Sub Brand Name");
                } else { 
                    drug_sub_brand_name.forEach(sub_brand => {
                        $DrugType.append(`<option value="${sub_brand.sub_drug_name}">${sub_brand.sub_drug_name} (Brand Drug)</option>`);
                        //console.log(sub_brand.sub_drug_name);
                        
                        //console.log(sub_brand.types);
                        //console.log(sub_brand.comblist);
                        //console.log(sub_brand.prerset);
                    });
                    
                }

                //Condition for Generic Name
                if (drug_sub_generic_name.length === 0) { 
                    console.log("Empty Generic Sub Brand Name");
                } else { 
                    drug_sub_generic_name.forEach(sub_generic => {
                        $DrugType.append(`<option value="${sub_generic.sub_drug_name}">${sub_generic.sub_drug_name} (Generic Drug)</option>`);
                        
                        //console.log(sub_brand.sub_drug_name);
                        
                        //console.log(sub_generic.types);
                        //console.log(sub_generic.comblist);
                        //console.log(sub_generic.prerset);
                    });
                }
                
                var $result = $('<option value="' + drName + '">Drug Name:' + drName + '</option>');
                $DrugResults.append($result);


                //START 

                $.each(response, function(index, drug) {
                    /*
                    $.each(drug.data, function(keyfirst, druglist) {

                        console.log(druglist);
                        
                        $DrugResults.show();

                        if (druglist.DrugName) {
                            var $result = $('<p>' + druglist.DrugName + '</p>');
                        } else {
                            var $result = $('<p>No results found</p>');
                        }

                        $DrugResults.append($result);
                    });
                    */
                });
            }
        }

        // Function to handle search
        function handleSearch(event) {
            var $target = $(event.target);
            
            //event.preventDefault();
            //var DrugTerm = $target.text();
            var DrugTerm = $target.data('info');
            
            console.log(DrugTerm);
            showSpinner();
            $DrugResults.show();

            getDrugComponents(DrugTerm);
        }

         // Function to handle search
        function handleDrugType() { 
            var dttype = $('#DrugType').val();
            alert (dttype);

            //Get ALl Dosage/Strength

            //getDrugComponents();
        }

        // Bind event listeners
        //$DrugID.on('click', handleSearch);

        $.each($DrugID, function() { 
            $(this).on('click', handleSearch); 
        });
        $.each($DrugType, function() { 
            $(this).on('change', handleDrugType); 
        });
        
    });
})(jQuery);


