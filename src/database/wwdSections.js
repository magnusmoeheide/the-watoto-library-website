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


// Make a POST request to add a new team member to the database
const createWwdSectionsById = (section) => {
  // Check if section.wwd_id is an integer
  if (!Number.isInteger(section.wwd_id)) {
    return Promise.reject(new Error('wwd_id must be an integer'));
  }

  return fetch(`${url}/wwdsections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(section),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error creating section');
      }
      return response.json();
    });
};

const deleteWwdSectionsById = (id) => {
  // Check if id is an integer
  if (!Number.isInteger(id)) {
  return Promise.reject(new Error('id must be an integer'));
  }
  
  return fetch(`${url}/wwdsections/${id}`, {
  method: 'DELETE',
  })
  .then((response) => {
  if (!response.ok) {
  throw new Error('Error deleting section');
  }
  return response.json();
  });
  };



export {
    getWwdSections, getWwdSectionsById, updateWwdSectionsById, createWwdSectionsById, deleteWwdSectionsById

}