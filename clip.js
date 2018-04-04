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
  alert("Copied to Clipboard");
}

function OnReadyStateChangeFn() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var text = atou(myObj.text); 
            document.getElementById("text").innerHTML = text;
            }
}

