(window.webpackJsonp=window.webpackJsonp||[]).push([["self_help_mode"],{"031e":function(t,e,s){"use strict";var i=s("4806");s.n(i).a},4806:function(t,e,s){},bfe3:function(t,e,s){"use strict";s.r(e);var i=s("81a2"),n=s("bbb9"),a=s("f6ce");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function i(n,a){try{var o=e[n](a),l=o.value}catch(t){return void s(t)}if(!o.done)return Promise.resolve(l).then(function(t){i("next",t)},function(t){i("throw",t)});t(l)}("next")})}}var l={data:function(){return{shopId:a.a.session("userShop").currentShop.id,selfStatus:!1,menuState:!1,storeSwitch:!0,smsSwitch:!0,opentheFunction:!1,payment:!1,checkoutMenu:[],contentLsit:[{name:"普通商品",id:"1"},{name:"称重商品",id:"2"},{name:"套餐",id:"3"}],contenSelect:["1","2","3"],goodsType:[{name:"微信支付",id:"3"},{name:"会员支付",id:"5"}],goodsSelect:[],exportUrl:"javascript:void(0);",payList:[],paymentList:[],content:"",wininfo:{},upPayInfo:{},linkUrl:"",show:!1,modifyindex:0,publicNumber:!1,isattention:!1,headings:!1,integralList:[{name:"固定标题"},{name:"自动标题"}],integralOn:0,title1:"",uploadUrl:"",image:"",imageName:"",qrcode:"",shopName:"",downloadUrl:"javascript:;"}},methods:{openselfStatus:function(t){this.selfStatus=t},openmenuState:function(t){this.menuState=t},selectStores:function(t){this.storeSwitch=t},selectSMS:function(t){this.smsSwitch=t},openisattention:function(t){this.isattention=t},isPublicNumber:function(){this.publicNumber=!this.publicNumber},haveIndex:function(t){this.integralOn=t},isHeadings:function(){this.headings=!this.headings},bgNameChange:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var s,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.uploadImg({data:{type:8,shopId:t.shopId},formId:"bgImage1"});case 2:s=e.sent,t.image=s,n=t.image.lastIndexOf("/"),t.imageName=t.image.substring(n+1,t.image.length);case 6:case"end":return e.stop()}},e,t)}))()},generatorCode:function(){i.a.downloadQrCode()},downloadCode:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.downloadPack({data:{type:1,shopId:t.shopId}});case 2:case"end":return e.stop()}},e,t)}))()},winEvent:function(t){this.$store.commit("setPageTools",{}),this.show=t},openWindow:function(t,e,s){if(this.checkoutMenu.length>=4&&!s)return this.$store.commit("setWin",{content:"最多添加4个",time:1e3}),!1;this.upPayInfo=n.a.deepCopy(e),this.opentheFunction="1"==s,this.modifyindex=t,this.isUpdata=s,this.show=!0},copyCode:function(t){this.$refs.copyTxt[t].select(),document.execCommand("copy"),this.$store.commit("setWin",{content:"复制成功",time:1e3})},deleteList:function(t,e){this.checkoutMenu.splice(t,1),this.wininfo.deletePay.push(e.id)},getSelfConfig:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var s,n,a,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.getSelfHelpConfig({});case 2:if(s=e.sent,t.wininfo.status=s.status,t.wininfo.isMenu=s.isMenu,t.wininfo.isChoose=s.isChoose,t.wininfo.isSendMessage=s.isSendMessage,t.wininfo.goodsDisplay=s.goodsDisplay,t.wininfo.otherPayment="","0"!=s.fixedPayment?t.wininfo.fixedPayment=s.fixedPayment:t.wininfo.fixedPayment="",t.wininfo.payConfig=s.pay?s.pay:[],t.selfStatus=Boolean(Number(s.status)),t.storeSwitch=Boolean(Number(s.isChoose)),t.smsSwitch=Boolean(Number(s.isSendMessage)),t.menuState=Boolean(Number(s.isMenu)),t.isattention=Boolean(Number(s.followSwitch)),t.linkUrl=s.baseUrl,t.integralOn=s.titleType,0==s.titleType&&(t.title1=s.title),t.image=s.image,t.imageName=s.image,n=t.imageName.lastIndexOf("/"),t.imageName=t.imageName.substring(n+1,t.imageName.length),""!=(a=String(s.fixedPayment))&&"0"!=a&&a.length>=1)for(t.goodsSelect=[],o=0;o<a.length;o++)t.goodsSelect.push(a[o]);t.checkoutMenu=t.wininfo.payConfig;case 26:case"end":return e.stop()}},e,t)}))()},checkForm:function(){return n.a.isEmptyObject(this.goodsSelect)?(this.$store.commit("setWin",{content:"请选择固定支付方式",time:1e3}),!1):0==this.checkoutMenu.length?(this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"请至少添加一种结账方式!"}),!1):!this.isattention||"0"!=this.integralOn||""!=this.title1||(this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"固定标题不能为空"}),!1)},arrToString:function(t){var e="";t=t.sort();for(var s=0;s<t.length;s++)e+=t[s];return e},saveFunction:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.checkForm()){e.next=2;break}return e.abrupt("return");case 2:return t.wininfo.status=Number(t.selfStatus),t.wininfo.isMenu=Number(t.menuState),t.wininfo.isChoose=Number(t.storeSwitch),t.wininfo.isSendMessage=Number(t.smsSwitch),t.wininfo.goodsDisplay=t.arrToString(t.contenSelect),t.wininfo.otherPayment="",t.wininfo.fixedPayment=t.arrToString(t.goodsSelect),t.wininfo.payConfig=t.checkoutMenu,t.wininfo.followSwitch=Number(t.isattention),t.wininfo.titleType=t.isattention?Number(t.integralOn):1,t.wininfo.title=t.title1,t.wininfo.image=t.image,s=n.a.deepCopy(t.wininfo),e.next=17,i.a.updateSelfHelpConfig({data:{data:JSON.stringify(s)}});case 17:t.$store.commit("setWin",{content:"保存成功",time:1e3});case 18:case"end":return e.stop()}},e,t)}))()}},components:{onOff:function(){return s.e("on_off").then(s.bind(null,"034b"))},mulSelect:function(){return s.e("mul_select").then(s.bind(null,"7d09"))},pay:function(){return s.e("checkout_function").then(s.bind(null,"8271a"))},singleSelect:function(){return s.e("mul_select").then(s.bind(null,"7231"))}},mounted:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.uploadUrl=a.a.session("userShop").uploadUrl,t.shopName=a.a.session("userShop").currentShop.name,e.next=4,s.e("qrcode").then(function(){var t=s("d741");return"object"==typeof t&&t&&t.__esModule?t:Object.assign({},"object"==typeof t&&t,{default:t})});case 4:t.qrcode=e.sent,t.getSelfConfig();case 6:case"end":return e.stop()}},e,t)}))()}},c=(s("031e"),s("d801")),r=Object(c.a)(l,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"self-help",attrs:{id:"self-help"}},[t.show?s("pay",{attrs:{opentheFunction:t.opentheFunction,upPayInfo:t.upPayInfo,isUpdata:t.isUpdata,modifyindex:t.modifyindex,checkoutMenu:t.checkoutMenu},on:{winEvent:t.winEvent}}):s("section",[t._m(0),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("开启自助模式")]),t._v(" "),s("onOff",{key:1,staticClass:"fl",attrs:{status:t.selfStatus},on:{statusChange:t.openselfStatus}})],1),t._v(" "),t.selfStatus?t._e():s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("查看菜单")]),t._v(" "),s("onOff",{key:1,staticClass:"fl",attrs:{status:t.menuState},on:{statusChange:t.openmenuState}})],1),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("生成二维码")]),t._v(" "),s("a",{staticClass:"fl add_btn qRcode",on:{click:t.generatorCode}},[t._v("批量生成二维码")]),t._v(" "),t._m(1)]),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("扫码选择门店功能")]),t._v(" "),s("onOff",{key:1,attrs:{status:t.storeSwitch},on:{statusChange:t.selectStores}})],1),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("支付后发送自助短信")]),t._v(" "),s("onOff",{key:1,attrs:{status:t.smsSwitch},on:{statusChange:t.selectSMS}})],1),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub required"},[t._v("固定支付方式")]),t._v(" "),s("span",{staticClass:"fl"},[s("mulSelect",{key:"id",attrs:{list:t.goodsType,selects:t.goodsSelect,styles:{backgroundColor:"rgb(240,240,240)",marginRight:"8px"},name:"name"},on:{"update:list":function(e){t.goodsType=e},"update:selects":function(e){t.goodsSelect=e}}})],1)]),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub required"},[t._v("结账功能")]),t._v(" "),s("a",{staticClass:"on-span add fl",on:{click:function(e){t.openWindow()}}}),t._v(" "),s("div",{staticClass:"fl add-config"},t._l(t.checkoutMenu,function(e,i){return s("span",{key:i,staticClass:"fl",on:{click:function(s){t.openWindow(i,e,"1")}}},[t._v(t._s(e.name)+"\n\t\t\t\t\t"),s("i",{on:{click:function(s){s.stopPropagation(),t.deleteList(i,e)}}})])})),t._v(" "),t._m(2)]),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("生成链接")]),t._v(" "),s("section",{staticClass:"fl sec_wrap"},[t._l(t.checkoutMenu,function(e,i){return""!=e.id&&void 0!=e.id?s("div",{key:i,staticClass:"link"},[s("div",{staticClass:"fl div_wrap"},[s("div",{staticClass:"fl div_innit"},[t._v(t._s(e.name))]),t._v(" "),s("input",{ref:"copyTxt",refInFor:!0,staticClass:"num num_input",attrs:{type:"text"},domProps:{value:t.linkUrl+e.id}})]),t._v(" "),s("a",{staticClass:"fl alink_wap",attrs:{href:"javascript:;"},on:{click:function(e){t.copyCode(i)}}},[t._v("复制链接")])]):t._e()}),t._v(" "),t._m(3)],2)]),t._v(" "),t._m(4),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("关注公众号并点餐")]),t._v(" "),s("onOff",{key:1,staticClass:"fl",attrs:{status:t.isattention},on:{statusChange:t.openisattention}}),t._v(" "),s("div",{staticClass:"prompting fl",on:{click:t.isPublicNumber}},[t.publicNumber?s("div",{staticClass:"detDiv",staticStyle:{top:"0px",left:"45px"}},[s("i",{staticClass:"detI triright"}),t._v(" "),s("h3",{staticClass:"detH3"},[t._v("\n\t\t\t\t\t\t关闭该功能后，生成的二维码无点餐推送。\n\t\t\t\t\t")])]):t._e()])],1),t._v(" "),t.isattention?s("section",[s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("标题设置")]),t._v(" "),s("singleSelect",{key:"id",staticClass:"fl",attrs:{index:t.integralOn,styles:{width:"108px",border:"1px solid #cecdcd",marginRight:"8px"},list:t.integralList,name:"name"},on:{selOn:t.haveIndex}}),t._v(" "),s("div",{staticClass:"prompting fl",on:{click:t.isHeadings}},[t.headings?s("div",{staticClass:"detDiv",staticStyle:{top:"0px",left:"45px"}},[s("i",{staticClass:"detI triright"}),t._v(" "),t._m(5)]):t._e()])],1),t._v(" "),"0"==t.integralOn?s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"}),t._v(" "),s("div",{staticClass:"rightHalf"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.title1,expression:"title1"}],staticClass:"inp",attrs:{type:"text",name:"",placeholder:"请输入固定标题",maxlength:"15"},domProps:{value:t.title1},on:{input:function(e){e.target.composing||(t.title1=e.target.value)}}}),t._v(" "),t._m(6)])]):t._e(),t._v(" "),""!=t.image?s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"}),t._v(" "),s("div",{staticClass:"rightHalf"},[s("div",{staticClass:"uploadImg fl"},[s("img",{attrs:{alt:"logo",src:t.uploadUrl+t.image}})]),t._v(" "),s("div",{staticClass:"fl updateName"},[t._v("(已上传："+t._s(t.imageName)+")")])])]):t._e(),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("显示图片")]),t._v(" "),s("div",{staticClass:"uploadImgs fl"},[s("a",{staticClass:"addclassify fl",staticStyle:{"margin-right":"15px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),s("form",{attrs:{enctype:"multipart/form-data",id:"bgImage1"}},[s("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:t.bgNameChange}})])]),t._v(" "),t._m(7)]),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"},[t._v("下载二维码")]),t._v(" "),s("a",{staticClass:"download",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.downloadCode()}}},[t._v("下载二维码")])])]):t._e(),t._v(" "),s("div",{staticClass:"self-help-box clearfix"},[s("span",{staticClass:"fl self-help-sub"}),t._v(" "),s("a",{staticClass:"gray fl",staticStyle:{width:"200px","margin-right":"2px"},attrs:{href:"javascript:void(0);"}},[t._v("取消")]),t._v(" "),s("a",{staticClass:"blue fl",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:t.saveFunction}},[t._v("保存")])])])],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("基础配置")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 批量生成自助模式二维码\n\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 最多添加4种结账功能\n\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"handle-tips div_tips"},[e("i"),this._v(" 保存后链接生效\n\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("进阶配置")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{staticClass:"detH3"},[this._v("\n\t\t\t\t\t\t\t固定标题：自定义，显示在公众号推送的标题。\n\t\t\t\t\t\t\t"),e("br"),this._v(" 自动标题：默认根据区域名名称一桌台名称，自动补充为标题。\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"handle-tips"},[e("i"),this._v(" 限15字以内\n\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 尺寸 640*480\n\t\t\t\t")])}],!1,null,"7c8c7c1e",null);e.default=r.exports}}]);