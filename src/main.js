import './style.css';

// 📡 Asynchronous function to fetch data from API endpoint
async function fetchDatafromAPI() {

  try {
    // Make a fetch GET request , fetch API returns a promise, await resolves it
    const response = await fetch('/api/fetchNotion');

    // 📦 Parse JSON response body to a JS object
    const data = await response.json();

    // 📃 Extract results (array of cards) from response
    const cards = data.results;

    // Check if cards exist and are not empty
    if (!cards || cards.length === 0) {
      // 📝 If no cards found, show a message in the UI
      document.querySelector('.card-container').innerHTML = '<p>No cards found.</p>';
      return;
    }

    // 🔄 Convert each card object into HTML using map()
    const cardsHTML = cards.map((card) => {

      // 📃 Access card properties
      const properties = card.properties;

      // 🖼️ Get image URL from external link or placeholder if missing
      const imageFile = properties.Image.files[0];
      const imageUrl =
        imageFile?.external?.url ||
        'https://cms.brawlhalla.com/c/uploads/2022/05/KayaSplash.png';

      // 🏷️ Get project title or fallback text
      const projectName =
        properties['Project name'].title[0]?.plain_text || 'Untitled Project';

      // 📃 Get content description or fallback text
      const content =
        properties.Content.rich_text[0]?.plain_text || 'No content available.';

      // 🔘 Get button text or fallback
      const buttonText =
        properties.Button_Text.rich_text[0]?.plain_text || 'Learn More';

      // 📄 Return one HTML block for each card
      return `
        <article class="card">
          <img src="${imageUrl}" alt="${projectName}" class="card__image">
          <h2 class="card__heading">${projectName}</h2>
          <div class="card__content">
            <p>${content}</p>
          </div>
          <a href="#" class="card__btn">${buttonText}</a>
        </article>
      `;
    }).join(''); // 📌 Join all HTML strings into one string

    // 🧹 Clear existing content and inject new card HTML into the container
    const container = document.querySelector('.card-container');
    container.innerHTML = cardsHTML;

  } catch (error) {
    console.error('Error fetching data:', error);
    document.querySelector('.card-container').innerHTML = '<p>Error loading cards</p>';
  }
}

// 🚀 Kick off the data fetch when the script runs
fetchDatafromAPI();
