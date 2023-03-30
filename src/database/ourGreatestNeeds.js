// Make a GET request to get authors from the database
function getOurGreatestNeeds(setvariable) {
    fetch('http://localhost:3001/ourgreatestneeds')
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
    getOurGreatestNeeds

}