function comments(el){
    let n = 0;
    function Data(){
        let elements = el.elements;

        let valid = function(input, collback){
            let value = input.value = input.value.trim();
            if(value.length <= 0){
                input.value = '';
                input.style.border = "1px solid orangered";
                input.placeholder = 'заполните поле';
            }else{
                collback(value);
            }
        }

        if(typeof elements.name != 'undefined'){
            valid(elements.name, (value)=>{
                this.name = value;
                n++;
            });
        }
        
        if(typeof elements.email != 'undefined'){
            valid(elements.email, (value)=>{
                this.email = value;
                n++;
            });
        }

        valid(elements.comment, (value)=>{
            this.comment = value;
            n++;
        });
        this.token = token;
    }

    function AddComment(data){
        let comments = document.getElementById("comments");
        let elements = el.elements;
        let comment = document.createElement("div");
                comment.classList.add("comment");

        comment.innerHTML = `
                <div class="comment-title">${data.name}</div>
                <div class="comment-text">${data.comment}</div>
        `;

        comments.appendChild(comment);

        if(typeof elements.name != 'undefined'){
            elements.name.value = '';
        }

        if(typeof elements.email != 'undefined'){
            elements.email.value = '';
        }
        elements.comment.value = '';
    }

    function SubmitForm(ev){
        ev.preventDefault();

        let data = new Data();
        if(n == 3 || 1){
            let req = getXmlHttpRequest();
            req.onreadystatechange = function(){
                if(req.readyState == 4){
                    if(req.status != 200){ // error
                    }else{
                        console.log( req.response);
                        if(true == req.response){
                            AddComment(data);
                        }else{
                            try {
                                let res = JSON.parse(req.response);

                                for(let key in res){
                                    if(res[key] !== ''){
                                        el.elements[key].value = '';
                                        el.elements[key].style.border = '1px solid orangered';
                                        el.elements[key].placeholder = res[key];
                                    }else{
                                        el.elements[key].style.border = '';
                                    }
                                }
                            } catch (e) {
                                return false;
                            }
                        }
                    }
                }
            }
        
            req.open("GET", ajax_url +"data="+ JSON.stringify(data), true);
            req.send();
        }

    }

    el.addEventListener("submit", SubmitForm);
}