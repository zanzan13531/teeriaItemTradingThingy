<?php
if(!isset($_GET["id"]) || !is_file("listings/".$_GET["id"].".json")) {
    header("Location: /");
    die();
}

$d = json_decode(@file_get_contents("listings/".$_GET["id"].".json"), true);

if(!$d) {
    header("Location: /");
    die();
}

if($d["ip"] == $_SERVER["REMOTE_ADDR"]) {
    unlink("listings/".$_GET["id"].".json");
}
?>
