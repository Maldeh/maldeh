<?php
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$user_id = 1; // Dit moet dynamisch zijn, afhankelijk van de ingelogde gebruiker

$response = array();

foreach ($data['items'] as $item) {
    $item_name = $item['name'];
    $item_count = $item['count'];

    $stmt = $conn->prepare("INSERT INTO user_progress (user_id, item_name, item_count) VALUES (?, ?, ?)
                            ON DUPLICATE KEY UPDATE item_count = item_count + VALUES(item_count)");
    $stmt->bind_param("isi", $user_id, $item_name, $item_count);

    if ($stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = $stmt->error;
    }

    $stmt->close();
}

$conn->close();
echo json_encode($response);
?>
