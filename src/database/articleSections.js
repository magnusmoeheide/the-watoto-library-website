import {url} from './url';

// Make a GET request to get sections from the database
function getArticleSections(setvariable) {
  fetch(`${url}/articlesections`)
  .then(response => response.json())
  .then(data => {
    setvariable(data);
     console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });  
}

function getArticleSectionsById(id, setvariable) {
  fetch(`${url}/articlesections/${id}`)
  .then(response => response.json())
  .then(data => {
    setvariable(data);
     console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });  
}


export {
    getArticleSections, getArticleSectionsById

}