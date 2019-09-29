<?php if(!defined('IS_LOAD')){ exit; } ?>

<main class="wrapper">

    <section class="section">
        <div class="section-body">
            <?php if($data->posts): ?>

                <?= $render->html($data->posts, htmlPost()); ?>
            
                <?= $render->html($data->pagination(), htmlPagination("/{$url['path']}/{$url['param-0']}")); ?>

            <?php else: ?>
                <h3 class="no-search-title">Ничего не найдено.</h3>
            <?php endif; ?>
        </div>
    </section>

</main>