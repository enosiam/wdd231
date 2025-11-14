// scripts/home.js

// ----- WEATHER -----
const weatherContainer = document.querySelector("#weather");
const apiKey = "34fd93ea2208c9935cf6c676f6cbafa2";
const city = "Timbuktu";

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
        const data = await response.json();

        const current = data.list[0];
        const forecast = data.list.slice(1, 4);

        let weatherHTML = `
            <p><strong>Current:</strong> ${current.main.temp.toFixed(0)}°F, ${current.weather[0].description}</p>
            <h3>3-Day Forecast</h3>
            <ul>
                ${forecast.map(f => `
                    <li>${new Date(f.dt * 1000).toLocaleDateString()}: ${f.main.temp.toFixed(0)}°F, ${f.weather[0].main}</li>
                `).join("")}
            </ul>
        `;

        weatherContainer.innerHTML = weatherHTML;
    } catch (error) {
        weatherContainer.innerHTML = "<p>Unable to load weather data at this time.</p>";
        console.error(error);
    }
}

getWeather();


// ----- MEMBER SPOTLIGHTS -----
const spotlightContainer = document.querySelector("#spotlightContainer");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const spotlightMembers = members.filter(m => m.membership === "gold" || m.membership === "silver");

        const randomSelection = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        spotlightContainer.innerHTML = randomSelection.map(member => `
            <div class="spotlight-card">
                <img src="images/${member.logo}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="level">${member.membership.toUpperCase()} Member</p>
            </div>
        `).join("");
    } catch (error) {
        spotlightContainer.innerHTML = "<p>Unable to load member spotlights.</p>";
        console.error(error);
    }
}

loadSpotlights();
