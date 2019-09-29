
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