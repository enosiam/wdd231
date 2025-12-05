const newsEl = document.getElementById("market-news");

async function getMarketNews() {
  try {
    const url = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&apikey=fc4b1f3b4c2f1f62b51db10c`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Market News API error");

    const data = await res.json();

    const articles = data.articles.slice(0, 6); // Show 6 cards

    newsEl.innerHTML = `
      <div class="news-grid">
        ${articles
          .map(
            (a) => `
          <article class="news-card">
            <img src="${a.image || 'images/placholder'}" 
                 alt="${a.title}" 
                 class="news-img"
                 loading="lazy">

            <div class="news-content">
              <h3 class="news-title">${a.title}</h3>
              <p class="news-description">${a.description || "No summary available."}</p>
              <p class="news-source">Source: ${a.source.name}</p>
              <a class="news-link" href="${a.url}" target="_blank" rel="noopener">Read more →</a>
            </div>
          </article>
        `
          )
          .join("")}
      </div>
    `;
  } catch (err) {
    console.error(err);
    newsEl.innerHTML = `<p>Unable to load market news at this time.</p>`;
  }
}

getMarketNews();
