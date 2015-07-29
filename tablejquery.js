/**
 * 
 */

$(document).ready(function() {
	$(":button").click(function() {
		var text=$("#jsonbox").val();
		$.getJSON(text,function(result) {
			var tr="";
			for(i=0;i<result.Header.length;i++) {
				tr+="<th>"+result.Header[i].Data+"</th>";
			}
			var table=$("<table><tr>").html(tr).attr({
				"border": "1",
				"style": "width:100%"
			});
			
			for(i=0;i<result.Row.length;i++) {
				tr1="<td>"+result.Row[i].Network+"</td>"+"<td>"+result.Row[i].Owner+"</td>";
				var listText="";
				for(j=0;j<result.Row[i].Feeds.length;j++) {
					listText+="<li>"+result.Row[i].Feeds[j].Feed+"</li>";
				}
				var feeds=$("<td><ul>").html(listText);
				var tr2="<td>"+result.Row[i].Notes+"</td>";
				var homepage=$("<a>").html(result.Row[i].HomePage).attr("href",result.Row[i].HomePage);
					homepage=$("<td>").html(homepage);
				var img=$("<img>").attr("src",result.Row[i].Logo);
					img=$("<td>").html(img);
					table.append($("<tr>").append(tr1,feeds,tr2,homepage,img));
			}
			$("#table").append(table);
		});
	});
});