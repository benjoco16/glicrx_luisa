jQuery(document).ready(function($) {
    setTimeout(function(){
        
    },10);
    // get the value of the DrugType select element
    var callernname = $('#drug_result_input').val(); //WALANG BINABATO
    // call the getDrugComponents function with the dttype value
    getDrugComponents(callernname);
});
