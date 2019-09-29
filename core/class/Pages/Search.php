<?php
    if(!defined('IS_LOAD')){ exit; }
    class Search extends DataPage {

        protected $db;
        protected $sql;
        protected $url;
        protected $prepare;

        private $countPosts;
        private $p_start;

        public $posts;

        public function __construct($url){
            $this->db = new DataBase();
            $this->sql = new SQL();
            $this->url = $url;

            $this->pagination();

            $this->posts = $this->getSearch();
        }

        private function getSearch(){
            
            if(!empty($this->url['param-0'])){
                
                $quantity = PAGINATION_QUANTITY;
                
                $sql = $this->sql->post() . " WHERE post_title LIKE ?  LIMIT {$this->p_start}, {$quantity}";
                $this->prepare = '%'.urldecode($this->url['param-0']).'%';

                return $this->db->_prepare($sql, function($stmt){
                    $stmt->bind_param('s', $this->prepare);
                });
            }

            return '';
        }

        public function pagination(){
            if(!isset($this->countPosts)){
                $countPosts = $this->db->select( $this->sql->countPosts() )[0];

                if($countPosts){
                    $this->countPosts = $countPosts['count'];
                }
            }

            $res = Pagination($this->countPosts, $this->url['param-1']);
            $this->p_start = $res['p_start'];

            return $res;
        }

        public function view(){
            return 'search.php';
        }

    }

?>