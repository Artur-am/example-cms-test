<?php
    if(!defined('IS_LOAD')){ exit; }

    $url = parsUrl();
    $page = explode('-', $url['path']);
    $className = '';

    for($i = 0, $count = count($page); $i < $count; $i++){
        $className .= ucfirst($page[$i]);
    }
    unset($page);

    if( file_exists( DIR_CLASS . 'Pages/' . $className . '.php' ) ){
        
        require_once DIR_CLASS . 'Pages/' . $className . '.php';

        spl_autoload_extensions(".php,.inc");

        if(class_exists($className)){

            spl_autoload($className);

            $data = new $className($url);
            $render = new HTMLRender();
            
            $sol = [ 'ds', 'sdffe', 'sdfe', '4@5#6rG', md5( time() ) ];
            $token = ( time() + 13) * 7;
            $_SESSION['token'] = md5( 'NS' . $token . time() . array_rand( $sol, 1 ) . $token . array_rand( $sol, 1 ) . md5($token . '&'));

            require_once DIR_THEME . 'index.php';
            $data->closeDB();

        }

    }

?>