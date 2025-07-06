import './style.css';

async function fetchDatafromAPI(){

    try {
    const response = await fetch('/api/fetchNotion');
    const data = await response.json();

    const cards = data.results;

    // Check if cards exist
    if (!cards || cards.length === 0) {
      document.querySelector('.card-container').innerHTML = '<p>No cards found.</p>';
      return;
    }

   const cardsHTML = cards.map((card) => {
      const properties = card.properties;

      // 🖼️ Get image URL from external or file upload
      const imageFile = properties.Image.files[0];
      const imageUrl =
        imageFile?.external?.url ||
        'https://via.placeholder.com/350x350?text=No+Image';

      // 🏷️ Get project title
      const projectName =
        properties['Project name'].title[0]?.plain_text || 'Untitled Project';

      // 📃 Get content text
      const content =
        properties.Content.rich_text[0]?.plain_text || 'No content available.';

      // 🔘 Get button text
      const buttonText =
        properties.Button_Text.rich_text[0]?.plain_text || 'Learn More';

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
    }).join('');

    // 🧹 Clear existing content and inject new cards
    const container = document.querySelector('.card-container');
    container.innerHTML = cardsHTML;
  } catch (error) {
    console.error('Error fetching data:', error);
    document.querySelector('.card-container').innerHTML = '<p>Error loading cards</p>';
  }
}

// 🚀 Kick off fetch
fetchDatafromAPI();