<?php
    if(!defined('IS_LOAD')){ exit; }
    class Tag extends DataPage {

        protected $db;
        protected $sql;
        protected $url;
        protected $prepare;

        public function __construct($url){
            $this->db = new DataBase();
            $this->sql = new SQL();
            $this->url = $url;
        }

        public function getTagPosts(){

            if(!empty($this->url['param-0'])){
                $sql = $this->sql->postTags();
                $this->prepare = urldecode($this->url['param-0']);

                return $this->db->_prepare($sql, function($stmt){
                    $stmt->bind_param('s', $this->prepare);
                });
            }

            return '';
        }

        public function view(){
            return 'tag.php';
        }
    }
?>