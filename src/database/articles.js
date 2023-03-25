// Make a GET request to get authors from the database
function getArticles(setvariable) {
    fetch('http://localhost:3001/articles')
    .then(response => response.json())
    .then(data => {
      setvariable(data);
       console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });  
}

// Make a GET request to get articles by authors from the database
function getArticlesByAuthor(authorId, setvariable) {
  fetch(`http://localhost:3001/authors/${authorId}/articles`)
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
    getArticles, getArticlesByAuthor
}