/**
 * 
 */

	var xmlDoc;
	function loadXML(filename) {
	if(window.XMLHttpRequest) {
		xmlHttp= new XMLHttpRequest();
	} else {
		xmlHttp= new ActiveXObject("Microsoft.XMLHTTP")
	}
	xmlHttp.open("GET", filename, false);
	xmlHttp.send();
	xmlDoc=xmlHttp.responseXML;
}

