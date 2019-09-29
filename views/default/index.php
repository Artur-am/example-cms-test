<?php if(!defined('IS_LOAD')){ exit; } ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $data->title(); ?></title>
    <link rel="stylesheet" href="<?= THEME; ?>/assets/css/style.css" />
    <?= phpInJs(); ?>
</head>
<body>

    <?php require_once 'inc/functions.php'; ?>

    <?php require_once 'template-parts/header.php'; ?>

    <?php
        require_once DIR_THEME . $data->view();
    ?>

    <script src="<?= THEME; ?>/assets/js/main.js"></script>

    <footer class="footer">...</footer>

</body>
</html>
