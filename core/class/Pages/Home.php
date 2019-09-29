<?php if(!defined('IS_LOAD')){ exit; }

    class Home extends DataPage {

        protected $db;
        protected $sql;
        protected $url;
        protected $prepare;

        public function __construct($url){
            $this->db = new DataBase();
            $this->sql = new SQL();
            $this->url = $url;
        }

        public function getTopPosts($limit = 4){
            $sql = $this->sql->postsJoin('top-posts') . 'LIMIT ' . $limit;
            return $this->db->select($sql);
        }

        public function getNewPosts($limit = 4){
            $sql = $this->sql->post() . ' ORDER BY `post_date` DESC LIMIT ' . $limit;
            return $this->db->select($sql);
        }

        public function getTags(){
            $sql = $this->sql->tags();
            return $this->db->select($sql);
        }

        public function getComments(){
            $sql = $this->sql->commentPosts();
            return $this->db->select($sql);
        }

        public function view(){
            return 'home.php';
        }

    }

?>