<?php
    if(!defined('IS_LOAD')){ exit; }
    class DataBase {
        private $db = null;

        private $db_host = 'localhost';
        private $db_user = 'root';
        private $db_pass = '';
        private $db_name = 'test-blog';

        public $parameter = '';

        public function __construct(){
            $this->db = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);
            
            if($this->db->connect_errno){
                $this->errorDB('Не удалось подключиться к MySQL: <strong>' . $this->db->connect_error . '</strong>');
            }
            
            if(!$this->db->set_charset("utf8")){
                $this->errorDB('Ошибка при загрузке набора символов <em>utf8</em>: <strong>' . $this->db->error . '</strong>');
            }
        }
        
        private function errorDB($text){
            $text .= '<br/ >Код ошибки: ' . $this->db->errno;
            exit($text);
        }
        
        public function closeDB(){
            $this->db->close();
        }
        
        private function query($sql){
            if($res = $this->db->query($sql)){
                return $res;
            }else{
                $this->errorDB('Ошибка: <strong>' . $this->db->error . '</strong>');
            }
        }

        public function _prepare($sql = '', $param){

            $stmt = $this->db->prepare($sql);

            $param($stmt);
            
            $stmt->execute();

            $res = $stmt->get_result();
            $data = [];
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }

            $stmt->close();

            return $data;
        }

        public function _prepareInsert($sql = '', $param){

            $stmt = $this->db->prepare($sql);

            $param($stmt);
            
            $stmt->execute();
            // echo $stmt->affected_rows;
            $stmt->close();

            return true;
        }
        
        public function select($sql){
            $result = $this->query($sql);
            $data = [];
            while($row = $result->fetch_assoc()){
                $data[] = $row;
            }
            $result->free();
            return $data;
        }
        
        public function insert($sql){
            $this->query($sql);
            return true;
        }
        
        public function updated($sql){
            $this->query($sql);
            return true;
        }
    }
?>