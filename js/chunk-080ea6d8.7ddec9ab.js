(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-080ea6d8"],{"1dde":function(t,a,e){var n=e("d039"),r=e("b622"),c=e("2d00"),i=r("species");t.exports=function(t){return c>=51||!n((function(){var a=[],e=a.constructor={};return e[i]=function(){return{foo:1}},1!==a[t](Boolean).foo}))}},7304:function(t,a,e){"use strict";e("d657")},8418:function(t,a,e){"use strict";var n=e("c04e"),r=e("9bf2"),c=e("5c6c");t.exports=function(t,a,e){var i=n(a);i in t?r.f(t,i,c(0,e)):t[i]=e}},"99af":function(t,a,e){"use strict";var n=e("23e7"),r=e("d039"),c=e("e8b5"),i=e("861d"),s=e("7b0b"),o=e("50c4"),l=e("8418"),b=e("65f0"),d=e("1dde"),u=e("b622"),v=e("2d00"),f=u("isConcatSpreadable"),p=9007199254740991,h="Maximum allowed index exceeded",g=v>=51||!r((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),j=d("concat"),O=function(t){if(!i(t))return!1;var a=t[f];return void 0!==a?!!a:c(t)},m=!g||!j;n({target:"Array",proto:!0,forced:m},{concat:function(t){var a,e,n,r,c,i=s(this),d=b(i,0),u=0;for(a=-1,n=arguments.length;a<n;a++)if(c=-1===a?i:arguments[a],O(c)){if(r=o(c.length),u+r>p)throw TypeError(h);for(e=0;e<r;e++,u++)e in c&&l(d,u,c[e])}else{if(u>=p)throw TypeError(h);l(d,u++,c)}return d.length=u,d}})},c69b:function(t,a,e){},d2c3:function(t,a,e){"use strict";e("c69b")},d657:function(t,a,e){},d7fb:function(t,a,e){"use strict";e.r(a);var n=e("7a23"),r=Object(n["i"])("div",{style:{height:"15vh"}},null,-1),c=Object(n["i"])("div",{id:"main"},null,-1),i=Object(n["g"])('<div class="bg-dark"><div class="container"><div class="d-flex align-items-center justify-content-between text-white py-4"><p class="mb-0">© 2021 Mark All Rights Reserved.</p><ul class="d-flex list-unstyled mb-0 h4"></ul></div></div></div>',1);function s(t,a,e,s,o,l){var b=Object(n["D"])("Navbar"),d=Object(n["D"])("ToastMessages"),u=Object(n["D"])("router-view");return Object(n["u"])(),Object(n["e"])(n["a"],null,[Object(n["i"])(b),Object(n["i"])(d),r,c,Object(n["i"])(u),i],64)}var o=Object(n["R"])("data-v-1c03e3ff");Object(n["x"])("data-v-1c03e3ff");var l={class:"container"},b=Object(n["i"])("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(n["i"])("span",{class:"navbar-toggler-icon"})],-1),d={class:"collapse navbar-collapse custom-header-md-open",id:"navbarNav"},u={class:"navbar-nav"},v={class:"nav-item active"},f=Object(n["i"])("b",null,"產品列表",-1),p={class:"nav-item"},h=Object(n["i"])("b",null,"購物車",-1),g={class:"d-flex position-relative"},j=Object(n["i"])("a",{href:"#"},[Object(n["i"])("i",{class:"fas fa-heart me-3"})],-1),O={class:"rounded-pill  top-0 start-100 bg-danger text-white position-absolute px-2"};Object(n["v"])();var m=o((function(t,a,e,r,c,i){var s,m,x=Object(n["D"])("router-link");return Object(n["u"])(),Object(n["e"])("div",{class:["fixed-top",c.classList.navbarTop],id:"navbar-top"},[Object(n["i"])("div",l,[Object(n["i"])("nav",{class:["navbar px-0 navbar-expand-lg navbar-light",c.classList.navbarInner]},[b,Object(n["i"])("div",d,[Object(n["i"])("ul",u,[Object(n["i"])("li",v,[Object(n["i"])(x,{class:"nav-link",to:"/user/products"},{default:o((function(){return[f]})),_:1})]),Object(n["i"])("li",p,[Object(n["i"])(x,{class:"nav-link",to:"/user/cart"},{default:o((function(){return[h]})),_:1})])])]),Object(n["i"])("div",g,[j,Object(n["i"])(x,{to:"/user/cart"},{default:o((function(){return[Object(n["i"])("i",{class:["bi bi-cart-fill",c.classList.navbarCart],style:{"font-size":"1.75rem"}},null,2)]})),_:1}),Object(n["i"])("div",O,Object(n["G"])(null===(s=c.cart)||void 0===s||null===(m=s.carts)||void 0===m?void 0:m.length),1)])],2)])],2)})),x=(e("99af"),e("24bd")),w={data:function(){return{cart:{},classList:{navbarTop:"",navbarInner:"",navbarCart:""}}},methods:{getShoppingCart:function(){var t=this,a="".concat("https://vue3-course-api.hexschool.io/","api/").concat("mark01","/cart");this.$http.get(a).then((function(a){a.data.success?t.cart=a.data.data:alert(a.data.message)})).catch((function(t){console.log(t)}))}},mounted:function(){var t=this;this.classList={navbarTop:"",navbarInner:"navbar-light",navbarCart:"text-dark"},this.getShoppingCart(),x["a"].on("update-cart",(function(){t.getShoppingCart()})),window.addEventListener("scroll",(function(){var a=window.scrollY,e=document.querySelector("#main");a>e.offsetTop?t.classList={navbarTop:"bg-dark",navbarInner:"navbar-dark",navbarCart:"text-white"}:t.classList={navbarTop:"",navbarInner:"navbar-light",navbarCart:"text-dark"}}))}};e("d2c3");w.render=m,w.__scopeId="data-v-1c03e3ff";var k=w,T=e("f367"),y={components:{ToastMessages:T["a"],Navbar:k},provide:function(){return{emitter:x["a"]}},created:function(){},methods:{}};e("7304");y.render=s;a["default"]=y}}]);
//# sourceMappingURL=chunk-080ea6d8.7ddec9ab.js.map