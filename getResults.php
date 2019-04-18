<?php
	$servername = "http://pokepedia.tk";
	$username = "ulxlx";
	$password = "dbpw";
	$dbname = "pokedex";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}   

	$sql = "SELECT * FROM Pokemon";
	$result = $conn->query($sql);
	while($r = mysqli_fetch_assoc($result)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>