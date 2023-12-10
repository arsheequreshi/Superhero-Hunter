// Select the search bar element from the DOM
const searchbar = document.querySelector('#search-bar');
var timeoutID;

// Add an event listener to the search bar for input events
searchbar.addEventListener('input', () => {
    if (timeoutID) {
        clearTimeout(timeoutID);
    }

    // Set a timeout to delay the execution of getResults() function, allowing for debounce
    timeoutID = setTimeout(() => {
        getResults();
    }, 100);
});

// Fetch data from the superhero API based on the value of the search bar
function getResults() {
    fetch('https://www.superheroapi.com/api.php/3383566708344630/search/' + searchbar.value)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const results = document.querySelector('#results');

        // Remove all existing children from the results container
        while (results.children.length !== 0) {
            results.removeChild(results.children[0]);
        }

        results.classList.remove('hidden');

        // Iterate over the search results and create elements for each hero
        for (let hero of data.results) {
            const div = document.createElement('div');
            const atag = document.createElement('a');
            const span = document.createElement('span');
            const image = document.createElement('img');
            image.setAttribute('src', hero.image.url);
            span.innerText = hero.name;

            // Append elements to create the desired structure
            div.appendChild(atag);
            atag.appendChild(span);
            atag.appendChild(image);
            atag.setAttribute('href', 'abouthero.html');

            // Append the hero div to the results container
            results.appendChild(div);

            // Add a like button (heart icon) to each hero div
            div.innerHTML = `${div.innerHTML + '<i id="addFav" class="fa fa-heart"></i>'}`;
            const likebutton = div.lastChild;
            let elements = JSON.parse(localStorage.getItem('favourites')) || [];

            // Check if the hero is already in the favorites and update the like button
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].id == hero.id) {
                    likebutton.setAttribute('id', 'fav');
                }
            }

            // Add an event listener to the like button for adding/removing favorites
            likebutton.addEventListener('click', () => {
                let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
                let isFav = false;

                // Toggle the favorite status of the hero
                for (let i = 0; i < favourites.length; i++) {
                    if (favourites[i].id == hero.id) {
                        isFav = true;
                        favourites.splice(i, 1);
                        i--;
                    }
                }

                if (isFav) {
                    likebutton.setAttribute('id', '');
                    localStorage.setItem('favourites', JSON.stringify(favourites));
                } else {
                    let newFav = {
                        id: hero.id,
                        name: hero.name,
                        url: hero.image.url
                    };

                    favourites.push(newFav);
                    localStorage.setItem('favourites', JSON.stringify(favourites));
                    likebutton.setAttribute('id', 'fav');
                }
            });

            // Add an event listener to set the hero ID in localStorage when a hero div is clicked
            div.addEventListener('click', () => {
                localStorage.setItem('heroID', hero.id);
            });
        }
    });
}

// Add an event listener to the window to hide the results when clicking outside
window.addEventListener('click', (e) => {
    const results = document.querySelector('#results');
    let flag = true;
    
    // Check if the click is outside the search bar and results container
    for (let element of e.path) {
        if (element === results || element === searchbar) {
            flag = false;
        }
    }

    // If the click is outside, hide the results container
    if (flag) {
        results.classList.add('hidden');
    }
});
