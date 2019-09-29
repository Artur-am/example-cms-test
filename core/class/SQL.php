<?php
    class SQL {

        public function post($select = ''){
            return "SELECT posts.`post_title`, {$select} posts.`post_href`, posts.`post_img`, posts.`post_description`, posts.`post_date`
                FROM `posts`";
        }

        public function countPosts(){
            return "SELECT COUNT(id) AS `count` FROM `posts` ";
        }

        public function postsJoin($type = 'slider'){
            return "SELECT menu.menu_title, menu.menu_href,
                        posts.post_title, posts.post_href, posts.post_img, posts.post_description, posts.post_date, posts.post_type, posts.post_menu_id
                    FROM posts
                    LEFT JOIN menu
                        ON menu.id = posts.post_menu_id
                    INNER JOIN taxonomy
                        ON  taxonomy.id = posts.post_type WHERE taxonomy.name = '{$type}' AND taxonomy.type = 'post'
            ";
        }

        public function getMenu($type){
            return "SELECT m_.menu_title, m_.menu_href
                    FROM (
                        SELECT `menu_title`, `menu_href`, `menu_parent_id`, `menu_type`
                      FROM menu
                    ) m_ 
                    JOIN taxonomy t_ ON t_.id = m_.menu_type WHERE t_.name = '{$type}'";
        }

        public function tags(){
            return "SELECT t_.tag_name, t_.tag_href, COUNT(tt_.id) AS `count`
                FROM (
                    SELECT `id`, `tag_name`, `tag_href`
                    FROM tags
                ) t_
                LEFT JOIN tags_taxonomy tt_ ON t_.id = tt_.tag_tag_id
                GROUP BY t_.id
            ";
        }

        public function postTags(){
            return "SELECT posts.post_title, posts.post_href, posts.post_img, posts.post_description, posts.post_date, posts.post_type, posts.post_menu_id
                    FROM posts
                    INNER JOIN tags
                        ON tag_href = ?
                    INNER JOIN tags_taxonomy
                        ON tags_taxonomy.tag_tag_id = tags.id
                        WHERE posts.id = tags_taxonomy.tag_post_id";
        }

        public function tag($id){
            return "SELECT tag_name, tag_href
                    FROM tags_taxonomy
                    INNER JOIN tags
                        ON tags.id =  tags_taxonomy.tag_tag_id
                        WHERE tags_taxonomy.tag_post_id = {$id}";
        }

        public function commentPosts(){
            return "SELECT c.author AS title, c.text AS `text`, p.post_img AS img, p.post_href AS href
                    FROM comments c
                    INNER JOIN posts p
                        ON p.id = c.post_id
                    ORDER BY c.id DESC
                    LIMIT 5";
        }

        public function comments(){
            return "SELECT `author`, `text`
                    FROM `comments`";
        }
    }
?>