function pagination(el){
    function Pagination(ev){
        let page = +el.value;
        let last = +(document.querySelector(".pagination .last").innerText);

        if(!isNaN(page) && !isNaN(last)){
            if(page > 0 && page <= last){
                window.location.href = window.origin + "/posts/" + page;
            }
        }
    }

    el.addEventListener("change", Pagination);
    el.addEventListener("keyup", function(ev){
        if (ev.keyCode === 13) {
            Pagination(ev);
        }
    });
}