<?php
    if(!defined('IS_LOAD')){ exit; }
    class Post extends DataPage {

        protected $db;
        protected $sql;
        protected $url;
        protected $prepare;

        public $post;
        public $comments;

        public function __construct($url){
            $this->db = new DataBase();
            $this->sql = new SQL();
            $this->url = $url;

            if(strlen($this->url['param-0']) > 350){
                redirect('/');
            }

            $this->post = $this->getPost();
            $this->comments = $this->getComments($this->post['id']);
        }

        private function getPost(){
            $sql = $this->sql->post('posts.id, posts.post_text,') . " WHERE posts.`post_href` = ? LIMIT 1";
            $this->prepare = $this->url['param-0'];
            
            return $this->db->_prepare($sql, function($stmt){
                $stmt->bind_param('s', $this->prepare);
            })[0];
        }

        public function getTags($id){
            $sql = $this->sql->tag($id);
            return $this->db->select($sql);
        }

        private function getComments($id){
            $sql = $this->sql->comments() . 'WHERE `post_id` = ' . $id;
            return $this->db->select($sql);
        }

        public function view(){
            return 'post.php';
        }

    }

?>