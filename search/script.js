let selectBox = document.getElementById("Dropdown");

// Parse the XML data
let parser = new DOMParser();
let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<options>
  <option text="China" value="https://en.wikipedia.org/wiki/China"></option>
  <option text="India" value="https://en.wikipedia.org/wiki/India"></option>
  <option text="Indonesia" value="https://en.wikipedia.org/wiki/Indonesia"></option>
  <option text="Pakistan" value="https://en.wikipedia.org/wiki/Pakistan"></option>
  <option text="Bangladesh" value="https://en.wikipedia.org/wiki/Bangladesh"></option>
</options>`;
let xmlDoc = parser.parseFromString(xmlString, "text/xml");
let countries = xmlDoc.getElementsByTagName("option");

// Populate the select box with the country names
for (let i = 0; i < countries.length; i++) {
  let option = document.createElement("option");
  option.text = countries[i].getAttribute("text");
  option.value = countries[i].getAttribute("value");
  selectBox.add(option);
}

function search() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('userInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("Dropdown");
  li = ul.getElementsByTagName('option');

  // Loop through all option elements, hide those that don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function redirect() {
  let selectedOption = document.getElementById("Dropdown").value;
  if (selectedOption !== "") {
    window.location.href = selectedOption;
  }
}