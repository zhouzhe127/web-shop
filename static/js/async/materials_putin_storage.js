(window.webpackJsonp=window.webpackJsonp||[]).push([["materials_putin_storage"],{"0100":function(t,e,n){"use strict";n.r(e);var i=[function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("section",[e("p",[this._v("入库类型")]),this._v(" "),e("span",[this._v("新增入库")])]),this._v(" "),e("section")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("span",{staticClass:"addstyle"},[this._v("+")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("span",{staticClass:"addstyle"},[this._v("+")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"prompt"},[e("img",{attrs:{src:n("fdd3"),alt:""}}),this._v(" "),e("span",[this._v("限40字以内")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",[e("h6",[this._v("入库类型:")]),this._v(" "),e("span",[this._v("已有批次入库")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("span",{staticClass:"addstyle"},[this._v("+")])])}],a=n("81a2"),s=n("f6ce"),r=n("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,s){try{var r=e[a](s),o=r.value}catch(t){return void n(t)}if(!r.done)return Promise.resolve(o).then(function(t){i("next",t)},function(t){i("throw",t)});t(o)}("next")})}}var c={data:function(){return{presenceBatches:"0",allUnit:[],unitName:"",startTime:"",endTime:"",newShopdetail:{},wareshow:!1,wareType:0,winTitle:"仓库位置",iswear:"请选择仓库",isarea:"区域",selectSupply:"请选择供应商",win:{title:"供应商",show:!1,list:[],width:980,height:400,isradio:!0,name:"name",selkey:"id",selects:[]},unitReady:[],materialInfo:{},unitInfo:[],unitInfoName:"",unitInfoDefault:"",unitInfoMin:"",unitInfoValue:"",unitInfoConversion:"",cateInfo:[],cateInfoName:"",getInfo:{},wid:"",areaId:"",supplierId:"",number:"",weight:"",conversion:"",purchasePrice:"",purchaseUnit:"",batchCode:"",articleNo:"",remark:"",existingBatchInfo:{},successInfo:null,conversionArr:[],smallUnit:"",UnitDataInfo:"",validityType:"",sameUnitConver:"",goodsWid:"",goodsareaId:""}},methods:{getStartTime:function(t){this.startTime=t},getEndTime:function(t){this.endTime=t+864e5-1},getUnit:function(t){this.purchaseUnit=this.unitReady[t].id,this.unitName=this.unitReady[t].name,this.conversion=this.unitReady[t].value},dealData:function(t,e){var n=[],i=!0,a=!1,s=void 0;try{for(var r,o=t[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var c=r.value;n.push(c[e])}}catch(t){a=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(a)throw s}}return n},init:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var n,i,s,r,o,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getMaterialDetail({data:{mid:1==t.getInfo.type?t.getInfo.id:t.existingBatchInfo.itemId}});case 2:for(n=e.sent,t.materialInfo=n,t.unitInfo=n.unit,0==t.materialInfo.validityType?t.validityType="月":1==t.materialInfo.validityType?t.validityType="日":2==t.materialInfo.validityType&&(t.validityType="年"),i=[],s=0;s<t.unitInfo.length;s++)1==t.unitInfo[s].isDefault&&1==t.unitInfo[s].isMin&&(t.unitInfoDefault=t.unitInfo[s].name,t.unitInfoMin=t.unitInfo[s].name,t.sameUnitConver="1"+t.unitInfo[s].name+"="+t.unitInfo[s].value+t.unitInfoMin),1==t.unitInfo[s].isDefault&&(t.unitInfoDefault=t.unitInfo[s].name),1==t.unitInfo[s].isMin&&(t.unitInfoMin=t.unitInfo[s].name),0==t.unitInfo[s].isMin&&(i.push(t.unitInfo[s]),t.unitInfo[s].unitConversion="1"+t.unitInfo[s].name+"="+t.unitInfo[s].value+t.unitInfoMin);return console.log(i),t.conversionArr=i,t.unitInfoName=t.dealData(t.unitInfo,"name").join("、"),t.unitInfoConversion=t.dealData(t.conversionArr,"unitConversion").join("|"),t.cateInfo=n.cate,t.cateInfoName=t.dealData(t.cateInfo,"name").join("、"),e.next=16,a.a.getUnitByMid({data:{mid:1==t.getInfo.type?t.getInfo.id:t.existingBatchInfo.itemId}});case 16:r=e.sent,t.UnitDataInfo=r,o=[],c=[],r.forEach(function(e){1==e.isMin&&1==e.isDefault?(t.smallUnit=e.name,t.unitName=e.name,t.conversion=1,t.purchaseUnit=e.muId):1==e.isMin?t.smallUnit=e.name:1==e.isDefault&&(t.unitName=e.name,t.conversion=e.value,t.purchaseUnit=e.muId),o.push(e.name);var n={id:e.muId,name:e.name,value:e.value};c.push(n)}),t.allUnit=o,t.unitReady=c;case 23:case"end":return e.stop()}},e,t)}))()},putStorage:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var n,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=isNaN(t.purchasePrice)){e.next=3;break}return t.$store.commit("setWin",{title:"操作提示",content:"进价请输入数字"}),e.abrupt("return");case 3:if(1!=isNaN(t.number)){e.next=6;break}return t.$store.commit("setWin",{title:"操作提示",content:"数量请输入数字"}),e.abrupt("return");case 6:if(1!=isNaN(t.weight)){e.next=9;break}return t.$store.commit("setWin",{title:"操作提示",content:"重量请输入数字"}),e.abrupt("return");case 9:if(1!=t.getInfo.type){e.next=16;break}return e.next=12,a.a.addInventory({data:{itemId:t.getInfo.id,type:1,wid:t.wid,areaId:t.areaId,supplierId:t.supplierId,totalSurplus:Number(t.number)*t.conversion+Number(t.weight),purchasePrice:t.purchasePrice,purchaseUnit:t.purchaseUnit,productionTime:parseInt(t.startTime/1e3),expiryTime:parseInt(t.endTime/1e3),batchCode:t.batchCode,articleNo:t.articleNo,remark:t.remark}});case 12:n=e.sent,t.successInfo=n,e.next=21;break;case 16:if(2!=t.getInfo.type){e.next=21;break}return e.next=19,a.a.goodsinventoryAddNum({data:{itemId:t.existingBatchInfo.itemId,type:1,batchId:t.existingBatchInfo.batchId,wid:t.existingBatchInfo.wid,areaId:t.existingBatchInfo.areaId,num:Number(t.number)*t.conversion+Number(t.weight)}});case 19:i=e.sent,t.successInfo=i;case 21:case"end":return e.stop()}},e,t)}))()},wareEvent:function(t){console.log(t),this.wareshow=!1,"ok"==t&&this.wareClose()},wareClose:function(){var t=this.$refs.warehouse;if(console.log(t),!t.chooseWare)return this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"请选择区域"}),this.wareshow=!0,!1;this.iswear=t.searchList[t.homeSel].name,this.isarea=t.chooseWare.areaName,this.wid=t.homeId,this.areaId=t.chooseWare.id,this.existingBatchInfo&&(this.existingBatchInfo.aName=t.chooseWare.areaName,this.existingBatchInfo.areaId=t.chooseWare.id,this.goodsareaId=t.chooseWare.id)},showHouse:function(){this.wareshow=!0},showSupply:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.win.show=!0,e.next=3,a.a.suppierList();case 3:n=e.sent,t.win.list=n,console.log(n);case 6:case"end":return e.stop()}},e,t)}))()},winSel:function(t,e){this.win.show=!1,"ok"==e&&(this.win.selects=t,this.supplierId=t[0],void 0==this.supplierId&&(this.supplierId=""),this.win.list.length>0&&t.length>0&&(this.selectSupply=this.win.list.find(function(e){return e.id===t[0]}).name))},cancal:function(){1==this.getInfo.type?(s.a.session("tabactive",1),this.$router.push({path:"/admin/inventoryManagement",query:this.$route.query})):2==this.getInfo.type&&window.history.go(-1)},getpiceunit:function(t){var e="",n=!0,i=!1,a=void 0;try{for(var s,r=this.UnitDataInfo[Symbol.iterator]();!(n=(s=r.next()).done);n=!0){var o=s.value;t==o.muId&&(e=o.name)}}catch(t){i=!0,a=t}finally{try{!n&&r.return&&r.return()}finally{if(i)throw a}}return e},confirm:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=t.getInfo.type){e.next=27;break}if(!(t.startTime>t.endTime)){e.next=4;break}return t.$store.commit("setWin",{title:"操作提示",content:"生产日期不能大于失效日期"}),e.abrupt("return");case 4:if(""!=t.wid){e.next=7;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择仓库"}),e.abrupt("return");case 7:if(""!=t.areaId){e.next=10;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择区域"}),e.abrupt("return");case 10:if(""!=t.supplierId){e.next=13;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择供应商"}),e.abrupt("return");case 13:if(""!=t.purchasePrice){e.next=16;break}return t.$store.commit("setWin",{title:"操作提示",content:"请输入进价"}),e.abrupt("return");case 16:if(""!=t.number||""!=t.weight){e.next=19;break}return t.$store.commit("setWin",{title:"操作提示",content:"请输入数量/重量"}),e.abrupt("return");case 19:if(t.number+t.weight!=0){e.next=22;break}return t.$store.commit("setWin",{title:"操作提示",content:"数量/重量不能为0"}),e.abrupt("return");case 22:if(""!=t.purchaseUnit){e.next=25;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择进价单位"}),e.abrupt("return");case 25:e.next=34;break;case 27:if(2!=t.getInfo.type){e.next=34;break}if(!(t.startTime>t.endTime)){e.next=31;break}return t.$store.commit("setWin",{title:"操作提示",content:"生产日期不能大于失效日期"}),e.abrupt("return");case 31:if(""!=t.number||""!=t.weight){e.next=34;break}return t.$store.commit("setWin",{title:"操作提示",content:"请输入数量"}),e.abrupt("return");case 34:return e.next=36,t.putStorage();case 36:1==t.getInfo.type?(s.a.session("tabactive",1),t.successInfo&&t.$store.commit("setWin",{title:"温馨提示",content:"入库成功",callback:function(e){"ok"==e&&t.$router.push({path:"/admin/inventoryManagement",query:t.$route.query})}})):2==t.getInfo.type&&t.successInfo&&t.$store.commit("setWin",{title:"温馨提示",content:"入库成功",callback:function(t){"ok"==t&&window.history.go(-1)}});case 37:case"end":return e.stop()}},e,t)}))()},continuePutin:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=t.getInfo.type){e.next=27;break}if(!(t.startTime>t.endTime)){e.next=4;break}return t.$store.commit("setWin",{title:"操作提示",content:"生产日期不能大于失效日期"}),e.abrupt("return");case 4:if(""!=t.wid){e.next=7;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择仓库"}),e.abrupt("return");case 7:if(""!=t.areaId){e.next=10;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择区域"}),e.abrupt("return");case 10:if(""!=t.supplierId){e.next=13;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择供应商"}),e.abrupt("return");case 13:if(""!=t.purchasePrice){e.next=16;break}return t.$store.commit("setWin",{title:"操作提示",content:"请输入进价"}),e.abrupt("return");case 16:if(""!=t.number||""!=t.weight){e.next=19;break}return t.$store.commit("setWin",{title:"操作提示",content:"请输入数量/重量"}),e.abrupt("return");case 19:if(t.number+t.weight!=0){e.next=22;break}return t.$store.commit("setWin",{title:"操作提示",content:"数量/重量不能为0"}),e.abrupt("return");case 22:if(""!=t.purchaseUnit){e.next=25;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择进价单位"}),e.abrupt("return");case 25:e.next=34;break;case 27:if(2!=t.getInfo.type){e.next=34;break}if(!(t.startTime>t.endTime)){e.next=31;break}return t.$store.commit("setWin",{title:"操作提示",content:"生产日期不能大于失效日期"}),e.abrupt("return");case 31:if(""!=t.number||""!=t.weight){e.next=34;break}return t.$store.commit("setWin",{title:"操作提示",content:"请输入数量"}),e.abrupt("return");case 34:return e.next=36,t.putStorage();case 36:1==t.getInfo.type?t.successInfo&&t.$store.commit("setWin",{title:"温馨提示",content:"入库成功"}):2==t.getInfo.type&&t.successInfo&&t.$store.commit("setWin",{title:"温馨提示",content:"入库成功"}),t.getUnit(0),t.supplierId="",t.selectSupply="请选择供应商",t.number="0",t.weight="0",t.purchasePrice="",t.startTime=(new Date).setHours(0,0,0,0),t.endTime=(new Date).setHours(23,59,59,999),t.win.selects=[],t.batchCode="",t.articleNo="",t.remark="";case 49:case"end":return e.stop()}},e,t)}))()},timeConversion:function(t){return r.a.format(new Date(1e3*t),"yyyy-MM-dd hh:mm:ss")}},mounted:function(){this.existingBatchInfo=s.a.session("putstoreInfo"),this.getInfo=this.$route.query,1==this.getInfo.type?this.presenceBatches=0:2==this.getInfo.type&&(this.presenceBatches=1,this.goodsWid=this.existingBatchInfo.wid,this.goodsareaId=this.existingBatchInfo.areaId),this.init(),this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999)},components:{selectBtn:function(){return n.e("select_btn").then(n.bind(null,"3d41"))},calendar:function(){return n.e("calendar_type").then(n.bind(null,"f2dd"))},warehouseWin:function(){return n.e("warehouse_win").then(n.bind(null,"0c7d"))},multipleWin:function(){return n.e("multiple_win").then(n.bind(null,"d696"))}}},u=(n("6f28"),n("d801")),l=Object(u.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{attrs:{id:"materials-putin-storage"}},[n("div",{staticClass:"material-info"},[n("div",{staticClass:"titleTop"},[n("div",{staticClass:"topbox"},[n("i"),t._v(" "),n("h3",[t._v("物料信息")]),t._v(" "),t._l(32,function(t){return n("div",{key:t,staticClass:"dian"})})],2)]),t._v(" "),n("ul",{staticClass:"material-info-body"},[n("li",[n("div",[t._v("物料名称："+t._s(t.materialInfo.name))]),t._v(" "),n("div",[t._v("物料单位："+t._s(t.unitInfoName))]),t._v(" "),n("div",{class:{bigDiv:t.materialInfo.unit&&t.materialInfo.unit.length>3}},[t._v("单位换算:\n\t\t\t\t\t"),t._l(t.materialInfo.unit,function(e,i){return n("i",{key:i},[t._v("1"+t._s(e.name)+"="+t._s(e.value)+t._s(t.smallUnit)+"\n\t\t\t\t\t\t"),i!=t.materialInfo.unit.length-1?n("i",[t._v("  |  ")]):t._e()])})],2)]),t._v(" "),n("li",[n("div",[t._v("物料简码："+t._s(t.materialInfo.BC))]),t._v(" "),n("div",[t._v("默认单位："+t._s(t.unitInfoDefault))]),t._v(" "),n("div",[t._v("分类："+t._s(t.cateInfoName))])]),t._v(" "),n("li",[n("div",[t._v("品牌："+t._s(t.materialInfo.brandName))]),t._v(" "),n("div",[t._v("最小单位："+t._s(t.unitInfoMin))]),t._v(" "),n("div",[t._v("保质期："+t._s(t.materialInfo.validity+t.validityType))])])])]),t._v(" "),n("div",{staticClass:"new-inventory"},[n("div",{staticClass:"titleTop"},[n("div",{staticClass:"topbox"},[n("i"),t._v(" "),n("h3",[t._v("新建库存")]),t._v(" "),t._l(32,function(t){return n("div",{key:t,staticClass:"dian"})})],2)]),t._v(" "),0==t.presenceBatches?n("ul",{staticClass:"new-inventory-body"},[t._m(0),t._v(" "),n("li",[n("section",[n("p",[t._v("仓库")]),t._v(" "),n("section",{staticClass:"tableListInp chairFix",staticStyle:{"vertical-align":"middle"},on:{click:t.showHouse}},[n("span",{staticClass:"inptext"},[t._v(t._s(t.iswear)+t._s(t.iswear&&"/")+t._s(t.isarea))]),t._v(" "),t._m(1)])]),t._v(" "),n("section",[n("h6",[t._v("批次编码")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.batchCode,expression:"batchCode"}],attrs:{type:"text",placeholder:"选填"},domProps:{value:t.batchCode},on:{input:function(e){e.target.composing||(t.batchCode=e.target.value)}}})])]),t._v(" "),n("li",[n("section",[n("p",[t._v("生产日期")]),t._v(" "),n("section",{staticClass:"dateBox"},[n("calendar",{attrs:{time:t.startTime,format:"yyyy-MM-dd"},on:{emit:t.getStartTime}})],1)]),t._v(" "),n("section",[n("p",[t._v("失效日期")]),t._v(" "),n("section",{staticClass:"dateBox"},[n("calendar",{attrs:{time:t.endTime,format:"yyyy-MM-dd"},on:{emit:t.getEndTime}})],1)])]),t._v(" "),n("li",[n("section",[n("p",[t._v("供应商")]),t._v(" "),n("section",{staticClass:"tableListInp chairFix",staticStyle:{"vertical-align":"middle"},on:{click:t.showSupply}},[n("span",{staticClass:"inptext"},[t._v(t._s(t.selectSupply))]),t._v(" "),t._m(2)])]),t._v(" "),n("section",[n("h6",[t._v("货号")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.articleNo,expression:"articleNo"}],attrs:{type:"text",placeholder:"选填"},domProps:{value:t.articleNo},on:{input:function(e){e.target.composing||(t.articleNo=e.target.value)}}})])]),t._v(" "),n("li",[n("section",[n("p",[t._v("进价")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.purchasePrice,expression:"purchasePrice"}],attrs:{type:"text",placeholder:"请输入进价",maxlength:"10"},domProps:{value:t.purchasePrice},on:{input:function(e){e.target.composing||(t.purchasePrice=e.target.value)}}})]),t._v(" "),n("section",[n("p",[t._v("进价单位")]),t._v(" "),n("section",{staticClass:"priceUnit"},[n("selectBtn",{attrs:{sorts:t.allUnit,name:t.unitName,width:"200"},on:{selOn:t.getUnit}})],1)])]),t._v(" "),n("div",{staticClass:"weightNum"},[n("p",[t._v("数量/重量")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.number,expression:"number"}],attrs:{type:"text",placeholder:"0",maxlength:"10"},domProps:{value:t.number},on:{input:function(e){e.target.composing||(t.number=e.target.value)}}}),t._v(" "),n("span",[t._v(t._s(t.unitName))]),t._v(" "),t.unitName!=t.smallUnit?n("span",[t._v("+")]):t._e(),t._v(" "),t.unitName!=t.smallUnit?n("input",{directives:[{name:"model",rawName:"v-model",value:t.weight,expression:"weight"}],staticStyle:{width:"150px"},attrs:{type:"text",placeholder:"0",maxlength:"10"},domProps:{value:t.weight},on:{input:function(e){e.target.composing||(t.weight=e.target.value)}}}):t._e(),t._v(" "),t.unitName!=t.smallUnit?n("div",{staticClass:"weightNum-unit"},[t._v(t._s(t.smallUnit))]):t._e()]),t._v(" "),n("div",{staticClass:"note"},[n("p",[t._v("备注")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],attrs:{placeholder:"请输入备注",maxlength:"40"},domProps:{value:t.remark},on:{input:function(e){e.target.composing||(t.remark=e.target.value)}}})]),t._v(" "),t._m(3)]):t._e(),t._v(" "),1==t.presenceBatches?n("ul",{staticClass:"new-inventory-body"},[n("li",[t._m(4),t._v(" "),n("section",[n("h6",[t._v("批次编码:")]),t._v(" "),n("span",[t._v(t._s(t.existingBatchInfo.batchCode))])])]),t._v(" "),n("li",[n("section",[n("h6",[t._v("仓库:")]),t._v(" "),n("section",{staticClass:"tableListInp chairFix",staticStyle:{"vertical-align":"middle"},on:{click:t.showHouse}},[n("span",{staticClass:"inptext"},[t._v(t._s(t.existingBatchInfo.wName||"暂无")+"/"+t._s(t.existingBatchInfo.aName||"暂无"))]),t._v(" "),t._m(5)])]),t._v(" "),n("section",[n("h6",[t._v("进价:")]),t._v(" "),n("span",[t._v(t._s(t.existingBatchInfo.distributionPrice)+"元"+t._s("/")+t._s(t.getpiceunit(t.existingBatchInfo.distributionUnit)))])])]),t._v(" "),n("li",[n("section",[n("h6",[t._v("生产日期:")]),t._v(" "),n("span",[t._v(t._s(t.timeConversion(t.existingBatchInfo.productionTime)))])]),t._v(" "),n("section",[n("h6",[t._v("失效日期:")]),t._v(" "),n("span",[t._v(t._s(t.timeConversion(t.existingBatchInfo.expiryTime)))])])]),t._v(" "),n("li",[n("section",[n("h6",[t._v("供应商:")]),t._v(" "),n("span",[t._v(t._s(t.existingBatchInfo.supplier))])]),t._v(" "),n("section",[n("h6",[t._v("货号:")]),t._v(" "),n("span",[t._v(t._s(t.existingBatchInfo.articleNo))])])]),t._v(" "),n("div",{staticClass:"weightNum"},[n("p",[t._v("数量/重量")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.number,expression:"number"}],attrs:{type:"text",placeholder:"0",maxlength:"10"},domProps:{value:t.number},on:{input:function(e){e.target.composing||(t.number=e.target.value)}}}),t._v(" "),n("span",[t._v(t._s(t.unitName))]),t._v(" "),t.unitName!=t.smallUnit?n("span",[t._v("+")]):t._e(),t._v(" "),t.unitName!=t.smallUnit?n("input",{directives:[{name:"model",rawName:"v-model",value:t.weight,expression:"weight"}],staticStyle:{width:"150px"},attrs:{type:"text",placeholder:"0",maxlength:"10"},domProps:{value:t.weight},on:{input:function(e){e.target.composing||(t.weight=e.target.value)}}}):t._e(),t._v(" "),t.unitName!=t.smallUnit?n("div",{staticClass:"weightNum-unit"},[t._v(t._s(t.smallUnit))]):t._e()]),t._v(" "),n("div",{staticClass:"note"},[n("p",[t._v("备注")]),t._v(" "),n("span",[t._v(t._s(t.existingBatchInfo.remark))])])]):t._e()]),t._v(" "),n("ul",{staticClass:"btn"},[n("li",{staticClass:"gray",on:{click:t.cancal}},[t._v("取消")]),t._v(" "),n("li",{on:{click:t.continuePutin}},[t._v("继续入库")]),t._v(" "),n("li",{staticClass:"orange",on:{click:t.confirm}},[t._v("确定")])]),t._v(" "),t.win.show&&t.win.list.length>0?n("multiple-win",{attrs:{styles:{backgroundColor:"#F1F1F1"},isradio:t.win.isradio,selects:t.win.selects,title:t.win.title,name:t.win.name,width:t.win.width,height:t.win.height,list:t.win.list,selkey:t.win.selkey},on:{selArray:t.winSel}}):t._e(),t._v(" "),t.wareshow?n("warehouseWin",{ref:"warehouse",attrs:{goodsWid:t.goodsWid,goodsareaId:t.goodsareaId,title:t.winTitle,wareType:t.wareType},on:{wareEvent:t.wareEvent}}):t._e()],1)},i,!1,null,"64b9427c",null);e.default=l.exports},"6f28":function(t,e,n){"use strict";var i=n("c8ba");n.n(i).a},c8ba:function(t,e,n){},fdd3:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTNEMTRBQjQ3QjFFMTFFNzhEOUY4ODQ1N0UwNTQwQUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTNEMTRBQjU3QjFFMTFFNzhEOUY4ODQ1N0UwNTQwQUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1M0QxNEFCMjdCMUUxMUU3OEQ5Rjg4NDU3RTA1NDBBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1M0QxNEFCMzdCMUUxMUU3OEQ5Rjg4NDU3RTA1NDBBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoJwRHcAAAF1SURBVHjapNRPKARRHMDx2bGsEiUXB5JEDubktiWlxHUl5eCmlJSDPyfkTykOJOWwxz1ISRxsCUURF21pDi5ulIQD7Zbb+L76jZ7Xm92DV5/27e+9+c37O7EgCJz/lrjv+/r/VsxjCAlL/xOs4TIMeJ7nuFqHETzIbyLipf24wLIeDJMMI4Myy4NqvosYQE5iarTrv9NBA3aLTPkaS1KvwJ7UZ3COUzWSzRLr1oVBtGPaaEuzprG4dLCVPI7xhgl0W/o0oTcekeBM5p/FlcTeUWfpm3QtwWfZgTHUS6wa5REvbLQlqcUqbrEvsQ3URCRxbUmqtHPjyGhGiyz8qxvRsIUPqW9r58VWcirJjRH8xoLUe2T3dvAZsYNZlWTSaDjAl9QLmNMW1yxT3J2CSnKHFa2hGS1oQ4eMZNxyJdQZSofH3pHhV8pRTuKxxCk+Qsq8gKrMyiW7L/Lwk0w/9ed7YnQ6FH3oVAdJpvECX74neTPzjwADADrTSFI39Bw5AAAAAElFTkSuQmCC"}}]);