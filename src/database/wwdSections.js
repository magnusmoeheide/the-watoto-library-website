import {url} from './url';


// Make a GET request to get sections from the database
function getWwdSections(setvariable) {
  fetch(`${url}/wwdsections`)
  .then(response => response.json())
  .then(data => {
    setvariable(data);
     console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });  
}

function getWwdSectionsById(id, setvariable) {
  fetch(`${url}/wwdsections/${id}`)
  .then(response => response.json())
  .then(data => {
    setvariable(data);
     console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });  
}

function updateWwdSectionsById(id, section_header, section_text, section_number) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section_header, section_text, section_number})
  };
  fetch(`${url}/wwdsections/${id}`, requestOptions)
    .then(response => response.text())
    .then(data => {

      console.log(`Server response for section ID ${id}:`, data);
    })
    .catch(error => console.error('Error:', error));
}



export {
    getWwdSections, getWwdSectionsById, updateWwdSectionsById

}