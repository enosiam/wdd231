// scripts/weather.js
const weatherEl = document.getElementById('weather');
const API_KEY = '34fd93ea2208c9935cf6c676f6cbafa2'; 
const CITY = 'Timbuktu';
const UNITS = 'imperial'; // Fahrenheit

async function getWeather() {
  try {
    // Current weather
    const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&units=${UNITS}&appid=${API_KEY}`);
    if (!currentRes.ok) throw new Error('Weather (current) fetch failed');
    const current = await currentRes.json();

    // 5 day / 3 hour forecast
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY)}&units=${UNITS}&appid=${API_KEY}`);
    if (!forecastRes.ok) throw new Error('Weather (forecast) fetch failed');
    const forecastData = await forecastRes.json();

    // Extract the next three calendar days' midday entries (approx. 12:00)
    const now = Date.now();
    const days = [];
    const seenDates = new Set();

    for (const entry of forecastData.list) {
      const d = new Date(entry.dt * 1000);
      const dateKey = d.toISOString().split('T')[0];
      if (d.getHours() >= 11 && d.getHours() <= 13 && !seenDates.has(dateKey) && d.getTime() > now) {
        days.push({
          date: dateKey,
          temp: Math.round(entry.main.temp),
          desc: entry.weather[0].description,
          main: entry.weather[0].main
        });
        seenDates.add(dateKey);
        if (days.length >= 3) break;
      }
    }

    // Fallback: if less than 3 midday entries found, take next entries (unique dates)
    if (days.length < 3) {
      for (const entry of forecastData.list) {
        const d = new Date(entry.dt * 1000);
        const dateKey = d.toISOString().split('T')[0];
        if (!seenDates.has(dateKey) && d.getTime() > now) {
          days.push({ date: dateKey, temp: Math.round(entry.main.temp), desc: entry.weather[0].description, main: entry.weather[0].main });
          seenDates.add(dateKey);
        }
        if (days.length >= 3) break;
      }
    }

    // Build HTML
    const currentHTML = `
      <p><strong>Current:</strong> ${Math.round(current.main.temp)}°F — ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${days.map(d => `<li><strong>${new Date(d.date).toLocaleDateString()}</strong>: ${d.temp}°F — ${d.main} (${d.desc})</li>`).join('')}
      </ul>
    `;
    weatherEl.innerHTML = currentHTML;
  } catch (err) {
    console.error(err);
    weatherEl.innerHTML = '<p>Unable to load weather data at this time.</p>';
  }
}

getWeather();
