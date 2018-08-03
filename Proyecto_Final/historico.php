<?php
$host = "syrusly.crhz3rw0won9.us-east-2.rds.amazonaws.com";
$user = "kevin";
$password = "kfawcettq10";
$dbName = "gases";
// Conectando, seleccionando la base de datos
$conn = new mysqli($host, $user, $password, $dbName); // conecta al servidor con user, contraseña

if (isset($_POST['date_time_start']))
{
    $datetime_start = $_POST['date_time_start'];
}


if (isset($_POST['date_time_end']))
{
    $datetime_end = $_POST['date_time_end'];
}


$query = "SELECT d.iddata, d.Latitude, d.Longitude, d.Date, d.Hour, v.CarbonDioxide, v.CarbonMonoxide, v.Ammonium FROM data as d, `values` as v WHERE d.iddata = v.idvalues AND d.Date between '".$datetime_start."' AND '".$datetime_end."' ORDER BY d.iddata";

$resultado = mysqli_query($conn, $query) or die("Consulta fallida: " . mysqli_error()); 

$fila = mysqli_num_rows($resultado);

for ($i=0;$i<$fila;$i++){
	mysqli_data_seek($resultado,$i);
	$row = mysqli_fetch_row($resultado);
	echo $row[1], " ", $row[2], " ", $row[3], " ", $row[4], " ", $row[5], " ", $row[6], " ", $row[7];
	echo "\n";
}


mysqli_close($conn);

?>