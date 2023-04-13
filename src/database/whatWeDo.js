import {url} from './url';

// Make a GET request to get authors from the database
function getWhatWeDo(setvariable) {
    fetch('http://localhost:3001/whatwedo')
    .then(response => response.json())
    .then(data => {
      setvariable(data);
       console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });  
}

// get wwd with a specific id
function getWwdById(id) {
    fetch(`http://localhost:3001/whatwedo/${id}`, {
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


function updateWwd(newData, id) {
    fetch(`${url}/whatwedo/${id}`, {
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
    getWhatWeDo, getWwdById, updateWwd
}