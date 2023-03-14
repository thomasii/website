const data = [
  { key: "Net Benefits", value: "https://nb.fidelity.com/public/nb/northropgrumman/home" },
  { key: "Total Rewards", value: "https://totalrewards.northropgrumman.com/" },
  { key: "Education Assistance", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010030&sys_kb_id=5631afc21b26c9505e960d4be54bcb3d&spa=1" },
  { key: "International Trip NGC Guide", value: "https://itrip-gsn.amer.myngc.com/" },
  { key: "Locating Your HR Business Partner (HRBP)", value: "https://services.ngc.com/esc?id=kb_article_view&sysparm_article=KB0013406&sys_kb_id=ee36a8511bfc2918affc64eae54bcb19&spa=1" },
  { key: "My Security", value: "https://securityreporting.northgrum.com/Main.aspx" }
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