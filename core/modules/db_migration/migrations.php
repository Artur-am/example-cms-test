<?php
    $db_name = 'test-blog';

//=========== MENU

    $db->insert("CREATE TABLE `{$db_name}`.`menu` (
        `id` TINYINT NOT NULL AUTO_INCREMENT,
        `menu_title` VARCHAR(30) NOT NULL,
        `menu_href` VARCHAR(30) NOT NULL,
        `menu_type` TINYINT NOT NULL,
        `menu_parent_id` INT(11),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB");

    $db->insert("INSERT INTO `menu`
        (
            `menu_title`,
            `menu_href`,
            `menu_type`,
            `menu_parent_id`
        )
        VALUES
            ( 'Главная', 'home', 1, 0 ),
            ( 'Пости', 'posts', 1, 0 ),
            ( 'twitter', '#twitter_', 3, 0 ),
            ( 'vk', '#vk_', 3, 0 ),
            ( 'Главная Страница', 'home', 6, 0 ),
            ( 'Cтатьи', 'posts', 6, 0 ),
            ( 'Тег', 'tag', 6, 0 ),
            ( 'Авторизация - Регистрация', 'auth', 6, 0 ),
            ( 'Восстановление пароля', 'forgot-password', 6, 0 ),
            ( 'Поиск', 'search', 6, 0 )
    ");

//= USERS

    $db->insert("CREATE TABLE `{$db_name}`.`users` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `login` VARCHAR(50) NOT NULL,
        `email` VARCHAR(80) NOT NULL,
        `pass` VARCHAR(140) NOT NULL,
        `salt` VARCHAR(15) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB");


//= COMMENTS

    $db->insert("CREATE TABLE `{$db_name}`.`comments` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `post_id` INT(11) NOT NULL,
        `author` VARCHAR(50) NOT NULL,
        `email` VARCHAR(80) NOT NULL,
        `text` VARCHAR(300) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB");

    $db->insert("INSERT INTO `{$db_name}`.`comments`
            (`post_id`, `author`, `email`, `text`)
        VALUES
            ( 1, 'Arthur', 'test@email.ua', 'text comment' ),
            ( 1, 'Feniks', 'test@email.ua', 'text comment 1' ),
            ( 1, 'Test', 'test@email.ua', 'text comment 2' ),
            ( 1, 'Aang', 'test@email.ua', 'text comment 2 - 1' )
    ");

//==== VIEW POST

    $db->insert("CREATE TABLE `{$db_name}`.`views_posts` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `v_p_date` DATE NOT NULL,
        `v_p_post_id` INT(11) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB");

//==== TAGS

    $db->insert("CREATE TABLE `{$db_name}`.`tags` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `tag_name` VARCHAR(80) NOT NULL,
        `tag_href` VARCHAR(80) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB");
    

    $db->insert("CREATE TABLE `{$db_name}`.`tags_taxonomy` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `tag_post_id` INT(11) NOT NULL,
        `tag_tag_id` INT(111) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB");


    $db->insert("INSERT INTO `tags_taxonomy`
            (`tag_post_id`, `tag_tag_id`)
        VALUES
            (1, 1),
            (1, 2),
            (2, 2)
    ");
    
    $tags = '';
    $array_tags = ['test', 'example', 'js', 'php', 'css', 'html'];
    $tagsCount = 47;
    for($i = 0; $i <= $tagsCount; $i++){
        $tag = $array_tags[array_rand($array_tags, 1)];
        $tags .= ( "('{$tag}-{$i}', '{$tag}-{$i}')" );
        if($i < $tagsCount){
            $tags .= ',';
        }
    }

    $db->insert("INSERT INTO `tags`
            (`tag_name`, `tag_href`)
        VALUES
            ('sport', 'sport'),
            ('авто', 'avto'),
            {$tags}
    ");

    $db->insert("CREATE TABLE `{$db_name}`.`taxonomy` (
        `id` TINYINT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(30) NOT NULL,
        `type` VARCHAR(30) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB");

    $db->insert("INSERT INTO `taxonomy`
            (`name`, `type`)
        VALUES
            ('nav', 'menu'),
            ('slider', 'post'),
            ('social-icon', 'menu'),
            ('top-posts', 'post'),
            ('author', 'post'),
            ('page-title', 'menu')
    ");

    

//==== POSTS

$db->insert("CREATE TABLE `{$db_name}`.`posts` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `post_title` VARCHAR(140) NOT NULL,
    `post_img` VARCHAR(300) NOT NULL,
    `post_href` VARCHAR(150) NOT NULL,
    `post_keywords` VARCHAR(140) NOT NULL,
    `post_description` VARCHAR(140) NOT NULL,
    `post_menu_id` INT NOT NULL,
    `post_text` TEXT NOT NULL,
    `post_type` TINYINT NOT NULL,
    `post_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB");

function posts($db){

    $posts = '';
    $titles = [
        'Lorem ipsum dolor sit amet consectetuer adipiscing elit',
        'Lorem ipsum dolor sit amet consectetuer adipiscing',
        'Lorem ipsum dolor sit amet consectetuer',
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit',
        'Lorem ipsum dolor',
        'Lorem ipsum',
        'Lorem'
    ];
    $imgs = [
        '2019/09/1364067440.jpg',
        '2019/09/46548.jpg',
        '2019/09/64864.jpg',
        '2019/09/156487.jpg',
        '2019/09/165456.jpg',
        '2019/09/165465.jpg',
        '2019/09/454688.jpg',
        '2019/09/548486.jpg',
        '2019/09/65846848.jpg',
        '2019/09/1370862633.jpg',
        '2019/09/1374146089.jpg',
        '2019/09/1375095207.jpg',
        '2019/09/1561999774.png'
    ];
    
    $types = [2, 4, 5];
    
    for($i = 0,$count = 100; $i <= $count; $i++){
        $img = $imgs[ array_rand($imgs, 1) ];
        $title = $titles[ array_rand($titles, 1) ];
        $href = str_replace(' ', '-', mb_strtolower($title) );
        $type = $types[rand(0, 2)];

        $posts .= "(
            '{$title} - {$i}',
            '{$href}-{$i}',
            '{$img}',
            'Lorem, ips, keywords',
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
            '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
            </p>
            <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
                sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae
                sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet
                nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
            </p>
            <p>
                Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
            </p>
            <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
                ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
                sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae
                sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet
                nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
            </p>',
            {$type},
            2
        )";

        if($i < $count){
            $posts .= ",";
        }
    }

    $db->insert("INSERT INTO `posts`
                (
                    `post_title`,
                    `post_href`,
                    `post_img`,
                    `post_keywords`,
                    `post_description`,
                    `post_text`,
                    `post_type`,
                    `post_menu_id`
                )
            VALUES
                {$posts}
    ");

}

for($n = 0, $count = 1; $n < $count; $n++){
    
    posts($db);
}

?>