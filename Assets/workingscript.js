var cityDisplay = document.querySelector('#city-display')
var searchFormEl = document.querySelector('#search-form')
var forecastDisplay = document.querySelector('#forecast-container')
var resultContentEl = document.querySelector('#result-content')
var searchInput = document.querySelector('#search-input');


var city = ""

function displayWeather(event){
    event.preventDefault();
    if(searchInput.value.trim()!==""){
        city = searchInput.value.trim();
        currentWeather(city);
    }
}

function printResults(forecastData) {
    // Clear previous forecast data
    forecastDisplay.innerHTML = '';

    // Loop through each day's forecast
    forecastData.list.forEach(function(day) {
        // Extract relevant data for display
        var date = new Date(day.dt * 1000); // Convert timestamp to date object
        var temperature = day.main.temp;
        var description = day.weather[0].description;

        // Create elements to display the forecast data
        var forecastContainer = document.createElement('div');
        forecastContainer.classList.add('forecast-day');

        var dateElement = document.createElement('h3');
        dateElement.textContent = date.toLocaleDateString(); // Display date in a localized format

        var temperatureElement = document.createElement('p');
        temperatureElement.textContent = 'Temperature: ' + temperature + ' K';

        var descriptionElement = document.createElement('p');
        descriptionElement.textContent = 'Description: ' + description;

        // Append elements to the forecast container
        forecastContainer.appendChild(dateElement);
        forecastContainer.appendChild(temperatureElement);
        forecastContainer.appendChild(descriptionElement);

        // Append the forecast container to the forecast display
        forecastDisplay.appendChild(forecastContainer);
    });
}

var APIKey = '48d210ed2b17bbe738f43d80471108c4'

function currentWeather(city){
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey;
    fetch(queryURL)
   .then(function(response){
    if(!response.ok){
        throw response.json();
    }
    return response.json();
   })
   .then(function(locRes){
    console.log('API Response:',locRes)

    if (locRes && locRes.results && locRes.results.length) {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
        }
    } else {
        console.log('No results found');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
    }
  })
  .catch(function (error) {
    console.error('API Error:',error);
  });
}
// // function getParams(){
// //     var searchParamsArr = document.location.search.split('&');
// //     var query = searchParamsArr[0].split('=').pop();

// //     searchAPI(query)
// // }

// function printResults(resultObj){
//     console.log(resultObj);

// }

// function searchAPI(){
//     var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&appid=' + APIKey;
//     // locQueryUrl = locQueryUrl + '&q=' + query;

//     fetch(locQueryUrl)
//     .then(function(response){
//         if(!response.ok){
//             throw response.json();
//         }
//         return response.json();
//     })
//     .then(function (locRes){
//         cityDisplay.textContent = locRes.search.query;
//         console.log(locRes);

//         if(!locRes.results.length){
//             console.log('No results found!');
//             resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
//         }else{
//             resultContentEl.textContent = '';
//             for (var i=0; i <locRes.results.length; i++){
//                 printResults(locRes.results[i]);
//             }
//         }
//     })
//     .catch(function(error){
//         console.error(error);
//     });

// }

// function handleSearchSubmit(event){
//     event.prevenDefault();

//     var searchInputVal = document.querySelector('#search-input').value;

//     if(!searchInputVal){
//         console.log('You need a search input value');
//         return;
//     }

//     searchAPI(searchInputVal);
// }

searchFormEl.addEventListener('submit',displayWeather);

// // getParams()


// // var APIKey = '48d210ed2b17bbe738f43d80471108c4'

// // fetch('https:api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=' + APIKey)
// // .then(res => res.json())
// // .then(data => console.log(data))