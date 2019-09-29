<?php if(!defined('IS_LOAD')){ exit; } ?>
<main class="wrapper">
    <div class="content">

        <section class="section">
            <h2 class="line-title"><span>TOP POSTS</span></h2>
            
            <div class="section-body">
                <?= $render->html($data->getTopPosts(3), htmlPost()); ?>
            </div>
        </section>

        <section class="section">
            <h2 class="line-title"><span>NEW POSTS</span></h2>
            
            <div class="section-body">
                <?= $render->html($data->getNewPosts(), htmlPost()); ?>
            </div>
        </section>

        <section class="section">
            <h2 class="line-title"><span>TAGS</span></h2>
            
            <div class="section-body cloud-lists">
                <div class="tags cloud-wrapper">
                    <?= $render->html($data->getTags(), htmlTags()); ?>
                </div>
            </div>
        </section>

        <section class="section">
            <h2 class="line-title"><span>NEW COMMENTS</span></h2>
            
            <div class="section-body">
                <?= $render->html($data->getComments(), htmlCommentPosts()); ?>
            </div>
        </section>

    </div>
        
    <?php //require_once 'template-parts/sidebar.php'; ?>

</main>
