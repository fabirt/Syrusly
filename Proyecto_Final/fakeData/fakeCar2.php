<?php
$host = "localhost";
$user = "root";
$password = "root96";
$dbName = "gases";
// Conectando, seleccionando la base de datos
$conn = new mysqli($host, $user, $password, $dbName); // conecta al servidor con user, contraseña

if (isset($_POST['LAT']))
{
    $LAT = $_POST['LAT'];
}

if (isset($_POST['LON']))
{
    $LON = $_POST['LON'];
}

if (isset($_POST['DATE']))
{
    $DATE = $_POST['DATE'];
}


if (isset($_POST['TIME']))
{
    $TIME = $_POST['TIME'];
}


$query = "INSERT INTO data2 (Latitude, Longitude, Date, Hour) VALUES('$LAT', '$LON', '$DATE', '$TIME');"; 
mysqli_query($conn, $query) or die("Consulta fallida: " . mysqli_error()); 

mysqli_close($conn);

?>