/**
 * 
 */
function createJSONTable() {
	var table=createJSONTableHeaders();
	writeJSONTableRows(table);
}

function createJSONTableHeaders() {
	var tbl = document.createElement('table');
	var tableHeaders=jsonContent.Header;
    tbl.setAttribute("border", "1");
    tbl.setAttribute("style", "width:100%");
    tbl.appendChild(document.createElement("tr"));
    var txt="";
	for(i=0;i<tableHeaders.length;i++) { // loops through all the header tags of the XML
			var header=document.createElement("th");
			txt=document.createTextNode(tableHeaders[i].Data);
			console.log(txt);
			header.appendChild(txt);
			tbl.appendChild(header);
	}
	return tbl;
}


function writeJSONTableRows(tbl,arrayOfRows) {
	arrayOfRows=jsonContent.Row;
	for(i=0;i<arrayOfRows.length;i++) {
		var tr=document.createElement("tr");
		var td1=document.createElement("td");
		td1.appendChild(document.createTextNode(arrayOfRows[i].Network));
		tr.appendChild(td1);
		var td2=document.createElement("td");
		td2.appendChild(document.createTextNode(arrayOfRows[i].Owner));
		tr.appendChild(td2);
		var td3=document.createElement("td");
		var ul=document.createElement("ul");
		for(j=0;j<arrayOfRows[i].Feeds.length;j++) { // puts the feeds of each row into an unsorted list
			var li=document.createElement("li");
			li.appendChild(document.createTextNode(arrayOfRows[i].Feeds[j].Feed));
			ul.appendChild(li);
		}
		td3.appendChild(ul);
		tr.appendChild(td3);
		var td4=document.createElement("td");
		td4.appendChild(document.createTextNode(arrayOfRows[i].Notes));
		tr.appendChild(td4);
		var td5=document.createElement("td");
		var a=document.createElement("a");
		var href=document.createAttribute("href");
		href.value=arrayOfRows[i].HomePage;
		a.setAttributeNode(href);
		a.appendChild(document.createTextNode(arrayOfRows[i].HomePage)); // the hyperlink text is the same as its address
		td5.appendChild(a);
		tr.appendChild(td5);
		var td6=document.createElement("td");
		var img=document.createElement("img");
		var src=document.createAttribute("src");
		src.value=arrayOfRows[i].Logo;
		img.setAttributeNode(src);
		td6.appendChild(img);
		tr.appendChild(td6);
		tbl.appendChild(tr);
	}
	document.getElementById("table").appendChild(tbl); // all the formatted table is inserted into the div id="table"
	document.getElementById("table").appendChild(document.createElement("br"));

}