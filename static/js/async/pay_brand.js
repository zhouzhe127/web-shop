(window.webpackJsonp=window.webpackJsonp||[]).push([["pay_brand"],{"1f2a":function(e,t,n){},"7b47":function(e,t,n){"use strict";var a=n("1f2a");n.n(a).a},9677:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticStyle:{"text-align":"left","min-width":"600px"},attrs:{id:"brandBase"}},[e.showZXSH?e._e():n("el-table",{attrs:{data:e.payNameList,"header-cell-style":{"background-color":"#f5f7fa"},border:"",align:"center"}},[n("el-table-column",{attrs:{stripe:"",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{color:"#FE8D2C",cursor:"pointer"},on:{click:function(n){e.edit(t.row,t.$index)}}},[e._v("编辑")]),e._v(" "),n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[e._v("|")]),e._v(" "),n("span",{staticStyle:{color:"#FD3F1F",cursor:"pointer"},on:{click:function(n){e.joinShop(t.row,t.$index)}}},[e._v("指派")]),e._v(" "),n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[e._v("|")]),e._v(" "),0==t.row.isOpen?n("span",{staticStyle:{cursor:"pointer",color:"#2ea7e0"},on:{click:function(n){e.isOpenDetial(t.$index,t.row)}}},[e._v("开启")]):e._e(),e._v(" "),1==t.row.isOpen?n("span",{staticStyle:{cursor:"pointer",color:"#2ea7e0"},on:{click:function(n){e.isOpenDetial(t.$index,t.row)}}},[e._v("关闭")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"==t.row.isOpen?n("span",[e._v("已关闭")]):e._e(),e._v(" "),"1"==t.row.isOpen?n("span",[e._v("已开启")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"paymentName",label:"支付方式",align:"center"}})],1),e._v(" "),e.showWin?n("payWayWin",{attrs:{detial:e.detial,types:e.types},on:{payWayWin:e.getResult}}):e._e(),e._v(" "),e.showZXSH?n("payZXSHWin",{attrs:{detial:e.detial},on:{payZXSHWin:e.getZXSHResult}}):e._e(),e._v(" "),e.showShop?n("elShopListWin",{attrs:{shopIds:[]},on:{chooseShop:e.getShopResult}}):e._e()],1)};a._withStripped=!0;var i=n("81a2"),r=n("f6ce"),o=n("05dd");function s(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function a(i,r){try{var o=t[i](r),s=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(s).then(function(e){a("next",e)},function(e){a("throw",e)});e(s)}("next")})}}var p={data:function(){return{titleList:[{titleName:"操作"},{titleName:"支付方式",dataName:"paymentName"}],payNameList:[],showWin:!1,showShop:!1,detial:null,shopDetial:null,userId:"",types:"add",showZXSH:!1}},mounted:function(){var e=r.a.session("userShop");this.userId=e.user.id,this.inte()},components:{comTable:function(){return n.e("table").then(n.bind(null,"4360"))},payWayWin:function(){return n.e("pay_way_win").then(n.bind(null,"c646"))},payZXSHWin:function(){return n.e("pay_zxsh_win").then(n.bind(null,"0973"))},elShopListWin:function(){return n.e("el_shopList_win").then(n.bind(null,"6c2c"))}},methods:{getResult:function(e,t){if("ok"==e){if(!this.isOk(t))return void(this.showWin=!0);this.showWin=!1;var n={};n.createUid=this.userId,n.isOpen="1",n.paymentId=t.id,n.paymentName=t.paymentName,"支付宝"==t.paymentName?(n.alipayrsaPublicKey=t.payConfig.alipayrsaPublicKey,n.rsaPrivateKey=t.payConfig.rsaPrivateKey,n.appId=t.payConfig.appId,n.signType=t.payConfig.signType,this.editPayConfig(n)):"微信"==t.paymentName&&(n.appid=t.payConfig.appid,n.minAppId=t.payConfig.minAppId,n.mchid=t.payConfig.mchid,n.key=t.payConfig.key,n.appSecret=t.payConfig.appSecret,n.apiclient_key=t.payConfig.apiclient_key,n.apiclient_cert=t.payConfig.apiclient_cert,this.editPayConfig(n))}this.showWin=!1},isOpenDetial:function(e,t){var n=this,a=0==t.isOpen?"确认开启":"确认关闭";this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:a,callback:function(e){"ok"==e&&n.updatePaymentStatus(t)}})},updatePaymentStatus:function(e){var t=this;return s(regeneratorRuntime.mark(function n(){var a;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a={paymentId:e.trueId?e.trueId:e.id,isOpen:0==e.isOpen?1:0},n.next=3,i.a.updatePaymentStatus({data:a});case 3:if(n.sent){n.next=7;break}return t.$store.commit("setWin",{title:"提示",winType:"alert",content:"请先配置此支付方式信息！"}),n.abrupt("return",!1);case 7:t.inte();case 8:case"end":return n.stop()}},n,t)}))()},getZXSHResult:function(e){"back"==e&&(this.showZXSH=!1,this.$store.commit("setPageTools",[]))},getShopResult:function(e,t){var n=this;return s(regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(console.log(t),"ok"!=e){a.next=9;break}if(0!=t.length){a.next=5;break}return n.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"请选择要指派的店铺"}),a.abrupt("return");case 5:return a.next=7,i.a.paymentAssign({data:{shopIds:t.join(","),paymentName:n.detial.paymentName}});case 7:a.sent&&n.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"指派成功"});case 9:n.showShop=!1;case 10:case"end":return a.stop()}},a,n)}))()},inte:function(){var e=this;return s(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.getBrandPaymentList({data:{}});case 2:e.payNameList=t.sent;case 3:case"end":return t.stop()}},t,e)}))()},edit:function(e){var t=this;return s(regeneratorRuntime.mark(function n(){var a;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a={paymentId:e.trueId?e.trueId:e.id},n.next=3,i.a.getWeixinAlipay({data:a});case 3:t.detial=n.sent,"微信"==e.paymentName?(t.detial.payConfig&&0!=t.detial.payConfig.length||(t.detial.payConfig={},t.detial.payConfig.mchid="",t.detial.payConfig.key="",t.detial.payConfig.appSecret="",t.detial.payConfig.apiclient_key="",t.detial.payConfig.apiclient_cert="",t.detial.payConfig.appid=""),t.types="wx",t.showWin=!0):"支付宝"==e.paymentName?(t.detial.payConfig&&0!=t.detial.payConfig.length||(t.detial.payConfig={},t.detial.payConfig.alipayrsaPublicKey="",t.detial.payConfig.rsaPrivateKey="",t.detial.payConfig.appId="",t.detial.payConfig.signType="RSA"),t.types="zfb",t.showWin=!0):"中信银行(上海)"==e.paymentName&&(t.detial.payConfig&&0!=t.detial.payConfig.length||(t.detial.payConfig={},t.detial.payConfig.mchId="",t.detial.payConfig.privateRsaKey="",t.detial.payConfig.publicRsaKey=""),t.types="zxsh",t.showZXSH=!0);case 5:case"end":return n.stop()}},n,t)}))()},editPayConfig:function(e){var t=this;return s(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.editPayConfig({data:e});case 2:return n.next=4,i.a.getBrandPaymentList({data:{}});case 4:t.payNameList=n.sent;case 5:case"end":return n.stop()}},n,t)}))()},joinShop:function(e){this.showShop=!0,this.detial=e},getWeixinAlipay:function(e){var t=this;return s(regeneratorRuntime.mark(function n(){var a;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a={paymentId:e.id},n.next=3,i.a.getWeixinAlipay({data:a});case 3:t.detial=n.sent;case 4:case"end":return n.stop()}},n,t)}))()},isOk:function(e){if("微信"==e.paymentName){if(!o.a.checkData({appid:"微信APPID不能为空"},e.payConfig))return!1;if(!o.a.checkData({mchid:"商户号不能为空"},e.payConfig))return!1;if(!o.a.checkData({key:"商户支付密钥不能为空"},e.payConfig))return!1;if(!o.a.checkData({appSecret:"微信appSecret不能为空"},e.payConfig))return!1;var t=e.payConfig.apiclient_cert;if(!o.a.checkData({apiclient_cert:"证书（cert）不能为空"},e.payConfig))return!1;if(""!==t&&"BEGIN CERTIFICATE"!=a(t))return this.$store.commit("setWin",{title:"提示",winType:"alert",content:"证书cert传错了"}),!1;var n=e.payConfig.apiclient_key;if(!o.a.checkData({apiclient_key:"证书密钥（key）不能为空"},e.payConfig))return!1;if(""!==n&&("BEGIN PRIVATE KEY"!=a(n)||void 0==a(n)))return this.$store.commit("setWin",{title:"提示",winType:"alert",content:"证书密钥（key）传错了"}),!1}else if("支付宝"==e.paymentName){if(!o.a.checkData({alipayrsaPublicKey:"支付宝公钥不能为空"},e.payConfig))return!1;if(!o.a.checkData({rsaPrivateKey:"RSA私钥不能为空"},e.payConfig))return!1;if(!o.a.checkData({appId:"支付宝应用ID不能为空"},e.payConfig))return!1}function a(e){if(""!=e&&void 0!=e){for(var t=e.split("-"),n=0;n<t.length;n++)""!=t[n]&&void 0!==t[n]||(t.splice(n,1),n-=1);return t[0]}}return!0}}},c=(n("7b47"),n("6ceb")),u=Object(c.a)(p,a,[],!1,null,"10660728",null);u.options.__file="src\\module\\brand_configuration\\pay_brand.vue";t.default=u.exports}}]);