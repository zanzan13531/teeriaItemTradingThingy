<?php
if(!isset($_POST["verify"]) || $_POST["verify"] != "verify") {
    header("Location: /");
    die();
}

$jsonThingy = [];
$jsonThingy["listingid"] = uniqid();
$jsonThingy["username"] = $_POST["username"];
$jsonThingy["discord"] = $_POST["discord"];
$jsonThingy["itemid"] = $_POST["itemid"]*1;
$jsonThingy["stack"] = $_POST["stack"]*1;
$jsonThingy["prefix"] = 0;
$jsonThingy["price"] = $_POST["price"]*1;
$jsonThingy["offers"] = [];
$jsonThingy["time"] = date_timestamp_get(date_create());
$jsonThingy["ip"] = $_SERVER["REMOTE_ADDR"];

file_put_contents("listings/".$jsonThingy["listingid"].".json", json_encode($jsonThingy));

header("Location: /");
?>
