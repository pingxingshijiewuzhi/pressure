(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/newsList/newsList"],{"1dd8":function(n,t,e){"use strict";var a,i=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return a}))},"1e49":function(n,t,e){},"25d3":function(n,t,e){"use strict";e.r(t);var a=e("2d6b"),i=e.n(a);for(var o in a)"default"!==o&&function(n){e.d(t,n,(function(){return a[n]}))}(o);t["default"]=i.a},"2d6b":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{baseUrl:this.$common.baseUrl,langch:{xinwen:"新闻资讯"},langen:{xinwen:"News and information"},langtype:"",list:[],urls:this.$common.baseUrl,avatar:n.getStorageSync("userinfo").avatar,username:n.getStorageSync("userinfo").username}},onShow:function(){this.langtype=n.getStorageSync("lang")?n.getStorageSync("lang"):"CH",this.initdata()},methods:{initdata:function(){var n=this,t={};this.$common.requests("/api/News/getNewsList",t).then((function(t){1==t.data.code&&(n.list=t.data.data)}))},back:function(){n.navigateBack({delta:1})},toNext:function(t){n.navigateTo({url:"../newsInformation/newsInformation?id="+t})}}};t.default=e}).call(this,e("6e42")["default"])},a9e3:function(n,t,e){"use strict";var a=e("1e49"),i=e.n(a);i.a},e6d8:function(n,t,e){"use strict";e.r(t);var a=e("1dd8"),i=e("25d3");for(var o in i)"default"!==o&&function(n){e.d(t,n,(function(){return i[n]}))}(o);e("a9e3");var u,r=e("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);t["default"]=c.exports},ffd6:function(n,t,e){"use strict";(function(n){e("aee2"),e("921b");a(e("66fd"));var t=a(e("e6d8"));function a(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])}},[["ffd6","common/runtime","common/vendor"]]]);