searchContainers = document.querySelectorAll(".search-container");

searchContainers.forEach((searchContainer) => {
  const searchInput = searchContainer.querySelector("#search-input");
  const searchResults = searchContainer.querySelector("#search-results");
  const submitBtn = searchContainer.querySelector("#submit-btn");
  let filteredData = [];
  let data = [];

  // Load data from JSON file
  fetch(searchContainer.getAttribute("data-datafile"))
    .then((response) => response.json())
    .then((json) => {
      data = json;
    });

  function renderResults() {
    // Clear previous search results
    searchResults.innerHTML = "";
    // Render filtered data as search results
    filteredData.forEach((item) => {
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

    if (userInput === "") {
      // Show all options if search input is empty
      filteredData = data;
    } else {
      filteredData = data.filter((item) =>
        item.key.toLowerCase().includes(userInput)
      );
    }

    // Render search results
    renderResults();
  }

  function handleClickOutside(event) {
    if (
      !searchInput.contains(event.target) &&
      !searchResults.contains(event.target)
    ) {
      filteredData = [];
      renderResults();
    }
  }

  // Add event listeners to search input and submit button
  searchInput.addEventListener("input", handleSearch);
  submitBtn.addEventListener("click", () => {
    const userInput = searchInput.value.toLowerCase().trim();
    const result = data.find(
      (item) => item.key.toLowerCase() === userInput
    );
    if (result) {
      window.location.href = result.value;
    }
  });

  document.addEventListener("click", handleClickOutside);

  searchInput.addEventListener("focus", handleSearch);
  
});

