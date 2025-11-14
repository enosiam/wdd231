// scripts/weather.js
const weatherEl = document.getElementById('weather');

const API_KEY = '34fd93ea2208c9935cf6c676f6cbafa2';
const CITY = 'Timbuktu';
const UNITS = 'imperial'; // Fahrenheit

async function getWeather() {
  try {
    // --- Fetch Current Weather ---
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      CITY
    )}&units=${UNITS}&appid=${API_KEY}`;

    const currentRes = await fetch(currentURL);
    if (!currentRes.ok) throw new Error('Failed to load current weather.');
    const current = await currentRes.json();

    // --- Fetch 5-day Forecast ---
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      CITY
    )}&units=${UNITS}&appid=${API_KEY}`;

    const forecastRes = await fetch(forecastURL);
    if (!forecastRes.ok) throw new Error('Failed to load forecast.');
    const forecastData = await forecastRes.json();

    // --- Extract Next 3 Days (midday preferred) ---
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

    // Step 1: First try to get 11:00–13:00 entries (midday)
    for (const e of forecastData.list) {
      const d = new Date(e.dt * 1000);
      if (d.getHours() >= 11 && d.getHours() <= 13) addDay(e);
      if (days.length >= 3) break;
    }

    // Step 2: If not enough, take next unique dates
    if (days.length < 3) {
      for (const e of forecastData.list) {
        addDay(e);
        if (days.length >= 3) break;
      }
    }

    // --- Build HTML ---
    weatherEl.innerHTML = `
      <p><strong>Current:</strong> ${Math.round(current.main.temp)}°F — 
        ${current.weather[0].description}
      </p>

      <h3>3-Day Forecast</h3>
      <ul>
        ${days
          .map(
            d => `
          <li>
            <strong>${new Date(d.date).toLocaleDateString()}</strong>: 
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

