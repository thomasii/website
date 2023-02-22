let selectBoxIntern = document.getElementById("DropdownIntern");

// Parse the XML data
let parserIntern = new DOMParser();
let xmlStringIntern = `<?xml version="1.0" encoding="UTF-8"?>
<options>
  <option text="China" value="https://en.wikipedia.org/wiki/China"></option>
  <option text="India" value="https://en.wikipedia.org/wiki/India"></option>
  <option text="Indonesia" value="https://en.wikipedia.org/wiki/Indonesia"></option>
  <option text="Pakistan" value="https://en.wikipedia.org/wiki/Pakistan"></option>
  <option text="Bangladesh" value="https://en.wikipedia.org/wiki/Bangladesh"></option>
</options>`;
let xmlDocIntern = parserIntern.parseFromString(xmlStringIntern, "text/xml");
let countriesIntern = xmlDocIntern.getElementsByTagName("option");

// Populate the select box with the country names
for (let i = 0; i < countriesIntern.length; i++) {
  let option = document.createElement("option");
  option.text = countriesIntern[i].getAttribute("text");
  option.value = countriesIntern[i].getAttribute("value");
  selectBoxIntern.add(option);
}

function search() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('userInputIntern');
  filter = input.value.toUpperCase();
  ul = document.getElementById("DropdownIntern");
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
  let selectedOption = document.getElementById("DropdownIntern").value;
  if (selectedOption !== "") {
    window.location.href = selectedOption;
  }
}