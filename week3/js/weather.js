const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#caption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=8c49aef0a7a89736a581666e26898681';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Check the data in the console
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

function displayResults(weatherData) {
  const temp = weatherData.main.temp.toFixed(1);
  const description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  currentTemp.textContent = temp;
  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', description);
  captionDesc.textContent = description;
}

apiFetch();
