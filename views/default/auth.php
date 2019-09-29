<?php if(!defined('IS_LOAD')){ exit; } ?>
<div class="wrapper">

    <div class="auth row">

        <div class="col col-5">
            <h3 class="auth-title">Sign in to example-cms</h3>

            <form action="<?= SITE_URL . $_SERVER['REQUEST_URI']; ?>" method="post">
                    
                <label for="label-email">
                    <svg class="icon">
                        <use xlink:href="<?= THEME; ?>assets/img/icons.svg#email"></use>
                    </svg>
                    <input type="test" id="label-email" placeholder="Email" name="email">
                </label>
                
                <label for="label-lock">
                    <svg class="icon">
                        <use xlink:href="<?= THEME; ?>assets/img/icons.svg#lock"></use>
                    </svg>
                    <input type="password" id="label-lock" placeholder="Password" name="passvord">
                </label>
                
                <a href="<?= $site_url; ?>/forgot-password">Forgot your password?</a>

                <button type="submit" name="auth" class="button">SIGN IN</button>

            </form>
        </div>

        <div class="col col-5">
            
            <h3 class="auth-title">Create Account</h3>

            <form name="registration" action="<?= SITE_URL . $_SERVER['REQUEST_URI']; ?>" method="post">
                    
                <label for="label-login">
                    <svg class="icon">
                        <use xlink:href="<?= THEME; ?>assets/img/icons.svg#user"></use>
                    </svg>
                    <input type="text" id="label-login" placeholder="<?= empty($data->page['_errorLogin']) ? 'Login' : $data->page['_errorLogin']; ?>" name="login">
                </label>

                <label for="label-email">
                    <svg class="icon">
                        <use xlink:href="<?= THEME; ?>assets/img/icons.svg#email"></use>
                    </svg>
                    <input type="email" id="label-email" placeholder="<?= empty($data->page['_errorEmail']) ? 'Email' : $data->page['_errorEmail']; ?>" name="email">
                </label>
                
                <label for="label-lock">
                    <svg class="icon">
                        <use xlink:href="<?= THEME; ?>assets/img/icons.svg#lock"></use>
                    </svg>
                    <input type="password" id="label-lock" placeholder="Password" name="passvord">
                </label>

                <button type="submit" name="registration" class="button">SIGN UP</button>

            </form>
        </div>

    </div>

</div>