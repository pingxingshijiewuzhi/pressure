(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"4b47":function(t,n,e){"use strict";(function(t){e("aee2"),e("921b");a(e("66fd"));var n=a(e("98db"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"69f8":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{account:"",password:""}},onLoad:function(){this.setWakelock()},methods:{setWakelock:function(){plus.device.setWakelock(!0)},toRegister:function(){t.navigateTo({url:"../register/register"})},gologin:function(){var n=this,e={account:this.account,password:this.password};this.$common.requests("/api/user/login",e).then((function(e){if(n.$api.msg(e.data.msg),1==e.data.code){var a=e.data.data.userinfo;t.setStorageSync("uid",a.user_id),t.setStorageSync("token",a.token),t.setStorageSync("userinfo",a),t.navigateTo({url:"../realtime/realtime"})}}))}}};n.default=e}).call(this,e("6e42")["default"])},"98db":function(t,n,e){"use strict";e.r(n);var a=e("a48b"),o=e("dbbb");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("dc47");var c,r=e("f0c5"),i=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=i.exports},"9c4d":function(t,n,e){},a48b:function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}))},dbbb:function(t,n,e){"use strict";e.r(n);var a=e("69f8"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=o.a},dc47:function(t,n,e){"use strict";var a=e("9c4d"),o=e.n(a);o.a}},[["4b47","common/runtime","common/vendor"]]]);