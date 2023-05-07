jQuery.noConflict();
(function($) {
    // Your code that uses $ goes here
    function displayResults(response) {
        //Get ID of each select option
        var DrugType = $('#DrugType'),
        DrugFormType = $('#FormType'),
        DrugDosage= $('#Dosage'),
        $DrugDisplayQuantity= $('#qty');

        //Clear All Form Fields
        $DrugResults.add(DrugType).add(DrugFormType).add(DrugDosage).add($DrugDisplayQuantity).empty();

        
    }
})(jQuery);