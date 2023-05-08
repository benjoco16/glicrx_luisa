(function($) {
    $(document).ready(function() {
      // Define variables
        var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        
        var $searchForm = $('#search-form');
        var $searchSpinner = $('#search-glic-spinner');
        var $searchInput = $('#search-input');
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
        function displaySearchResults(response) {
            $searchResults.empty();
            if (response.length === 0) {
                $searchResults.append('<p>No results found</p>');
            } else {
                $.each(response, function(index, drug) {
                    $.each(drug.data, function(keyfirst, druglist) {

                        //console.log(druglist);
                        $searchResults.show();

                        if (druglist.DrugName) {
                            var $result = $('<p>' + druglist.DrugName + '</p>');
                        } else {
                            var $result = $('<p>No results found</p>');
                        }
                        
                        $result.on('click', function() {
                            console.log(druglist.DrugName);
                            $searchInput.val(druglist.DrugName);
                            $searchResults.empty();
                            $searchResults.hide();

                            getDrugComponents(druglist.DrugName);

							//You can use this if you like to submit the form and create popup
                            //handleSearch(new $.Event('submit'));
                        });

                        $searchResults.append($result);
                    });
                });
            }
        }


        // Function to handle search
        function handleSearch(event) {
            event.preventDefault();
            var searchTerm = $searchInput.val();

            AutoComplete(searchTerm);
        }

        // Bind event listeners
        $searchForm.on('submit', handleSearch);
        $searchInput.on('keyup', handleSearch);
    });
})(jQuery);