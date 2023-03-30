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


export {
    getTeam
}