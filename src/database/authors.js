import {url} from './url';

// Make a GET request to get authors from the database
function getAuthors(setvariable) {
    fetch(`${url}/authors`)
    .then(response => response.json())
    .then(data => {
      setvariable(data);
       console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });  
}

// get a author with a specific id
function getAuthorById(id) {
    fetch(`${url}/authors/${id}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


export {
    getAuthors, getAuthorById
}