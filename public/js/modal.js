//create modal function
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

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


(function($) {
    $(document).ready(function() {
        // Define variables
        var $DrugID = $('.drug-name');
        var $DrugResults = $('#glicrx-drug-results');
        var $searchSpinner = $('#search-glic-spinner');

        var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        
        var base_url = baseUrl + "/wp-admin/admin-ajax.php";
        var DrugTerm; // GLobal Drugterm to use in different function
        
        // Function to handle search
        function HandleFormResult(event) {
            //alert(2);
            var $target = $(event.target);
            //event.preventDefault();
            //var DrugTerm = $target.text();
            var DrugTerm = $target.data('info');
            
            //Insert the Caller name right away in the input to use in the other page
            $("input#caller_name").val(DrugTerm);

            console.log(DrugTerm);
            showSpinner();
            $DrugResults.show();

            // Show the modal
            toggleModal();
            
            getDrugComponents(DrugTerm); //use this to call the ajaxfunc.js getdrug
        }
        
        
         // Function to handle Drug Type
        function handleDrugType() {
            var dttype = $("input#caller_name").val(); //Get Current complete name of drug
            var cur_val = this.value; //Get Selected Click Sub Drugname
            var selectedOption = $(this).find('option:selected');


            var genValue = selectedOption.data('brand');
            //console.log(genValue);

            alert (genValue);
            alert (cur_val + dttype);

            ResultOfFormType(dttype, genValue, cur_val);
            //getDrugComponents(dttype, cur_val);
        }
        
        // Bind event listeners
        //$DrugID.on('click', HandleFormResult);

        $.each($DrugID, function() { 
            $(this).on('click', HandleFormResult); //click to display data in form
        });

        $.each(DrugType, function() { 
            $(this).on('change', handleDrugType);
        });

        $('#DrugType').on('change', handleDrugType);

        //Disable because of unused function
        //$('form#data-attriform').on('submit', HandleResultPage);
    });
    
})(jQuery);

//ZIP VALIDATION
function validateZipCode(zip) {
    // Regular expression for US zip codes
    var pattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
  
    // Check if the zip code matches the pattern
    if (pattern.test(zip)) {
      // Valid zip code
      return true;
    } else {
      // Invalid zip code
      return false;
    }
  }
