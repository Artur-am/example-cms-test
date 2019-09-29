<?php
    class HTMLRender {
        public $hook = ':';

        private $html = '';
        private $res = '';

        public function html($data, $html){
            $this->html = $html;
            if($data){
                return $this->iteration($data);
            }else{
                return '';
            }
        }

        private function iteration($data){
            $html = $this->html;
            $res = '';

            foreach ($data as $key => $value) {
                if(TRUE === is_array($value)){
                    $html = '';
                    $res .= $this->iteration($value);
                }else{
                    $r = $this->replace($key, $value, $html);
                    if(!empty($r)){
                        $html = $this->replace($key, $value, $html);
                    }
                }
            }

            return $html . $res;
        }

        private function replace($key, $value, $html){
            $key = $this->hook . $key;
            
            if(FALSE !== stristr($html, $key)){
                return str_replace($key, $value, $html);
            }
            return '';
        }
    }
?>