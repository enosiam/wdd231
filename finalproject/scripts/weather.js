const weatherEl = document.getElementById('weather');

 OpenWeather current weather example (uncomment and set API_KEY)
 const API_KEY = 'YOUR_OPENWEATHER_API_KEY_HERE';
 const CITY = 'London';
 async function getWeatherFromOpenWeather() {
   try {
     const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&units=metric&appid=${API_KEY}`);
     if (!res.ok) throw new Error('OpenWeather failed');
     const json = await res.json();
     weatherEl.innerHTML = `<p><strong>Current:</strong> ${Math.round(json.main.temp)}°C — ${json.weather[0].description}</p>`;
  } catch (err) {
     console.error(err);
     weatherEl.innerHTML = '<p>Weather unavailable.</p>';
   }
 }

