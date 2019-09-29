<?php if(!defined('IS_LOAD')){ exit; } ?>

<div class="wrapper">
    
    <article class="article">
                
        <h2 class="title"><?= $data->post['post_title']; ?></h2>

        <ul class="meta">
            <li>
                <svg class="icon">
                    <use xlink:href="<?= THEME; ?>/assets/img/icons.svg#clock"></use>
                </svg>
                <span><?= $data->post['post_date']; ?></span>
            </li>
            <li>
                <a href="#comments">
                    <svg class="icon">
                        <use xlink:href="<?= THEME; ?>/assets/img/icons.svg#comment"></use>
                    </svg>
                    <span><?= count($data->comments);?></span>
                </a>
            </li>
        </ul>

        <img class="img" src="<?= DIR_FILES . $data->post['post_img']; ?>" alt="<?= $data->post['post_title']; ?>" />

        <div class="text">
            <?= $data->post['post_text']; ?>
        </div>

        <div class="tags">
            <?= $render->html($data->getTags($data->post['id']), htmlTags()); ?>
        </div>

    </article>
        
            
    <div id="comments">
        <div class="line-title"><span>COMMENTS</span></div>
        <?= $render->html($data->comments, htmlComments()); ?>
    </div>

    <form name="comments" class="comment-form" method="POST">
        <?php if(empty($_SESSION['login'])): ?>
            <label for="name">Last Name:</label>
            <input type="text" name="name" id="name" class="input-text" />
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" class="input-text" />
        <?php else: ?>
            <input type="text" name="name" value="<?= $_SESSION['login']; ?>" hidden />
        <?php endif; ?>

        <label for="comment">Comment:</label>
        <textarea name="comment" id="comment" cols="30" rows="10" class="input-text"></textarea>

        <button type="submit" name="addComment" class="button">Add comment</button>
    </form>

</div>