import {url} from './url';

// Make a GET request to get articles from the database
function getArticles(setvariable) {
    fetch(`${url}/articles`)
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
  return fetch(`${url}/articles/newest`)
  .then(response => response.json())
  .then(data => {
    setvariable(data);
    console.log(data);
    return data;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


// Make a GET request to get articles by id from the database
function getArticlesById(id, setvariable) {
  fetch(`${url}/articles/${id}`)
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
function getArticleSectionsByArticle(id, setvariable) {
  fetch(`${url}/articles/${id}`)
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
function getArticlesByAuthor(id, setvariable) {
  fetch(`${url}/authors/${id}/articles`)
    .then(response => response.json())
    .then(data => {
      setvariable(data);
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


const getArticleWithInstructor = (id, setvariable) => {
  fetch(`${url}/articles/${id}/instructor`)
    .then(response => response.json())
    .then(data => {
      setvariable(data);
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function updateArticles(newData, id) {
  fetch(`${url}/articles/${id}`, {
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

  // Make a DELETE request to remove an article from the database
  function deleteArticles(id) {
    // returns a promise for asnychronous operations
    return new Promise((resolve, reject) => {
        fetch(`${url}/articles/${id}`, {
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
    getArticles, 
    getNewestArticle,
    getArticlesById,
    getArticleSectionsByArticle,
    getArticlesByAuthor,
    getArticleWithInstructor,
    updateArticles,
    deleteArticles
}