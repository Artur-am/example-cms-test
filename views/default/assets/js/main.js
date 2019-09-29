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
function getXmlHttpRequest(){
	if (window.XMLHttpRequest){
		try{
			return new XMLHttpRequest();
		}
		catch (e){}
	}
	else if (window.ActiveXObject){
		try{
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e){}
		try{
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
		catch (e){}
	}
	return null;
}

function Сloud(el){
    let elWrapper = el.getElementsByClassName("cloud-wrapper")[0];
    let items = elWrapper.getElementsByClassName("cloud-list");

    let maxValue = 0;
    let width = 0;
    let height = 0;
    
    function random(min, max) {
        return ~~( min + Math.random() * (max - min) );
    }

    function _colorPriority(){
        let value = 0;
        let colors = [
            ["rgb(239, 154, 154)","rgb(183, 28, 28)"],["rgb(244, 143, 177)","rgb(136, 14, 79)"],
            ["rgb(206, 147, 216)","rgb(74, 20, 140)"],["rgb(179, 157, 219)","rgb(49, 27, 146)"],
            ["rgb(159, 168, 218)","rgb(26, 35, 126)"],["rgb(144, 202, 249)","rgb(13, 71, 161)"],
            ["rgb(129, 212, 250)","rgb(1, 87, 155)"],["rgb(128, 222, 234)","rgb(0, 96, 100)"],
            ["rgb(128, 203, 196)","rgb(0, 77, 64)"],["rgb(165, 214, 167)","rgb(27, 94, 32)"],
            ["rgb(197, 225, 165)","rgb(51, 105, 30)"],["rgb(230, 238, 156)","rgb(130, 119, 23)"],
            ["rgb(255, 245, 157)","rgb(245, 127, 23)"],["rgb(255, 224, 130)","rgb(255, 111, 0)"],
            ["rgb(255, 204, 128)","rgb(230, 81, 0)"],["rgb(255, 171, 145)","rgb(191, 54, 12)"],
            ["rgb(188, 170, 164)","rgb(62, 39, 35)"],["rgb(238, 238, 238)","rgb(33, 33, 33)"],
            ["rgb(176, 190, 197)","rgb(38, 50, 56)"],
        ];

        this.setColorItem = function(item){
            color = colors[ Math.floor(Math.random() * colors.length) ];
            value = ( maxValue - item.dataset.count );

            item.style.cssText = `
                background-image: linear-gradient(to right, ${color[0]} 0%, ${color[1]} ${ 100 - value }%);
                font-size: ${2 - ("." + value)}em;
            `;
        }
    }

    function _wrapper(){
        this.getSize = function(item){
            item.style.display = "inline-block";
            
            width += item.clientWidth / 4;
            height += item.clientHeight / 4;

            item.style.display = "";
        }

        this.setWrapper = function(){

            elWrapper.style.cssText = `
                width: ${width}px;
                height: ${height}px;
                transform: translateY(-1px) scale(1);
                transition: transform 3s ease;
            `;

        }

        this.positionItem = function(item){
        
            x = random(0, 100);
            y = random(0, 100);

            item.style.cssText += `
                display: table;
                position: absolute;
                top: ${y}%;
                left: ${x}%;
                transform: translate(-${y}%, -${x}%);
            `;

        }

    }

    function _event(){
        function set(obj){
            let transform = '';

            if('y' in obj && 'x' in obj){
                transform = `translate(${obj.y}px, ${obj.x}px)`;
            }
            else if('y' in obj){
                transform = `translateY(${obj.y}px)`;
            }else{
                transform = `translateX(${obj.x}px)`;
            }
            
            if(random(0,2)){
                transform += ' scale('+ ( 1 - ('.' + random(1, 4)) ) +')';
            }

            if(transform == elWrapper.style.transform){
                return set({y: y, x: x});
            }

            elWrapper.style.transform = transform;
        }

        function getZoom(){
            let transform = elWrapper.style.transform;
            let scale = 1;

            if(transform){

                transform = transform.split('scale');
                if(transform.length > 1){
                    scale = +(transform[1].replace(/[(-)]+/g,""));
                }
            }

            return [transform[0], scale];
        }

        this.position = (ev = null) => {
            let yx = function(n){
                return ~~( (n / 10) * random(0, 11) );
            }
            let y = ~~( (height / 2) - yx(height/2) );

            if(random(0, 2)){
                let x = ~~( (width/2) - yx(width/2) );
                set({y: '-' + y, x: '-' + x});
            }else{
                set({y: '-' + y});
            }
        }

        this.transition = (ev) => {
            if(this.eventKey in objEvent){
                objEvent[this.eventKey]();
            }
        }

        this.scroll = (key) => {

            let getCoordinat = (p, _key = 'scroll-bottom', i = 1) => {
                let n =  elWrapper.getBoundingClientRect()[p] - el.getBoundingClientRect()[p];

                if(i > 0){
                    n += 31;
                }else{
                    n -= 31;
                }

                if( (i * n) > (height / 6) ){
                    this.eventKey = _key;
                }
                
                return n; 
            }

            let obj = {
                "top" : () => {
                    return { y: getCoordinat('top') };
                },
                "right" : () => {
                    return { x: getCoordinat('left', 'scrollLeft') };
                },
                "bottom" : () => {
                    return { y: getCoordinat('top', 'scrollTop', -1) };
                },
                "left" : () => {
                    return { x: getCoordinat('left', 'scrollRight', -1) };
                }
            };

            if(key in obj){
                set(obj[key]());
            }

        }

        this.zoomMax = function(){
            let transform = getZoom();
            elWrapper.style.transform = transform[0] + 'scale('+ (transform[1] + .1) +')';
        }

        this.zoomMin = function(){
            let transform = getZoom();
            elWrapper.style.transform = transform[0] + 'scale('+ (transform[1] - .1) +')';
        }


        let objEvent = {
            "position" : this.position,
            "scrollTop" : () => {
                this.scroll("top");
            },
            "scrollRight" : () => {
                this.scroll("right");
            },
            "scrollBottom" : () => {
                this.scroll("bottom");
            },
            "scrollLeft" : () => {
                this.scroll("left");
            },
            "zoomMax" : this.zoomMax,
            "zoomMin" : this.zoomMin
        };
        
        this.eventKey = 'position';
    }

    (function(){

        function iteration(collback){
            for(let item of items){
                collback(item);
            }
        }

        iteration(function(item){
            if (item.dataset.count > maxValue) {
                maxValue = item.dataset.count;
            }
        });

        let color = new _colorPriority();
        
        let wrapper = new _wrapper();
        let event = new _event();

        iteration(function(item){

            color.setColorItem(item);
            wrapper.getSize(item);
            wrapper.positionItem(item);

        });

        wrapper.setWrapper();

        elWrapper.addEventListener("transitionend", event.transition);

        el.addEventListener("mousemove", function(ev){
            let y = ev.clientY;
            let x = ev.clientX;
            let el_coordination = el.getBoundingClientRect();
            let n = 15;

            if( (y - n) <= el_coordination.top ){
                event.eventKey = 'scrollTop';
            }
            else if( (x - n) <= el_coordination.left ){
                event.eventKey = 'scrollLeft';
            }
            else if( (el_coordination.right - n) <= x ){
                event.eventKey = 'scrollRight';
            }
            else if( (el_coordination.bottom - n) <= y ){
                event.eventKey = 'scrollBottom';
            }else{
            }
        });
        
        el.addEventListener("mouseout", function(ev){
            if(-1 < ev.relatedTarget.classList.value.indexOf("cloud")){ return; }
            event.eventKey = 'position';
        });
        
        el.addEventListener("wheel", function(ev){
            ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);
            
            if( (ev.deltaY || ev.detail || ev.wheelDelta) > 0){
                event.eventKey= 'zoomMin';
            }else{
                event.eventKey= 'zoomMax';
            }
    
        });

    }());

}
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIFJvdXRlKGVsLCBjb2xsYmFjayl7XHJcbiAgICBpZihlbCl7XHJcbiAgICAgICAgY29sbGJhY2soZWwpO1xyXG4gICAgfVxyXG59XHJcbi8vIGZ1bmN0aW9uIFJvdXRlKCRwYWdlLCAkY29sbGJhY2spe1xyXG4vLyAgICAgbGV0IHBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVswXTtcclxuLy8gICAgIGxldCBpcyA9ICgkcCkgPT4ge1xyXG4vLyAgICAgICAgIGlmKHBhZ2UgPT0gJHApe1xyXG4vLyAgICAgICAgICAgICBmb3IobGV0IGNvbGxiYWNrIG9mICRjb2xsYmFjayl7XHJcbi8vICAgICAgICAgICAgICAgICB3aW5kb3dbY29sbGJhY2tdKCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9O1xyXG5cclxuLy8gICAgIGlmKEFycmF5LmlzQXJyYXkoJHBhZ2UpKXtcclxuLy8gICAgICAgICBmb3IobGV0IHAgb2YgJHBhZ2Upe1xyXG4vLyAgICAgICAgICAgICBpcyhwKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9ZWxzZXtcclxuLy8gICAgICAgICBpcygkcGFnZSk7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuZnVuY3Rpb24gZ2V0WG1sSHR0cFJlcXVlc3QoKXtcclxuXHRpZiAod2luZG93LlhNTEh0dHBSZXF1ZXN0KXtcclxuXHRcdHRyeXtcclxuXHRcdFx0cmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpe31cclxuXHR9XHJcblx0ZWxzZSBpZiAod2luZG93LkFjdGl2ZVhPYmplY3Qpe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7XHJcblx0XHR9IGNhdGNoIChlKXt9XHJcblx0XHR0cnl7XHJcblx0XHRcdHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKXt9XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiDQoWxvdWQoZWwpe1xyXG4gICAgbGV0IGVsV3JhcHBlciA9IGVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG91ZC13cmFwcGVyXCIpWzBdO1xyXG4gICAgbGV0IGl0ZW1zID0gZWxXcmFwcGVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG91ZC1saXN0XCIpO1xyXG5cclxuICAgIGxldCBtYXhWYWx1ZSA9IDA7XHJcbiAgICBsZXQgd2lkdGggPSAwO1xyXG4gICAgbGV0IGhlaWdodCA9IDA7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiB+figgbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2NvbG9yUHJpb3JpdHkoKXtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIGxldCBjb2xvcnMgPSBbXHJcbiAgICAgICAgICAgIFtcInJnYigyMzksIDE1NCwgMTU0KVwiLFwicmdiKDE4MywgMjgsIDI4KVwiXSxbXCJyZ2IoMjQ0LCAxNDMsIDE3NylcIixcInJnYigxMzYsIDE0LCA3OSlcIl0sXHJcbiAgICAgICAgICAgIFtcInJnYigyMDYsIDE0NywgMjE2KVwiLFwicmdiKDc0LCAyMCwgMTQwKVwiXSxbXCJyZ2IoMTc5LCAxNTcsIDIxOSlcIixcInJnYig0OSwgMjcsIDE0NilcIl0sXHJcbiAgICAgICAgICAgIFtcInJnYigxNTksIDE2OCwgMjE4KVwiLFwicmdiKDI2LCAzNSwgMTI2KVwiXSxbXCJyZ2IoMTQ0LCAyMDIsIDI0OSlcIixcInJnYigxMywgNzEsIDE2MSlcIl0sXHJcbiAgICAgICAgICAgIFtcInJnYigxMjksIDIxMiwgMjUwKVwiLFwicmdiKDEsIDg3LCAxNTUpXCJdLFtcInJnYigxMjgsIDIyMiwgMjM0KVwiLFwicmdiKDAsIDk2LCAxMDApXCJdLFxyXG4gICAgICAgICAgICBbXCJyZ2IoMTI4LCAyMDMsIDE5NilcIixcInJnYigwLCA3NywgNjQpXCJdLFtcInJnYigxNjUsIDIxNCwgMTY3KVwiLFwicmdiKDI3LCA5NCwgMzIpXCJdLFxyXG4gICAgICAgICAgICBbXCJyZ2IoMTk3LCAyMjUsIDE2NSlcIixcInJnYig1MSwgMTA1LCAzMClcIl0sW1wicmdiKDIzMCwgMjM4LCAxNTYpXCIsXCJyZ2IoMTMwLCAxMTksIDIzKVwiXSxcclxuICAgICAgICAgICAgW1wicmdiKDI1NSwgMjQ1LCAxNTcpXCIsXCJyZ2IoMjQ1LCAxMjcsIDIzKVwiXSxbXCJyZ2IoMjU1LCAyMjQsIDEzMClcIixcInJnYigyNTUsIDExMSwgMClcIl0sXHJcbiAgICAgICAgICAgIFtcInJnYigyNTUsIDIwNCwgMTI4KVwiLFwicmdiKDIzMCwgODEsIDApXCJdLFtcInJnYigyNTUsIDE3MSwgMTQ1KVwiLFwicmdiKDE5MSwgNTQsIDEyKVwiXSxcclxuICAgICAgICAgICAgW1wicmdiKDE4OCwgMTcwLCAxNjQpXCIsXCJyZ2IoNjIsIDM5LCAzNSlcIl0sW1wicmdiKDIzOCwgMjM4LCAyMzgpXCIsXCJyZ2IoMzMsIDMzLCAzMylcIl0sXHJcbiAgICAgICAgICAgIFtcInJnYigxNzYsIDE5MCwgMTk3KVwiLFwicmdiKDM4LCA1MCwgNTYpXCJdLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q29sb3JJdGVtID0gZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGNvbG9yID0gY29sb3JzWyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKSBdO1xyXG4gICAgICAgICAgICB2YWx1ZSA9ICggbWF4VmFsdWUgLSBpdGVtLmRhdGFzZXQuY291bnQgKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtjb2xvclswXX0gMCUsICR7Y29sb3JbMV19ICR7IDEwMCAtIHZhbHVlIH0lKTtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogJHsyIC0gKFwiLlwiICsgdmFsdWUpfWVtO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfd3JhcHBlcigpe1xyXG4gICAgICAgIHRoaXMuZ2V0U2l6ZSA9IGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2lkdGggKz0gaXRlbS5jbGllbnRXaWR0aCAvIDQ7XHJcbiAgICAgICAgICAgIGhlaWdodCArPSBpdGVtLmNsaWVudEhlaWdodCAvIDQ7XHJcblxyXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRXcmFwcGVyID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIGVsV3JhcHBlci5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICR7d2lkdGh9cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICR7aGVpZ2h0fXB4O1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpIHNjYWxlKDEpO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDNzIGVhc2U7XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbkl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICBcclxuICAgICAgICAgICAgeCA9IHJhbmRvbSgwLCAxMDApO1xyXG4gICAgICAgICAgICB5ID0gcmFuZG9tKDAsIDEwMCk7XHJcblxyXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNzc1RleHQgKz0gYFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogdGFibGU7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgICAgICB0b3A6ICR7eX0lO1xyXG4gICAgICAgICAgICAgICAgbGVmdDogJHt4fSU7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtJHt5fSUsIC0ke3h9JSk7XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2V2ZW50KCl7XHJcbiAgICAgICAgZnVuY3Rpb24gc2V0KG9iail7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKCd5JyBpbiBvYmogJiYgJ3gnIGluIG9iail7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7b2JqLnl9cHgsICR7b2JqLnh9cHgpYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCd5JyBpbiBvYmope1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtvYmoueX1weClgO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2JqLnh9cHgpYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYocmFuZG9tKDAsMikpe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtICs9ICcgc2NhbGUoJysgKCAxIC0gKCcuJyArIHJhbmRvbSgxLCA0KSkgKSArJyknO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0cmFuc2Zvcm0gPT0gZWxXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0KHt5OiB5LCB4OiB4fSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRab29tKCl7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSBlbFdyYXBwZXIuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICBsZXQgc2NhbGUgPSAxO1xyXG5cclxuICAgICAgICAgICAgaWYodHJhbnNmb3JtKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm0uc3BsaXQoJ3NjYWxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZih0cmFuc2Zvcm0ubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSArKHRyYW5zZm9ybVsxXS5yZXBsYWNlKC9bKC0pXSsvZyxcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbdHJhbnNmb3JtWzBdLCBzY2FsZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gKGV2ID0gbnVsbCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeXggPSBmdW5jdGlvbihuKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB+figgKG4gLyAxMCkgKiByYW5kb20oMCwgMTEpICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHkgPSB+figgKGhlaWdodCAvIDIpIC0geXgoaGVpZ2h0LzIpICk7XHJcblxyXG4gICAgICAgICAgICBpZihyYW5kb20oMCwgMikpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSB+figgKHdpZHRoLzIpIC0geXgod2lkdGgvMikgKTtcclxuICAgICAgICAgICAgICAgIHNldCh7eTogJy0nICsgeSwgeDogJy0nICsgeH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNldCh7eTogJy0nICsgeX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSAoZXYpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5ldmVudEtleSBpbiBvYmpFdmVudCl7XHJcbiAgICAgICAgICAgICAgICBvYmpFdmVudFt0aGlzLmV2ZW50S2V5XSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbCA9IChrZXkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBnZXRDb29yZGluYXQgPSAocCwgX2tleSA9ICdzY3JvbGwtYm90dG9tJywgaSA9IDEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBuID0gIGVsV3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtwXSAtIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3BdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGkgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBuICs9IDMxO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbiAtPSAzMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiggKGkgKiBuKSA+IChoZWlnaHQgLyA2KSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRLZXkgPSBfa2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbjsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICBcInRvcFwiIDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHk6IGdldENvb3JkaW5hdCgndG9wJykgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogZ2V0Q29vcmRpbmF0KCdsZWZ0JywgJ3Njcm9sbExlZnQnKSB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgeTogZ2V0Q29vcmRpbmF0KCd0b3AnLCAnc2Nyb2xsVG9wJywgLTEpIH07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJsZWZ0XCIgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogZ2V0Q29vcmRpbmF0KCdsZWZ0JywgJ3Njcm9sbFJpZ2h0JywgLTEpIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZihrZXkgaW4gb2JqKXtcclxuICAgICAgICAgICAgICAgIHNldChvYmpba2V5XSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuem9vbU1heCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSBnZXRab29tKCk7XHJcbiAgICAgICAgICAgIGVsV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1bMF0gKyAnc2NhbGUoJysgKHRyYW5zZm9ybVsxXSArIC4xKSArJyknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy56b29tTWluID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IGdldFpvb20oKTtcclxuICAgICAgICAgICAgZWxXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVswXSArICdzY2FsZSgnKyAodHJhbnNmb3JtWzFdIC0gLjEpICsnKSc7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IG9iakV2ZW50ID0ge1xyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCIgOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICBcInNjcm9sbFRvcFwiIDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwoXCJ0b3BcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2Nyb2xsUmlnaHRcIiA6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsKFwicmlnaHRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2Nyb2xsQm90dG9tXCIgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbChcImJvdHRvbVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY3JvbGxMZWZ0XCIgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbChcImxlZnRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiem9vbU1heFwiIDogdGhpcy56b29tTWF4LFxyXG4gICAgICAgICAgICBcInpvb21NaW5cIiA6IHRoaXMuem9vbU1pblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ldmVudEtleSA9ICdwb3NpdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGl0ZXJhdGlvbihjb2xsYmFjayl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiBpdGVtcyl7XHJcbiAgICAgICAgICAgICAgICBjb2xsYmFjayhpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlcmF0aW9uKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0LmNvdW50ID4gbWF4VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG1heFZhbHVlID0gaXRlbS5kYXRhc2V0LmNvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBjb2xvciA9IG5ldyBfY29sb3JQcmlvcml0eSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB3cmFwcGVyID0gbmV3IF93cmFwcGVyKCk7XHJcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IF9ldmVudCgpO1xyXG5cclxuICAgICAgICBpdGVyYXRpb24oZnVuY3Rpb24oaXRlbSl7XHJcblxyXG4gICAgICAgICAgICBjb2xvci5zZXRDb2xvckl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgIHdyYXBwZXIuZ2V0U2l6ZShpdGVtKTtcclxuICAgICAgICAgICAgd3JhcHBlci5wb3NpdGlvbkl0ZW0oaXRlbSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3cmFwcGVyLnNldFdyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgZWxXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGV2ZW50LnRyYW5zaXRpb24pO1xyXG5cclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGV2KXtcclxuICAgICAgICAgICAgbGV0IHkgPSBldi5jbGllbnRZO1xyXG4gICAgICAgICAgICBsZXQgeCA9IGV2LmNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCBlbF9jb29yZGluYXRpb24gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGV0IG4gPSAxNTtcclxuXHJcbiAgICAgICAgICAgIGlmKCAoeSAtIG4pIDw9IGVsX2Nvb3JkaW5hdGlvbi50b3AgKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmV2ZW50S2V5ID0gJ3Njcm9sbFRvcCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiggKHggLSBuKSA8PSBlbF9jb29yZGluYXRpb24ubGVmdCApe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuZXZlbnRLZXkgPSAnc2Nyb2xsTGVmdCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiggKGVsX2Nvb3JkaW5hdGlvbi5yaWdodCAtIG4pIDw9IHggKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmV2ZW50S2V5ID0gJ3Njcm9sbFJpZ2h0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCAoZWxfY29vcmRpbmF0aW9uLmJvdHRvbSAtIG4pIDw9IHkgKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmV2ZW50S2V5ID0gJ3Njcm9sbEJvdHRvbSc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGV2KXtcclxuICAgICAgICAgICAgaWYoLTEgPCBldi5yZWxhdGVkVGFyZ2V0LmNsYXNzTGlzdC52YWx1ZS5pbmRleE9mKFwiY2xvdWRcIikpeyByZXR1cm47IH1cclxuICAgICAgICAgICAgZXZlbnQuZXZlbnRLZXkgPSAncG9zaXRpb24nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0ID8gZXYucHJldmVudERlZmF1bHQoKSA6IChldi5yZXR1cm5WYWx1ZSA9IGZhbHNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCAoZXYuZGVsdGFZIHx8IGV2LmRldGFpbCB8fCBldi53aGVlbERlbHRhKSA+IDApe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuZXZlbnRLZXk9ICd6b29tTWluJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBldmVudC5ldmVudEtleT0gJ3pvb21NYXgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KCkpO1xyXG5cclxufVxyXG5mdW5jdGlvbiBjb21tZW50cyhlbCl7XHJcbiAgICBsZXQgbiA9IDA7XHJcbiAgICBmdW5jdGlvbiBEYXRhKCl7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gZWwuZWxlbWVudHM7XHJcblxyXG4gICAgICAgIGxldCB2YWxpZCA9IGZ1bmN0aW9uKGlucHV0LCBjb2xsYmFjayl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZih2YWx1ZS5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgb3JhbmdlcmVkXCI7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5wbGFjZWhvbGRlciA9ICfQt9Cw0L/QvtC70L3QuNGC0LUg0L/QvtC70LUnO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbGxiYWNrKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIGVsZW1lbnRzLm5hbWUgIT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICB2YWxpZChlbGVtZW50cy5uYW1lLCAodmFsdWUpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIG4rKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHR5cGVvZiBlbGVtZW50cy5lbWFpbCAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHZhbGlkKGVsZW1lbnRzLmVtYWlsLCAodmFsdWUpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtYWlsID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFsaWQoZWxlbWVudHMuY29tbWVudCwgKHZhbHVlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgbisrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBBZGRDb21tZW50KGRhdGEpe1xyXG4gICAgICAgIGxldCBjb21tZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudHNcIik7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gZWwuZWxlbWVudHM7XHJcbiAgICAgICAgbGV0IGNvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgY29tbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tbWVudFwiKTtcclxuXHJcbiAgICAgICAgY29tbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC10aXRsZVwiPiR7ZGF0YS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtdGV4dFwiPiR7ZGF0YS5jb21tZW50fTwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbW1lbnRzLmFwcGVuZENoaWxkKGNvbW1lbnQpO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgZWxlbWVudHMubmFtZSAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLm5hbWUudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBlbGVtZW50cy5lbWFpbCAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmVtYWlsLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnRzLmNvbW1lbnQudmFsdWUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTdWJtaXRGb3JtKGV2KXtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBEYXRhKCk7XHJcbiAgICAgICAgaWYobiA9PSAzIHx8IDEpe1xyXG4gICAgICAgICAgICBsZXQgcmVxID0gZ2V0WG1sSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXEuc3RhdHVzICE9IDIwMCl7IC8vIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCByZXEucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0cnVlID09IHJlcS5yZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRDb21tZW50KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IEpTT04ucGFyc2UocmVxLnJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gcmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzW2tleV0gIT09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmVsZW1lbnRzW2tleV0udmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmVsZW1lbnRzW2tleV0uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCBvcmFuZ2VyZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuZWxlbWVudHNba2V5XS5wbGFjZWhvbGRlciA9IHJlc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmVsZW1lbnRzW2tleV0uc3R5bGUuYm9yZGVyID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHJlcS5vcGVuKFwiR0VUXCIsIGFqYXhfdXJsICtcImRhdGE9XCIrIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB0cnVlKTtcclxuICAgICAgICAgICAgcmVxLnNlbmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgU3VibWl0Rm9ybSk7XHJcbn1cclxuZnVuY3Rpb24gcGFnaW5hdGlvbihlbCl7XHJcbiAgICBmdW5jdGlvbiBQYWdpbmF0aW9uKGV2KXtcclxuICAgICAgICBsZXQgcGFnZSA9ICtlbC52YWx1ZTtcclxuICAgICAgICBsZXQgbGFzdCA9ICsoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdpbmF0aW9uIC5sYXN0XCIpLmlubmVyVGV4dCk7XHJcblxyXG4gICAgICAgIGlmKCFpc05hTihwYWdlKSAmJiAhaXNOYU4obGFzdCkpe1xyXG4gICAgICAgICAgICBpZihwYWdlID4gMCAmJiBwYWdlIDw9IGxhc3Qpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cub3JpZ2luICsgXCIvcG9zdHMvXCIgKyBwYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgUGFnaW5hdGlvbik7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgIGlmIChldi5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICBQYWdpbmF0aW9uKGV2KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuU3RyaW5nLnByb3RvdHlwZS5jYXBpdGFsaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMuc2xpY2UoMSk7XHJcbn1cclxuXHJcblJvdXRlKFxyXG4gICAgZG9jdW1lbnQuZm9ybXNbXCJoZWFkZXItc2VhcmNoXCJdLFxyXG4gICAgZnVuY3Rpb24oZWwpe1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9IGVsLmVsZW1lbnRzO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBTdWJtaXRGb3JtKGV2KXtcclxuICAgICAgICAgICAgaWYoZWxlbWVudHMuc2VhcmNoLnZhbHVlLnRyaW0oKS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBTdWJtaXRGb3JtKTtcclxuICAgIH1cclxuKTtcclxuXHJcblJvdXRlKFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3VkLWxpc3RzXCIpWzBdLFxyXG4gICAgZnVuY3Rpb24oZWwpe1xyXG4gICAgICAgINChbG91ZChlbCk7XHJcbiAgICB9XHJcbik7XHJcblxyXG5Sb3V0ZShcclxuICAgIGRvY3VtZW50LmZvcm1zW1wiY29tbWVudHNcIl0sXHJcbiAgICBmdW5jdGlvbihlbCl7XHJcbiAgICAgICAgY29tbWVudHMoZWwpO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuUm91dGUoXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2luYXRpb24gLnBhZ2VcIiksXHJcbiAgICBmdW5jdGlvbihlbCl7XHJcbiAgICAgICAgcGFnaW5hdGlvbihlbCk7XHJcbiAgICB9XHJcbik7Il0sImZpbGUiOiJtYWluLmpzIn0=
