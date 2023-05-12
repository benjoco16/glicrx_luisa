jQuery(document).ready(function($) {
    setTimeout(function(){
        // get the value of the DrugType select element
        var callernname = $('#drug_result_input').val(); //WALANG BINABATO
        // call the getDrugComponents function with the dttype value
        getDrugComponents(callernname);

        //ndc, quantity, zip parameter and pass to ajaxfunc.js
        getPharmaxy('68180072103', '30', '18520');

    },100);
    
});