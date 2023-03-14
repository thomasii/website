const data = [
  { key: "New Employee Guide 1 and 2 week", value: "https://oursites.myngc.com/ENT/HR/Onboarding/Public/New Hire Onboarding Checklist_FINAL.docx" },
  { key: "Onboarding slides", value: "https://ngc.edcast.com/channel/employee-onboarding" },
  { key: "Trainings", value: "https://lx.myngc.com/" }
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