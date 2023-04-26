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
  fetch(`${url}/articles/byid/${id}`)
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
            console.log(`Article with ID ${id} has been deleted.`); // Add this line
            resolve(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            reject(error);
        });
    });
}


  function createArticles(publish_date, edit_date, published) {
    return fetch(`${url}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publish_date, edit_date, published }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const article = data; // assuming data is the created article object
        console.log('article:', article);
        return article;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function getArticlesWithFirstSection(setVariable) {
    return fetch(`${url}/articles/firstsection`)
      .then(response => response.json())
      .then(data => {
        setVariable(data);
        console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function getArticlesWithAuthors(setVariable) {
    return fetch(`${url}/articles/authors`)
      .then(response => response.json())
      .then(data => {
        setVariable(data);
        console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function createAuthorForArticle(selectedAuthor, selectedArticle) {
    console.log('Creating author for article:', selectedArticle);
    console.log('Selected author:', selectedAuthor);
    return fetch(`${url}/articles/createauthor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedAuthor, selectedArticle }),
    })
      .then((response) => {
        return response.json();
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
    getArticleWithInstructor,
    updateArticles,
    deleteArticles,
    createArticles,

    getArticlesWithFirstSection,
    getArticlesWithAuthors,
    createAuthorForArticle
}