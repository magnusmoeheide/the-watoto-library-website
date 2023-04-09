import {url} from './url';

// Make a GET request to get authors from the database
function getTeam(setvariable) {
    fetch('http://localhost:3001/team')
    .then(response => response.json())
    .then(data => {
      setvariable(data);
       console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });  
}

function updateTeam(newData, id) {
  fetch(`${url}/team/${id}`, {
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

// get a team member with a specific id
function getTeamById(id) {
  fetch(`${url}/team/${id}`, {
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

// Make a DELETE request to remove a member from the database
function deleteTeam(id) {
  // returns a promise for asnychronous operations
  return new Promise((resolve, reject) => {
      fetch(`${url}/team/${id}`, {
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


// Make a POST request to add a new team member to the database
function createTeam(name, role, board) {
  return fetch(`${url}/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, role, board }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



export {
    getTeam, updateTeam, getTeamById, deleteTeam, createTeam
}