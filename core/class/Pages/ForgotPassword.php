<?php
    if(!defined('IS_LOAD')){ exit; }
    class ForgotPassword extends DataPage {

        protected $db;
        protected $sql;
        protected $url;
        protected $prepare;

        public function __construct($url){
            $this->db = new DataBase();
            $this->sql = new SQL();
            $this->url = $url;

            if(isset($_POST['forgotPassword'])){
                $this->forgotPassword();
            }
        }

        private function forgotPassword(){
            $this->email = $_POST['email'];

            if(empty(validEmail($_POST['email']))){
                $sql = "SELECT salt FROM users WHERE email = ? LIMIT 1";
                $user = $this->db->_prepare($sql, function($stmt){
                    $stmt->bind_param('s', $this->email);
                })[0];
                if(empty($user['salt'])){
                    $this->page['errorEmail'] = validEmail('qwerty');
                    return null;
                }
                
                $str = $this->generateRandomString(10);
                $this->newPass = _Hash( $str, $user['salt']);

                $sql = "UPDATE `users` SET `pass`=? WHERE `email` = ?";
                $this->db->_prepareInsert($sql, function($stmt){
                    $stmt->bind_param('ss', $this->newPass, $this->email);
                });

                $this->page['newPass'] = $str;
            }

        }

        private function generateRandomString($length = 10) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        public function view(){
            return 'forgot-password.php';
        }

    }
?>