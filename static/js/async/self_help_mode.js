(window.webpackJsonp=window.webpackJsonp||[]).push([["self_help_mode"],{"39d3":function(t,e,i){"use strict";var s=i("5278");i.n(s).a},5278:function(t,e,i){},bfe3:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"self-help",attrs:{id:"self-help"}},[i("div",[t._m(0),t._v(" "),i("div",{staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub"},[t._v("开启自助模式")]),t._v(" "),i("span",{class:0==t.selfStatus?"off check-span":"on check-span",on:{click:t.iselfStatus}})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0==t.selfStatus,expression:"selfStatus == false"}],staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub"},[t._v("查看菜单")]),t._v(" "),i("span",{staticClass:"fl"},[i("onOff",{attrs:{status:t.menuState},on:{statusChange:t.statechange}})],1)]),t._v(" "),i("div",{staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub"},[t._v("生成二维码")]),t._v(" "),i("a",{staticClass:"fl add_btn qRcode",on:{click:t.generatorCode}},[t._v("批量生成二维码")]),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub"},[t._v("扫码选择门店功能")]),t._v(" "),i("onOff",{key:1,attrs:{status:t.storeSwitch},on:{statusChange:t.selectStores}})],1),t._v(" "),i("div",{staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub"},[t._v("支付后发送自助短信")]),t._v(" "),i("onOff",{key:1,attrs:{status:t.smsSwitch},on:{statusChange:t.selectSMS}})],1),t._v(" "),i("div",{staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub required"},[t._v("固定支付方式")]),t._v(" "),i("span",{staticClass:"fl"},[i("mulSelect",{key:"id",attrs:{list:t.goodsType,selects:t.goodsSelect,styles:{backgroundColor:"rgb(240,240,240)",marginRight:"8px"},name:"name"},on:{"update:list":function(e){t.goodsType=e},"update:selects":function(e){t.goodsSelect=e}}})],1)]),t._v(" "),i("div",{staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub required"},[t._v("结账功能")]),t._v(" "),i("a",{staticClass:"on-span add fl",on:{click:function(e){t.openWindow()}}}),t._v(" "),i("div",{staticClass:"fl add-config"},t._l(t.checkoutMenu,function(e,s){return i("span",{key:s,staticClass:"fl",on:{click:function(i){t.openWindow(s,e,"1")}}},[t._v(t._s(e.name)+"\n\t\t\t\t\t"),i("i",{on:{click:function(i){i.stopPropagation(),t.deleteList(s,e)}}})])})),t._v(" "),t._m(2)]),t._v(" "),i("div",{staticClass:"self-help-box"},[i("span",{staticClass:"fl self-help-sub"},[t._v("生成链接")]),t._v(" "),i("section",{staticClass:"fl sec_wrap"},[t._l(t.checkoutMenu,function(e,s){return""!=e.id&&void 0!=e.id?i("div",{key:s,staticClass:"link"},[i("div",{staticClass:"fl div_wrap"},[i("div",{staticClass:"fl div_innit"},[t._v(t._s(e.name))]),t._v(" "),i("input",{ref:"copyTxt",refInFor:!0,staticClass:"num num_input",attrs:{type:"text"},domProps:{value:t.linkUrl+e.id}})]),t._v(" "),i("a",{staticClass:"fl alink_wap",attrs:{href:"javascript:;"},on:{click:function(e){t.copyCode(s)}}},[t._v("复制链接")])]):t._e()}),t._v(" "),t._m(3)],2)]),t._v(" "),t.show?i("pay",{attrs:{item:t.item,wininfo:t.wininfo,opentheFunction:t.opentheFunction,upPayInfo:t.upPayInfo,isUpdata:t.isUpdata,title:t.title,i:t.i},on:{winEvent:t.winEvent}}):t._e()],1),t._v(" "),i("div",[t._m(4),t._v(" "),i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl"},[t._v("关注公众号并点餐")]),t._v(" "),i("span",{class:0==t.isattention?"off check-span":"on check-span",on:{click:t.openSattention}}),t._v(" "),i("div",{staticClass:"prompting fl",on:{click:t.isPublicNumber}},[t.publicNumber?i("div",{staticClass:"detDiv",staticStyle:{top:"0px",left:"45px"}},[i("i",{staticClass:"detI triright"}),t._v(" "),i("h3",{staticClass:"detH3"},[t._v("\n\t\t\t\t\t\t关闭该功能后，生成的二维码无点餐推送。\n\t\t\t\t\t")])]):t._e()])]),t._v(" "),t.isattention?i("section",[i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"fl online-sub"},[t._v("标题设置")]),t._v(" "),t._l(t.integralList,function(e,s){return i("span",{key:s,staticClass:"freeFix",class:{presentActive:t.integralOn==s},staticStyle:{"margin-right":"14px"},on:{click:function(e){t.chooseIntegral(s)}}},[t._v(t._s(e.name))])}),t._v(" "),i("div",{staticClass:"prompting fl",on:{click:t.isHeadings}},[t.headings?i("div",{staticClass:"detDiv",staticStyle:{top:"0px",left:"45px"}},[i("i",{staticClass:"detI triright"}),t._v(" "),t._m(5)]):t._e()])],2),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"0"==t.integralOn,expression:"integralOn == '0'"}],staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"0px"}},[i("span",{staticClass:"fl online-sub"}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.title1,expression:"title1"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入固定标题",maxlength:"15"},domProps:{value:t.title1},on:{input:function(e){e.target.composing||(t.title1=e.target.value)}}})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"0"==t.integralOn,expression:"integralOn == '0'"}],staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"0px"}},[i("span",{staticClass:"online-sub fl"}),t._v(" "),t._m(6)]),t._v(" "),""!=t.image?i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"fl online-sub"}),t._v(" "),i("div",{staticClass:"uploadImg fl"},[i("img",{attrs:{alt:"logo",src:t.uploadUrl+t.image}})]),t._v(" "),i("div",{staticClass:"fl updateName"},[t._v("(已上传："+t._s(t.imageName)+")")])]):t._e(),t._v(" "),i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"fl online-sub"},[t._v("显示图片")]),t._v(" "),i("div",{staticClass:"uploadImgs fl"},[i("a",{staticClass:"addclassify fl",staticStyle:{"margin-right":"15px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),i("form",{attrs:{enctype:"multipart/form-data",id:"bgImage1"}},[i("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:t.bgNameChange}})])]),t._v(" "),t._m(7)]),t._v(" "),i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"fl online-sub"},[t._v("下载二维码")]),t._v(" "),i("a",{staticClass:"download",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.downloadCode()}}},[t._v("下载二维码")])])]):t._e()]),t._v(" "),i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"fl online-sub"}),t._v(" "),i("a",{staticClass:"gray fl",staticStyle:{width:"200px","margin-right":"2px"},attrs:{href:"javascript:void(0);"}},[t._v("取消")]),t._v(" "),i("a",{staticClass:"blue fl",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:t.saveFunction}},[t._v("保存")])])])};s._withStripped=!0;var n=i("81a2"),a=i("bbb9"),o=i("f6ce");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(n,a){try{var o=e[n](a),l=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(l).then(function(t){s("next",t)},function(t){s("throw",t)});t(l)}("next")})}}var r={data:function(){return{shopId:o.a.session("userShop").currentShop.id,storeSwitch:!0,smsSwitch:!0,selfStatus:!1,opentheFunction:!1,menuState:!1,payment:!1,checkoutMenu:[],contentLsit:[{name:"普通商品",id:"1"},{name:"称重商品",id:"2"},{name:"套餐",id:"3"}],contenSelect:["1","2","3"],goodsType:[{name:"微信支付",id:"3"},{name:"会员支付",id:"5"}],goodsSelect:[],exportUrl:"javascript:void(0);",payList:[],paymentList:[],content:"",wininfo:{updatePay:[],addPay:[],deletePay:[]},upPayInfo:{},linkUrl:"",show:!1,title:"",i:0,item:{},publicNumber:!1,isattention:!1,headings:!1,integralList:[{name:"固定标题"},{name:"自动标题"}],integralOn:"-1",title1:"",uploadUrl:"",image:"",imageName:"",qrcode:"",shopName:"",downloadUrl:"javascript:;"}},methods:{isPublicNumber:function(){this.publicNumber=!this.publicNumber},chooseIntegral:function(t){this.integralOn==t?this.integralOn="-1":this.integralOn=t},isHeadings:function(){this.headings=!this.headings},bgNameChange:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.uploadImg({data:{type:8,shopId:t.shopId},formId:"bgImage1"});case 2:i=e.sent,t.image=i,s=t.image.lastIndexOf("/"),t.imageName=t.image.substring(s+1,t.image.length);case 6:case"end":return e.stop()}},e,t)}))()},generatorCode:function(){n.a.downloadQrCode()},downloadCode:function(){var t=this;return l(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.downloadPack({data:{type:1,shopId:t.shopId}});case 2:case"end":return e.stop()}},e,t)}))()},winEvent:function(){this.show=!1},openWindow:function(t,e,i){return this.item=e,this.wininfo.pay.length>=4&&!i?(this.$store.commit("setWin",{content:"最多添加4个",time:1e3}),!1):this.wininfo.addPay.length>=4&&!i?(this.$store.commit("setWin",{content:"最多添加4个",time:1e3}),!1):(this.upPayInfo=a.a.deepCopy(e),this.title="1"==i?"修改结账功能":"新增结账功能",this.opentheFunction="1"==i,this.i=t,this.isUpdata=i,void(this.show=!0))},copyCode:function(t){this.$refs.copyTxt[t].select(),document.execCommand("copy"),this.$store.commit("setWin",{content:"复制成功",time:1e3})},deleteList:function(t,e){this.checkoutMenu.splice(t,1),this.wininfo.deletePay.push(e.id)},statechange:function(){this.menuState=!this.menuState},getSelfConfig:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,s,a,o,l,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.getSelfHelpConfig({});case 2:if(i=e.sent,t.wininfo.status=i.status,t.wininfo.isMenu=i.isMenu,t.wininfo.isChoose=i.isChoose,t.wininfo.isSendMessage=i.isSendMessage,t.wininfo.goodsDisplay=i.goodsDisplay,t.wininfo.otherPayment="",t.wininfo.fixedPayment=i.fixedPayment,t.wininfo.pay=i.pay?i.pay:[],t.selfStatus=Boolean(Number(i.status)),t.storeSwitch=Boolean(Number(i.isChoose)),t.smsSwitch=Boolean(Number(i.isSendMessage)),t.menuState=Boolean(Number(i.isMenu)),t.isattention=Boolean(Number(i.followSwitch)),s=String(i.goodsDisplay),t.linkUrl=i.baseUrl,""!=s&&s.length>=1)for(t.contenSelect=[],a=0;a<s.length;a++)1!=s[a]&&2!=s[a]&&3!=s[a]||t.contenSelect.push(s[a]);if(t.integralOn=i.titleType,0==i.titleType&&(t.title1=i.title),t.image=i.image,t.imageName=i.image,o=t.imageName.lastIndexOf("/"),t.imageName=t.imageName.substring(o+1,t.imageName.length),""!=(l=String(i.fixedPayment))&&l.length>=1){if(l.length>1)for(t.goodsSelect=[],r=0;r<l.length;r++)3!=l[r]&&5!=l[r]||t.goodsSelect.push(l[r]);else 3!=l&&5!=l||t.goodsSelect.push(l);t.goodsSelect=Array.from(new Set(t.goodsSelect))}t.paymentList=[],t.checkoutMenu=t.wininfo.pay;case 29:case"end":return e.stop()}},e,t)}))()},iselfStatus:function(){this.selfStatus=!this.selfStatus,1==this.selfStatus?this.selfStatus=1:this.selfStatus=0},saveFunction:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,s,o,l,r,c,u;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(i=function(t){var e="";t=t.sort();for(var i=0;i<t.length;i++)e+=t[i];return e},!a.a.isEmptyObject(t.goodsSelect)){e.next=4;break}return t.$store.commit("setWin",{content:"请选择固定支付方式",time:1e3}),e.abrupt("return",!1);case 4:for(s="",o=a.a.deepCopy(t.wininfo.deletePay),l=0;l<o.length;l++)s+=o[l],l<o.length-1&&(s+=",");if(r=[],!a.a.isEmptyObject(t.paymentList))for(c=0;c<t.paymentList.length;c++)r.push(t.paymentList[c].content);if(0!=t.checkoutMenu.length){e.next=12;break}return t.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"请至少添加一种结账方式!"}),e.abrupt("return",!1);case 12:if(!t.isattention||"-1"!=t.integralOn){e.next=15;break}return t.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"请设置标题方式"}),e.abrupt("return",!1);case 15:if(!t.isattention||"0"!=t.integralOn||""!=t.title1){e.next=18;break}return t.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"固定标题不能为空"}),e.abrupt("return",!1);case 18:return t.wininfo.status=Number(t.selfStatus),t.wininfo.isMenu=Number(t.menuState),t.wininfo.isChoose=Number(t.storeSwitch),t.wininfo.isSendMessage=Number(t.smsSwitch),t.wininfo.goodsDisplay=i(t.contenSelect),t.wininfo.otherPayment="",t.wininfo.fixedPayment=i(t.goodsSelect),t.wininfo.addPay=t.wininfo.addPay,t.wininfo.followSwitch=Number(t.isattention),t.wininfo.titleType=1==t.isattention?Number(t.integralOn):1,t.wininfo.title=t.title1,t.wininfo.image=t.image,(u=a.a.deepCopy(t.wininfo)).deletePay=s,delete u.pay,e.next=35,n.a.updateSelfHelpConfig({data:{data:JSON.stringify(u)}});case 35:t.$store.commit("setWin",{content:"保存成功",time:1e3}),t.wininfo.addPay=[],t.wininfo.updatePay=[],t.wininfo.deletePay=[];case 39:case"end":return e.stop()}},e,t)}))()},selectStores:function(t){this.storeSwitch=t},selectSMS:function(t){this.smsSwitch=t},openSattention:function(){this.isattention=!this.isattention,1==this.isattention?this.isattention=1:this.isattention=0}},components:{onOff:function(){return i.e("on_off").then(i.bind(null,"034b"))},mulSelect:function(){return i.e("mul_select").then(i.bind(null,"7d09"))},pay:function(){return i.e("self_help_pay").then(i.bind(null,"7875"))}},mounted:function(){var t=this;return l(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.uploadUrl=o.a.session("userShop").uploadUrl,t.shopName=o.a.session("userShop").currentShop.name,e.next=4,i.e("qrcode").then(function(){var t=i("d741");return"object"==typeof t&&t&&t.__esModule?t:Object.assign({},"object"==typeof t&&t,{default:t})});case 4:t.qrcode=e.sent,t.getSelfConfig();case 6:case"end":return e.stop()}},e,t)}))()}},c=(i("39d3"),i("7610")),u=Object(c.a)(r,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("基础配置")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 批量生成自助模式二维码\n\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 最多添加4种结账功能\n\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"handle-tips div_tips"},[e("i"),this._v(" 保存后链接生效\n\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("进阶配置")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{staticClass:"detH3"},[this._v("\n\t\t\t\t\t\t\t固定标题：自定义，显示在公众号推送的标题。\n\t\t\t\t\t\t\t"),e("br"),this._v(" 自动标题：默认根据区域名名称一桌台名称，自动补充为标题。\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 限15字以内\n\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 尺寸 640*480\n\t\t\t\t")])}],!1,null,"1b18b522",null);u.options.__file="src\\module\\marketing_tools\\self_help_mode.vue";e.default=u.exports}}]);