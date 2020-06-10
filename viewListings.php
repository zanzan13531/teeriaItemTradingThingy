<?php
    $listings = array();
    foreach(glob("listings/*.json") as $file) {
        $listings[] = json_decode(file_get_contents($file), true);
    }
    usort($listings, function ($a, $b) {
        return $b["time"] - $a["time"];
    });
    echo json_encode([
        "user"=>$_SERVER["REMOTE_ADDR"],
        "listings"=>$listings
    ]);
?>
