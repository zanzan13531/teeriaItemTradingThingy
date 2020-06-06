<?php
    $listings = array();
    foreach(glob("listings/*.json") as $file) {
        $listings[] = json_decode(file_get_contents($file), true);
    }
    echo json_encode($listings);
?>
