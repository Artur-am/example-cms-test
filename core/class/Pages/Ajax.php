<?php
    
    // header("Content-Type: application/json; charset=UTF-8");
class Ajax {
    private $referer;
    private $url;

    public function __construct(){
        
        $this->url = explode('/', $_SERVER['HTTP_REFERER']);

        if(!empty($this->url[3])){
            
            $this->referer = $this->url[3];

            if('GET' == $_SERVER['REQUEST_METHOD']){
                $this->methodGET();
            }
        }

        exit;
    }

    private function methodGET(){
        if('post' == $this->referer){
            $this->addComment();
        }
    }

    private function addComment(){
        $data = json_decode( $_GET['data'] );

        if($_SESSION['token'] !== $data->token){
            exit;
        }

        $is_auth = false;
        $this->name = test($data->name);
        $this->email = test($data->email);
        $this->comment = test($data->comment);
        $this->postHref = test( array_slice($this->url, -1)[0] );

        $error = [];
        $error['name'] = validValue($this->name, 'Имя', 3);
        $error['email'] = validEmail($this->email);
        $error['comment'] = validValue($this->comment, 'Комментарий', 5);

        if(isset($_SESSION['login'])){
            $this->name = $_SESSION['login'];
            $is_auth = true;
            $this->email = '';
        }

        if(
            empty($error['name']) &&
            empty($error['email']) &&
            empty($error['comment']) &&
            !empty($this->postHref) ||
            $is_auth
        ){
            $db = new DataBase();

            $sql = "SELECT `id`, `post_href` FROM posts WHERE post_href = ? LIMIT 1";
            $post = $db->_prepare($sql, function($stmt){
                $stmt->bind_param('s', $this->postHref);
            })[0];

            if(!empty($post['id'])){
                $this->postId = $post['id'];

                $sql = "INSERT INTO comments (`post_id`, `author`, `email`, `text`)
                            VALUES (?,?,?,?)";

                $db->_prepareInsert($sql, function($stmt){
                    $stmt->bind_param('isss', $this->postId, $this->name, $this->email, $this->comment);
                });

                echo true;

            }else{
                echo false;
            }

            $db->closeDB();
            unset($db);

        }else{
            echo json_encode($error);
        }

    }

}

?>