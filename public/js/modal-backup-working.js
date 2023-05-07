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
            //Get ID of each select option
            var DrugType = $('#DrugType'),
            DrugFormType = $('#FormType'),
            DrugDosage= $('#Dosage'),
            DrugDisplayQuantity= $('#qty');

            //Clear All Form Fields
            $DrugResults.add(DrugType).add(DrugFormType).add(DrugDosage).add(DrugDisplayQuantity).empty();

            if (response.length === 0) {
                $DrugResults.append('<p>No results found</p>');
            } else {
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
                if (drug_sub_brand_name.length === 0) { 
                    console.log("Empty Sub Brand Name");
                } else { 
                    drug_sub_brand_name.forEach(sub_brand => {
                        DrugType.append(`<option value="${sub_brand.sub_drug_name}">${sub_brand.sub_drug_name} (Brand Drug)</option>`);           
                        //console.log(sub_brand.sub_drug_name); //console.log(sub_brand.comblist); //console.log(sub_brand.prerset);
                    });
                }

                //Condition for Generic Name
                if (drug_sub_generic_name.length === 0) { 
                    console.log("Empty Generic Sub Brand Name");
                } else { 
                    drug_sub_generic_name.forEach(sub_generic => {

                        DrugType.append(`<option value="${sub_generic.sub_drug_name}">${sub_generic.sub_drug_name} (Generic Drug)</option>`); 
                        
                        //console.log(sub_brand.sub_drug_name);
                        //console.log(sub_generic.types);
                        //console.log(sub_generic.comblist);
                        //console.log(sub_generic.prerset);
                    });
                }
                
                var $result = $('<option value="' + drName + '">Drug Name:' + drName + '</option>');
                $DrugResults.append($result);

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
        function handleDrugType(response) { 
            var dttype = $('#DrugType').val();
            var $FormType =  $('#FormType').val();
            alert (response.data);

            const dose = response.data.flatMap(druglist => druglist.data.map(drname => drname.dose)); 
                cobsole.log("Dose:" + dose);

                

            if (response.length === 0) {
                $FormType.append(`<option>No Data</option>`);
            } else { 
                const dose = response.data.flatMap(druglist => druglist.data.map(drname => drname.dose)); 
                cobsole.log(dose);
            }

            //getDrugComponents();
        }

        // Bind event listeners
        //$DrugID.on('click', handleSearch);

        $.each($DrugID, function() { 
            $(this).on('click', handleSearch); 
        });
        $.each(DrugType, function() { 
            $(this).on('change', handleDrugType); 
        });
        
    });
})(jQuery);


