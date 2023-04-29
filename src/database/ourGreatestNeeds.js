import {url} from './url';

// Make a GET request to get authors from the database
function getOurGreatestNeeds(setvariable) {
    fetch(`${url}/ourgreatestneeds`)
    .then(response => response.json())
    .then(data => {
      setvariable(data);
       console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });  
}


function updateOurGreatestNeeds(newData, id) {
  fetch(`${url}/ourgreatestneeds/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
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
    getOurGreatestNeeds, updateOurGreatestNeeds

}