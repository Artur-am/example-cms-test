<?php
    if(!defined('IS_LOAD')){ exit; }

    function parsUrl(){
        $url = explode( '/', $_SERVER['REQUEST_URI'] );
        array_shift( $url );

        $url_s['path'] = empty($url[0]) ? 'home' : $url[0];

        for($n = 1, $count = count($url); $n < $count; $n++){
            $url_s['param-' . ($n - 1) ] = $url[$n];
        }
        return $url_s;
    }

    function test($value){
        $value = strip_tags($value);
        return $value;
    }

    function phpInJs(){
        $ajax_url = SITE_URL . '/ajax/?';
        return <<<PHPINJS
            <script>
                let token = '{$_SESSION['token']}';
                let ajax_url = '{$ajax_url}';
            </script>
PHPINJS;
    }

    function redirect($url) {
		if(!headers_sent()) {
		  header('Location: '.$url);
		}else{
          echo <<<Redirect
            <script type="text/javascript">
		        window.location.href="{$url}"
            </script>
		    <noscript>
		        <meta http-equiv="refresh" content="0"; url="{$url}" />
            </noscript>
Redirect;
        }
        exit;
    }

    function validEmail($email){
        if(preg_match("/^(?:[a-z0-9]+(?:[-_.]?[a-z0-9]+)?@[a-z0-9_.-]+(?:\.?[a-z0-9]+)?\.[a-z]{2,5})$/i", $email)){
            return '';
        }else{
            return 'Электронная почта указан не правильно!.';
        }
    }
    
    function validValue($value, $name, $str = 0){
        $res = ''; 

        if(empty($value)){
            $res = $name . ' не указан';
        }else{
            if( strlen($value) <= $str ){
                $res = $name . ' cлишком короткий';
            }
        }

        return $res;
    }

    function _Hash($value, $salt){
        $value = hash('sha256', $str . $salt);
        return hash('sha512', $salt . $str);
    }

    function Pagination($countPosts, $id){
        $id = abs( (int) $id );
        if($id === 0){ $id++; }
        $countPosts = ceil( $countPosts / PAGINATION_QUANTITY );

        $page = ($id > $countPosts) ? $countPosts : $id;
        $prev = ($page > 1) ? ($page - 1) : 0;
        $next = ($countPosts > $page) ? ($page + 1) : $countPosts;

        return [
            'prev' => $prev,
            'page' => $page,
            'next' => $next,
            'last' => $countPosts,
            'p_start' => ( ($page * PAGINATION_QUANTITY) - PAGINATION_QUANTITY )
        ];
    }

?>