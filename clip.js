function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function OnLoadFn() {
    document.getElementById("text").innerHTML = "";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = OnReadyStateChangeFn;
    xmlhttp.open("GET", "clip.php", true);
    xmlhttp.send();
}

function OnClickFn() {
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = OnReadyStateChangeFn;
    var text = document.getElementById("text").value;
    text = utoa(text); 
    xmlhttp.open("POST", "clip.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("text=" + text);        
}

function CopyFn() {
	  var copyText = document.getElementById("text");
	  copyText.select();
	  document.execCommand("Copy");
	}

function OnReadyStateChangeFn() {
        if (this.readyState == 4) {
          	if (this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                var text = atou(myObj.text); 
                document.getElementById("text").innerHTML = text;
                var re = /(https?\:\/\/(?:[\w]+\.)?[\w]+\.(?:\S+))/ig;
                var result = "";
                var tooltip = "";
                while((result = re.exec(text)) != null) {
                	tooltip = tooltip + '<p><a href="' + result[0] + '">' + result[0] + '</a></p>';
                	}
                if (tooltip.length > 0) {
                	$('#urltxt').html('<br>' + tooltip);
                	}
                }
          		
                else {
                	var message = this.status + ' ' + this.statusText;
                	var html = '<div>';
                	html += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
                	html += '<strong>Error</strong> ' + message;
                	html += '</div>';        
                	$('#req_error').html(html);
                	$('#req_error').show();
                }
        }
}

