// Select the container element where the favorite heroes will be displayed
const container = document.querySelector('#container');

// Retrieve favorite heroes from local storage, or initialize to an empty array if none are found
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

for(let x of favourites){
    // Create a new div element to hold the hero's details
    const div = document.createElement('div');

    // Create an img element for the hero's image
    const image = document.createElement('img');
    image.setAttribute('src', x.url);

    // Create a span element for the hero's name
    const span = document.createElement('span');
    span.innerText = x.name;

    // Create a button for deleting the hero from favorites
    const button = document.createElement('button');
    button.innerText = 'delete';

    // Append the image, span, and button to the div
    div.appendChild(image);
    div.appendChild(span);
    div.appendChild(button);

    // Set the id attribute of the div to the hero's id
    div.setAttribute('id', x.id);

    container.appendChild(div);

    // Add an event listener to the button for the delete functionality
    button.addEventListener('click', function (){
        // Retrieve the updated list of favorite heroes from local storage
        let favourites = JSON.parse(localStorage.getItem('favourites'));

        // Remove the hero's div from the container
        container.removeChild(this.parentElement);

        // Get the id of the hero to be deleted
        let currID = this.parentElement.getAttribute('id');

        // Loop through the favorite heroes array
        for(let i = 0; i < favourites.length; i++){
            if(favourites[i].id == currID){
                favourites.splice(i, 1);
                i--;
            }
        }

        // Update the favorite heroes in local storage with the modified array
        localStorage.setItem('favourites', JSON.stringify(favourites));
    });
}
