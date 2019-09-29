<?php
    if(!defined('IS_LOAD')){ exit; }
    session_start();
    
    const DIR_CLASS = __DIR__ . '/class/';
    const DIR_THEME = __DIR__ . '/../views/default/';
    const PAGINATION_QUANTITY = 32;

    define('SITE_URL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
    define('THEME', SITE_URL . '/views/default/' );
    define('DIR_FILES', SITE_URL . '/upload/' );

    require_once DIR_CLASS . 'DataBase.php';
    require_once DIR_CLASS . 'DataPage.php';
    require_once DIR_CLASS . 'SQL.php';
    require_once DIR_CLASS . 'HTMLRender.php';
    
    require_once __DIR__ . '/functions.php';
    require_once __DIR__ . '/route.php';

    // $db = new DataBase();
    // require_once __DIR__ . '/modules/db_migration/migrations.php';
    
?>