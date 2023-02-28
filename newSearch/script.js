// JavaScript code for the search bar
const data = [
    { key: "German Shepherd", value: "https://en.wikipedia.org/wiki/German_Shepherd" },
    { key: "Golden Retriever", value: "https://en.wikipedia.org/wiki/Golden_Retriever" },
    { key: "Labrador Retriever", value: "https://en.wikipedia.org/wiki/Labrador_Retriever" },
    { key: "Poodle", value: "https://en.wikipedia.org/wiki/Poodle" },
    { key: "Siberian Husky", value: "https://en.wikipedia.org/wiki/Siberian_Husky" }
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
      const a = document.createElement("a");
      a.href = item.value;
      a.innerText = item.key;
      li.appendChild(a);
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
    filteredData = data.filter(item => item.key.toLowerCase().startsWith(userInput));
    // Render search results
    renderResults();
  }
  
  // Add event listeners to search input and submit button
  searchInput.addEventListener("input", handleSearch);
  submitBtn.addEventListener("click", () => {
    window.location.href = filteredData[0].value;
  });