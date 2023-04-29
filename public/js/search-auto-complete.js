// Define an array of drug names
var drugNames = [
    "Adderall",
    "Aspirin",
    "Ibuprofen",
    "Tylenol",
    "Xanax",
    "Zoloft"
];

// Get the search input and results container elements
var searchInput = document.getElementById("glic-search-input");
var resultsContainer = document.querySelector(".glic-autocomplete-results");

// Add an event listener to the search input to handle key presses
searchInput.addEventListener("keyup", function(event) {
// Clear the previous search results
resultsContainer.innerHTML = "";

// Get the search term from the input value
var searchTerm = event.target.value.toLowerCase();

// Filter the drug names array based on the search term
var matchingDrugs = drugNames.filter(function(drugName) {
    return drugName.toLowerCase().indexOf(searchTerm) !== -1;
});

// Display the matching drugs in the results container
matchingDrugs.forEach(function(drugName) {
    var li = document.createElement("li");
    li.textContent = drugName;
    resultsContainer.appendChild(li);
});
});

// Add an event listener to the results container to handle clicks on the drug names
resultsContainer.addEventListener("click", function(event) {
// Get the clicked drug name and set it as the search input value
var clickedDrug = event.target.textContent;
searchInput.value = clickedDrug;

// Clear the results container
resultsContainer.innerHTML = "";
});