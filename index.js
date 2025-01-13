var apiKey = "dff5bd1f0f7f8c6b080216aa3cc42f21";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var searchBox = document.querySelector(".search input");
var searchBtn = document.querySelector(".search button");
var weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    var response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        document.querySelector(".error").style.display = "none"; // Reset error state
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273.15) + " °C"; // Convert Kelvin to Celsius
        document.querySelector('.humid').innerHTML = data.main.humidity + " %";
        document.querySelector('.wind').innerHTML = data.wind.speed + " Km/h";

        // Update weather icon based on condition
        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = "clouds.png";
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = "rain.png";
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = "drizzle.png";
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = "mist.png";
        }

        document.querySelector(".weather").style.display = 'block';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
