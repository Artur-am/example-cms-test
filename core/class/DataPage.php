<?php
    if(!defined('IS_LOAD')){ exit; }
    class DataPage {

        public function navMenu(){
            $sql = $this->sql->getMenu('nav') . "AND t_.type = 'menu'";
            return $this->db->select($sql);
        }

        public function title(){
            $sql = $this->sql->getMenu('page-title') . 'AND m_.menu_href = ?';
            $this->prepare = $this->url['path'];
            
            $meta = $this->db->_prepare($sql, function($stmt){
                $stmt->bind_param('s', $this->prepare);
            });

            if($meta){
                return $meta[0]['menu_title'];
            }else{
                if(array_key_exists('post', $this)){
                    return $this->post['post_title'];
                }
                return ' .. ';
            }
        }

        public function socialMenu(){
            $sql = $this->sql->getMenu('social-icon') . "AND t_.type = 'menu'";
            return $this->db->select($sql);
        }

        public function closeDB(){
            $this->db->closeDB();
            unset($this->db);
        }

    }
?>