<?php if(!defined('IS_LOAD')){ exit; } ?>
<header class="header wrapper">

    <div class="header_top row">
        <div class="col col-3 middle">

            <a href="<?= SITE_URL; ?>">EXAMPLE CMS</a>

            <form name="header-search" action="<?= SITE_URL; ?>" method="GET" class="header_form_search">
                <button type="submit">
                    <svg><use xlink:href="<?= THEME; ?>assets/img/icons.svg#search" /></svg>
                </button>
                <input type="search" name="search" placeholder="Search ... ">
            </form>
        </div>
  
        <div class="col col-7 middle right">

            <div class="row">
                <ul class="col col-8 middle menu_icons">
                    <?= $render->html($data->socialMenu(), menuIcons()); ?>
                </ul>
        
                <ul class="col menu middle">
                    <li>
                        <?= empty($_SESSION['login']) ? '<a href="'. SITE_URL .'/auth">Login | Sign Up</a>' : $_SESSION['login']; ?>
                    </li>
                </ul>
            </div>

        </div>
    </div>

    <nav class="header_buttom nav b-middle">
        <?= $render->html($data->navMenu(), htmlNav()); ?>
    </nav>

</header>