(function($) {
    $(document).ready(function() {
      // Define variables
        var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        
        var $searchForm = $('#search-form');
        var $searchInput = $('#search-input');
        var $searchResults = $('#search-results');
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
            $searchResults.empty();
            if (response.length === 0) {
                $searchResults.append('<p>No results found</p>');
            } else {
                $.each(response, function(index, drug) {
                    $.each(drug.data, function(keyfirst, druglist) {
                        var $result = $('<p>' + druglist.DrugName + '</p>');
                        $result.on('click', function() {
                            $searchInput.val(druglist.DrugName);
                            $searchResults.empty();

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
            if (searchTerm.length >= 3) {
                showSpinner();
                $.ajax({
                    url: base_url,
                    type: 'POST',
                    data: {
                        action: 'search_drugs',
                        stext: searchTerm
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
        }

        // Bind event listeners
        $searchForm.on('submit', handleSearch);
        $searchInput.on('keyup', handleSearch);
    });
})(jQuery);
