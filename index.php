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
            <h2>Add Listing</h2>
            <button onclick="showPage('main')">Back</button>
			<form action="addListing.php" method="post">
            <input type="hidden" name="verify" value="verify">
  			<table>
                <tr>
                    <td><label for="username">In Game Userame*:</label></td>
                    <td><input type="text" name="username" required></td>
                </tr>
                <tr>
                    <td><label for="discord">Discord:</label></td>
          			<td><input type="text" name="discord"></td>
                </tr>
      			<tr>
                    <td><label for="itemthingy">Item*:</label></td>
        			<td><script>insertItemSearch(document.currentScript);</script></td>
                </tr>
    			<tr>
                    <td><label for="stack">Stack:</label></td>
          			<td><input type="number" name="stack" min="1" value="1" required></td>
                </tr>
    			<!--
    			<tr>
                    <td><label for="prefix">Prefix:</label></td>
                    <td><input type="text" id="prefix" name="prefix" required></td>
                </tr>
    			-->
    			<tr>
                    <td><label for="price">Price*:</label></td>
          			<td><input type="number" name="price" min="0" value="0" required></td>
                </tr>
            </table>
  			<input type="submit" value="Submit">
			</form>
		</div>

		<div class="page" id="list">
			<h1>Teeria Shop Online</h1>
            <h2>Listings</h2>
            <button onclick="showPage('main')">Back</button>
			<script>insertViewListings(document.currentScript);</script>
		</div>
  </body>
</html>
