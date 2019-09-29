<?php
    if(!defined('IS_LOAD')){ exit; }
    class Posts extends DataPage {

        protected $db;
        protected $sql;
        protected $url;
        protected $prepare;

        private $countPosts;
        private $p_start;

        public function __construct($url){
            $this->db = new DataBase();
            $this->sql = new SQL();
            $this->url = $url;

           $this->pagination();
        }

        public function pagination(){
            if(!isset($this->countPosts)){
                $countPosts = $this->db->select( $this->sql->countPosts() )[0];

                if($countPosts){
                    $this->countPosts = $countPosts['count'];
                }
            }

            $res = Pagination($this->countPosts, $this->url['param-0']);
            $this->p_start = $res['p_start'];

            return $res;
        }

        public function getPosts(){
            $quantity = PAGINATION_QUANTITY;
            $sql = $this->sql->post() . " LIMIT {$this->p_start}, {$quantity}";
            return $this->db->select($sql);
        }

        public function view(){
            return 'posts.php';
        }

    }

?>