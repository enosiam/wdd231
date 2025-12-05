const weatherEl = document.getElementById('weather');

// Timbuktu coordinates (approx)
const LAT = 16.7765;
const LON = -3.0073;

async function getWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather API error');
    const data = await res.json();

    const days = data.daily.time.slice(0, 3).map((date, i) => ({
      date,
      max: Math.round(data.daily.temperature_2m_max[i]),
      min: Math.round(data.daily.temperature_2m_min[i]),
      code: data.daily.weathercode[i]
    }));

    weatherEl.innerHTML = `
      <p><strong>Current (forecast):</strong> High ${days[0].max}° — Low ${days[0].min}°</p>
      <h3 id="forecast-heading">3-Day Forecast</h3>
      <ul aria-labelledby="forecast-heading">
        ${days.map(d => `<li><strong>${new Date(d.date).toLocaleDateString(undefined, { weekday:'short', month:'short', day:'numeric' })}</strong>: ${d.max}° / ${d.min}°</li>`).join('')}
      </ul>
    `;
  } catch (err) {
    console.error(err);
    if (weatherEl) weatherEl.innerHTML = '<p>Unable to load weather data at this time.</p>';
  }
}
getWeather();
