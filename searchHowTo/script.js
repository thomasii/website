let selectBoxHowTo = document.getElementById("DropdownHowTo");

// Parse the XML data
let parserHowTo = new DOMParser();
let xmlStringHowTo = `<?xml version="1.0" encoding="UTF-8"?>
<options>
  <option text="Ordering Parts" value="https://en.wikipedia.org/wiki/China"></option>
  <option text="Timekeeping Guide" value="https://en.wikipedia.org/wiki/India"></option>
  <option text="T and L guide" value="https://en.wikipedia.org/wiki/Indonesia"></option>
  <option text="Pakistan" value="https://en.wikipedia.org/wiki/Pakistan"></option>
  <option text="Bangladesh" value="https://en.wikipedia.org/wiki/Bangladesh"></option>
</options>`;
let xmlDocHowTo = parserHowTo.parseFromString(xmlStringHowTo, "text/xml");
let countriesHowTo = xmlDocHowTo.getElementsByTagName("option");

// Populate the select box with the country names
for (let i = 0; i < countriesHowTo.length; i++) {
  let option = document.createElement("option");
  option.text = countriesHowTo[i].getAttribute("text");
  option.value = countriesHowTo[i].getAttribute("value");
  selectBoxHowTo.add(option);
}

function search() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('userInputHowTo');
  filter = input.value.toUpperCase();
  ul = document.getElementById("DropdownHowTo");
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
  let selectedOption = document.getElementById("DropdownHowTo").value;
  if (selectedOption !== "") {
    window.location.href = selectedOption;
  }
}