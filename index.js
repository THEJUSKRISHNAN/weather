let search = document.querySelector(".search");
search.addEventListener("click", getWeather);

function getWeather() {
  const apiKey = "649d539756f34de625d748d76c979f47";
  const city = document.getElementById("city").value;
  console.log(city);

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data1) => {
      displayWeather(data1);
    })
    .catch((error) => {
      console.error("Error fetching current weather data: ", error);
      alert("error fetching current weather data. please try again");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data2) => {
       displayHourlyForecast(data2.list);
      
    })
    .catch((error) => {
      console.error("Error fetching hourly data: ", error);
      alert("error fetching hourly forecast data. please try again");
    });
}



function displayWeather(data1) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

    //    clear previous content
 weatherInfoDiv.innerHTML='';
 hourlyForecastDiv.innerHTML='';
 tempDivInfo.innerHTML='';

  if (data1.cod == "404") {
    weatherInfoDiv.innerHTML = `<p>${data1.message}</p>`;
  } else {
    const cityName = data1.name;
    const temperature = Math.round(data1.main.temp - 273.15);
    const description = data1.weather[0].description;
    const iconCode = data1.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML=`<p>${temperature}C</p>`;
    const weatherHTML = `
    <p>${cityName}</p>
    <p>${description}</p>`;

    tempDivInfo.innerHTML=temperatureHTML;
    weatherInfoDiv.innerHTML=weatherHTML;
    weatherIcon.src=iconUrl;
    weatherIcon.alt=description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData){
    
    const hourlyForecastDiv= document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);
    console.log(next24Hours);

    next24Hours.map(item=>{
        const dateTime = new Date(item.dt*1000);
        const hour =dateTime.getHours();
        const temperature=Math.round(item.main.temp-273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        let hourlyItemHTML= `
        <div class="hourly-item">
        <span>${hour}:00</span>
        <img src ="${iconUrl}" alt="Hourly Weather Icon ">
       <span>${temperature}C</span>
       </div>
       `;
    hourlyForecastDiv.innerHTML= hourlyForecastDiv.innerHTML+hourlyItemHTML;
    });
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display= 'block';
}
