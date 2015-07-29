/**
 * Function that extracts the content of an XML file.
 */
var jsonContent;
function loadJSON(filename) {
	var xmlHttp= new XMLHttpRequest();
	
	xmlHttp.open("GET", filename, false);
	xmlHttp.send();
	jsonContent=JSON.parse(xmlHttp.responseText)
}

