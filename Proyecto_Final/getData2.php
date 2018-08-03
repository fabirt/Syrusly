<?php
$host = "syrusly.crhz3rw0won9.us-east-2.rds.amazonaws.com";
$user = "kevin";
$password = "kfawcettq10";
$dbName = "gases";
// Conectando, seleccionando la base de datos
$conn = new mysqli($host, $user, $password, $dbName); // conecta al servidor con user, contraseña


// Realizar una consulta MySQL
$query = "SELECT * FROM data2 ORDER BY iddata DESC LIMIT 1"; // ultimo valor de la tabla llamada datos
$resultado = mysqli_query($conn, $query) or die("Consulta fallida: " . mysqli_error()); // guardo en resultado lo que saqué de query

$fila = mysqli_fetch_row($resultado); // guardo en un array lo que está en resultado, como string

$var = $fila[1]."\n".$fila[2]."\n".$fila[3]."\n".$fila[4];

echo $var;
mysqli_close($conn);

?>