// Information to reach API
const apiKey = '<api key>';
const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
const inputField = document.querySelector('[data-js="post-url"]');
const shortenButton = document.querySelector('[data-js="btn-shorten"]');
const responseField = document.querySelector('[data-js="get-url"]');

// AJAX functions
// USING XHR (XML Http Request)
// const shortenUrl = () => {
//   const urlToShorten = inputField.value;
//   const data = JSON.stringify({destination:urlToShorten});
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = 'json';
//   xhr.onreadystatechange = () => {
//     if(xhr.readyState === XMLHttpRequest.DONE) {
//       renderResponse(xhr.response);
//     }
//   };
//   xhr.open('POST', url);
//   xhr.setRequestHeader('Content-type', 'application/json');
//   xhr.setRequestHeader('apikey', apiKey);
//   xhr.send(data);
// }

// USING FETCH()
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten})
  
	fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'apikey': apiKey
    },
    body: data
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message)
  }).then((jsonResponse) => {
    renderResponse(jsonResponse);
  });
}


// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);
