<?php
$servername = "localhost";
$username = "fudrouser";
$password = "V8Z#QWcfpcR2az%L!d24";
$dbname = "fudrodata";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Zet de PDO foutmodus op exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
