(window.webpackJsonp=window.webpackJsonp||[]).push([["invent_putstroage"],{"2ca8":function(t,e,a){"use strict";var i=a("90ac");a.n(i).a},"90ac":function(t,e,a){},d274:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"invendetail"},[a("div",{staticClass:"titleTop"},[a("div",{staticClass:"topbox"},[a("i"),t._v(" "),a("h3",[t._v("商品详情")]),t._v(" "),t._l(32,function(t){return a("div",{key:t,staticClass:"dian"})})],2)]),t._v(" "),a("section",{staticStyle:{width:"750px",height:"auto","margin-top":"20px"}},[a("div",{staticClass:"cList",staticStyle:{width:"750px","padding-left":"7%"}},[a("div",{staticStyle:{width:"49%",display:"inline-block"}},[a("div",{staticStyle:{width:"100%",height:"40px"}},[a("h3",{staticClass:"showBefore"},[t._v("名称:")]),t._v(" "),a("div",{staticClass:"shopAfter"},[t._v(t._s(t.newShopdetail.gName||"--"))])]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"40px"}},[a("h3",{staticClass:"showBefore"},[t._v("品牌:")]),t._v(" "),a("div",{staticClass:"shopAfter"},[t._v(t._s(t.newShopdetail.brandName||"--"))])]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"40px"}},[a("h3",{staticClass:"showBefore"},[t._v("分类:")]),t._v(" "),a("div",{staticClass:"shopAfter"},[t._v(t._s(t.showCate(t.newShopdetail.cate)))])])]),t._v(" "),a("div",{staticStyle:{width:"49%",display:"inline-block","vertical-align":"top"}},[a("div",{staticStyle:{width:"100%",height:"40px"}},[a("h3",{staticClass:"showBefore"},[t._v("条码:")]),t._v(" "),a("div",{staticClass:"shopAfter"},[t._v(t._s(t.newShopdetail.barCode||"--"))])]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"40px"}},[a("h3",{staticClass:"showBefore"},[t._v("规格:")]),t._v(" "),a("div",{staticClass:"shopAfter"},[t._v(t._s(t.newShopdetail.specifications||"--"))])]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"40px"}},[a("h3",{staticClass:"showBefore"},[t._v("单位:")]),t._v(" "),a("div",{staticClass:"shopAfter"},[t._v(t._s(t.newShopdetail.unit||"--"))])]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"40px"}},[a("h3",{staticClass:"showBefore"},[t._v("有效期:")]),t._v(" "),a("div",{staticClass:"shopAfter"},[t._v("\n\t\t\t\t\t\t"+t._s(t.newShopdetail.validity||"--")+"\n\t\t\t\t\t\t"),1==t.newShopdetail.validityType?a("span",[t._v("日")]):t._e(),t._v(" "),0==t.newShopdetail.validityType?a("span",[t._v("月")]):t._e(),t._v(" "),2==t.newShopdetail.validityType?a("span",[t._v("年")]):t._e()])])])])]),t._v(" "),a("div",{staticClass:"titleTop"},[a("div",{staticClass:"topbox"},[a("i"),t._v(" "),a("h3",[t._v("新建库存")]),t._v(" "),t._l(32,function(t){return a("div",{key:t,staticClass:"dian"})})],2)]),t._v(" "),0==t.isStatus?a("div",{staticClass:"coninp"},[a("div",{staticClass:"cList conbox"},[a("div",{staticClass:"leftform"},[a("div",[a("label",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("入库类型")]),t._v(" "),t.isoldStatus?a("span",{staticClass:"right",staticStyle:{border:"none"}},[t._v("新增入库")]):a("span",{staticClass:"right",staticStyle:{border:"none"}},[t._v("新增批次")])]),t._v(" "),t.isOk?a("div",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("生产日期")]),t._v(" "),a("div",{staticClass:"orMaRetBox"},[a("calendar",{attrs:{only:!1,time:t.startTime,calStyle:{width:"230px"},format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1)]):t._e(),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("数量")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newNum,expression:"newNum"}],staticClass:"right",attrs:{type:"text",placeholder:"请填写入库数量",maxlength:"10"},domProps:{value:t.newNum},on:{input:[function(e){e.target.composing||(t.newNum=e.target.value)},t.changeNum]}})]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("进价")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.purchasePrice,expression:"purchasePrice"}],staticClass:"right",attrs:{type:"text",placeholder:"请输入进价",maxlength:"10"},domProps:{value:t.purchasePrice},on:{input:function(e){e.target.composing||(t.purchasePrice=e.target.value)}}})]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none"},[t._v("批次编码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.batchCode,expression:"batchCode"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"20"},domProps:{value:t.batchCode},on:{input:function(e){e.target.composing||(t.batchCode=e.target.value)}}})])])]),t._v(" "),a("div",{staticClass:"leftform"},[a("div",[a("label",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("仓库")]),t._v(" "),a("section",{staticClass:"tableListInp chairFix",staticStyle:{"vertical-align":"middle"},on:{click:t.showHouse}},[a("span",{staticClass:"inptext"},[t._v(t._s(t.iswear)+t._s(t.iswear&&"/")+t._s(t.isarea))]),t._v(" "),t._m(0)])]),t._v(" "),a("div",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("失效日期")]),t._v(" "),a("section",{staticClass:"orMaRetBox",staticStyle:{"margin-right":"30px"}},[a("calendar",{attrs:{only:!1,calStyle:{width:"230px"},time:t.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1)]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("供应商")]),t._v(" "),a("section",{staticClass:"tableListInp chairFix",staticStyle:{"vertical-align":"middle"},on:{click:t.showSupply}},[a("span",{staticClass:"inptext"},[t._v(t._s(t.selectSupply))]),t._v(" "),t._m(1)])]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none"},[t._v("货号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.artNo,expression:"artNo"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"20"},domProps:{value:t.artNo},on:{input:function(e){e.target.composing||(t.artNo=e.target.value)}}})])])]),t._v(" "),a("label",{staticClass:"content-box",staticStyle:{"vertical-align":"top"}},[a("span",{staticClass:"required icon-none"},[t._v("备注")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remarks,expression:"remarks"}],staticClass:"right remark",attrs:{maxlength:"40",placeholder:"请填写备注信息"},domProps:{value:t.remarks},on:{input:function(e){e.target.composing||(t.remarks=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"boxbottom"},[a("a",{staticClass:"gray del",attrs:{href:"javascript:void(0);"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("a",{staticClass:"yellow continus",attrs:{href:"javascript:void(0);"},on:{click:t.continueSave}},[t._v("继续入库")]),t._v(" "),a("a",{staticClass:"yellow",staticStyle:{width:"110px"},attrs:{href:"javascript:void(0);"},on:{click:t.batchSave}},[t._v("确认入库")])])])]):t._e(),t._v(" "),1==t.isStatus?a("div",{staticClass:"cList coninp",staticStyle:{width:"750px","margin-top":"20px",overflow:"hidden"}},[a("div",{staticStyle:{width:"49%",display:"inline-block",float:"left"}},[a("div",{staticClass:"info-content userinfo conbox"},[t._m(2),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none",staticStyle:{color:"#ccc","vertical-align":"top"}},[t._v("生产日期:")]),t._v(" "),a("span",{staticStyle:{color:"#ccc",display:"inline-block",width:"230px",height:"40px"}},[t._v(t._s(t.productionTime))])]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("数量:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.houseTotal,expression:"houseTotal"}],staticClass:"right",attrs:{type:"text",placeholder:"请填写入库数量",maxlength:"10"},domProps:{value:t.houseTotal},on:{input:function(e){e.target.composing||(t.houseTotal=e.target.value)}}})]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none",staticStyle:{color:"#ccc"}},[t._v("批次编码:")]),t._v(" "),a("span",{staticStyle:{color:"#ccc",display:"inline-block","vertical-align":"top",width:"230px",height:"40px"}},[t._v(t._s(t.newareaName.batchCode))])])])]),t._v(" "),a("div",{staticStyle:{width:"49%",display:"inline-block",float:"left"}},[a("div",{staticClass:"info-content userinfo conbox"},[a("label",{staticClass:"content-box",staticStyle:{height:"41px",overflow:"hidden"}},[a("span",{staticClass:"required icon-none",staticStyle:{float:"left"}},[t._v("仓库:")]),t._v(" "),a("section",{staticClass:"tableListInp chairFix",staticStyle:{"vertical-align":"middle"},on:{click:t.showHouse}},[a("span",{staticClass:"inptext"},[t._v(t._s(t.newareaName.wName||"暂无")+"/"+t._s(t.newareaName.aName||"暂无"))]),t._v(" "),t._m(3)])]),t._v(" "),a("label",{staticClass:"content-box",staticStyle:{height:"41px",overflow:"hidden"}},[a("span",{staticClass:"required icon-none",staticStyle:{color:"#ccc",float:"left"}},[t._v("失效日期:")]),t._v(" "),a("span",{staticStyle:{color:"#ccc",display:"inline-block",width:"230px",height:"40px",float:"left"}},[t._v(t._s(t.invalidTime))])]),t._v(" "),a("label",{staticClass:"content-box",staticStyle:{height:"41px",overflow:"hidden"}},[a("span",{staticClass:"required icon-none",staticStyle:{color:"#ccc",float:"left"}},[t._v("供应商:")]),t._v(" "),a("span",{staticStyle:{color:"#ccc",display:"inline-block",width:"230px",height:"40px",float:"left"}},[t._v(t._s(t.newareaName.supplier))])]),t._v(" "),a("label",{staticClass:"content-box",staticStyle:{height:"41px",overflow:"hidden"}},[a("span",{staticClass:"required icon-none",staticStyle:{color:"#ccc",float:"left"}},[t._v("货号:")]),t._v(" "),a("span",{staticStyle:{color:"#ccc",display:"inline-block",width:"230px",height:"40px",float:"left"}},[t._v(t._s(t.newareaName.articleNo))])])])]),t._v(" "),a("div",{staticClass:"info-content userinfo conbox",staticStyle:{float:"left"}},[a("label",{staticClass:"content-box",staticStyle:{height:"80px"}},[a("span",{staticClass:"required icon-none",staticStyle:{"vertical-align":"top",color:"#ccc"}},[t._v("备注:")]),t._v(" "),a("span",{staticClass:"right",staticStyle:{color:"#ccc",display:"inline-block",width:"460px",height:"80px"}},[t._v(t._s(t.newareaName.remark))])])]),t._v(" "),a("div",{staticStyle:{"margin-top":"50px","margin-left":"120px",float:"left"}},[a("a",{staticClass:"gray",staticStyle:{width:"110px"},attrs:{href:"javascript:void(0);"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),1!=t.isStatus?a("a",{staticClass:"blue",staticStyle:{width:"110px","margin-right":"20px"},attrs:{href:"javascript:void(0);"},on:{click:t.continueSave}},[t._v("继续添加")]):t._e(),t._v(" "),a("a",{staticClass:"yellow",staticStyle:{width:"110px","margin-right":"20px"},attrs:{href:"javascript:void(0);"},on:{click:function(e){return e.stopPropagation(),t.batchSave(e)}}},[t._v("保存")])])]):t._e(),t._v(" "),2==t.isStatus?a("div",{staticClass:"coninp"},[a("div",{staticClass:"cList conbox"},[a("div",{staticClass:"leftform"},[a("div",[a("label",{staticClass:"content-box",staticStyle:{height:"41px",overflow:"hidden"}},[a("span",{staticClass:"required",staticStyle:{float:"left"}},[t._v("仓库")]),t._v(" "),a("span",{staticStyle:{display:"inline-block",width:"230px",height:"40px","padding-left":"10px",float:"left"}},[t._v(t._s(t.newareaName.wName||"暂无")+"/"+t._s(t.newareaName.aName||"暂无"))])]),t._v(" "),t.isOk?a("div",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("生产日期")]),t._v(" "),a("div",{staticClass:"orMaRetBox"},[a("calendar",{attrs:{only:!1,calStyle:{width:"230px"},time:t.startTime,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1)]):t._e(),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none"},[t._v("供应商")]),t._v(" "),a("section",{staticClass:"tableListInp chairFix",staticStyle:{"vertical-align":"middle"},on:{click:t.showSupply}},[a("span",{staticClass:"inptext"},[t._v(t._s(t.selectSupply))]),t._v(" "),t._m(4)])]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none"},[t._v("批次编码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.batchCode,expression:"batchCode"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"20"},domProps:{value:t.batchCode},on:{input:function(e){e.target.composing||(t.batchCode=e.target.value)}}})])])]),t._v(" "),a("div",{staticClass:"leftform"},[a("div",[a("label",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("数量")]),t._v(" "),a("span",{staticStyle:{display:"inline-block",width:"230px",height:"40px","padding-left":"10px"}},[t._v(t._s(t.newNum))])]),t._v(" "),a("div",{staticClass:"content-box"},[a("span",{staticClass:"required"},[t._v("失效日期")]),t._v(" "),a("section",{staticClass:"orMaRetBox",staticStyle:{"margin-right":"30px"}},[a("calendar",{attrs:{only:!1,calStyle:{width:"230px"},time:t.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1)]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none"},[t._v("进价")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.purchasePrice,expression:"purchasePrice"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"10"},domProps:{value:t.purchasePrice},on:{input:function(e){e.target.composing||(t.purchasePrice=e.target.value)}}})]),t._v(" "),a("label",{staticClass:"content-box"},[a("span",{staticClass:"required icon-none"},[t._v("货号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.artNo,expression:"artNo"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"20"},domProps:{value:t.artNo},on:{input:function(e){e.target.composing||(t.artNo=e.target.value)}}})])])]),t._v(" "),a("label",{staticClass:"content-box",staticStyle:{"vertical-align":"top"}},[a("span",{staticClass:"required icon-none"},[t._v("备注")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remarks,expression:"remarks"}],staticClass:"right remark",attrs:{maxlength:"40",placeholder:"请填写备注信息"},domProps:{value:t.remarks},on:{input:function(e){e.target.composing||(t.remarks=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"boxbottom"},[a("a",{staticClass:"gray del",attrs:{href:"javascript:void(0);"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("a",{staticClass:"yellow",staticStyle:{width:"110px"},attrs:{href:"javascript:void(0);"},on:{click:t.modification}},[t._v("确定")])])])]):t._e(),t._v(" "),a("warehouse-win",{directives:[{name:"show",rawName:"v-show",value:t.wareshow,expression:"wareshow"}],ref:"warehouse",attrs:{title:t.winTitle,goodsWid:t.goodsWid,goodsareaId:t.goodsareaId,wareType:t.wareType},on:{wareEvent:t.wareEvent}}),t._v(" "),t.win.show&&t.win.list.length>0?a("multiple-win",{attrs:{styles:{backgroundColor:"#F1F1F1"},isradio:t.win.isradio,selects:t.win.selects,title:t.win.title,name:t.win.name,width:t.win.width,height:t.win.height,list:t.win.list,selkey:t.win.selkey},on:{selArray:t.winSel}}):t._e()],1)};i._withStripped=!0;var s=a("81a2"),n=a("f6ce"),r=a("bbb9"),o=a("05dd");function c(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function i(s,n){try{var r=e[s](n),o=r.value}catch(t){return void a(t)}if(!r.done)return Promise.resolve(o).then(function(t){i("next",t)},function(t){i("throw",t)});t(o)}("next")})}}var l={data:function(){return{gid:"",newShopdetail:{cate:[]},isoldStatus:!0,isOk:!0,startTime:(new Date).setHours(0,0,0,0),wareShow:!0,newNum:"",batchCode:"",wareArea:"",endTime:(new Date).setHours(0,0,0,0),selectSupply:"选择供应商",artNo:"",remarks:"",iswear:"",isarea:"",isStatus:0,win:{title:"供应商",show:!1,list:[],width:980,height:400,isradio:!0,name:"name",selkey:"id",selects:[]},continue:!0,productionTime:"",houseTotal:"",newareaName:"",invalidTime:"",check:!0,wareshow:!1,wareType:0,winTitle:"仓库位置",batchId:null,purchasePrice:"",checkHttp:!0,goodsWid:"",goodsareaId:"",shopId:n.a.session("userShop").currentShop.id,brandId:n.a.session("userShop").currentShop.brandId}},methods:{init:function(){var t=this;return c(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.getDetails({data:{gid:t.gid}});case 2:a=e.sent,t.newShopdetail=a,t.newShopdetail.validity&&0==t.isStatus&&(0==t.newShopdetail.validityType?t.endTime=(new Date).setMonth((new Date).getMonth()+parseInt(t.newShopdetail.validity)):1==t.newShopdetail.validityType?t.endTime=(new Date).setDate((new Date).getDate()+parseInt(t.newShopdetail.validity)):2==t.newShopdetail.validityType&&(t.endTime=(new Date).setFullYear((new Date).getFullYear()+parseInt(t.newShopdetail.validity))));case 5:case"end":return e.stop()}},e,t)}))()},showCate:function(t){var e=[],a=!0,i=!1,s=void 0;try{for(var n,r=t[Symbol.iterator]();!(a=(n=r.next()).done);a=!0){var o=n.value;e.push(o.name)}}catch(t){i=!0,s=t}finally{try{!a&&r.return&&r.return()}finally{if(i)throw s}}return e.join(",")},startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=t},showHouse:function(){this.wareshow=!0},cancel:function(){window.history.go(-1)},changeNum:function(){this.newNum.includes(".")&&(this.newNum=this.newNum.substr(0,this.newNum.indexOf(".")+4))},continueSave:function(){this.check=!1,this.putGoods()},clearSelect:function(){this.newNum="",this.win.selects=[],this.remarks="",this.artNo="",this.batchCode="",this.purchasePrice="",this.selectSupply="选择供应商"},getString:function(t){return"string"!=typeof t&&t?t.join(","):t},batchSave:function(){this.isStatus?this.seaveGoods():this.putGoods(),this.check=!0},seaveGoods:function(){var t=this;return c(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o.a.checkData({houseTotal:{reg:/^\d*\.?\d+$/,pro:"请输入入库数量"}},t)){e.next=3;break}return t.check=!1,e.abrupt("return",!1);case 3:if(""!=t.houseTotal&&0!=t.houseTotal){e.next=6;break}return t.$store.commit("setWin",{title:"操作提示",content:"请输入数量"}),e.abrupt("return",!1);case 6:return e.next=8,s.a.goodsinventoryAddNum({data:{itemId:t.gid,batchId:t.batchId,num:t.houseTotal,wid:t.newareaName.wid,areaId:t.newareaName.areaId,type:0}});case 8:e.sent?(t.$store.commit("setWin",{title:"操作提示",content:"您选择的商品入库成功。"}),t.check&&t.cancel()):t.$store.commit("setWin",{title:"操作提示",content:"入库失败。"});case 10:case"end":return e.stop()}},e,t)}))()},putGoods:function(){var t=this;return c(regeneratorRuntime.mark(function e(){var a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o.a.checkData({newNum:{reg:/^\d*\.?\d+$/,pro:"请输入入库数量"},purchasePrice:{reg:/^\d*\.?\d+$/,pro:"进价输入有误"}},t)){e.next=3;break}return t.check=!1,e.abrupt("return",!1);case 3:if(!(t.endTime<t.startTime)){e.next=7;break}return t.$store.commit("setWin",{title:"操作提示",content:"失效日期应大于于生产日期"}),t.check=!1,e.abrupt("return",!1);case 7:if(!(t.newNum<=0)&&t.newNum){e.next=11;break}return t.$store.commit("setWin",{title:"操作提示",content:"数量填写有误"}),t.check=!1,e.abrupt("return",!1);case 11:if(0!=t.newShopdetail.type||!t.newNum.includes(".")){e.next=15;break}return t.$store.commit("setWin",{title:"操作提示",content:"普通商品数量应为整数"}),t.check=!1,e.abrupt("return",!1);case 15:if(0!=t.win.selects.length){e.next=19;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择供货商"}),t.check=!1,e.abrupt("return",!1);case 19:if(t.newShopdetail.warehouse){e.next=23;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择仓库"}),t.check=!1,e.abrupt("return",!1);case 23:return a=r.a.getTime({time:t.startTime,type:!1}).start,i=void 0,""==t.endTime?(1==t.newShopdetail.validityType?i=new Date(t.startTime).setDate(new Date(t.startTime).getDate()+ +t.newShopdetail.validity):0==t.newShopdetail.validityType?i=new Date(t.startTime).setMonth(new Date(t.startTime).getMonth()+ +t.newShopdetail.validity):2==t.newShopdetail.validityType&&(i=new Date(t.startTime).setFullYear(new Date(t.startTime).getFullYear()+ +t.newShopdetail.validity)),i=parseInt(i/1e3)):i=parseInt(t.endTime/1e3),e.next=28,s.a.addInventory({data:{type:0,itemId:t.gid,wid:t.newShopdetail.warehouse.wid,areaId:t.newShopdetail.warehouse.areaId,supplierId:t.win.selects[0],totalSurplus:t.newNum,productionTime:a,expiryTime:i,batchCode:t.batchCode,articleNo:t.artNo,remarks:t.remarks,purchaseUnit:0,purchasePrice:t.purchasePrice?t.purchasePrice:0}});case 28:e.sent?(t.$store.commit("setWin",{title:"操作提示",content:"您选择的商品入库成功。"}),t.clearSelect(),t.check&&t.cancel()):t.$store.commit("setWin",{title:"操作提示",content:"入库失败。"});case 30:case"end":return e.stop()}},e,t)}))()},showSupply:function(){var t=this;return c(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.win.show=!0,e.next=3,s.a.suppierList();case 3:a=e.sent,t.win.list=a;case 5:case"end":return e.stop()}},e,t)}))()},winSel:function(t,e){this.win.show=!1,"ok"==e&&(this.win.selects=t,this.win.list.length>0&&t.length>0?this.selectSupply=this.win.list.find(function(e){return e.id===t[0]}).name:this.selectSupply="")},wareEvent:function(t){this.wareshow=!1,"ok"==t&&this.wareClose()},wareClose:function(){var t=this.$refs.warehouse;if(!t.chooseWare)return this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"请选择区域"}),this.wareshow=!0,!1;this.iswear=t.searchList[t.homeSel].name,this.isarea=t.chooseWare.areaName,this.newShopdetail.warehouse={wid:t.homeId,areaId:t.chooseWare.id},this.newareaName&&(this.newareaName.aName=t.chooseWare.areaName,this.newareaName.areaId=t.chooseWare.id,this.goodsareaId=t.chooseWare.id)},modification:function(){var t=this;return c(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.endTime<t.startTime)){e.next=3;break}return t.$store.commit("setWin",{title:"操作提示",content:"失效日期应大于于生产日期"}),e.abrupt("return",!1);case 3:return e.next=5,s.a.updateBatch({data:{type:0,wid:t.newareaName.wid,batchId:t.batchId,itemId:t.gid,productionTime:t.startTime/1e3,expiryTime:t.endTime/1e3,batchCode:t.batchCode,supplierId:t.win.selects[0],articleNo:t.artNo,purchasePrice:t.purchasePrice,remark:t.remarks},formId:"uploadImageForm"});case 5:e.sent&&t.cancel();case 7:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.gid=this.$route.query.gid,this.$route.query.batchId&&(this.batchId=this.$route.query.batchId);var t=n.a.session("goodsneed");this.newareaName=t,t&&this.$route.query.isStatus&&(this.isStatus=this.$route.query.isStatus,this.productionTime=r.a.format(t.productionTime,"yyyy年MM月dd日"),this.invalidTime=r.a.format(t.expiryTime,"yyyy年MM月dd日"),2==this.isStatus?(this.startTime=1e3*t.productionTime,this.endTime=1e3*t.expiryTime||(new Date).setHours(0,0,0,0),this.selectSupply=t.supplier,this.batchCode=t.batchCode,this.remarks=t.remark,this.artNo=t.articleNo,this.purchasePrice=t.purchasePrice,this.newNum=t.surplus,this.win.selects[0]=t.supplierId):1==this.isStatus&&(this.goodsWid=t.wid,this.goodsareaId=t.areaId)),this.init()},components:{calendar:function(){return a.e("calendar_type").then(a.bind(null,"f2dd"))},multipleWin:function(){return a.e("multiple_win").then(a.bind(null,"d696"))},warehouseWin:function(){return a.e("warehouse_win").then(a.bind(null,"0c7d"))}}},d=(a("2ca8"),a("7610")),h=Object(d.a)(l,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("span",{staticClass:"addstyle"},[this._v("+")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("span",{staticClass:"addstyle"},[this._v("+")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"content-box"},[e("span",{staticClass:"required icon-none",staticStyle:{color:"#ccc"}},[this._v("入库类型:")]),this._v(" "),e("span",{staticStyle:{color:"#ccc",display:"inline-block",width:"230px",height:"40px"}},[this._v("已有批次入库:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("span",{staticClass:"addstyle"},[this._v("+")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("span",{staticClass:"addstyle"},[this._v("+")])])}],!1,null,"29ae1ca7",null);h.options.__file="src\\module\\invoicing_system\\invoicing\\invent_putstroage.vue";e.default=h.exports}}]);