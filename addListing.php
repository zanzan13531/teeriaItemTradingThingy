<?php
$jsonThingy = [];
$jsonThingy["listingid"] = uniqid();
$jsonThingy["username"] = $_POST["username"];
$jsonThingy["discord"] = "";
$jsonThingy["itemid"] = $_POST["itemid"]*1;
$jsonThingy["stack"] = $_POST["stack"]*1;
$jsonThingy["prefix"] = 0;
$jsonThingy["stack"] = $_POST["price"]*1;
$jsonThingy["offers"] = [];
$jsonThingy["time"] = date_timestamp_get(date_create());
$jsonThingy["ip"] = $_SERVER["REMOTE_ADDR"];

file_put_contents("listings/".$jsonThingy["listingid"].".json", json_encode($jsonThingy));
?>


<!--
	"listingid":"", (obtained from uniqid())
	"username":"",
	"discord":"",
	"itemid":0,
	"stack":0,
	"prefix":0,
	"price":0,
	"offers":[],
	"time":0 (obtained from time())
	*/

	/*
	  			<label for="username">In Game Userame:</label>
  			<input type="text" id="username" name="username"><br><br>

  			<label for="itemthingy">Item Name:</label>
				<script>insertItemSearch(document.currentScript); </script> <br><br>

				<label for="stack">Stack:</label>
  			<input type="number" id="stack" name="stack" min="1"><br><br>



				<label for="price">Price:</label>
  			<input type="number" id="price" name="price" min="0"><br><br>
				-->
