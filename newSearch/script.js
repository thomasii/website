const searchContainer = document.querySelector('.search-container');
const dataFile = searchContainer.dataset.datafile;
const dataUrl = `${dataFile}`;
window.print(dataUrl)

// Initialize the data array as an empty array
let data = [];

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const submitBtn = document.getElementById("submit-btn");

let filteredData = [];

function renderResults() {
  // Clear previous search results
  searchResults.innerHTML = "";
  // Render filtered data as search results
  filteredData.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.key;
    li.addEventListener("click", () => {
      searchInput.value = item.key;
      submitBtn.disabled = false;
      searchResults.innerHTML = "";
    });
    searchResults.appendChild(li);
  });
}

function handleSearch() {
  // Filter data based on user input
  const userInput = searchInput.value.toLowerCase().trim();
  
  if (userInput === '') { // Show all options if search input is empty
    filteredData = data;
  } else {
    filteredData = data.filter(item => item.key.toLowerCase().includes(userInput));
  }
  
  // Render search results
  renderResults();
}


function handleClickOutside(event) {
  if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
    filteredData = [];
    renderResults();
  }
}


fetch(dataUrl)
  .then(response => response.json())
  .then(dataResponse => {
    // Update the data array with the response from the fetch call
    data = dataResponse;
    window.print(data)
    // Add event listeners to search input and submit button
    searchInput.addEventListener("input", handleSearch);
    submitBtn.addEventListener("click", () => {
    const userInput = searchInput.value.toLowerCase().trim();
    const result = data.find(item => item.key.toLowerCase() === userInput);
    if (result) {
      window.location.href = result.value;
    }
});

document.addEventListener("click", handleClickOutside);

  });