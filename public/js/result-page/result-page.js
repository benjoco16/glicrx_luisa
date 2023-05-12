jQuery(document).ready(function($) {
    setTimeout(function(){
        // get the value of the DrugType select element
        var callernname = $('#drug_result_input').val(); //WALANG BINABATO
        alert("Search Result Page : " + callernname);
        // call the getDrugComponents function with the dttype value
        getDrugComponents(callernname);
    },100);
    
});