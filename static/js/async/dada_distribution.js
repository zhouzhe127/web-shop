(window.webpackJsonp=window.webpackJsonp||[]).push([["dada_distribution"],{"6b15":function(e,t,a){"use strict";a.r(t);var s=a("81a2"),n=a("05dd");function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function s(n,i){try{var o=t[n](i),r=o.value}catch(e){return void a(e)}if(!o.done)return Promise.resolve(r).then(function(e){s("next",e)},function(e){s("throw",e)});e(r)}("next")})}}var o={data:function(){return{showWin:!1,cityWin:!1,storeWin:!1,createShopName:"",areaName:"",createShopAddress:"",creatShopPeople:"",creatShopPhone:"",creatShopIdcard:"",creatShopcoding:"",creatShopaccount:"",creatShoppassword:"",bussiness:[],bussinessselect:[],cityInfo:[],cityselects:[],lat:"",lng:"",sourceId:"",result:0,list:[{name:"下线",id:0},{name:"激活",id:1}],updata:!1,createOrupdata:"创建店铺",shopInfomation:""}},methods:{haveIndex:function(e){this.result=e},getResult:function(e,t){"ok"==e&&(this.bussinessselect=t),this.showWin=!1},getCityResult:function(e,t){"ok"==e&&(this.cityselects=t),this.cityWin=!1},getStoreResult:function(e){"ok"==e&&this.getDadaShopInfo(),this.storeWin=!1},openbusiness:function(){this.showWin=!0},opencity:function(){this.cityWin=!0},pullConfiguration:function(){var e=this.localshopInfo;this.createShopName=e.shopName,this.createShopAddress=e.address,this.creatShopPeople=e.contactMan,this.creatShopPhone=e.telephone,this.creatShopcoding=e.shopNumber,this.creatShopaccount=e.appId,this.creatShoppassword=e.appSecret},bindingStore:function(){this.storeWin=!0},checkForm:function(){if(n.a.checkData({createShopName:"店铺名称不能为空！",bussinessselect:{cond:"$$.length != 0",pro:"请选择业务类型"},cityselects:{cond:"$$.length != 0",pro:"请选择城市"},areaName:"区域名称不能为空！",createShopAddress:"店铺地址不能为空！",creatShopPeople:"联系人姓名不能为空！",creatShopPhone:{reg:/^1[\d]{10,10}$/,pro:"联系方式不符合规范,应为1开头的11位数字"}},this))return!0},getDadaShopInfo:function(){var e=this;return i(regeneratorRuntime.mark(function t(){var a,n,i,o,r,c,l,p,u;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.getDadaShopInfo({data:{}});case 2:if(0!=(a=t.sent)){t.next=6;break}return e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"当前店铺未注册商户Id,请前往注册商户Id"}),t.abrupt("return",!1);case 6:if(!a){t.next=55;break}for(n in e.shopInfomation=a.configData,e.localshopInfo=a.shopInfo,""!=a.configData.shopName&&(e.updata=!0,e.createOrupdata="更新店铺"),e.bussiness=[],a.business)e.bussiness.push({name:a.business[n],id:n});if(e.cityInfo=a.cityInfo,""!=a.shopInfo.position){t.next=18;break}return e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"请前去店铺配置完善经纬度信息"}),t.abrupt("return",!1);case 18:e.lat=a.shopInfo.position.split(",")[1],e.lng=a.shopInfo.position.split(",")[0];case 20:if(e.sourceId=a.configData.sourceId,!e.updata){t.next=55;break}for(i=e.shopInfomation,e.result=Number(i.status),e.createShopName=i.shopName,e.bussinessselect=[],e.bussinessselect.push(i.businessType),e.getbussName("1"),e.areaName=i.area,e.createShopAddress=i.shopAddress,e.creatShopPeople=i.contactName,e.creatShopPhone=i.shopPhone,e.creatShopcoding=i.shopCoding,e.creatShopIdcard=i.idCard,e.creatShopaccount=i.appId,e.creatShoppassword=i.appPwd,o=!0,r=!1,c=void 0,t.prev=39,l=e.cityInfo[Symbol.iterator]();!(o=(p=l.next()).done);o=!0)u=p.value,i.city+"市"==u.cityName&&(e.cityselects=[],e.cityselects.push(u.cityCode),e.getbussName("2"));t.next=47;break;case 43:t.prev=43,t.t0=t.catch(39),r=!0,c=t.t0;case 47:t.prev=47,t.prev=48,!o&&l.return&&l.return();case 50:if(t.prev=50,!r){t.next=53;break}throw c;case 53:return t.finish(50);case 54:return t.finish(47);case 55:case"end":return t.stop()}},t,e,[[39,43,47,55],[48,,50,54]])}))()},getbussName:function(e){var t="";if("1"==e){var a=!0,s=!1,n=void 0;try{for(var i,o=this.bussiness[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var r=i.value;r.id==this.bussinessselect[0]&&(t=r.name)}}catch(e){s=!0,n=e}finally{try{!a&&o.return&&o.return()}finally{if(s)throw n}}}else{var c=!0,l=!1,p=void 0;try{for(var u,d=this.cityInfo[Symbol.iterator]();!(c=(u=d.next()).done);c=!0){var h=u.value;h.cityCode==this.cityselects[0]&&(t=h.cityName)}}catch(e){l=!0,p=e}finally{try{!c&&d.return&&d.return()}finally{if(l)throw p}}}return t},creatshop:function(){this.checkForm()&&this.addOrUpdateDadaConfig()},addOrUpdateDadaConfig:function(){var e=this;return i(regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.addOrUpdateDadaConfig({data:{shopName:e.createShopName,businessType:e.bussinessselect[0],city:e.getbussName("2"),area:e.areaName,shopAddress:e.createShopAddress,contactName:e.creatShopPeople,shopPhone:e.creatShopPhone,shopCoding:e.creatShopcoding,idCard:e.creatShopIdcard,appId:e.creatShopaccount,appPwd:e.creatShoppassword,status:e.updata?e.result:"",lat:e.lat,lng:e.lng,sourceId:e.sourceId}});case 2:1==(a=t.sent)?(e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:e.createOrupdata+"成功"}),e.getDadaShopInfo()):e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:""+a});case 4:case"end":return t.stop()}},t,e)}))()}},watch:{},components:{win:function(){return a.e("win").then(a.bind(null,"f60a"))},"business-win":function(){return a.e("business_win").then(a.bind(null,"c41d"))},"city-win":function(){return a.e("city_win").then(a.bind(null,"2769"))},"store-win":function(){return a.e("city_win").then(a.bind(null,"c985"))},singleSelect:function(){return a.e("mul_select").then(a.bind(null,"7231"))}},mounted:function(){var e=this;this.$store.commit("setPageTools",[{name:"拉取门店配置",className:["userLabel"],fn:function(){e.pullConfiguration()}},{name:"绑定门店",className:["userLabel"],fn:function(){e.bindingStore()}}]),this.getDadaShopInfo()}},r=(a("b8c1"),a("d801")),c=Object(r.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"distribution"}},[e.updata?a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("门店状态")]),e._v(" "),a("singleSelect",{key:"id",attrs:{index:e.result,styles:{border:"1px solid #cecdcd",marginRight:"8px",width:"100px"},list:e.list,name:"name"},on:{selOn:e.haveIndex}})],1):e._e(),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("门店名称")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createShopName,expression:"createShopName"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入门店名称",maxlength:"30"},domProps:{value:e.createShopName},on:{input:function(t){t.target.composing||(e.createShopName=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("业务类型")]),e._v(" "),a("a",{staticClass:"addclassify fl",staticStyle:{width:"210px","margin-right":"10px"},attrs:{href:"javascript:void(0);"},on:{click:e.openbusiness}},[e._v("选择业务类型")]),e._v(" "),e.bussinessselect.length>0?a("span",{staticClass:"getname"},[e._v("已选择:"+e._s(e.getbussName("1")))]):e._e()]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("城市名称")]),e._v(" "),a("a",{staticClass:"addclassify fl",staticStyle:{width:"210px","margin-right":"10px"},attrs:{href:"javascript:void(0);"},on:{click:e.opencity}},[e._v("选择城市名称")]),e._v(" "),e.cityselects.length>0?a("span",{staticClass:"getname"},[e._v("已选择:"+e._s(e.getbussName("2")))]):e._e()]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("区域名称")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.areaName,expression:"areaName"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入区域名称",maxlength:"30"},domProps:{value:e.areaName},on:{input:function(t){t.target.composing||(e.areaName=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("门店地址")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createShopAddress,expression:"createShopAddress"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入门店地址",maxlength:"50"},domProps:{value:e.createShopAddress},on:{input:function(t){t.target.composing||(e.createShopAddress=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("联系人姓名")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShopPeople,expression:"creatShopPeople"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入联系人姓名",maxlength:"10"},domProps:{value:e.creatShopPeople},on:{input:function(t){t.target.composing||(e.creatShopPeople=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl required"},[e._v("联系人电话 ")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShopPhone,expression:"creatShopPhone"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入联系人电话",maxlength:"11"},domProps:{value:e.creatShopPhone},on:{input:function(t){t.target.composing||(e.creatShopPhone=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[e._v("联系人身份证 ")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShopIdcard,expression:"creatShopIdcard"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入联系人身份证",maxlength:"18"},domProps:{value:e.creatShopIdcard},on:{input:function(t){t.target.composing||(e.creatShopIdcard=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[e._v("门店编号 ")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShopcoding,expression:"creatShopcoding"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入门店编号",maxlength:"30"},domProps:{value:e.creatShopcoding},on:{input:function(t){t.target.composing||(e.creatShopcoding=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[e._v("达达商家APP账号 ")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShopaccount,expression:"creatShopaccount"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入账号",maxlength:"30"},domProps:{value:e.creatShopaccount},on:{input:function(t){t.target.composing||(e.creatShopaccount=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[e._v("达达商家APP密码 ")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShoppassword,expression:"creatShoppassword"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入密码",maxlength:"30"},domProps:{value:e.creatShoppassword},on:{input:function(t){t.target.composing||(e.creatShoppassword=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"}),e._v(" "),a("a",{staticClass:"gray fl",staticStyle:{width:"200px","margin-right":"10px"},attrs:{href:"javascript:void(0);"}},[e._v("取消")]),e._v(" "),a("a",{staticClass:"yellow fl",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:e.creatshop}},[e._v(e._s(e.createOrupdata))])]),e._v(" "),e.showWin?a("business-win",{attrs:{bussiness:e.bussiness,bussinessselect:e.bussinessselect},on:{getAppliedWin:e.getResult}}):e._e(),e._v(" "),e.cityWin?a("city-win",{attrs:{cityInfo:e.cityInfo,cityselects:e.cityselects},on:{getCityWin:e.getCityResult}}):e._e(),e._v(" "),e.storeWin?a("store-win",{on:{getStoreWin:e.getStoreResult}}):e._e()],1)},[],!1,null,"03a1b58b",null);t.default=c.exports},b8c1:function(e,t,a){"use strict";var s=a("eeb7");a.n(s).a},eeb7:function(e,t,a){}}]);