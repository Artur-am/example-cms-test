function Route(t,e){t&&e(t)}function getXmlHttpRequest(){if(window.XMLHttpRequest)try{return new XMLHttpRequest}catch(t){}else if(window.ActiveXObject){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}return null}function Сloud(t){let e=t.getElementsByClassName("cloud-wrapper")[0],n=e.getElementsByClassName("cloud-list"),o=0,i=0,l=0;function s(t,e){return~~(t+Math.random()*(e-t))}function r(){let t=0,e=[["rgb(239, 154, 154)","rgb(183, 28, 28)"],["rgb(244, 143, 177)","rgb(136, 14, 79)"],["rgb(206, 147, 216)","rgb(74, 20, 140)"],["rgb(179, 157, 219)","rgb(49, 27, 146)"],["rgb(159, 168, 218)","rgb(26, 35, 126)"],["rgb(144, 202, 249)","rgb(13, 71, 161)"],["rgb(129, 212, 250)","rgb(1, 87, 155)"],["rgb(128, 222, 234)","rgb(0, 96, 100)"],["rgb(128, 203, 196)","rgb(0, 77, 64)"],["rgb(165, 214, 167)","rgb(27, 94, 32)"],["rgb(197, 225, 165)","rgb(51, 105, 30)"],["rgb(230, 238, 156)","rgb(130, 119, 23)"],["rgb(255, 245, 157)","rgb(245, 127, 23)"],["rgb(255, 224, 130)","rgb(255, 111, 0)"],["rgb(255, 204, 128)","rgb(230, 81, 0)"],["rgb(255, 171, 145)","rgb(191, 54, 12)"],["rgb(188, 170, 164)","rgb(62, 39, 35)"],["rgb(238, 238, 238)","rgb(33, 33, 33)"],["rgb(176, 190, 197)","rgb(38, 50, 56)"]];this.setColorItem=function(n){color=e[Math.floor(Math.random()*e.length)],t=o-n.dataset.count,n.style.cssText=`\n                background-image: linear-gradient(to right, ${color[0]} 0%, ${color[1]} ${100-t}%);\n                font-size: ${2-("."+t)}em;\n            `}}function a(){this.getSize=function(t){t.style.display="inline-block",i+=t.clientWidth/4,l+=t.clientHeight/4,t.style.display=""},this.setWrapper=function(){e.style.cssText=`\n                width: ${i}px;\n                height: ${l}px;\n                transform: translateY(-1px) scale(1);\n                transition: transform 3s ease;\n            `},this.positionItem=function(t){x=s(0,100),y=s(0,100),t.style.cssText+=`\n                display: table;\n                position: absolute;\n                top: ${y}%;\n                left: ${x}%;\n                transform: translate(-${y}%, -${x}%);\n            `}}function c(){function n(t){let o="";if(o="y"in t&&"x"in t?`translate(${t.y}px, ${t.x}px)`:"y"in t?`translateY(${t.y}px)`:`translateX(${t.x}px)`,s(0,2)&&(o+=" scale("+(1-("."+s(1,4)))+")"),o==e.style.transform)return n({y:y,x:x});e.style.transform=o}function o(){let t=e.style.transform,n=1;return t&&(t=t.split("scale")).length>1&&(n=+t[1].replace(/[(-)]+/g,"")),[t[0],n]}this.position=((t=null)=>{let e=function(t){return~~(t/10*s(0,11))},o=~~(l/2-e(l/2));if(s(0,2)){n({y:"-"+o,x:"-"+~~(i/2-e(i/2))})}else n({y:"-"+o})}),this.transition=(t=>{this.eventKey in r&&r[this.eventKey]()}),this.scroll=(o=>{let i=(n,o="scroll-bottom",i=1)=>{let s=e.getBoundingClientRect()[n]-t.getBoundingClientRect()[n];return i>0?s+=31:s-=31,i*s>l/6&&(this.eventKey=o),s},s={top:()=>({y:i("top")}),right:()=>({x:i("left","scrollLeft")}),bottom:()=>({y:i("top","scrollTop",-1)}),left:()=>({x:i("left","scrollRight",-1)})};o in s&&n(s[o]())}),this.zoomMax=function(){let t=o();e.style.transform=t[0]+"scale("+(t[1]+.1)+")"},this.zoomMin=function(){let t=o();e.style.transform=t[0]+"scale("+(t[1]-.1)+")"};let r={position:this.position,scrollTop:()=>{this.scroll("top")},scrollRight:()=>{this.scroll("right")},scrollBottom:()=>{this.scroll("bottom")},scrollLeft:()=>{this.scroll("left")},zoomMax:this.zoomMax,zoomMin:this.zoomMin};this.eventKey="position"}!function(){function i(t){for(let e of n)t(e)}i(function(t){t.dataset.count>o&&(o=t.dataset.count)});let l=new r,s=new a,u=new c;i(function(t){l.setColorItem(t),s.getSize(t),s.positionItem(t)}),s.setWrapper(),e.addEventListener("transitionend",u.transition),t.addEventListener("mousemove",function(e){let n=e.clientY,o=e.clientX,i=t.getBoundingClientRect();n-15<=i.top?u.eventKey="scrollTop":o-15<=i.left?u.eventKey="scrollLeft":i.right-15<=o?u.eventKey="scrollRight":i.bottom-15<=n&&(u.eventKey="scrollBottom")}),t.addEventListener("mouseout",function(t){-1<t.relatedTarget.classList.value.indexOf("cloud")||(u.eventKey="position")}),t.addEventListener("wheel",function(t){t.preventDefault?t.preventDefault():t.returnValue=!1,(t.deltaY||t.detail||t.wheelDelta)>0?u.eventKey="zoomMin":u.eventKey="zoomMax"})}()}function comments(t){function e(){let e=t.elements,n=function(t,e){let n=t.value=t.value.trim();n.length<=0?(t.value="",t.style.border="1px solid orangered",t.placeholder="заполните поле"):e(n)};void 0!==e.name&&n(e.name,t=>{this.name=t,0}),void 0!==e.email&&n(e.email,t=>{this.email=t,0}),n(e.comment,t=>{this.comment=t,0}),this.token=token}t.addEventListener("submit",function(n){n.preventDefault();let o=new e;{let e=getXmlHttpRequest();e.onreadystatechange=function(){if(4==e.readyState)if(200!=e.status);else if(console.log(e.response),1==e.response)!function(e){let n=document.getElementById("comments"),o=t.elements,i=document.createElement("div");i.classList.add("comment"),i.innerHTML=`\n                <div class="comment-title">${e.name}</div>\n                <div class="comment-text">${e.comment}</div>\n        `,n.appendChild(i),void 0!==o.name&&(o.name.value=""),void 0!==o.email&&(o.email.value=""),o.comment.value=""}(o);else try{let n=JSON.parse(e.response);for(let e in n)""!==n[e]?(t.elements[e].value="",t.elements[e].style.border="1px solid orangered",t.elements[e].placeholder=n[e]):t.elements[e].style.border=""}catch(t){return!1}},e.open("GET",ajax_url+"data="+JSON.stringify(o),!0),e.send()}})}function pagination(t){function e(e){let n=+t.value,o=+document.querySelector(".pagination .last").innerText;isNaN(n)||isNaN(o)||n>0&&n<=o&&(window.location.href=window.origin+"/posts/"+n)}t.addEventListener("change",e),t.addEventListener("keyup",function(t){13===t.keyCode&&e()})}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},Route(document.forms["header-search"],function(t){let e=t.elements;t.addEventListener("submit",function(t){0==e.search.value.trim().length&&t.preventDefault()})}),Route(document.getElementsByClassName("cloud-lists")[0],function(t){Сloud(t)}),Route(document.forms.comments,function(t){comments(t)}),Route(document.querySelector(".pagination .page"),function(t){pagination(t)});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiUm91dGUiLCJlbCIsImNvbGxiYWNrIiwiZ2V0WG1sSHR0cFJlcXVlc3QiLCJ3aW5kb3ciLCJYTUxIdHRwUmVxdWVzdCIsImUiLCJBY3RpdmVYT2JqZWN0Iiwi0KFsb3VkIiwiZWxXcmFwcGVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIml0ZW1zIiwibWF4VmFsdWUiLCJ3aWR0aCIsImhlaWdodCIsInJhbmRvbSIsIm1pbiIsIm1heCIsIk1hdGgiLCJfY29sb3JQcmlvcml0eSIsInZhbHVlIiwiY29sb3JzIiwidGhpcyIsInNldENvbG9ySXRlbSIsIml0ZW0iLCJjb2xvciIsImZsb29yIiwibGVuZ3RoIiwiZGF0YXNldCIsImNvdW50Iiwic3R5bGUiLCJjc3NUZXh0IiwiX3dyYXBwZXIiLCJnZXRTaXplIiwiZGlzcGxheSIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0Iiwic2V0V3JhcHBlciIsInBvc2l0aW9uSXRlbSIsIngiLCJ5IiwiX2V2ZW50Iiwic2V0Iiwib2JqIiwidHJhbnNmb3JtIiwiZ2V0Wm9vbSIsInNjYWxlIiwic3BsaXQiLCJyZXBsYWNlIiwicG9zaXRpb24iLCJldiIsInl4IiwibiIsInRyYW5zaXRpb24iLCJldmVudEtleSIsIm9iakV2ZW50Iiwic2Nyb2xsIiwia2V5IiwiZ2V0Q29vcmRpbmF0IiwicCIsIl9rZXkiLCJpIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0Iiwiem9vbU1heCIsInpvb21NaW4iLCJzY3JvbGxUb3AiLCJzY3JvbGxSaWdodCIsInNjcm9sbEJvdHRvbSIsInNjcm9sbExlZnQiLCJpdGVyYXRpb24iLCJ3cmFwcGVyIiwiZXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xpZW50WSIsImNsaWVudFgiLCJlbF9jb29yZGluYXRpb24iLCJyZWxhdGVkVGFyZ2V0IiwiY2xhc3NMaXN0IiwiaW5kZXhPZiIsInByZXZlbnREZWZhdWx0IiwicmV0dXJuVmFsdWUiLCJkZWx0YVkiLCJkZXRhaWwiLCJ3aGVlbERlbHRhIiwiY29tbWVudHMiLCJEYXRhIiwiZWxlbWVudHMiLCJ2YWxpZCIsImlucHV0IiwidHJpbSIsImJvcmRlciIsInBsYWNlaG9sZGVyIiwibmFtZSIsImVtYWlsIiwiY29tbWVudCIsInRva2VuIiwiZGF0YSIsInJlcSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiQWRkQ29tbWVudCIsInJlcyIsIkpTT04iLCJwYXJzZSIsIm9wZW4iLCJhamF4X3VybCIsInN0cmluZ2lmeSIsInNlbmQiLCJwYWdpbmF0aW9uIiwiUGFnaW5hdGlvbiIsInBhZ2UiLCJsYXN0IiwicXVlcnlTZWxlY3RvciIsImlzTmFOIiwibG9jYXRpb24iLCJocmVmIiwib3JpZ2luIiwia2V5Q29kZSIsIlN0cmluZyIsInByb3RvdHlwZSIsImNhcGl0YWxpemUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiZm9ybXMiLCJzZWFyY2giXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLE1BQU1DLEVBQUlDLEdBQ1pELEdBQ0NDLEVBQVNELEdBcUJqQixTQUFTRSxvQkFDUixHQUFJQyxPQUFPQyxlQUNWLElBQ0MsT0FBTyxJQUFJQSxlQUVaLE1BQU9DLFNBRUgsR0FBSUYsT0FBT0csY0FBYyxDQUM3QixJQUNDLE9BQU8sSUFBSUEsY0FBYyxrQkFDeEIsTUFBT0QsSUFDVCxJQUNDLE9BQU8sSUFBSUMsY0FBYyxxQkFFMUIsTUFBT0QsS0FFUixPQUFPLEtBR1IsU0FBU0UsTUFBTVAsR0FDWCxJQUFJUSxFQUFZUixFQUFHUyx1QkFBdUIsaUJBQWlCLEdBQ3ZEQyxFQUFRRixFQUFVQyx1QkFBdUIsY0FFekNFLEVBQVcsRUFDWEMs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RCxNQUNJNEcsU0FBU2tCLGNBQWMscUJBQ3ZCLFNBQVM3SCxHQUNMeUgsV0FBV3pIIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUm91dGUoZWwsIGNvbGxiYWNrKXtcclxuICAgIGlmKGVsKXtcclxuICAgICAgICBjb2xsYmFjayhlbCk7XHJcbiAgICB9XHJcbn1cclxuLy8gZnVuY3Rpb24gUm91dGUoJHBhZ2UsICRjb2xsYmFjayl7XHJcbi8vICAgICBsZXQgcGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzBdO1xyXG4vLyAgICAgbGV0IGlzID0gKCRwKSA9PiB7XHJcbi8vICAgICAgICAgaWYocGFnZSA9PSAkcCl7XHJcbi8vICAgICAgICAgICAgIGZvcihsZXQgY29sbGJhY2sgb2YgJGNvbGxiYWNrKXtcclxuLy8gICAgICAgICAgICAgICAgIHdpbmRvd1tjb2xsYmFja10oKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH07XHJcblxyXG4vLyAgICAgaWYoQXJyYXkuaXNBcnJheSgkcGFnZSkpe1xyXG4vLyAgICAgICAgIGZvcihsZXQgcCBvZiAkcGFnZSl7XHJcbi8vICAgICAgICAgICAgIGlzKHApO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1lbHNle1xyXG4vLyAgICAgICAgIGlzKCRwYWdlKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5mdW5jdGlvbiBnZXRYbWxIdHRwUmVxdWVzdCgpe1xyXG5cdGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3Qpe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSl7fVxyXG5cdH1cclxuXHRlbHNlIGlmICh3aW5kb3cuQWN0aXZlWE9iamVjdCl7XHJcblx0XHR0cnl7XHJcblx0XHRcdHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTtcclxuXHRcdH0gY2F0Y2ggKGUpe31cclxuXHRcdHRyeXtcclxuXHRcdFx0cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpe31cclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uINChbG91ZChlbCl7XHJcbiAgICBsZXQgZWxXcmFwcGVyID0gZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3VkLXdyYXBwZXJcIilbMF07XHJcbiAgICBsZXQgaXRlbXMgPSBlbFdyYXBwZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3VkLWxpc3RcIik7XHJcblxyXG4gICAgbGV0IG1heFZhbHVlID0gMDtcclxuICAgIGxldCB3aWR0aCA9IDA7XHJcbiAgICBsZXQgaGVpZ2h0ID0gMDtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KCBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfY29sb3JQcmlvcml0eSgpe1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XHJcbiAgICAgICAgbGV0IGNvbG9ycyA9IFtcclxuICAgICAgICAgICAgW1wicmdiKDIzOSwgMTU0LCAxNTQpXCIsXCJyZ2IoMTgzLCAyOCwgMjgpXCJdLFtcInJnYigyNDQsIDE0MywgMTc3KVwiLFwicmdiKDEzNiwgMTQsIDc5KVwiXSxcclxuICAgICAgICAgICAgW1wicmdiKDIwNiwgMTQ3LCAyMTYpXCIsXCJyZ2IoNzQsIDIwLCAxNDApXCJdLFtcInJnYigxNzksIDE1NywgMjE5KVwiLFwicmdiKDQ5LCAyNywgMTQ2KVwiXSxcclxuICAgICAgICAgICAgW1wicmdiKDE1OSwgMTY4LCAyMTgpXCIsXCJyZ2IoMjYsIDM1LCAxMjYpXCJdLFtcInJnYigxNDQsIDIwMiwgMjQ5KVwiLFwicmdiKDEzLCA3MSwgMTYxKVwiXSxcclxuICAgICAgICAgICAgW1wicmdiKDEyOSwgMjEyLCAyNTApXCIsXCJyZ2IoMSwgODcsIDE1NSlcIl0sW1wicmdiKDEyOCwgMjIyLCAyMzQpXCIsXCJyZ2IoMCwgOTYsIDEwMClcIl0sXHJcbiAgICAgICAgICAgIFtcInJnYigxMjgsIDIwMywgMTk2KVwiLFwicmdiKDAsIDc3LCA2NClcIl0sW1wicmdiKDE2NSwgMjE0LCAxNjcpXCIsXCJyZ2IoMjcsIDk0LCAzMilcIl0sXHJcbiAgICAgICAgICAgIFtcInJnYigxOTcsIDIyNSwgMTY1KVwiLFwicmdiKDUxLCAxMDUsIDMwKVwiXSxbXCJyZ2IoMjMwLCAyMzgsIDE1NilcIixcInJnYigxMzAsIDExOSwgMjMpXCJdLFxyXG4gICAgICAgICAgICBbXCJyZ2IoMjU1LCAyNDUsIDE1NylcIixcInJnYigyNDUsIDEyNywgMjMpXCJdLFtcInJnYigyNTUsIDIyNCwgMTMwKVwiLFwicmdiKDI1NSwgMTExLCAwKVwiXSxcclxuICAgICAgICAgICAgW1wicmdiKDI1NSwgMjA0LCAxMjgpXCIsXCJyZ2IoMjMwLCA4MSwgMClcIl0sW1wicmdiKDI1NSwgMTcxLCAxNDUpXCIsXCJyZ2IoMTkxLCA1NCwgMTIpXCJdLFxyXG4gICAgICAgICAgICBbXCJyZ2IoMTg4LCAxNzAsIDE2NClcIixcInJnYig2MiwgMzksIDM1KVwiXSxbXCJyZ2IoMjM4LCAyMzgsIDIzOClcIixcInJnYigzMywgMzMsIDMzKVwiXSxcclxuICAgICAgICAgICAgW1wicmdiKDE3NiwgMTkwLCAxOTcpXCIsXCJyZ2IoMzgsIDUwLCA1NilcIl0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRDb2xvckl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgY29sb3IgPSBjb2xvcnNbIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpIF07XHJcbiAgICAgICAgICAgIHZhbHVlID0gKCBtYXhWYWx1ZSAtIGl0ZW0uZGF0YXNldC5jb3VudCApO1xyXG5cclxuICAgICAgICAgICAgaXRlbS5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke2NvbG9yWzBdfSAwJSwgJHtjb2xvclsxXX0gJHsgMTAwIC0gdmFsdWUgfSUpO1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAkezIgLSAoXCIuXCIgKyB2YWx1ZSl9ZW07XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF93cmFwcGVyKCl7XHJcbiAgICAgICAgdGhpcy5nZXRTaXplID0gZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3aWR0aCArPSBpdGVtLmNsaWVudFdpZHRoIC8gNDtcclxuICAgICAgICAgICAgaGVpZ2h0ICs9IGl0ZW0uY2xpZW50SGVpZ2h0IC8gNDtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFdyYXBwZXIgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgZWxXcmFwcGVyLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJHt3aWR0aH1weDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJHtoZWlnaHR9cHg7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCkgc2NhbGUoMSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gM3MgZWFzZTtcclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBvc2l0aW9uSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB4ID0gcmFuZG9tKDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHkgPSByYW5kb20oMCwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuY3NzVGV4dCArPSBgXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiB0YWJsZTtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgICAgIHRvcDogJHt5fSU7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAke3h9JTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0ke3l9JSwgLSR7eH0lKTtcclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfZXZlbnQoKXtcclxuICAgICAgICBmdW5jdGlvbiBzZXQob2JqKXtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYoJ3knIGluIG9iaiAmJiAneCcgaW4gb2JqKXtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtvYmoueX1weCwgJHtvYmoueH1weClgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoJ3knIGluIG9iail7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke29iai55fXB4KWA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvYmoueH1weClgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihyYW5kb20oMCwyKSl7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gKz0gJyBzY2FsZSgnKyAoIDEgLSAoJy4nICsgcmFuZG9tKDEsIDQpKSApICsnKSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRyYW5zZm9ybSA9PSBlbFdyYXBwZXIuc3R5bGUudHJhbnNmb3JtKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXQoe3k6IHksIHg6IHh9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFpvb20oKXtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IGVsV3JhcHBlci5zdHlsZS50cmFuc2Zvcm07XHJcbiAgICAgICAgICAgIGxldCBzY2FsZSA9IDE7XHJcblxyXG4gICAgICAgICAgICBpZih0cmFuc2Zvcm0pe1xyXG5cclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5zcGxpdCgnc2NhbGUnKTtcclxuICAgICAgICAgICAgICAgIGlmKHRyYW5zZm9ybS5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzY2FsZSA9ICsodHJhbnNmb3JtWzFdLnJlcGxhY2UoL1soLSldKy9nLFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFt0cmFuc2Zvcm1bMF0sIHNjYWxlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSAoZXYgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB5eCA9IGZ1bmN0aW9uKG4pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIH5+KCAobiAvIDEwKSAqIHJhbmRvbSgwLCAxMSkgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgeSA9IH5+KCAoaGVpZ2h0IC8gMikgLSB5eChoZWlnaHQvMikgKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHJhbmRvbSgwLCAyKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IH5+KCAod2lkdGgvMikgLSB5eCh3aWR0aC8yKSApO1xyXG4gICAgICAgICAgICAgICAgc2V0KHt5OiAnLScgKyB5LCB4OiAnLScgKyB4fSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2V0KHt5OiAnLScgKyB5fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IChldikgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLmV2ZW50S2V5IGluIG9iakV2ZW50KXtcclxuICAgICAgICAgICAgICAgIG9iakV2ZW50W3RoaXMuZXZlbnRLZXldKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsID0gKGtleSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGdldENvb3JkaW5hdCA9IChwLCBfa2V5ID0gJ3Njcm9sbC1ib3R0b20nLCBpID0gMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSAgZWxXcmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3BdIC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbcF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaSA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIG4gKz0gMzE7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBuIC09IDMxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKCAoaSAqIG4pID4gKGhlaWdodCAvIDYpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEtleSA9IF9rZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBuOyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIFwidG9wXCIgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgeTogZ2V0Q29vcmRpbmF0KCd0b3AnKSB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBnZXRDb29yZGluYXQoJ2xlZnQnLCAnc2Nyb2xsTGVmdCcpIH07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB5OiBnZXRDb29yZGluYXQoJ3RvcCcsICdzY3JvbGxUb3AnLCAtMSkgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImxlZnRcIiA6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBnZXRDb29yZGluYXQoJ2xlZnQnLCAnc2Nyb2xsUmlnaHQnLCAtMSkgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmKGtleSBpbiBvYmope1xyXG4gICAgICAgICAgICAgICAgc2V0KG9ialtrZXldKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy56b29tTWF4ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IGdldFpvb20oKTtcclxuICAgICAgICAgICAgZWxXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVswXSArICdzY2FsZSgnKyAodHJhbnNmb3JtWzFdICsgLjEpICsnKSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnpvb21NaW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gZ2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICBlbFdyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtWzBdICsgJ3NjYWxlKCcrICh0cmFuc2Zvcm1bMV0gLSAuMSkgKycpJztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgb2JqRXZlbnQgPSB7XHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIiA6IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICAgIFwic2Nyb2xsVG9wXCIgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbChcInRvcFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY3JvbGxSaWdodFwiIDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwoXCJyaWdodFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY3JvbGxCb3R0b21cIiA6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsKFwiYm90dG9tXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNjcm9sbExlZnRcIiA6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsKFwibGVmdFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ6b29tTWF4XCIgOiB0aGlzLnpvb21NYXgsXHJcbiAgICAgICAgICAgIFwiem9vbU1pblwiIDogdGhpcy56b29tTWluXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmV2ZW50S2V5ID0gJ3Bvc2l0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICAoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaXRlcmF0aW9uKGNvbGxiYWNrKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIGl0ZW1zKXtcclxuICAgICAgICAgICAgICAgIGNvbGxiYWNrKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdGVyYXRpb24oZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmRhdGFzZXQuY291bnQgPiBtYXhWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBpdGVtLmRhdGFzZXQuY291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gbmV3IF9jb2xvclByaW9yaXR5KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHdyYXBwZXIgPSBuZXcgX3dyYXBwZXIoKTtcclxuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgX2V2ZW50KCk7XHJcblxyXG4gICAgICAgIGl0ZXJhdGlvbihmdW5jdGlvbihpdGVtKXtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yLnNldENvbG9ySXRlbShpdGVtKTtcclxuICAgICAgICAgICAgd3JhcHBlci5nZXRTaXplKGl0ZW0pO1xyXG4gICAgICAgICAgICB3cmFwcGVyLnBvc2l0aW9uSXRlbShpdGVtKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdyYXBwZXIuc2V0V3JhcHBlcigpO1xyXG5cclxuICAgICAgICBlbFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgZXZlbnQudHJhbnNpdGlvbik7XHJcblxyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgICAgICBsZXQgeSA9IGV2LmNsaWVudFk7XHJcbiAgICAgICAgICAgIGxldCB4ID0gZXYuY2xpZW50WDtcclxuICAgICAgICAgICAgbGV0IGVsX2Nvb3JkaW5hdGlvbiA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgbiA9IDE1O1xyXG5cclxuICAgICAgICAgICAgaWYoICh5IC0gbikgPD0gZWxfY29vcmRpbmF0aW9uLnRvcCApe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuZXZlbnRLZXkgPSAnc2Nyb2xsVG9wJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCAoeCAtIG4pIDw9IGVsX2Nvb3JkaW5hdGlvbi5sZWZ0ICl7XHJcbiAgICAgICAgICAgICAgICBldmVudC5ldmVudEtleSA9ICdzY3JvbGxMZWZ0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCAoZWxfY29vcmRpbmF0aW9uLnJpZ2h0IC0gbikgPD0geCApe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuZXZlbnRLZXkgPSAnc2Nyb2xsUmlnaHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoIChlbF9jb29yZGluYXRpb24uYm90dG9tIC0gbikgPD0geSApe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuZXZlbnRLZXkgPSAnc2Nyb2xsQm90dG9tJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgICAgICBpZigtMSA8IGV2LnJlbGF0ZWRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlLmluZGV4T2YoXCJjbG91ZFwiKSl7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBldmVudC5ldmVudEtleSA9ICdwb3NpdGlvbic7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGZ1bmN0aW9uKGV2KXtcclxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQgPyBldi5wcmV2ZW50RGVmYXVsdCgpIDogKGV2LnJldHVyblZhbHVlID0gZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIChldi5kZWx0YVkgfHwgZXYuZGV0YWlsIHx8IGV2LndoZWVsRGVsdGEpID4gMCl7XHJcbiAgICAgICAgICAgICAgICBldmVudC5ldmVudEtleT0gJ3pvb21NaW4nO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmV2ZW50S2V5PSAnem9vbU1heCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGNvbW1lbnRzKGVsKXtcclxuICAgIGxldCBuID0gMDtcclxuICAgIGZ1bmN0aW9uIERhdGEoKXtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSBlbC5lbGVtZW50cztcclxuXHJcbiAgICAgICAgbGV0IHZhbGlkID0gZnVuY3Rpb24oaW5wdXQsIGNvbGxiYWNrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlLmxlbmd0aCA8PSAwKXtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBvcmFuZ2VyZWRcIjtcclxuICAgICAgICAgICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gJ9C30LDQv9C+0LvQvdC40YLQtSDQv9C+0LvQtSc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29sbGJhY2sodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YgZWxlbWVudHMubmFtZSAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHZhbGlkKGVsZW1lbnRzLm5hbWUsICh2YWx1ZSk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodHlwZW9mIGVsZW1lbnRzLmVtYWlsICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgdmFsaWQoZWxlbWVudHMuZW1haWwsICh2YWx1ZSk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1haWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIG4rKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YWxpZChlbGVtZW50cy5jb21tZW50LCAodmFsdWUpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWVudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBuKys7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEFkZENvbW1lbnQoZGF0YSl7XHJcbiAgICAgICAgbGV0IGNvbW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50c1wiKTtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSBlbC5lbGVtZW50cztcclxuICAgICAgICBsZXQgY29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50LmNsYXNzTGlzdC5hZGQoXCJjb21tZW50XCIpO1xyXG5cclxuICAgICAgICBjb21tZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LXRpdGxlXCI+JHtkYXRhLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC10ZXh0XCI+JHtkYXRhLmNvbW1lbnR9PC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgY29tbWVudHMuYXBwZW5kQ2hpbGQoY29tbWVudCk7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBlbGVtZW50cy5uYW1lICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgZWxlbWVudHMubmFtZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIGVsZW1lbnRzLmVtYWlsICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgZWxlbWVudHMuZW1haWwudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudHMuY29tbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFN1Ym1pdEZvcm0oZXYpe1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IERhdGEoKTtcclxuICAgICAgICBpZihuID09IDMgfHwgMSl7XHJcbiAgICAgICAgICAgIGxldCByZXEgPSBnZXRYbWxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcS5zdGF0dXMgIT0gMjAwKXsgLy8gZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIHJlcS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRydWUgPT0gcmVxLnJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZENvbW1lbnQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZShyZXEucmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiByZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNba2V5XSAhPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuZWxlbWVudHNba2V5XS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuZWxlbWVudHNba2V5XS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIG9yYW5nZXJlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5lbGVtZW50c1trZXldLnBsYWNlaG9sZGVyID0gcmVzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuZWxlbWVudHNba2V5XS5zdHlsZS5ib3JkZXIgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgcmVxLm9wZW4oXCJHRVRcIiwgYWpheF91cmwgK1wiZGF0YT1cIisgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHRydWUpO1xyXG4gICAgICAgICAgICByZXEuc2VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBTdWJtaXRGb3JtKTtcclxufVxyXG5mdW5jdGlvbiBwYWdpbmF0aW9uKGVsKXtcclxuICAgIGZ1bmN0aW9uIFBhZ2luYXRpb24oZXYpe1xyXG4gICAgICAgIGxldCBwYWdlID0gK2VsLnZhbHVlO1xyXG4gICAgICAgIGxldCBsYXN0ID0gKyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2luYXRpb24gLmxhc3RcIikuaW5uZXJUZXh0KTtcclxuXHJcbiAgICAgICAgaWYoIWlzTmFOKHBhZ2UpICYmICFpc05hTihsYXN0KSl7XHJcbiAgICAgICAgICAgIGlmKHBhZ2UgPiAwICYmIHBhZ2UgPD0gbGFzdCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5vcmlnaW4gKyBcIi9wb3N0cy9cIiArIHBhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBQYWdpbmF0aW9uKTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIFBhZ2luYXRpb24oZXYpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5TdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zbGljZSgxKTtcclxufVxyXG5cclxuUm91dGUoXHJcbiAgICBkb2N1bWVudC5mb3Jtc1tcImhlYWRlci1zZWFyY2hcIl0sXHJcbiAgICBmdW5jdGlvbihlbCl7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gZWwuZWxlbWVudHM7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIFN1Ym1pdEZvcm0oZXYpe1xyXG4gICAgICAgICAgICBpZihlbGVtZW50cy5zZWFyY2gudmFsdWUudHJpbSgpLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIFN1Ym1pdEZvcm0pO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuUm91dGUoXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xvdWQtbGlzdHNcIilbMF0sXHJcbiAgICBmdW5jdGlvbihlbCl7XHJcbiAgICAgICAg0KFsb3VkKGVsKTtcclxuICAgIH1cclxuKTtcclxuXHJcblJvdXRlKFxyXG4gICAgZG9jdW1lbnQuZm9ybXNbXCJjb21tZW50c1wiXSxcclxuICAgIGZ1bmN0aW9uKGVsKXtcclxuICAgICAgICBjb21tZW50cyhlbCk7XHJcbiAgICB9XHJcbik7XHJcblxyXG5Sb3V0ZShcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnaW5hdGlvbiAucGFnZVwiKSxcclxuICAgIGZ1bmN0aW9uKGVsKXtcclxuICAgICAgICBwYWdpbmF0aW9uKGVsKTtcclxuICAgIH1cclxuKTsiXSwiZmlsZSI6Im1haW4tbWluLmpzIn0=
