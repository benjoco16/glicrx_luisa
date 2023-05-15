jQuery(document).ready(function($) {
    setTimeout(function(){
        //Set Drug Name
        var DrName = $('#drug_result_name').val();
        //Set to active input
        $('#search-input').val(DrName);

        // get the value of the DrugType select element
        var callernname = $('#drug_result_input').val(); 
        
        //drug_result_name
        // call the getDrugComponents function with the dttype value
        getDrugComponents(callernname);
    },10);
    
});
