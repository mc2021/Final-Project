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
async function initializeSlider() {
  const response = await fetch('https://openlibrary.org/subjects/fiction.json');
  const data = await response.json();

  const swiperWrapper = document.querySelector('.swiper-wrapper');
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

// Call the function
initializeSlider();







  
  
  