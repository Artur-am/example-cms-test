//= route.js
//= ajax.js
//= cloud.js
//= add-comment.js
//= pagination.js

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Route(
    document.forms["header-search"],
    function(el){
        let elements = el.elements;

        function SubmitForm(ev){
            if(elements.search.value.trim().length == 0){
                ev.preventDefault();
            }
        }
    
        el.addEventListener("submit", SubmitForm);
    }
);

Route(
    document.getElementsByClassName("cloud-lists")[0],
    function(el){
        Сloud(el);
    }
);

Route(
    document.forms["comments"],
    function(el){
        comments(el);
    }
);

Route(
    document.querySelector(".pagination .page"),
    function(el){
        pagination(el);
    }
);