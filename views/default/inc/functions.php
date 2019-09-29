<?php

function htmlPost(){
    $src = SITE_URL;
    $file = DIR_FILES;
    return <<<POST
        <article class="card">

            <a href="{$src}/post/:post_href">
                <img src="{$file}:post_img" alt=":post_title" class="img" />
            </a>

            <div class="description">
                <a href="{$src}/post/:post_href">
                    <h3 class="title">:post_title</h3>
                </a>
                <div class="text">
                    :post_description
                </div>
            </div>

        </article>
POST;
}

function menuIcons(){
    $src = THEME;
    return <<<MENUICONS
        <li>
            <a href=":menu_href">
                <svg><use xlink:href="{$src}assets/img/icons.svg#:menu_title"/></svg>
            </a>
        </li>
MENUICONS;
}

function htmlNav(){
    $src = SITE_URL;
    return <<<NAV
        <a href="{$src}/:menu_href" class="nav-link">
            :menu_title
        </a>
NAV;
}

function htmlTags(){
    $src = SITE_URL;
    return <<<TAGS
    <a href="{$src}/tag/:tag_href" data-count=":count" class="cloud-list">
        :tag_name
    </a>
TAGS;
}

function htmlCommentPosts(){
    $src = SITE_URL;
    $file = DIR_FILES;
    return <<<COMMENT
        <div class="post row">
            <a href="{$src}/post/:href" class="col col-3 middle">
                <img src="{$file}:img" alt=":title" />
            </a>
            <div class="col col-7 middle description">
                <a href="{$src}/post/:href" class="comment-title">:title</a>
                <span class="comment-text">:text</span>
            </div>
        </div>
COMMENT;
}

function htmlPagination($page){
    $src = SITE_URL;
    
    return <<<PAGINATION
        <div class="pagination">
            <a href="{$src}{$page}/" class="first">1</a>

            <a href="{$src}{$page}/:prev" class="arrow">
                PREV
                <i class="circle"></i>
            </a>

            <span class="active">
                <input type="text" class="page" value=":page">
            </span>

            <a href="{$src}{$page}/:next" class="arrow">
                <i class="circle"></i>
                NEXT
            </a>
        
            <a href="{$src}{$page}/:last" class="last">
                :last
            </a>
        </div>
PAGINATION;
}

function htmlComments(){
    return <<<COMMENTS
    <div class="comment">
        <div class="comment-title">:author</div>
        <div class="comment-text">:text</div>
    </div>
COMMENTS;
}

?>