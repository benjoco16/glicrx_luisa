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
        var $DrugID = $('.drug-name');
        var $DrugResults = $('#glicrx-drug-results');
        var $searchSpinner = $('#search-glic-spinner');

        var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        
        var base_url = baseUrl + "/wp-admin/admin-ajax.php";

        // Function to handle search
        function HandleFormResult(event) {
           
            var $target = $(event.target);
            
            //event.preventDefault();
            //var DrugTerm = $target.text();
            var DrugTerm = $target.data('info');
            
            console.log(DrugTerm);
            showSpinner();
            $DrugResults.show();
            
            getDrugComponents(DrugTerm);
        }
        
         // Function to handle Drug Type
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
        //$DrugID.on('click', HandleFormResult);

        $.each($DrugID, function() { 
            $(this).on('click', HandleFormResult); 
            
        });
        $.each(DrugType, function() { 
            $(this).on('change', handleDrugType); 
        });
        
    });
})(jQuery);


