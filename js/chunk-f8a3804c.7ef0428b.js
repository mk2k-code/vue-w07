(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8a3804c"],{1626:function(t,e,a){},"260d":function(t,e,a){"use strict";a("1626")},"2de3":function(t,e,a){"use strict";a.r(e);var n=a("7a23"),c=Object(n["g"])('<div class="bg-dark"><div class="container"><div class="d-flex align-items-center justify-content-between text-white py-4"><p class="mb-0">© 2021 Mark All Rights Reserved.</p><ul class="d-flex list-unstyled mb-0 h4"></ul></div></div></div>',1);function i(t,e,a,i,s,o){var r=Object(n["D"])("Navbar"),u=Object(n["D"])("ToastMessages"),l=Object(n["D"])("router-view");return Object(n["u"])(),Object(n["e"])(n["a"],null,[Object(n["i"])(r),Object(n["i"])(u),Object(n["i"])(l),c],64)}a("ac1f"),a("5319");var s={class:"navbar navbar-expand-lg navbar-dark bg-dark"},o={class:"container-fluid"},r=Object(n["i"])("a",{class:"navbar-brand"},"後台管理",-1),u={class:"collapse navbar-collapse",id:"navbarText"},l={class:"navbar-nav me-auto mb-2 mb-lg-0"},b={class:"nav-item"},d=Object(n["h"])("回首頁"),h={class:"nav-item"},v=Object(n["h"])("產品列表"),O={class:"nav-item"},p=Object(n["h"])("訂單"),j={class:"nav-item"},f=Object(n["h"])("優惠券"),m={class:"nav-item"};function k(t,e,a,c,i,k){var g=Object(n["D"])("router-link");return Object(n["u"])(),Object(n["e"])("nav",s,[Object(n["i"])("div",o,[r,Object(n["i"])("div",u,[Object(n["i"])("ul",l,[Object(n["i"])("li",b,[Object(n["i"])(g,{class:"nav-link",to:"/user/products"},{default:Object(n["O"])((function(){return[d]})),_:1})]),Object(n["i"])("li",h,[Object(n["i"])(g,{class:"nav-link",to:"/admin/products"},{default:Object(n["O"])((function(){return[v]})),_:1})]),Object(n["i"])("li",O,[Object(n["i"])(g,{class:"nav-link",to:"/admin/orders"},{default:Object(n["O"])((function(){return[p]})),_:1})]),Object(n["i"])("li",j,[Object(n["i"])(g,{class:"nav-link",to:"/admin/coupons"},{default:Object(n["O"])((function(){return[f]})),_:1})]),Object(n["i"])("li",m,[Object(n["i"])("a",{href:"#",class:"nav-link",onClick:e[1]||(e[1]=Object(n["Q"])((function(){return k.logout&&k.logout.apply(k,arguments)}),["prevent"]))},"登出")])])])])])}var g={data:function(){return{}},methods:{logout:function(){document.cookie="hexToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",this.$http.defaults.headers.common["Authorization"]="",this.$router.push("/login")}},mounted:function(){}};g.render=k;var $=g,x=a("24bd"),T=a("f367"),w={components:{ToastMessages:T["a"],Navbar:$},provide:function(){return{emitter:x["a"]}},created:function(){var t=this,e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");""===e&&this.$router.push("/login"),this.$http.defaults.headers.common["Authorization"]=e;var a="".concat("https://vue3-course-api.hexschool.io/","api/user/check");this.$http.post(a,this.user).then((function(e){e.data.success||(t.$httpMessageState(e,"登入"),t.$router.push("/login"))}))},methods:{logout:function(){document.cookie="hexToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",this.$http.defaults.headers.common["Authorization"]="",this.$router.push("/login")}}};a("260d");w.render=i;e["default"]=w}}]);
//# sourceMappingURL=chunk-f8a3804c.7ef0428b.js.map