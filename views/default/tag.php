<?php if(!defined('IS_LOAD')){ exit; } ?>

<main class="wrapper">

    <section class="section">
        <div class="section-body">
            <?= $render->html($data->getTagPosts(10), htmlPost()); ?>
        </div>
    </section>

</main>