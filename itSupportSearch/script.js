const data = [
  { key: "Find a Printer", value: "http://rssvag-ap0615.northgrum.com/XeroxServicesManager/UI/FindPrinter/Default.aspx?AccountID=fab572b8-b6de-e411-9405-005056b74ee3&PopupReload=true" },
  { key: "Ordering New Phone Services", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010084" }, 
  { key: "Printer Help", value: "https://services.ngc.com/esc?id=search&spa=1&q=print%20device" },
  { key: "Connecting to a Company Wireless Network", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010597" },
  { key: "IT Chat", value: "https://services.ngc.com/esc?id=get_help" }
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