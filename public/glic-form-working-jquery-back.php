<!-- Search Function -->
<form id="search-form">
  <input type="text" id="search-input" name="search-input">
  <button type="submit">Search</button>
</form>
<div id="search-glic-spinner">
    <div class="lds-ripple"><div></div><div></div></div>
</div>
<div id="search-results"></div>

<?php $base_url = get_site_url() . '/wp-admin/admin-ajax.php'; //Get Default Ajax to use in the file ?>

<script>
     jQuery(document).ready(function($) {
        //$('#search-form').submit(function(event) {
            $('#search-input').keyup(function(event) {
            //event.preventDefault();
                var searchTerm = $('#search-input').val();
                if (searchTerm.length >= 3) {
                    $('#search-glic-spinner').show(); //add spinner onload
                    $.ajax({
                        url: '<?php echo $base_url; ?>',
                        type: 'POST',
                        data: {
                            action: 'search_drugs',
                            stext: searchTerm
                        },
                        dataType: 'json',
                        success: function(response) {
                                // Hide the spinner
                                $('#search-glic-spinner').hide();
                                $('#search-results').empty();
                                if (response.length === 0) {
                                    $('#search-results').append('<p>No results found</p>');
                                } else {
                            
                                $.each(response, function(index, drug) {
                                    //console.log(drug.data);
                                    $.each(drug.data, function(keyfirst, druglist) {
                                        $('#search-results').append('<p>' + druglist.DrugName + '</p>');
                                    });
                                });
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error(error);
                        }
                    });
                }
            });    
        //});
    });

   
</script>