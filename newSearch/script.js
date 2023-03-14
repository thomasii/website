const data = [
  { key: "New Employee Guide 1 and 2 week", value: "https://oursites.myngc.com/ENT/HR/Onboarding/Public/New Hire Onboarding Checklist_FINAL.docx" },
  { key: "Onboarding slides", value: "https://ngc.edcast.com/channel/employee-onboarding" },
  { key: "Trainings", value: "https://lx.myngc.com/" },
  { key: "GitHub", value: "https://github.northgrum.com/" },
  { key: "Find a Printer", value: "http://rssvag-ap0615.northgrum.com/XeroxServicesManager/UI/FindPrinter/Default.aspx?AccountID=fab572b8-b6de-e411-9405-005056b74ee3&PopupReload=true" },
  { key: "New Employee Benefits and HR Resources", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010303&sys_kb_id=9dd1925f87fad51896d5408c09bb3525&spa=1" },
  { key: "Entering Time in CATS", value: "https://ngsipprod.servicenowservices.com/esc?id=kb_article&sys_id=876aca821bcd2d505e960d4be54bcb62&spa=1" },
  { key: "My Devices", value: "https://services.ngc.com/esc?id=my_devices" },
  { key: "Service Catalog", value: "https://services.ngc.com/esc?id=esc_sc_category" },
  { key: "Ordering New Phone Services", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010084" },
  { key: "Choosing a Company Mobile Device", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010138" },
  { key: "Printer Help", value: "https://services.ngc.com/esc?id=search&spa=1&q=print%20device" },
  { key: "Software Store", value: "http://softwarestore/esd" },
  { key: "Connecting to a Company Wireless Network", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010597" },
  { key: "Teams Help", value: "https://services.ngc.com/esc?id=search&spa=1&q=teams" },
  { key: "Employee Resource Groups", value: "https://ngc.sharepoint.us/sites/NGC/ngcorp/CorpResp/DiversityEquityInclusion/Pages/ERG.aspx" },
  { key: "Corporate Sharepoint", value: "https://ngc.sharepoint.us/sites/NGC/NGCorp/Pages/Home.aspx" },
  { key: "Sector Intranet Homepages", value: "https://ngc.edcast.com/insights/sector-intranet-homepages" },
  { key: "Pathways Community", value: "https://oursites.myngc.com/ENT/PDPOnline/SitePages/Community Home.aspx" },
  { key: "Net Benefits", value: "https://nb.fidelity.com/public/nb/northropgrumman/home" },
  { key: "Total Rewards", value: "https://totalrewards.northropgrumman.com/" },
  { key: "My Wellbeing", value: "https://totalrewards.northropgrumman.com/page/28/my-well-being"},
  { key: "ComPsych Mental Health Resources", value: "https://www.guidanceresources.com/groWeb/login/login.xhtml" },
  { key: "Online Therapy", value: "https://livehealthonline.com/" },
  { key: "NGC Manager Help Line", value: "1-800-982-8161" },
  { key: "Education Assistance", value: "https://services.ngc.com/esc?id=kb_article&sysparm_article=KB0010030&sys_kb_id=5631afc21b26c9505e960d4be54bcb3d&spa=1" },
  { key: "International Trip NGC Guide", value: "https://itrip-gsn.amer.myngc.com/" },
  { key: "Locating Your HR Business Partner (HRBP)", value: "https://services.ngc.com/esc?id=kb_article_view&sysparm_article=KB0013406&sys_kb_id=ee36a8511bfc2918affc64eae54bcb19&spa=1" },
  { key: "2023 Holiday Schedule", value: "https://services.ngc.com/esc?id=kb_article_view&sys_kb_id=1bc6f82f1b04a910f0f764ade54bcb4b" },
  { key: "My Security", value: "https://securityreporting.northgrum.com/Main.aspx" },
  { key: "IT Chat", value: "https://services.ngc.com/esc?id=get_help" },
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