<?php 
include ('function.php');
$lat = $_GET['latitud'];
$lon = $_GET['longitud'];
$date = $_GET['fecha'];
$time = $_GET['hora'];

ejecutarSQLCommand("INSERT INTO data2 (Latitude, Longitude, Date, Hour) VALUES ('$lat', '$lon', '$date', '$time');");

?>