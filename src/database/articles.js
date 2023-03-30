// Make a GET request to get articles from the database
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

// Make a GET request to get articles from the database
function getNewestArticle(setvariable) {
  fetch('http://localhost:3001/articles/newest')
  .then(response => response.json())
  .then(data => {
    setvariable(data);
     console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });  
}

// Make a GET request to get articles by id from the database
function getArticlesById(articleId, setvariable) {
  fetch(`http://localhost:3001/articles/${articleId}`)
    .then(response => response.json())
    .then(data => {
      setvariable(data);
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Make a GET request to get sections in article by article from the database
function getArticleSectionsByArticle(articleId, setvariable) {
  fetch(`http://localhost:3001/articles/${articleId}`)
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
    getArticles, 
    getNewestArticle,
    getArticlesById,
    getArticleSectionsByArticle,
    getArticlesByAuthor
}