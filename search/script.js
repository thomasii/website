// load XML file
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var xml = xhr.responseXML;
    var options = xml.getElementsByTagName("option");

    // add options to dropdown
    var dropdown = document.getElementById("Dropdown");
    for (var i = 0; i < options.length; i++) {
      var text = options[i].childNodes[0].nodeValue;
      var url = options[i].getAttribute("url");
      dropdown.innerHTML += "<option value='" + url + "'>" + text + "</option>";
    }
  }
};
xhr.open("GET", "options.xml", true);
xhr.send();

// redirect to selected option's URL
function redirect() {
  var url = document.getElementById("Dropdown").value;
  window.location.href = url;
}