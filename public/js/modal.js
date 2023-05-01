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
        var $DrugID = $('.drug-card');
        var $DrugResults = $('#glicrx-drug-results');
        var $searchSpinner = $('#search-glic-spinner');
        var base_url = baseUrl + "/wp-admin/admin-ajax.php";

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

            if (response.length === 0) {
                $DrugResults.append('<p>No results found</p>');
            } else {
                //console.log(response);
                $.each(response.data, function(keyfirst, druglist) {  
                    $.each(druglist.data, function(keysecond, drname) {  
                        //console.log(drname.ndcode);
                    });
                });

                //Try to use this for cleaner Codes because you have huge arrays
                const ndCodes = response.data.flatMap(druglist => druglist.data.map(drname => drname.ndcode));
                console.log(ndCodes);
                

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
            //showSpinner();
            $DrugResults.show();
           
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

        // Bind event listeners
        //$DrugID.on('click', handleSearch);

        $.each($DrugID, function() {
            $(this).on('click', handleSearch);
        });
    });
})(jQuery);


