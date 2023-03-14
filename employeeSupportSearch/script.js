const data = [
  { key: "New Employee Benefits and HR Resources", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010303&sys_kb_id=9dd1925f87fad51896d5408c09bb3525&spa=1" },
  { key: "Entering Time in CATS", value: "https://ngsipprod.servicenowservices.com/esc?id=kb_article&sys_id=876aca821bcd2d505e960d4be54bcb62&spa=1" },
  { key: "My Devices", value: "https://services.ngc.com/esc?id=my_devices" },
  { key: "Choosing a Company Mobile Device", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010138" },
  { key: "Teams Help", value: "https://services.ngc.com/esc?id=search&spa=1&q=teams" },
  { key: "Employee Resource Groups", value: "https://ngc.sharepoint.us/sites/NGC/ngcorp/CorpResp/DiversityEquityInclusion/Pages/ERG.aspx" },
  { key: "2023 Holiday Schedule", value: "https://services.ngc.com/esc?id=kb_article_view&sys_kb_id=1bc6f82f1b04a910f0f764ade54bcb4b" },
  { key: "Building Map", value: "\\rseoh9-s6\sys3\Building_Maps" }
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