<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fudro</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="banner">
    <div class="title"><a href="index.html" class="title-link">Fudro</a></div>
        <div class="login-link-container">
            <?php if(isset($_SESSION['username'])): ?>
                <span>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <a href="logout.php" class="login-link">Logout</a>
            <?php else: ?>
                <a href="login.html" class="login-link">Login</a>
            <?php endif; ?>
        </div>
    </header>
    <div id="content">
    <div class="container">
        <div class="pack-opening">
            <button id="openPackBtn">Open a Pack</button>
            <div id="packResult"></div>
        </div>
        <div class="catalog-container">
            <h2>Catalog</h2>
            <div id="catalog-count"></div>
            <div id="catalog"></div>
        </div>
    </div>
    <script src="script.js"></script>
    </div>
</body>
</html>
