
function initPage(){
    const cityEL = document.getElementById('enter-city');
    const searchEL = document.getElementById('search-button');
    const nameEL = document.getElementById('city-name');
    const currentPicEL = document.getElementById('current-pic');
    const currentTempEL = document.getElementById('temperature')
    const currentHumidityEL = document.getElementById('humidity');
    const currentWindEL = document.getElementById('humidity');
    const currentUVEL = document.getElementById('UV-index');
    const historyEL = document.getElementById('history')
    var fiveDayEL = document.getElementById('fiveday-header');
    var todayWeatherEL = document.getElementById('today-weather')
    var searchHistory = JSON.parse(localStorage.getItem('search')) ||[];
    var forecastContainer = document.getElementsByClassName('forecast-container')

    const APIKey = '48d210ed2b17bbe738f43d80471108c4'

    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);

    function getWeather(cityName){
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            todayWeatherEL.classList.remove('d-none');

            const currentDate = new Date(data.dt * 1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEL.innerHTML = data.name + '(' + month + '/' + day + '/' + year + ')';

            let weatherPic = data.weather[0].icon;
            currentPicEL.setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherPic + '@2x.png');
            currentPicEL.setAttribute('alt', data.weather[0].description)

            currentTempEL.innerHTML = 'Temperature:' +kToC(data.main.temp) + '&#176C';
            currentHumidityEL.innerHTML = "Humidity: " + data.main.humidity + "%";
            currentWindEL.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";

            //UV Index
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let UVQueryURL = 'https://api.openweathermap.org/data/2.5/uvi/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&cnt=1';
            fetch(UVQueryURL)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                let UVIndex = document.createElement('span');
                console.log(data[0].value)
                UVIndex.innerHTML = data[0].value;
                currentUVEL.innerHTML = 'UV Index: ';
                currentUVEL.append(UVIndex);
            });

            //5-day Forecast
            let cityID = data.id;
            let forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&appid=' + APIKey;

            fetch(forecastQueryURL)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data.list)
                var startDt = dayjs().add(1, "day").startOf("day").unix();
                var endDt = dayjs().add(6, "day").startOf("day").unix();
                let forecastArray = data.list
                const forecastContainer = document.querySelector('.forecast-container');

                forecastContainer.innerHTML = '';

                for (let index = 0; index < forecastArray.length; index++) {
                    if(forecastArray[index].dt >= startDt && forecastArray[index].dt < endDt){
                        if(forecastArray[index].dt_txt.slice(11, 13) == "12"){
                        const temp = forecastArray[index].main.temp
                        const humidity = forecastArray[index].main.humidity
                        console.log(temp)
                        const date = forecastArray[index].dt_txt.slice(0,10)
                        const windSpeed = forecastArray[index].wind.speed


                        var card = document.createElement('div');
                        card.classList.add('col-md-2', 'forecast', 'bg-primary', 'text-white', 'm-2', 'rounded');

                        //Date
                        var forecastDate = document.createElement('p');
                        forecastDate.innerHTML = 'Date:' + date
                        
                        //Temperature
                        var forecastTemp = document.createElement('p')
                        forecastTemp.innerHTML = 'Temperature:' + kToC(temp) + '&#176C';

                        //Humidity
                        var forecastHumidity = document.createElement('p');
                        forecastHumidity.innerHTML = 'Humidity:' + humidity;

                        //Wind Speed
                        var forecaseWindSpeed = document.createElement('p');
                        forecaseWindSpeed.innerHTML = 'Wind Spped ' + windSpeed + 'MPH'

                        card.appendChild(forecastDate);
                        card.appendChild(forecastTemp);
                        card.appendChild(forecastHumidity);
                        card.appendChild(forecaseWindSpeed);

                        forecastContainer.appendChild(card)

                        }
                        
                    }
                
                }

                fiveDayEL.classList.remove('d-none');

            // const forecast = document.querySelectorAll('.forecast');
            // for (let index = 0; index < forecast.length; index++) {
            //     forecast[i].innerHTML = "";
                
            // }
            
            })
        })

        .catch(function(error){
            console.log(error)
        })
    }

    searchEL.addEventListener('click',function(){
        const searchTerm = cityEL.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem('search', JSON.stringify(searchHistory));
        // renderSearchHistory();
    })

    function kToC(K) {
        return Math.floor((K - 273.15));
    }

    // function renderSearchHistory(){
    //     historyEL.innerHTML = "";

    // }
}

initPage()


let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=48d210ed2b17bbe738f43d80471108c4";
       fetch(queryURL)
       .then(res => res.json())
        .then(data => console.log(data))

    let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=43.7001&lon=-79.4163&appid=48d210ed2b17bbe738f43d80471108c4&cnt=1"
    fetch(UVQueryURL)
    .then(res => res.json())
     .then(data => console.log(data))

     let forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?id=6167865&appid=48d210ed2b17bbe738f43d80471108c4'
     
     fetch(forecastQueryURL)
     .then(res => res.json())
      .then(data => console.log(data))
