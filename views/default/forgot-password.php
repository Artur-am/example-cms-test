<?php if(!defined('IS_LOAD')){ exit; } ?>
<div class="wrapper auth">
    <h3 class="auth-title">Password recovery</h3>
    
    <?php if(empty($data->page['newPass'])): ?>
    
    <form action="<?= $_SERVER['REQUEST_URI']; ?>" method="POST">

        <label for="label-email">
            <svg class="icon">
                <use xlink:href="<?= THEME; ?>assets/img/icons.svg#email"></use>
            </svg>
            <input type="email" id="label-email" placeholder="Email" name="email">
        </label>

        <button type="submit" name="forgotPassword" class="button">Получить ссылку для сброса пароля</button>

    </form>

    <?php else: ?>
        <input type="text" value="<?= $data->page['newPass']; ?>" name="pass">
    <?php endif; ?>
    
</div>