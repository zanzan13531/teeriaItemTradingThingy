<html>

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>repl.it</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
		<link href="itemsearch.css" rel="stylesheet" type="text/css" />

  </head>

  <body>

		<script src="script.js"></script>
		<script src="itemsearch.js"></script>

    <p><?php echo 'Hello World'; ?> </p>

		<div class="mainPage"; id="mainPage">

			<h1>Teeria Shop Online</h1>

			<p>Welcome</p>

			<button onclick="showAddListingPage()">Add Listing</button>
			<button onclick="showListingsPage()">View Listings</button>

		</div>

		<div class="listingAddition"; id="listingAddition">
			
			<h1>Teeria Shop Online</h1>

			<p>Add listings here:</p>

			<form action="/addListing.php" method="post">
  			<label for="username">In Game Userame:</label>
  			<input type="text" id="username" name="username"><br><br>

  			<label for="itemthingy">Item Name:</label>
				<script>insertItemSearch(document.currentScript); </script> <br><br>

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

		<div class="listingView" id="listingView">

			<h1>Teeria Shop Online</h1>

			<p>View listings here:</p>

			<?php
			
				$directory = "listings";

    		if (!is_dir($directory)) {
        	exit("stuff broke, directory path is invalid");
    		}

    		$files = array();
    		foreach (scandir($directory) as $file) {
        	if ($file !== "." && $file !== "..") {
            $files[] = $file;
        	}
    		}

    		//var_dump($files);

				$listings = array();
				foreach ($files as $filename) {
					$actualFileName = "listings/" . $filename;
					//var_dump(file_get_contents($actualFileName));
					//var_dump($actualFileName);
					$listings[] = json_decode(file_get_contents($actualFileName));
				}

				var_dump($listings);

				//var_dump(file_get_contents("listings/active/l_0.json"));

			 ?>

		</div>

  </body>

</html>