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

//Function to include everything inside Popup
function DrugInfo(data) {  
    toggleModal(); 
    //console.log(data);

     // Set the text to be sent to the popup
     var textToSend = 'Hello, World!';

} //Open Modal


closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);