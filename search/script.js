let selectBox = document.getElementById("Dropdown");

// Load the XML file using a relative URL
let xhr = new XMLHttpRequest();
xhr.open("GET", "options.xml", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let xmlDoc = xhr.responseXML;
    let countries = xmlDoc.getElementsByTagName("country");

    // Populate the select box with the country names
    for (let i = 0; i < countries.length; i++) {
      let option = document.createElement("option");
      option.text = countries[i].getElementsByTagName("name")[0].textContent;
      option.value = countries[i].getElementsByTagName("code")[0].textContent;
      selectBox.add(option);
    }
  }
};
xhr.send();

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
    window.location.href = "https://en.wikipedia.org/wiki/" + selectedOption;
  }
}