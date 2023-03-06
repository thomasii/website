const data = [
  { key: "Poodle", value: "https://en.wikipedia.org/wiki/Poodle" },
  { key: "Labrador Retriever", value: "https://en.wikipedia.org/wiki/Labrador_Retriever" },
  { key: "German Shepherd", value: "https://en.wikipedia.org/wiki/German_Shepherd" },
  { key: "Bulldog", value: "https://en.wikipedia.org/wiki/Bulldog" },
  { key: "Beagle", value: "https://en.wikipedia.org/wiki/Beagle" },
  { key: "Rottweiler", value: "https://en.wikipedia.org/wiki/Rottweiler" }
];

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