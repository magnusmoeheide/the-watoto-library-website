// Make a GET request to get authors from the database
function getWwdSections(setvariable) {
    fetch('http://localhost:3001/wwdsections')
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
    getWwdSections, 

}