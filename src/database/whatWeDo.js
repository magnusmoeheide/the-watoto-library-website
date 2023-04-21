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

  function createWwd(name, instructor, max_people, opening_hours) {
    return fetch(`${url}/whatwedo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, instructor, max_people, opening_hours }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const wwd = data; // assuming data is the created wwd object
        console.log('wwd:', wwd); // add this line to log the created wwd
        return wwd;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Make a DELETE request to remove a member from the database
function deleteWwd(id) {
  // returns a promise for asnychronous operations
  return new Promise((resolve, reject) => {
      fetch(`${url}/whatwedo/${id}`, {
          method: 'DELETE'
      })
      .then(response => response.text())
      .then(data => {
          console.log('Success:', data);
          resolve(data);
      })
      .catch((error) => {
          console.error('Error:', error);
          reject(error);
      });
  });
}
  

export {
    getWhatWeDo, getWwdById, updateWwd, createWwd, deleteWwd
}