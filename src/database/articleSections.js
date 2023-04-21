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
    console.log("data",data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });  
}

function updateArticleSectionsById(id, section_header, section_text, section_number) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({section_header, section_text, section_number})
  };
  fetch(`${url}/articlesections/${id}`, requestOptions)
    .then(response => response.text())
    .then(data => {

      console.log(`Server response for section ID ${id}:`, data);
    })
    .catch(error => console.error('Error:', error));
}



export {
    getArticleSections, getArticleSectionsById, updateArticleSectionsById

}