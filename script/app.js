const API_KEY = 'd222c62a780c1938f774098a36d2babd';
var daily = true;
var lat = 50.853391;
var lon = 2.7121299;

var changeTimeframe = function() {
    daily = !daily;
    getElements();
}

var logData = function() {
    console.log('YES');
}

var changeCoords = function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon)
}

var getLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(changeCoords);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    getElements()
}

var getElements = function() {
    console.log("Getting elements");
    const day_elements = document.getElementsByClassName('c-box-day');
    const image_elements = document.getElementsByClassName('js-image');
    const temp_elements = document.getElementsByClassName('c-box-temp');
    const p_element = document.getElementsByClassName('js-p');

    p_element[0].addEventListener('click', changeTimeframe);
    
    if (daily) {
        p_element[0].innerHTML = 'Daily';
    } else {
        p_element[0].innerHTML = 'Hourly';
    }

    if (daily) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                //Get and display day
                for (var i = 0; i < 5; i++) {
                    let date = new Date(parseInt(data.daily[i].dt) * 1000);
                    switch (date.getDay()) {
                        case 0:
                            day_elements[i].innerHTML = 'Sunday';
                            break;
                        case 1:
                            day_elements[i].innerHTML = 'Monday';
                            break;
                        case 2:
                            day_elements[i].innerHTML = 'Tuesday';
                            break;
                        case 3:
                            day_elements[i].innerHTML = 'Wednesday';
                            break;
                        case 4:
                            day_elements[i].innerHTML = 'Thursday';
                            break;
                        case 5:
                            day_elements[i].innerHTML = 'Friday';
                            break;
                        case 6:
                            day_elements[i].innerHTML = 'Saterday';
                            break;       
                    } 
                }

                //Get and display temperature
                for (var i = 0; i < temp_elements.length; i++) {
                    temp_elements[i].innerHTML = Math.round(data.daily[i].temp.day) + ' °C';
                }

                //Get and display weather
                for (var i = 0; i < 5; i++) {
                    console.log(i, data.daily[i].weather[0].description);
                    switch (data.daily[i].weather[0].description) {
                        case 'light rain':
                            image_elements[i].src = 'icons/021-rain-1.svg';
                            break;
                        case 'moderate rain':
                            image_elements[i].src = 'icons/021-rain-1.svg';
                            break;
                        case 'overcast clouds':
                            image_elements[i].src = 'icons/021-cloud.svg';
                            break;
                        case 'scattered clouds':
                            image_elements[i].src = 'icons/021-cloud.svg';
                            break;
                        case 'broken clouds':
                            image_elements[i].src = 'icons/021-cloud.svg';
                            break;
                        case 'clear sky':
                            image_elements[i].src = 'icons/021-sun.svg';
                            break;
                        case 'heavy intensity rain':
                            image_elements[i].src = 'icons/021-rain-2.svg';
                            break;
                    }
                }
            });
    } else {
        console.log('Hourly');
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //Get and display day
                for (var i = 0; i < 5; i++) {
                    let date = new Date(parseInt(data.hourly[i].dt) * 1000);
                    day_elements[i].innerHTML = date.getHours() + ' h';
                    
                }

                //Get and display temperature
                for (var i = 0; i < temp_elements.length; i++) {
                    temp_elements[i].innerHTML = Math.round(data.hourly[i].temp) + ' °C';
                }

                //Get and display weather
                for (var i = 0; i < 5; i++) {
                    console.log(data.hourly[i].weather[0].description)
                    switch (data.hourly[i].weather[0].description) {
                        case 'light rain':
                            image_elements[i].src = 'icons/021-rain-1.svg';
                            break;
                        case 'moderate rain':
                            image_elements[i].src = 'icons/021-rain-1.svg';
                            break;
                        case 'overcast clouds':
                            image_elements[i].src = 'icons/021-cloud.svg';
                            break;
                        case 'scattered clouds':
                            image_elements[i].src = 'icons/021-cloud.svg';
                            break;
                        case 'broken clouds':
                            image_elements[i].src = 'icons/021-cloud.svg';
                            break;
                        case 'clear sky':
                            image_elements[i].src = 'icons/021-sun.svg';
                            break;
                        case 'heavy intensity rain':
                            image_elements[i].src = 'icons/021-rain-2.svg';
                            break;
                    }
                }
            });
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    getLocation()
});