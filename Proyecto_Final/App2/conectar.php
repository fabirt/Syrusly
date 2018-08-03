<?php
$host = "syrusly.crhz3rw0won9.us-east-2.rds.amazonaws.com";
$user = "kevin";
$password = "kfawcettq10";
$dbName = "syrus2";
// Conectando, seleccionando la base de datos
$conn = new mysqli($host, $user, $password, $dbName); // conecta al servidor con user, contraseña


$lat = $_GET['latitud'];
$lon = $_GET['longitud'];
$date = $_GET['fecha'];
$time = $_GET['hora'];

$query = "INSERT INTO data (latitud, longitud, fecha, hora) VALUES ('11', '11', '11', '11');"; 
mysqli_query($conn, $query) or die("Consulta fallida: " . mysqli_error()); // guardo en resultado lo que saqué de query


mysqli_close($conn);

?>