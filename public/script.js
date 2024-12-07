const SUPABASE_URL = 'https://iycbbgybrnnxegoirtcp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Y2JiZ3licm5ueGVnb2lydGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTY1NDQsImV4cCI6MjA0ODkzMjU0NH0.kJdjbG8wFyqm9tLui7c30pO672bCpAF6hOZqEb_bxks';

document.getElementById('book-search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('search-query').value;
  const resultsDiv = document.getElementById('book-results');
  const searchSection = document.getElementById('search');

  resultsDiv.innerHTML = '';

  // Fetch book data from Open Library API
  const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await response.json();

  // "Results" Header
  const results_header = document.createElement('h4');
  results_header.textContent = 'Results';
  results_header.classList.add('results-heading'); 
  searchSection.appendChild(results_header);

  data.docs.slice(0, 10).forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author_name?.[0] || 'Unknown Author'}</p>
      <button class="save-button" data-title="${book.title}" data-author="${book.author_name?.[0]}">Save</button>
    `;
    resultsDiv.appendChild(bookDiv);
  });

});

// NEW FUNCTION TO INITIALIZE SWIPER SLIDER
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the slider for featured books
  initializeSlider();

  // Add event listener for the book search form
  const searchForm = document.getElementById('book-search-form');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    const query = document.getElementById('search-query').value.trim();
    if (!query) return;

    const resultsContainer = document.getElementById('book-results');
    resultsContainer.innerHTML = '<p>Loading...</p>'; // Show a loading message

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      resultsContainer.innerHTML = ''; // Clear previous results

      if (data.docs && data.docs.length > 0) {
        data.docs.forEach((book) => {
          const bookElement = document.createElement('div');
          bookElement.className = 'book';
          bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <p>First published in: ${book.first_publish_year || 'N/A'}</p>
            <button class="save-btn" data-title="${book.title}" data-author="${book.author_name ? book.author_name.join(', ') : 'Unknown'}">
              Save to Reading List
            </button>
          `;
          resultsContainer.appendChild(bookElement);
        });

        // Add event listeners to the "Save to Reading List" buttons
        document.querySelectorAll('.save-btn').forEach((button) => {
          button.addEventListener('click', async (event) => {
            const title = event.target.getAttribute('data-title');
            const author = event.target.getAttribute('data-author');

            try {
              const response = await fetch('http://localhost:3000/reading-list', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author }),
              });

              if (!response.ok) {
                throw new Error('Failed to save the book.');
              }

              alert(`"${title}" by ${author} has been saved to your reading list!`);
            } catch (error) {
              console.error('Error saving book:', error);
              alert('Failed to save the book. Please try again.');
            }
          });
        });
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
    } catch (error) {
      console.error('Error fetching book data:', error);
      resultsContainer.innerHTML = '<p>Error fetching results. Please try again later.</p>';
    }
  });
});


// Initialize the Swiper slider
async function initializeSlider() {
  const response = await fetch('https://openlibrary.org/subjects/fiction.json');
  const data = await response.json();

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return; // Ensure the swiper-wrapper exists

  data.works.slice(0, 5).forEach(book => {
    const slide = document.createElement('zdiv');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>by ${book.authors?.[0]?.name || 'Unknown'}</p>
    `;
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper
  new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    autoplay: { delay: 5000 },
  });
}









  
  
  