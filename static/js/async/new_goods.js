(window.webpackJsonp=window.webpackJsonp||[]).push([["new_goods"],{1024:function(t,i,e){"use strict";var s=e("c4d3");e.n(s).a},"6cf6":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"rushedConfiguration"}},[t._m(0),t._v(" "),e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"online-sub fl required"},[t._v("商品名称")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"txtinp",attrs:{type:"text",maxlength:"20"},domProps:{value:t.name},on:{input:function(i){i.target.composing||(t.name=i.target.value)}}})]),t._v(" "),e("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"0"}},[e("span",{staticClass:"fl online-sub required"},[t._v("商品列表图")]),t._v(" "),e("div",{staticClass:"uploadImgs fl"},[e("a",{staticClass:"addclassify fl",staticStyle:{width:"210px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),e("form",{attrs:{enctype:"multipart/form-data",id:"waitImage"}},[e("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:function(i){t.bgNameChange("",1,"waitImage")}}})])])]),t._v(" "),t._m(1),t._v(" "),""!=t.waitingImage?e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"fl online-sub"}),t._v(" "),e("div",{staticClass:"listimg fl"},[e("img",{attrs:{alt:"logo",src:t.uploadUrl+t.waitingImage}})])]):t._e(),t._v(" "),e("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"0px"}},[e("span",{staticClass:"fl online-sub required"},[t._v("商品展示图")]),t._v(" "),e("div",{staticClass:"uploadImgs fl"},[e("a",{staticClass:"addclassify fl",staticStyle:{width:"210px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),e("form",{attrs:{enctype:"multipart/form-data",id:"startImage"}},[e("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:function(i){t.bgNameChange("",2,"startImage")}}})])])]),t._v(" "),t._m(2),t._v(" "),""!=t.startingImage?e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"fl online-sub"}),t._v(" "),e("div",{staticClass:"showimg fl"},[e("img",{attrs:{alt:"logo",src:t.uploadUrl+t.startingImage}})])]):t._e(),t._v(" "),e("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"0px"}},[e("span",{staticClass:"fl online-sub required"},[t._v("商品轮播图")]),t._v(" "),e("div",{staticClass:"uploadImgs fl"},[e("a",{staticClass:"addclassify fl",staticStyle:{width:"210px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),e("form",{attrs:{enctype:"multipart/form-data",id:"bannerImg"}},[e("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:function(i){t.fileBannerChange("bannerImg","1")}}})])])]),t._v(" "),t._m(3),t._v(" "),t.imgList.length>0?e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"fl online-sub"}),t._v(" "),e("section",{staticClass:"bannerbox"},t._l(t.imgList,function(i,s){return e("div",{key:s,staticClass:"uploadImg fl"},[e("img",{attrs:{alt:"logo",src:t.uploadUrl+i.bannerImage}}),t._v(" "),e("div",{staticClass:"delet"},[e("div",{staticClass:"imgname fl"},[t._v("\n\t\t\t\t\t\t"+t._s(i.bannerImageName)+"\n\t\t\t\t\t")]),t._v(" "),e("div",{staticClass:"delimg fl",on:{click:function(e){t.delImageInList(s,i,"1")}}})])])}))]):t._e(),t._v(" "),e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"online-sub fl required"},[t._v("商品卖价")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.price,expression:"price"}],staticClass:"txtinp",attrs:{type:"text",name:"",maxlength:"6",placeholder:"请输入数字"},domProps:{value:t.price},on:{blur:function(i){t.changeCount(t.price,"1")},input:function(i){i.target.composing||(t.price=i.target.value)}}})]),t._v(" "),e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"online-sub fl required"},[t._v("商品原价")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.originalPrice,expression:"originalPrice"}],staticClass:"txtinp",attrs:{type:"text",placeholder:"请输入数字",maxlength:"6"},domProps:{value:t.originalPrice},on:{blur:function(i){t.changeCount(t.originalPrice,"2")},input:function(i){i.target.composing||(t.originalPrice=i.target.value)}}})]),t._v(" "),e("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"25px"}},[e("span",{staticClass:"online-sub fl required"},[t._v("商品库存")]),t._v(" "),e("a",{staticClass:"addclassify fl",staticStyle:{width:"210px"},attrs:{href:"javascript:void(0);"},on:{click:function(i){t.openStore()}}},[t._v("增加门店库存")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.shopstock.length>0,expression:"shopstock.length > 0"}],staticClass:"online-box clearfix"},[e("span",{staticClass:"online-sub fl"}),t._v(" "),e("div",{staticClass:"stocklist fl"},[t._m(4),t._v(" "),t._l(t.shopstock,function(i,s){return""!=i.stock?e("ul",{key:s,staticClass:"contents"},[e("li",[e("a",{attrs:{href:"javascript:void(0);"},on:{click:function(e){t.delstockList(i,s)}}},[t._v("删除")])]),t._v(" "),e("li",[t._v(t._s(t.getShopname(i.shopId)))]),t._v(" "),e("li",[t._v(t._s(i.stock))])]):t._e()})],2)]),t._v(" "),e("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"0px"}},[e("span",{staticClass:"fl online-sub required"},[t._v("商品详情")]),t._v(" "),e("div",{staticClass:"uploadImgs fl"},[e("a",{staticClass:"addclassify fl",staticStyle:{width:"210px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),e("form",{attrs:{enctype:"multipart/form-data",id:"detailbannerImg"}},[e("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:function(i){t.fileBannerChange("detailbannerImg","2")}}})])])]),t._v(" "),t._m(5),t._v(" "),t.detailimgList.length>0?e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"fl online-sub"}),t._v(" "),e("section",{staticClass:"detailbanner"},t._l(t.detailimgList,function(i,s){return e("div",{key:s,staticClass:"uploadImg fl"},[e("img",{attrs:{alt:"logo",src:t.uploadUrl+i.bannerImage}}),t._v(" "),e("div",{staticClass:"delet"},[e("div",{staticClass:"imgname fl"},[t._v("\n\t\t\t\t\t\t"+t._s(i.bannerImageName)+"\n\t\t\t\t\t")]),t._v(" "),e("div",{staticClass:"delimg fl",on:{click:function(e){t.delImageInList(s,i,"2")}}})])])}))]):t._e(),t._v(" "),e("div",{staticClass:"online-box clearfix"},[e("span",{staticClass:"online-sub fl"}),t._v(" "),e("a",{staticClass:"gray fl",staticStyle:{width:"200px","margin-right":"10px"},attrs:{href:"javascript:void(0);"},on:{click:function(i){t.returnStore()}}},[t._v("取消")]),t._v(" "),e("a",{staticClass:"yellow fl",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:function(i){t.addconfig()}}},[t._v("保存")])]),t._v(" "),t.showWin?e(t.isPopupwindow,{tag:"component",attrs:{shopList:t.shopList},on:{getAppliedWin:t.getResult}}):t._e()],1)};s._withStripped=!0;var a=e("81a2"),n=e("f6ce"),r=e("05dd");function o(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function l(t){return function(){var i=t.apply(this,arguments);return new Promise(function(t,e){return function s(a,n){try{var r=i[a](n),o=r.value}catch(t){return void e(t)}if(!r.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})}}var c={data:function(){return{activityId:"",goodsId:"",shopId:"",uploadUrl:"",imgList:[],waitingImage:"",waitingImageName:"",startingImage:"",startingImageName:"",detailimgList:[],showWin:!1,isPopupwindow:"",deleteImage:[],shopStock:"",name:"",price:"",originalPrice:"",allimg:[],shopList:[],shopstock:[]}},methods:{bgNameChange:function(t,i,e){var s=this;return l(regeneratorRuntime.mark(function t(){var n,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.uploadImg({data:{type:8,shopId:s.shopId},formId:e});case 2:n=t.sent,r=null,t.t0=i,t.next=1===t.t0?7:2===t.t0?11:15;break;case 7:return s.waitingImage=n,r=s.waitingImage.lastIndexOf("/"),s.waitingImageName=s.waitingImage.substring(r+1,s.waitingImage.length),t.abrupt("break",15);case 11:return s.startingImage=n,r=s.startingImage.lastIndexOf("/"),s.startingImageName=s.startingImage.substring(r+1,s.startingImage.length),t.abrupt("break",15);case 15:case"end":return t.stop()}},t,s)}))()},fileBannerChange:function(t,i){var e=this;return l(regeneratorRuntime.mark(function s(){var n,r,o,l;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,a.a.bannerImgUpload({data:{type:8,shopId:e.shopId},formId:t});case 2:if(!(n=s.sent)){s.next=23;break}r=null,s.t0=i,s.next="1"===s.t0?8:"2"===s.t0?15:22;break;case 8:return(o={}).bannerImage=n,r=o.bannerImage.lastIndexOf("/"),o.bannerImageName=o.bannerImage.substring(r+1,o.bannerImage.length),o.type=0,e.imgList.length<8?e.imgList.push(o):e.$store.commit("setWin",{winType:"alert",content:"最多上传八张图片",title:"提示信息"}),s.abrupt("break",23);case 15:return(l={}).bannerImage=n,r=l.bannerImage.lastIndexOf("/"),l.bannerImageName=l.bannerImage.substring(r+1,l.bannerImage.length),l.type=1,e.detailimgList.length<5?e.detailimgList.push(l):e.$store.commit("setWin",{winType:"alert",content:"最多上传五张图片",title:"提示信息"}),s.abrupt("break",23);case 22:return s.abrupt("break",23);case 23:case"end":return s.stop()}},s,e)}))()},returnStore:function(){this.$router.push("/admin/Assistantgood")},getResult:function(t,i){if("ok"==t)for(var e=0;e<i.length;e++){var s=i[e].id,a=i[e].stock;this.shopstock[e]={shopId:s,stock:a}}this.showWin=!1},openStore:function(){this.showWin=!0,this.isPopupwindow="getAppliedWin";for(var t=0;t<this.shopstock.length;t++)for(var i=0;i<this.shopList.length;i++)this.shopList[i].id==this.shopstock[t].shopId&&(this.shopList[i].stock=this.shopstock[t].stock)},delImageInList:function(t,i,e){"1"==e?this.imgList.splice(t,1):"2"==e&&this.detailimgList.splice(t,1)},delstockList:function(t,i){for(var e=0,s=0;s<this.shopstock.length;s++)""!=this.shopstock[s].stock&&e++;if(e<=1)return this.$store.commit("setWin",{content:"请保持至少有一家门店有库存",winType:"alert",title:"操作提示"}),!1;if(this.shopstock.splice(i,1),t)for(var a=0;a<this.shopList.length;a++)t.shopId==this.shopList[a].id&&(this.shopList[a].stock="")},addconfig:function(){var t=this;return l(regeneratorRuntime.mark(function i(){var e,s,n,r,o,l,c,p,g;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(t.mergeObject(),t.checkForm()){i.next=3;break}return i.abrupt("return");case 3:for(e=t.imgList.concat(t.detailimgList),s=[],n=!0,r=!1,o=void 0,i.prev=8,l=e[Symbol.iterator]();!(n=(c=l.next()).done);n=!0)p=c.value,(g={}).image=p.bannerImage,g.type=p.type,p.id&&(g.id=p.id),s.push(g);i.next=16;break;case 12:i.prev=12,i.t0=i.catch(8),r=!0,o=i.t0;case 16:i.prev=16,i.prev=17,!n&&l.return&&l.return();case 19:if(i.prev=19,!r){i.next=22;break}throw o;case 22:return i.finish(19);case 23:return i.finish(16);case 24:return t.allimg=s,i.next=27,a.a.addordeitshop({data:{activityId:t.activityId,goodsId:t.goodsId,name:t.name,price:t.price,originalPrice:t.originalPrice,listImage:t.waitingImage,showImage:t.startingImage,imageList:t.allimg,shopStocks:t.shopStock}});case 27:i.sent&&(t.$store.commit("setWin",{content:"保存成功",winType:"alert",title:"操作提示"}),t.returnStore());case 29:case"end":return i.stop()}},i,t,[[8,12,16,24],[17,,19,23]])}))()},checkForm:function(){return!!r.a.checkData({name:{cond:"$$.length>0",pro:"请输入商品名称"},waitingImage:{cond:"$$.length > 0",pro:"请上传商品列表图"},startingImage:{cond:"$$.length > 0",pro:"请上传商品展示图"},imgList:{cond:"$$.length > 0",pro:"请上传商品轮播图"},price:{cond:"$$.length>0 && ((/^([0-9])+([.][0-9]+)?$/).test($$))",pro:"请输入商品卖价且只能是非负数"},originalPrice:{cond:"$$.length>0 && ((/^([0-9])+([.][0-9]+)?$/).test($$))",pro:"请输入商品原价且只能是非负数"},shopStock:{cond:"Object.keys($$).length > 0",pro:"请增加门店库存"},detailimgList:{cond:"$$.length > 0",pro:"请上传商品详情图"}},this)},getShopname:function(t){for(var i=0;i<this.shopList.length;i++)if(t==this.shopList[i].id)return this.shopList[i].name},mergeObject:function(){for(var t={},i=0;i<this.shopstock.length;i++)if(""!=this.shopstock[i].stock){var e=this.shopstock[i].shopId,s=this.shopstock[i].stock;this.shopStock=Object.assign(t,o({},e,s))}},changeCount:function(t,i){var e=(Math.round(100*t)/100).toString();isNaN(e)&&(e=""),"1"==i?this.price=e:"2"==i&&(this.originalPrice=e)}},watch:{},components:{onOff:function(){return e.e("on_off").then(e.bind(null,"034b"))},calendar:function(){return e.e("calendar_result").then(e.bind(null,"9265"))},selectBtn:function(){return e.e("select_btn").then(e.bind(null,"3d41"))},getAppliedWin:e("77a9").a},mounted:function(){var t=n.a.session("userShop");if(this.uploadUrl=t.uploadUrl,this.shopId=t.currentShop.id,3==t.currentShop.ischain){this.shopList=n.a.session("shopList");var i=!0,e=!1,s=void 0;try{for(var a,r=this.shopList[Symbol.iterator]();!(i=(a=r.next()).done);i=!0){var o=a.value;o.name=o.shopName}}catch(t){e=!0,s=t}finally{try{!i&&r.return&&r.return()}finally{if(e)throw s}}}else 0==t.currentShop.ischain&&this.shopList.push(t.currentShop);if("edi"==n.a.session("type")){var l=n.a.session("detail"),c=n.a.session("shopstock"),p=n.a.session("detailimg"),g=n.a.session("shufflingimg");this.activityId=l.activityId,this.goodsId=l.id,this.name=l.name,this.waitingImage=l.listImage,this.startingImage=l.showImage;for(var h=0;h<g.length;h++)g[h].bannerImage=g[h].image,g[h].bannerImageName=g[h].image.substring(g[h].image.lastIndexOf("/")+1,g[h].image.length),this.imgList.push(g[h]);this.price=l.price,this.originalPrice=l.originalPrice,this.shopstock=c;for(var m=0;m<this.shopstock.length;m++)for(var u=0;u<this.shopList.length;u++)this.shopList[u].id==this.shopstock[m].shopId?this.shopList[u].stock=this.shopstock[m].stock:this.shopList[u].stock="";for(var d=0;d<p.length;d++)p[d].bannerImage=p[d].image,p[d].bannerImageName=p[d].image.substring(p[d].image.lastIndexOf("/")+1,p[d].image.length),this.detailimgList.push(p[d])}else if("add"==n.a.session("type"))for(var v=0;v<this.shopList.length;v++)this.shopList[v].stock=""}},p=(e("1024"),e("7610")),g=Object(p.a)(c,s,[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"set-line"},[i("div",{staticClass:"titles"},[this._v("新建疯抢商品")]),this._v(" "),i("div",{staticClass:"line"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"25px"}},[i("span",{staticClass:"online-sub fl"}),this._v(" "),i("div",{staticClass:"fl handle-tips"},[i("i"),this._v("\n\t\t\t尺寸:128px*128 px\n\t\t")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"25px"}},[i("span",{staticClass:"online-sub fl"}),this._v(" "),i("div",{staticClass:"fl handle-tips"},[i("i"),this._v("\n\t\t\t尺寸:680px*270px\n\t\t")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"25px"}},[i("span",{staticClass:"online-sub fl"}),this._v(" "),i("div",{staticClass:"fl handle-tips"},[i("i"),this._v("\n\t\t\t尺寸:750px*750px(最多8张)\n\t\t")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("ul",{staticClass:"heads"},[i("li",[this._v("操作")]),this._v(" "),i("li",[this._v("门店名称")]),this._v(" "),i("li",[this._v("库存数量")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"online-box clearfix",staticStyle:{"margin-bottom":"25px"}},[i("span",{staticClass:"online-sub fl"}),this._v(" "),i("div",{staticClass:"fl handle-tips"},[i("i"),this._v("\n\t\t\t尺寸:750px*750px(最多5张)\n\t\t")])])}],!1,null,"4860be13",null);g.options.__file="src\\module\\seller_assistant\\new_goods.vue";i.default=g.exports},"77a9":function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("Win",{attrs:{width:740,height:"auto",align:"center"},on:{winEvent:t.getAppliedWin}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v("增加门店库存")]),t._v(" "),e("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[e("ul",t._l(t.shopList,function(i,s){return e("li",{key:s},[e("div",{staticClass:"fl shopname"},[t._v("\n\t\t\t\t\t"+t._s(i.name)+"\n\t\t\t\t")]),t._v(" "),e("div",{staticClass:"fl shopstock"},[t._v("\n\t\t\t\t\t库存量\n\t\t\t\t\t"),e("input",{directives:[{name:"model",rawName:"v-model",value:i.stock,expression:"item.stock"}],attrs:{type:"text",name:"",maxlength:"6"},domProps:{value:i.stock},on:{input:function(e){e.target.composing||t.$set(i,"stock",e.target.value)}}})])])}))])])};s._withStripped=!0;var a=/^\d*[0-9]{1,}\d*$/,n={data:function(){return{}},methods:{getAppliedWin:function(t){if("ok"==t){var i=0,e=!0,s=!1,n=void 0;try{for(var r,o=this.shopList[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){var l=r.value;if(this.isEmpty(l.stock)||i++,!this.isEmpty(l.stock)&&!a.test(l.stock))return this.$store.commit("setWin",{content:l.name+"库存量只能是正整数",winType:"alert",title:"操作提示"}),!1}}catch(t){s=!0,n=t}finally{try{!e&&o.return&&o.return()}finally{if(s)throw n}}if(i<1)return this.$store.commit("setWin",{content:"至少增加一家门店库存量并且只能是正整数",winType:"alert",title:"操作提示"}),!1;this.$emit("getAppliedWin",t,this.shopList)}else{var c=!0,p=!1,g=void 0;try{for(var h,m=this.shopList[Symbol.iterator]();!(c=(h=m.next()).done);c=!0){h.value.stock=""}}catch(t){p=!0,g=t}finally{try{!c&&m.return&&m.return()}finally{if(p)throw g}}this.$emit("getAppliedWin",t)}},isEmpty:function(t){return""==t.replace(/(^\s*)|(\s*$)/g,"")}},components:{Win:function(){return Promise.resolve().then(e.bind(null,"f60a"))}},props:{shopList:Array}},r=(e("8445"),e("7610")),o=Object(r.a)(n,s,[],!1,null,"dc0ea5a0",null);o.options.__file="src\\module\\seller_assistant\\new_goods_win.vue";i.a=o.exports},8445:function(t,i,e){"use strict";var s=e("dcc4");e.n(s).a},c4d3:function(t,i,e){},dcc4:function(t,i,e){}}]);