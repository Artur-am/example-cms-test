<?php
    if(!defined('IS_LOAD')){ exit; }
    class Auth extends DataPage {

        protected $db;
        protected $sql;
        protected $url;
        protected $prepare;

        public function __construct($url){

            if(isset($_SESSION['login'])){
                redirect('/');
            }

            $this->db = new DataBase();
            $this->sql = new SQL();
            $this->url = $url;

            if(!empty($_POST)){

                if(isset($_POST['auth'])){
                    $this->signIn();
                }

                if(isset($_POST['registration'])){
                    $this->signUp();
                }

            }

        }

        private function signIn(){
            $this->email = $_POST['email'];
            $pass = $_POST['pass'];

            $sql = "SELECT `email`, `login`, `pass`, `salt` FROM users WHERE `email` = ? LIMIT 1";

            $user = $this->db->_prepare($sql, function($stmt){
                $stmt->bind_param('s', $this->email);
            })[0];

            if(empty($user)){
               $this->page['errorEmail'] = 'Error Email';
            }else{
                $p = _Hash( $user['pass'], $user['salt']);
                $pass = _Hash($pass, $user['salt']);
                
                if($p == $pass){
                    $_SESSION['login'] = $user['login'];
                }else{
                    $this->page['errorPass'] = 'Error Pass';
                }
            }

            redirect('/');
        }

        private function signUp(){
            $this->login = strip_tags($_POST['login']);
            $this->email = strip_tags($_POST['email']);
            $pass = $_POST['email'];
            $n = 0;

            $this->page['_errorLogin'] = validValue($this->login, 'Логин', 3);
            $this->page['_errorEmail'] = validEmail($this->email);
            $this->page['_errorPass'] = validValue($pass, 'Пароль', 5);

            if(
                empty($this->page['_errorLogin']) &&
                empty($this->page['_errorEmail']) &&
                empty($this->page['_errorPass'])
            ){

                $sql = "SELECT id FROM users WHERE `email` = ? LIMIT 1";
                $user = $this->db->_prepare($sql, function($stmt){
                    $stmt->bind_param('s', $this->email);
                })[0];

                if(!empty($user)){
                    $this->page['_errorEmail'] = 'Электронная почта уже занят.';
                    return false;
                }

                $this->salt = rand(0, 100) . time();
                $this->pass = _Hash($pass, $this->salt);
                $sql = "INSERT INTO users ( `login`, `email`, `pass`, `salt`)
                                VALUE (?,?,?,?)";
                
                $this->db->_prepareInsert($sql, function($stmt){
                    $stmt->bind_param('ssss', $this->login, $this->email, $this->pass, $this->salt);
                });

                $_SESSION['login'] = $this->login;
            }

           redirect('/');
        }

        private function logout(){
            unset($_SESSION['login']);
        }

        public function view(){
            return 'auth.php';
        }
    }
?>