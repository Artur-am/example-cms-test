<?php if(!defined('IS_LOAD')){ exit; } ?>

<main class="wrapper">

    <section class="section">
        <div class="section-body">
            <?= $render->html($data->getPosts(10), htmlPost()); ?>
        </div>
    </section>

    <?= $render->html($data->pagination(), htmlPagination("/{$url['path']}")); ?>

</main>