/* Mobile navigation menu */
let menu = document.querySelector('nav ul')
let menuIcon = document.querySelector('nav .mobile')
menuIcon.addEventListener('click', function () {
  menu.classList.toggle('show')
});

/* Show current/forecast */
function showCurrent() {
  console.log('showCurrent')
  let current = document.querySelector('.current')
  let forecast = document.querySelector('.forecast')
  current.classList.toggle('showCurrent')
  forecast.classList.remove('showForecast')
}

function showForecast() {
  console.log('showForecast')
  let current = document.querySelector('.current')
  let forecast = document.querySelector('.forecast')
  forecast.classList.toggle('showForecast')
  current.classList.remove('showCurrent')
}


/* Weather API */
function getCurrentWeather() {
  let city = document.getElementById('city').value
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a980ea437ed4d1e0b01e2bb260e90607&units=metric`,
    {
      method: 'GET'
    })
    .then(response => {
      if (response.status === 400 || response.status === 404) {
        console.log(response.status)
        window.alert('City not found')
        throw Error('ERROR')
      }
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
    .then(data => {
      console.log(data)
      let weather = document.querySelector('.current')
      weather.innerHTML = ''
      let forecast = document.querySelector('.forecast')
      let date = new Date(data.dt * 1000)
      let dayOfWeek = date.toLocaleString('en-GB', { weekday: 'long' })
      let time = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false })
      let temperature = data.main.temp
      let feelsLike = data.main.feels_like
      let description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
      let windSpeed = data.wind.speed
      let humidity = data.main.humidity
      let pressure = data.main.pressure
      let icon = data.weather[0].icon
      weather.innerHTML += `
        <div class="weatherCurrent">
          <h3>${dayOfWeek} ${time}</h3>
          <p>Temperature: ${temperature}°C</p>
          <p>Feels like: ${feelsLike}°C</p>
          <p>Description: ${description}</p>
          <p>Wind speed: ${windSpeed} m/s</p>
          <p>Humidity: ${humidity}%</p>
          <p>Pressure: ${pressure} hPa</p>
          <img src="http://openweathermap.org/img/wn/${icon}@4x.png">
        </div>
        `
    })
}

function get5DayForecast() {
  let city = document.getElementById('city').value
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a980ea437ed4d1e0b01e2bb260e90607&units=metric`,
    {
      method: 'GET'
    })
    .then(response => {
      if (response.status === 400 || response.status === 404) {
        console.log(response.status)
        window.alert('City not found')
        throw Error('ERROR')
      }
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
    .then(data => {
      console.log(data)
      let weather = document.querySelector('.current')
      let forecast = document.querySelector('.forecast')
      forecast.innerHTML = ''
      for (let i = 0; i < data.list.length; i++) {
        let day = data.list[i]
        let date = new Date(day.dt * 1000)
        let dayOfWeek = date.toLocaleString('en-GB', { weekday: 'long' })
        let time = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true })
        let temperature = day.main.temp
        let description = day.weather[0].description
        let icon = day.weather[0].icon
        forecast.innerHTML += `
        <div class="day">
          <h3>${dayOfWeek}</h3>
          <p>${time}</p>
          <p>${temperature}°C</p>
          <p>${description}</p>
          <img src="http://openweathermap.org/img/wn/${icon}.png">
        </div>
        `
      }
    })
}

/* Quack sound is played when you click the text in the footer of the page */
function quack() {
  let quack = document.querySelector('#quack')
  quack.play()
}