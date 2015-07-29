/**
 * Function that is called inside the HTML file and itself calls three other function that read and create 
 * the table headers and its rows
 */
function createXMLTable() {
	var table=createXMLTableHeaders();
	var rows=readXMLTableRows();
	writeXMLTableRows(table,rows);
}

/**
 * Function that extracts the header info from  XML and formats them into the table headers
 * @returns the table object
 */
function createXMLTableHeaders() {
	var tbl = document.createElement('table');
	var tableHeaders=xmlDoc.getElementsByTagName("Header")[0].childNodes;
    tbl.setAttribute("border", "1");
    tbl.setAttribute("style", "width:100%");
    tbl.appendChild(document.createElement("tr"));
    var txt="";
	for(i=0;i<tableHeaders.length;i++) { // loops through all the header tags of the XML
		if(tableHeaders[i].nodeType==1) {
			var header=document.createElement("th");
			txt=document.createTextNode(tableHeaders[i].childNodes[0].nodeValue);
			header.appendChild(txt);
			tbl.appendChild(header);
		}
	}
	return tbl;
}

/**
 * Prototype function of the  object 'row' that is used to represent each row of the table
 */
function rowXML(network,owner,feeds,notes,homepage,logo) {
	this.network=network;
	this.owner=owner;
	this.feeds=feeds;
	this.notes=notes;
	this.homepage=homepage;
	this.logo=logo;
}

/**
 * Function that extracts all the row information from the XML string and stores them into an array of objects row
 * @returns {Array} Array of objects row containing all the info of the rows of the table
 */
function readXMLTableRows() {
	var rowOfTable=xmlDoc.getElementsByTagName("Row"); 
	var arrayOfRows=[];

	
	for(i=0;i<rowOfTable.length;i++) {
			var singleRow=new rowXML();
			singleRow.network=rowOfTable[i].getElementsByTagName("Network")[0].childNodes[0].nodeValue;
			singleRow.owner=rowOfTable[i].getElementsByTagName("Owner")[0].childNodes[0].nodeValue;
			singleRow.notes=rowOfTable[i].getElementsByTagName("Notes")[0].childNodes[0].nodeValue;
			singleRow.homepage=rowOfTable[i].getElementsByTagName("HomePage")[0].childNodes[0].nodeValue;
			singleRow.logo=rowOfTable[i].getElementsByTagName("Logo")[0].childNodes[0].nodeValue;
			var feedsArray=[]; // there can be from 0 to n feeds in each row
			var feedsRow=rowOfTable[i].getElementsByTagName("Feeds")[0].getElementsByTagName("Feed");
			for(j=0;j<feedsRow.length;j++) {
				feedsArray.push(feedsRow[j].childNodes[0].nodeValue);
				console.log(feedsRow[j].childNodes[0].nodeValue)
			}
			singleRow.feeds=feedsArray;
			arrayOfRows.push(singleRow);
	}	
	return arrayOfRows;
}

/**
 * Function that formats and inserts the table into a HTML document
 * @param tbl the Table object that is appended to div element with id="table" in the HTML file.
 * @param arrayOfRows Array of objects 'row' containing all the info of the rows of the table
 */
function writeXMLTableRows(tbl,arrayOfRows) {
	for(i=0;i<arrayOfRows.length;i++) {
		var tr=document.createElement("tr");
		var td1=document.createElement("td");
		td1.appendChild(document.createTextNode(arrayOfRows[i].network));
		tr.appendChild(td1);
		var td2=document.createElement("td");
		td2.appendChild(document.createTextNode(arrayOfRows[i].owner));
		tr.appendChild(td2);
		var td3=document.createElement("td");
		var ul=document.createElement("ul");
		for(j=0;j<arrayOfRows[i].feeds.length;j++) { // puts the feeds of each row into an unsorted list
			var li=document.createElement("li");
			li.appendChild(document.createTextNode(arrayOfRows[i].feeds[j]));
			ul.appendChild(li);
		}
		td3.appendChild(ul);
		tr.appendChild(td3);
		var td4=document.createElement("td");
		td4.appendChild(document.createTextNode(arrayOfRows[i].notes));
		tr.appendChild(td4);
		var td5=document.createElement("td");
		var a=document.createElement("a");
		var href=document.createAttribute("href");
		href.value=arrayOfRows[i].homepage;
		a.setAttributeNode(href);
		a.appendChild(document.createTextNode(arrayOfRows[i].homepage)); // the hyperlink text is the same as its address
		td5.appendChild(a);
		tr.appendChild(td5);
		var td6=document.createElement("td");
		var img=document.createElement("img");
		var src=document.createAttribute("src");
		src.value=arrayOfRows[i].logo;
		img.setAttributeNode(src);
		td6.appendChild(img);
		tr.appendChild(td6);
		tbl.appendChild(tr);
	}
	document.getElementById("table").appendChild(tbl); // all the formatted table is inserted into the div id="table"
	document.getElementById("table").appendChild(document.createElement("br"));
}