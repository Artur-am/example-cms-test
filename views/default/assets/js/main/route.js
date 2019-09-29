function Route(el, collback){
    if(el){
        collback(el);
    }
}
// function Route($page, $collback){
//     let page = window.location.pathname.split('/')[0];
//     let is = ($p) => {
//         if(page == $p){
//             for(let collback of $collback){
//                 window[collback]();
//             }
//         }
//     };

//     if(Array.isArray($page)){
//         for(let p of $page){
//             is(p);
//         }
//     }else{
//         is($page);
//     }
// }