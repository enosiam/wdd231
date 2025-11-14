// scripts/weather.js
const weatherEl = document.getElementById('weather');

const API_KEY = '34fd93ea2208c9935cf6c676f6cbafa2';
const CITY = 'Timbuktu';
const UNITS = 'imperial'; // Fahrenheit

async function getWeather() {
  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&units=${UNITS}&appid=${API_KEY}`
    );
    if (!currentRes.ok) throw new Error('Failed to load current weather.');
    const current = await currentRes.json();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY)}&units=${UNITS}&appid=${API_KEY}`
    );
    if (!forecastRes.ok) throw new Error('Failed to load forecast.');
    const forecastData = await forecastRes.json();

    const now = Date.now();
    const days = [];
    const usedDates = new Set();

    function addDay(entry) {
      const d = new Date(entry.dt * 1000);
      const key = d.toISOString().split('T')[0];
      if (!usedDates.has(key) && d.getTime() > now) {
        days.push({
          date: key,
          temp: Math.round(entry.main.temp),
          desc: entry.weather[0].description,
          main: entry.weather[0].main
        });
        usedDates.add(key);
      }
    }

    // Prefer midday forecast
    for (const e of forecastData.list) {
      const d = new Date(e.dt * 1000);
      if (d.getHours() >= 11 && d.getHours() <= 13) addDay(e);
      if (days.length >= 3) break;
    }

    // Fill in if less than 3 days
    if (days.length < 3) {
      for (const e of forecastData.list) {
        addDay(e);
        if (days.length >= 3) break;
      }
    }

    // Build accessible HTML
    weatherEl.innerHTML = `
      <p><strong>Current:</strong> ${Math.round(current.main.temp)}°F — ${current.weather[0].description}</p>
      <h3 id="forecast-heading">3-Day Forecast</h3>
      <ul aria-labelledby="forecast-heading">
        ${days
          .map(
            d => `
          <li>
            <strong>${new Date(d.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</strong>: 
            ${d.temp}°F — ${d.main} (${d.desc})
          </li>`
          )
          .join('')}
      </ul>
    `;
  } catch (err) {
    console.error(err);
    weatherEl.innerHTML = `<p>Unable to load weather data at this time.</p>`;
  }
}

getWeather();

