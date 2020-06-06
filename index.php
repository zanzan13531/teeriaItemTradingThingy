<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Teeria Shop</title>
        <link href="css/style.css" rel="stylesheet" type="text/css">
    </head>
    <body>
		<script type="text/javascript" src="js/script.js"></script>

        <div class="page" id="main" state="open">
			<h1>Teeria Shop Online</h1>
			<p>Welcome</p>
			<button onclick="showPage('add')">Add Listing</button>
			<button onclick="showPage('list')">View Listings</button>
		</div>

		<div class="page" id="add">
			<h1>Teeria Shop Online</h1>
            <button onclick="showPage('main')">Back</button>
			<p>Add listings here:</p>

			<form action="addListing.php" method="post">
  			<label for="username">In Game Userame:</label>
  			<input type="text" id="username" name="username">
            <br><br>

  			<label for="itemthingy">Item Name:</label>
			<script>insertItemSearch(document.currentScript);</script>
            <br><br>

			<label for="stack">Stack:</label>
  			<input type="number" id="stack" name="stack" min="1"><br><br>

			<!--
			<label for="prefix">Prefix:</label>
  			<input type="text" id="prefix" name="prefix"><br><br>
			-->

			<label for="price">Price:</label>
  			<input type="number" id="price" name="price" min="0"><br><br>

  			<input type="submit" value="Submit">
			</form>
		</div>

		<div class="page" id="list">
			<h1>Teeria Shop Online</h1>
            <button onclick="showPage('main')">Back</button>
			<p>View listings here:</p>
			<script>insertViewListings(document.currentScript);</script>
		</div>
  </body>
</html>
