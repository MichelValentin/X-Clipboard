<?php
if (isset($_SERVER["PHP_AUTH_USER"])) {
    define("FILENAME", "clip_" . $_SERVER["PHP_AUTH_USER"] . ".txt");
}
else {
    define("FILENAME", "clip.txt");
}

if (file_exists(FILENAME) == FALSE) {
    $file = fopen(FILENAME,"w");
    fclose($file);
    chmod(FILENAME,0777);
}

if(isset($_REQUEST['text'])){
    $file = fopen(FILENAME, "w") or die("Unable to open file!");
    $text = $_REQUEST['text'];
    fwrite($file,$text);
    fclose($file);
}

$file = fopen(FILENAME, "r") or die("Unable to open file!");
$obj = new stdClass();
$text = fread($file,64000);
$obj->text = $text;
fclose($file);
$json = json_encode($obj);
echo $json;
?>