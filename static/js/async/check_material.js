(window.webpackJsonp=window.webpackJsonp||[]).push([["check_material"],{"09cb":function(t,e,i){"use strict";var a=i("672f");i.n(a).a},"1b1d":function(t,e,i){"use strict";var a=i("b037");i.n(a).a},"672f":function(t,e,i){},"86d8":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"check-material"}},[t.addShow?t._e():[i("div",{staticClass:"main"},[i("div",{staticClass:"head"},[t._v("\n\t\t\t\t盘库物料列表 · 共"),i("em",[t._v(t._s(t.listLength))]),t._v("个条目\n\t\t\t")]),t._v(" "),i("div",{staticClass:"scroll-box"},[t._m(0),t._v(" "),t._l(t.list,function(e,a){return i("div",{key:a,staticClass:"list-item"},[i("div",{staticClass:"cell"},[i("em",{staticClass:"clear",on:{click:function(e){t.clearItem(a)}}},[t._v("清空")]),t._v(" "),i("em",{on:{click:function(e){t.openBatchWin(a)}}},[t._v("批量盘库")])]),t._v(" "),i("div",{staticClass:"cell"},[i("select-btn",{staticClass:"sel-box",attrs:{sorts:e.unitArr,index:e.unitIndex,width:90},on:{selOn:function(e){t.unitSel(e,a)}}})],1),t._v(" "),i("div",{staticClass:"cell wide"},[e.oneName?[i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.oneNum,expression:"item.oneNum"}],attrs:{type:"text",maxlength:"10",placeholder:"请输入数量",disabled:e.haveBatch},domProps:{value:e.oneNum},on:{input:function(i){i.target.composing||t.$set(e,"oneNum",i.target.value)}}}),t._v(" "),i("div",{staticClass:"word"},[t._v(t._s(e.oneName))])]),t._v("\n\t\t\t\t\t\t\t+\n\t\t\t\t\t\t")]:t._e(),t._v(" "),i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.twoNum,expression:"item.twoNum"}],attrs:{type:"text",maxlength:"10",placeholder:"请输入数量",disabled:e.haveBatch},domProps:{value:e.twoNum},on:{input:function(i){i.target.composing||t.$set(e,"twoNum",i.target.value)}}}),t._v(" "),i("div",{staticClass:"word"},[t._v(t._s(e.twoName))])])],2),t._v(" "),i("div",{staticClass:"cell"},[t._v(t._s(e.name))]),t._v(" "),i("div",{staticClass:"cell"},[t._v(t._s(t.setSuprlus(e.surplus,e.unit)))]),t._v(" "),i("div",{staticClass:"cell"},[t._v(t._s(e.wName)+t._s(e.aName?" / "+e.aName:""))]),t._v(" "),i("div",{staticClass:"cell"},[t._v(t._s(e.batch))]),t._v(" "),i("div",{staticClass:"cell"},[t._v("物料")])])}),t._v(" "),t.list.length?t._e():i("div",{staticClass:"empty"},[t._v("- 暂无条目 -")])],2)]),t._v(" "),i("div",{staticClass:"page-box"},[i("pageBtn",{attrs:{total:t.pageTotal,page:t.page,isNoJump:!0},on:{pageNum:t.pageChange}})],1)],t._v(" "),t.addShow?i("add-material",{attrs:{selObj:t.selObj},on:{emit:t.matClose}}):t._e(),t._v(" "),t.batchShow?i("batch-win",{attrs:{material:t.batchObj,selItem:t.batchList},on:{emit:t.batchClose}}):t._e()],2)};a._withStripped=!0;var r=i("81a2"),n=i("05dd"),s=i("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(r,n){try{var s=e[r](n),o=s.value}catch(t){return void i(t)}if(!s.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})}}var l={data:function(){return{addShow:!1,list:[],selObj:{list:[],search:{},storeAll:!1},selMatItem:[],selMatSearch:null,listLength:0,batchShow:!1,pageTotal:0,page:1,pageShow:10,batchObj:{mid:"",wid:"",areaId:"",unitId:""},batchList:[],checkList:[],openIndex:0,useList:[],isUse:!1}},components:{addMaterial:function(){return Promise.resolve().then(i.bind(null,"c4ba"))},batchWin:function(){return i.e("material_batch_win").then(i.bind(null,"1859"))},pageBtn:function(){return i.e("page_element").then(i.bind(null,"5921"))},selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))}},mounted:function(){this.initBtn();var t=this.$route.query.id;this.isUse=!!t,this.isUse&&this.setDefault(t)},methods:{initBtn:function(){var t=this,e=[{name:"确定盘库",style:"background: #fe8d01;border: 1px solid #fe8d01;color: #fff;",fn:function(){t.checkMaterial()}},{name:"添加物料",style:"background: #29a7e1;border: 1px solid #29a7e1;color: #fff;",fn:function(){t.addShow=!0}},{name:"取消盘库",style:"background: #b3b3b3;border: 1px solid #b3b3b3;color: #fff;",fn:function(){window.history.go(-1)}}];this.$store.commit("setPageTools",e)},setDefault:function(t){var e=this;return o(regeneratorRuntime.mark(function i(){var a,n,s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,r.a.getInventoryMaterialTemplate({data:{id:t}});case 2:for(s in a=i.sent,e.cid=a.content.c2?a.content.c2:a.content.c1,e.wid=a.content.wids,e.areaId=a.content.aids,e.useList=a.content.items,n=0,["cid","wid","areaId"])e[s]||n++;e.useList.length&&0==n&&(e.getUseList(),e.selObj.storeAll=!1),!e.useList.length&&n>0&&(e.getMatList(),e.selObj.storeAll=!0);case 11:case"end":return i.stop()}},i,e)}))()},getUseList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:i=r.a.getListByMidsAndAreaId({data:{param:t.useList}}),a={list:s.a.deepCopy(i),total:Math.floor(i.length/10),count:i.length},t.selObj.list=i,t.setListData(a);case 4:case"end":return e.stop()}},e,t)}))()},unitSel:function(t,e){var i=this.list[e],a=i.unit[t];i.oneNum="",i.twoNum="",i.selBatchList=[],i.haveBatch=!1,1==a.isMin?(i.oneName="",i.unitValue=1):(i.oneName=a.name,i.unitValue=a.value),i.unitId=a.muId},matClose:function(t){if(this.initBtn(),t)if(this.selObj=t,t.list.length){var e={list:s.a.deepCopy(t.list),total:Math.floor(t.list.length/10),count:t.list.length};this.setListData(e)}else{for(var i in this.selMatSearch=t.search,this.selMatSearch)this[i]=this.selMatSearch[i];this.getMatList()}this.addShow=!1},setSuprlus:function(t,e){var i="",a="",r=1,s=!0,o=!1,l=void 0;try{for(var c,u=e[Symbol.iterator]();!(s=(c=u.next()).done);s=!0){var d=c.value;1==d.isMin?(a=d.name,1==d.isDefault&&(i=d.name,r=d.value)):1==d.isDefault&&(i=d.name,r=d.value)}}catch(t){o=!0,l=t}finally{try{!s&&u.return&&u.return()}finally{if(o)throw l}}return n.a.comUnit(t,r,i,a)},clearItem:function(t){var e=this.list[t];e.oneNum="",e.twoNum="",e.selBatchList=[]},openBatchWin:function(t){var e=this.list[t];this.batchShow=!0,this.openIndex=t,this.batchObj={mid:e.id,wid:e.wid,areaId:e.areaId,unitId:e.unitId},this.batchList=e.selBatchList},batchClose:function(t){if(t){var e=this.list[this.openIndex];if(t.list.length){var i;e.selBatchList=t.list,e.haveBatch=!0;var a=t.allNum,r=e.unitValue,s=e.oneName?e.oneName:e.twoName,o=e.twoName,l=n.a.comUnit(a,r,s,o,!0);e.oneNum=Number(l.oNull),e.twoNum=Number(l.tNull);var c=[],u=!0,d=!1,h=void 0;try{for(var m,f=e.selBatchList[Symbol.iterator]();!(u=(m=f.next()).done);u=!0){var v=m.value,p={batchId:v.batchId,wid:v.wid,areaId:v.areaId,surplus:v.totalItem,itemId:e.id,unitId:e.unitId};c.push(p)}}catch(t){d=!0,h=t}finally{try{!u&&f.return&&f.return()}finally{if(d)throw h}}this.spliceArr(this.checkList,e.id),(i=this.checkList).push.apply(i,c)}else e.haveBatch=!1}this.batchShow=!1},spliceArr:function(t,e){for(var i=0;i<t.length;i++){t[i].itemId==e&&(t.splice(i,1),i--)}},setSendList:function(){var t=!0,e=!1,i=void 0;try{for(var a,r=this.list[Symbol.iterator]();!(t=(a=r.next()).done);t=!0){var n=a.value;if(!n.haveBatch){var s={batchId:0,wid:n.wid,areaId:n.areaId,surplus:Number(n.oneNum)*Number(n.unitValue)+Number(n.twoNum),itemId:n.id,unitId:n.unitId};this.spliceArr(this.checkList,n.id),this.checkList.push(s)}}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}},veriList:function(){var t=!0,e=!1,i=void 0;try{for(var a,r=this.list[Symbol.iterator]();!(t=(a=r.next()).done);t=!0){var n=a.value;if((""!==n.oneNum.trim()||""!==n.twoNum.trim())&&(isNaN(n.oneNum)||isNaN(n.oneNum)))return this.myAlert("批次编号:"+n.batchCode+",盘库数量必须为数字"),!1}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}return!0},checkMaterial:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.veriList()){e.next=2;break}return e.abrupt("return");case 2:return t.setSendList(),e.next=5,r.a.GoodsinventoryBatchSetGoodsInventory({data:{type:1,data:t.checkList}});case 5:e.sent.result?(t.myAlert("物料盘库成功！"),delete t.$route.query.id,t.$router.push({path:"/admin/materialCountHistory",query:t.$route.query})):t.myAlert("物料盘库失败！");case 7:case"end":return e.stop()}},e,t)}))()},getMatList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.materialGetListByArea({data:{page:t.page,num:t.pageShow,name:"",cid:t.cid,wid:t.wid,areaId:t.areaId}});case 2:i=e.sent,t.setListData(i);case 4:case"end":return e.stop()}},e,t)}))()},myAlert:function(t){this.$store.commit("setWin",{title:"操作提示",content:t})},setListData:function(t){var e=!0,i=!1,a=void 0;try{for(var r,n=t.list[Symbol.iterator]();!(e=(r=n.next()).done);e=!0){for(var s=r.value,o=[],l=0,c="",u="",d=1,h="",m=0;m<s.unit.length;m++){var f=s.unit[m];o.push(f.name),1==f.isMin?u=f.name:1==f.isDefault&&(c=f.name,d=f.value),1==f.isDefault&&(l=m,h=f.muId)}s.unitArr=o,s.unitIndex=l,s.unitId=h,s.oneNum="",s.twoNum="",s.oneName=c,s.twoName=u,s.unitValue=d}}catch(t){i=!0,a=t}finally{try{!e&&n.return&&n.return()}finally{if(i)throw a}}this.list=t.list,this.pageTotal=t.total,this.listLength=t.count},pageChange:function(t){this.page=t.page,this.pageShow=t.num}}},c=(i("1b1d"),i("7610")),u=Object(c.a)(l,a,[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"title"},[i("span",[t._v("操作")]),t._v(" "),i("span",[t._v("单位选择")]),t._v(" "),i("span",{staticClass:"wide"},[t._v("盘库数量")]),t._v(" "),i("span",[t._v("物料名称")]),t._v(" "),i("span",[t._v("库存数量")]),t._v(" "),i("span",[t._v("所属仓库")]),t._v(" "),i("span",[t._v("批次数量")]),t._v(" "),i("span",[t._v("类型")])])}],!1,null,"cc397de4",null);u.options.__file="src\\module\\invoicing_system\\invoicing\\check_warehouse\\check_material.vue";e.default=u.exports},b037:function(t,e,i){},c4ba:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bom-order"},[i("div",{staticClass:"filter"},[i("div",{staticClass:"inline-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.matName,expression:"matName"}],attrs:{type:"text",placeholder:"请输入物料名"},domProps:{value:t.matName},on:{input:function(e){e.target.composing||(t.matName=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"inline-box"},[i("select-store",{attrs:{sorts:t.sortOne,tipName:"请选择一级分类",isSingle:!0},on:{emit:t.selSortOne}})],1),t._v(" "),i("div",{staticClass:"inline-box",on:{click:function(e){t.checkSelect("sortTwo","towSortDom")}}},[i("select-store",{ref:"towSortDom",attrs:{sorts:t.sortTwo,tipName:"请选择二级分类",isSingle:!0},on:{emit:t.selSortTwo}})],1),t._v(" "),i("div",{staticClass:"inline-box"},[i("select-store",{attrs:{sorts:t.wareList,tipName:"请选择仓库"},on:{emit:t.selWare}})],1),t._v(" "),i("div",{staticClass:"inline-box",on:{click:function(e){t.checkSelect("areaList","areaDom")}}},[i("select-store",{ref:"areaDom",attrs:{sorts:t.areaList,tipName:"请选择区域"},on:{emit:t.selArea}})],1),t._v(" "),i("div",{staticClass:"inline-box"},[i("div",{staticClass:"button-box"},[i("span",{staticClass:"blue",on:{click:t.filter}},[t._v("筛选")]),t._v(" "),i("span",{staticClass:"gray",on:{click:t.reset}},[t._v("重置")])])])]),t._v(" "),i("com-table",{attrs:{listName:"物料列表",titleData:t.titleList,allTotal:t.listLength,introData:t.list,listHeight:70,listWidth:1200},scopedSlots:t._u([{key:"title-0",fn:function(e){return i("div",{staticClass:"select-all select-ban"},[i("span",{on:{click:function(e){t.radioAll("store")}}},[t._v(t._s(t.storeAll?"取消全选":"全选"))]),t._v(" "),i("i",[t._v("|")]),t._v(" "),i("span",{staticClass:"page-all",class:{ban:t.storeAll},on:{click:function(e){t.radioAll("page")}}},[t._v(t._s(t.pageAll?"取消本页":"全选本页"))])])}},{key:"con-0",fn:function(e){return i("span",{staticClass:"detail select-ban",on:{click:function(i){t.listHandle(e.index)}}},[i("i",{class:{"sel-active":e.data.selected,storeAll:t.storeAll}})])}},{key:"con-1",fn:function(e){return i("span",{},[t._v(t._s((t.page-1)*t.pageShow+e.index>=9?(t.page-1)*t.pageShow+e.index+1:"0"+((t.page-1)*t.pageShow+e.index+1)))])}},{key:"con-3",fn:function(e){return i("span",{},[t._v("物料")])}},{key:"con-4",fn:function(e){return i("span",{},[t._v(t._s(e.data.wName)+t._s(e.data.aName?" / "+e.data.aName:""))])}},{key:"con-5",fn:function(e){return i("span",{},[t._v(t._s(t.setCate(e.data.cate)))])}},{key:"con-6",fn:function(e){return i("span",{},[t._v(t._s(t.setSuprlus(e.data.surplus,e.data.unit)))])}}])}),t._v(" "),i("div",{staticClass:"page-box"},[i("pageBtn",{attrs:{total:t.pageTotal,page:t.page,isNoJump:!0},on:{pageNum:t.pageChange}})],1),t._v(" "),t.nameWinShow?i("model-name",{attrs:{name:t.modelName,title:t.modelTitle},on:{emit:t.nameWinEmit}}):t._e()],1)};a._withStripped=!0;var r=i("f6ce"),n=i("bbb9"),s=i("81a2"),o=i("05dd");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(r,n){try{var s=e[r](n),o=s.value}catch(t){return void i(t)}if(!s.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})}}var c={data:function(){return{userName:"",tempId:"",shopId:"",isBrand:0,page:1,pageShow:10,pageTotal:1,list:[],listLength:0,userData:"",matName:"",cid:"",wid:"",areaId:"",modelName:"",modelTitle:"保存模板",nameWinShow:!1,titleList:[{titleName:"操作",titleStyle:{width:"200px"}},{titleName:"序号"},{titleName:"物料名称",dataName:"name"},{titleName:"类型"},{titleName:"所属仓库"},{titleName:"分类"},{titleName:"库存数量/重量"},{titleName:"批次数量",dataName:"batch"}],goodsTypeObj:{0:"普通商品",1:"称重商品"},storeAll:!1,pageAll:!1,savePage:[],selectItem:[],selNum:0,wareList:[],areaList:[],selList:[],searchObj:{},sortOne:[],sortTwo:[],allSort:[],sortOneId:"",sortTwoId:"",isEdit:""}},props:["selObj"],components:{pageBtn:function(){return i.e("page_element").then(i.bind(null,"5921"))},selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))},selectStore:function(){return i.e("win").then(i.bind(null,"cb83"))},calendar:function(){return i.e("calendar_type").then(i.bind(null,"f2dd"))},comTable:function(){return i.e("table").then(i.bind(null,"4360"))},modelName:function(){return i.e("model_name_win").then(i.bind(null,"5338"))}},created:function(){this.userData=r.a.session("userShop"),this.userName=this.userData.user.name,this.shopId=this.userData.currentShop.id},mounted:function(){this.tempId=this.$route.query.id,this.isEdit=!!this.tempId,this.initBtn(),this.tempId?this.editTemplate():(this.setDefault(),this.getData(),this.getCategoryList(),this.getWarehouseList())},methods:{initBtn:function(){var t=this,e=[{name:"确定",style:"background: #fe8d01;border: 1px solid #fe8d01;color: #fff;",fn:function(){t.confirmClick()}},{name:"保存模板",style:"background: none;border: 1px solid #fe8d01;color: #fe8d01;",fn:function(){t.saveModel()}},{name:"取消",style:"background: #b3b3b3;border: 1px solid #b3b3b3;color: #fff;",fn:function(){t.isEdit?window.history.go(-1):t.$emit("emit",!1)}}];this.isEdit&&(e.splice(0,1),e[0].style="background: #fe8d01;border: 1px solid #fe8d01;color: #fff;"),this.$store.commit("setPageTools",e)},confirmClick:function(){if(this.selList.length||this.storeAll){var t={list:this.selList,search:this.searchObj,storeAll:this.storeAll};this.$emit("emit",t)}else this.myAlert("请选择商品")},editTemplate:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.templateGetInventoryGoodsTemplate({data:{id:t.tempId}});case 2:i=e.sent,t.modelName=i.name,t.wid=i.content.wids?i.content.wids.join(","):"",t.areaId=i.content.wids?i.content.aids.join(","):"",t.sortOneId=i.content.c1,t.sortTwoId=i.content.c2,t.cid=t.sortTwoId?t.sortTwoId:t.sortOneId,t.selectItem=i.content.items,t.selectItem.length||(t.storeAll=!0),t.getData(),t.getCategoryList(),t.getWarehouseList();case 14:case"end":return e.stop()}},e,t)}))()},setDefault:function(){for(var t in this.selObj.search)this[t]=this.selObj.search[t];this.storeAll=this.selObj.storeAll,this.selList=this.selObj.list,this.selectItem=this.selList.map(function(t){return{mid:t.id,aid:t.areaId}})},formatTime:function(t){return n.a.format(new Date(1e3*t),"yyyy-MM-dd hh:mm:ss")},filter:function(){this.page=1,this.getData()},nameWinEmit:function(t,e){this.nameWinShow=!1,"ok"==t&&(this.modelName=e,this.tempId?this.editModel():this.addModel())},getCategoryList:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,a,r,n,o,l,c,u;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.invoiv_getCategoryList();case 2:for(i=e.sent,a=[],r=!0,n=!1,o=void 0,e.prev=7,l=i[Symbol.iterator]();!(r=(c=l.next()).done);r=!0)0==(u=c.value).pid&&a.push(u);e.next=15;break;case 11:e.prev=11,e.t0=e.catch(7),n=!0,o=e.t0;case 15:e.prev=15,e.prev=16,!r&&l.return&&l.return();case 18:if(e.prev=18,!n){e.next=21;break}throw o;case 21:return e.finish(18);case 22:return e.finish(15);case 23:t.sortOne=a,t.allSort=i,t.setDefaultSort();case 26:case"end":return e.stop()}},e,t,[[7,11,15,23],[16,,18,22]])}))()},selSortOne:function(t,e){var i=[];e||(this.sortTwoId=""),this.cid=this.setSortId(t),this.sortOneId=this.cid;var a=!0,r=!1,n=void 0;try{for(var s,o=this.allSort[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var l=s.value;l.pid==this.cid&&i.push(l)}}catch(t){r=!0,n=t}finally{try{!a&&o.return&&o.return()}finally{if(r)throw n}}this.sortTwo=i},selSortTwo:function(t){this.cid=this.setSortId(t),this.sortTwoId=this.cid},setSortId:function(t){var e="",i=!0,a=!1,r=void 0;try{for(var n,s=t[Symbol.iterator]();!(i=(n=s.next()).done);i=!0){var o=n.value;if(1==o.selected){e=o.id;break}}}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return e},setDefaultSort:function(){var t=!0,e=!1,i=void 0;try{for(var a,r=this.sortOne[Symbol.iterator]();!(t=(a=r.next()).done);t=!0){var n=a.value;if(this.sortOneId==n.id){n.selected=!0;break}}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}if(this.selSortOne(this.sortOne,!0),this.sortTwo.length){var s=!0,o=!1,l=void 0;try{for(var c,u=this.sortTwo[Symbol.iterator]();!(s=(c=u.next()).done);s=!0){var d=c.value;if(this.sortTwoId==d.id){d.selected=!0;break}}}catch(t){o=!0,l=t}finally{try{!s&&u.return&&u.return()}finally{if(o)throw l}}this.selSortTwo(this.sortTwo)}},getWarehouseList:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,a,r,n,o,l,c,u;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.warehouseWarehouseList();case 2:for(i=e.sent,a=[],r=!0,n=!1,o=void 0,e.prev=7,l=i[Symbol.iterator]();!(r=(c=l.next()).done);r=!0)(u=c.value).shopId?t.shopId==u.shopId&&a.push(u):t.shopId==u.brandId&&a.push(u);e.next=15;break;case 11:e.prev=11,e.t0=e.catch(7),n=!0,o=e.t0;case 15:e.prev=15,e.prev=16,!r&&l.return&&l.return();case 18:if(e.prev=18,!n){e.next=21;break}throw o;case 21:return e.finish(18);case 22:return e.finish(15);case 23:t.wareList=a,t.setWareDefault();case 25:case"end":return e.stop()}},e,t,[[7,11,15,23],[16,,18,22]])}))()},selWare:function(t,e){var i=this;this.wid="",e||(this.areaId=""),this.areaList=[];var a=[],r=function(t){if(1==t.selected){var e;a.push(t.id);var r=t.area.map(function(e){return{id:e.id,name:t.name+" / "+e.areaName}});(e=i.areaList).push.apply(e,function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(r))}},n=!0,s=!1,o=void 0;try{for(var l,c=t[Symbol.iterator]();!(n=(l=c.next()).done);n=!0){r(l.value)}}catch(t){s=!0,o=t}finally{try{!n&&c.return&&c.return()}finally{if(s)throw o}}this.wid=a.join(",")},selArea:function(t){this.areaId="";var e=[],i=!0,a=!1,r=void 0;try{for(var n,s=t[Symbol.iterator]();!(i=(n=s.next()).done);i=!0){var o=n.value;1==o.selected&&e.push(o.id)}}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}this.areaId=e.join(",")},setWareDefault:function(){if(this.wid){var t=this.wid.split(","),e=n.a.deepCopy(this.wareList),i=!0,a=!1,r=void 0;try{for(var s,o=e[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var l=s.value,c=!0,u=!1,d=void 0;try{for(var h,m=t[Symbol.iterator]();!(c=(h=m.next()).done);c=!0){var f=h.value;l.id==f&&(l.selected=!0)}}catch(t){u=!0,d=t}finally{try{!c&&m.return&&m.return()}finally{if(u)throw d}}}}catch(t){a=!0,r=t}finally{try{!i&&o.return&&o.return()}finally{if(a)throw r}}this.wareList=e,this.selWare(this.wareList,!0)}if(this.areaId){var v=this.areaId.split(","),p=n.a.deepCopy(this.areaList),y=!0,g=!1,w=void 0;try{for(var b,I=p[Symbol.iterator]();!(y=(b=I.next()).done);y=!0){var _=b.value,S=!0,N=!1,x=void 0;try{for(var L,k=v[Symbol.iterator]();!(S=(L=k.next()).done);S=!0){var A=L.value;_.id==A&&(_.selected=!0)}}catch(t){N=!0,x=t}finally{try{!S&&k.return&&k.return()}finally{if(N)throw x}}}}catch(t){g=!0,w=t}finally{try{!y&&I.return&&I.return()}finally{if(g)throw w}}this.areaList=p,this.selArea(this.areaList)}},setCate:function(t){var e=[],i=!0,a=!1,r=void 0;try{for(var n,s=t[Symbol.iterator]();!(i=(n=s.next()).done);i=!0){var o=n.value;e.push(o.name)}}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return e.join(", ")},setSuprlus:function(t,e){var i="",a="",r=1,n=!0,s=!1,l=void 0;try{for(var c,u=e[Symbol.iterator]();!(n=(c=u.next()).done);n=!0){var d=c.value;1==d.isMin?(a=d.name,1==d.isDefault&&(i=d.name,r=d.value)):1==d.isDefault&&(i=d.name,r=d.value)}}catch(t){s=!0,l=t}finally{try{!n&&u.return&&u.return()}finally{if(s)throw l}}return o.a.comUnit(t,r,i,a)},myAlert:function(t){this.$store.commit("setWin",{title:"操作提示",content:t})},setSendObj:function(t){this.storeAll&&(this.selectItem=[]);var e={name:this.modelName,userName:this.userName,wids:this.wid?this.wid.split(","):"",aids:this.areaId?this.areaId.split(","):"",c1:this.sortOneId,c2:this.sortTwoId,items:this.selectItem};return t&&(e.id=this.tempId),e},saveModel:function(){this.selectItem.length||this.storeAll?(this.nameWinShow=!0,this.modelName?this.modelTitle="修改模板":this.modelTitle="新建模板"):this.myAlert("模板内容不能为空")},addModel:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.setSendObj(),e.next=3,s.a.addInventoryMaterialTemplate({data:i});case 3:(a=e.sent)&&(t.tempId=a,t.myAlert("模板保存成功！"));case 5:case"end":return e.stop()}},e,t)}))()},editModel:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.setSendObj(!0),e.next=3,s.a.editInventoryMaterialTemplate({data:i});case 3:e.sent&&(t.myAlert("模板修改成功！"),t.isEdit&&(delete t.$route.query.id,t.$router.push({path:"/admin/materialCountTemplate",query:t.$route.query})));case 5:case"end":return e.stop()}},e,t)}))()},getData:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.materialGetListByArea({data:{page:t.page,num:t.pageShow,name:t.matName,cid:t.cid,wid:t.wid,areaId:t.areaId}});case 2:i=e.sent,t.searchObj={cid:t.cid,sortOneId:t.sortOneId,sortTwoId:t.sortTwoId,wid:t.wid,areaId:t.areaId},t.list=t.setAlready(i.list),t.listLength=i.count,t.pageTotal=i.total,t.setSelNum();case 8:case"end":return e.stop()}},e,t)}))()},setAlready:function(t){var e=!1,i=!0,a=!1,r=void 0;try{for(var n,s=t[Symbol.iterator]();!(i=(n=s.next()).done);i=!0){var o=n.value;if(this.storeAll)o.selected=!0;else{var l=!0,c=!1,u=void 0;try{for(var d,h=this.savePage[Symbol.iterator]();!(l=(d=h.next()).done);l=!0){if(d.value==this.page){e=!0;break}}}catch(t){c=!0,u=t}finally{try{!l&&h.return&&h.return()}finally{if(c)throw u}}if(e)o.selected=!0;else{var m=!1,f=!0,v=!1,p=void 0;try{for(var y,g=this.selectItem[Symbol.iterator]();!(f=(y=g.next()).done);f=!0){var w=y.value;if(w.mid==o.id&&w.aid==o.areaId){m=!0;break}}}catch(t){v=!0,p=t}finally{try{!f&&g.return&&g.return()}finally{if(v)throw p}}o.selected=!!m}}}}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return this.pageAll=!!e,t},setSelNum:function(){var t=!0,e=!1,i=void 0;try{for(var a,r=this.list[Symbol.iterator]();!(t=(a=r.next()).done);t=!0){1==a.value.selected&&this.selNum++}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}},checkSelect:function(t,e){this[t].length||(this.$refs[e].sortShow=!1,"towSortDom"==e?this.myAlert("请选择一级分类"):this.myAlert("请选择仓库"))},reset:function(){var t=!0,e=!1,i=void 0;try{for(var a,r=["matName","cid","wid","areaId"][Symbol.iterator]();!(t=(a=r.next()).done);t=!0){this[a.value]=""}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}this.page=1,this.pageShow=10;var s=n.a.deepCopy(this.wareList),o=!0,l=!1,c=void 0;try{for(var u,d=s[Symbol.iterator]();!(o=(u=d.next()).done);o=!0){u.value.selected=!1}}catch(t){l=!0,c=t}finally{try{!o&&d.return&&d.return()}finally{if(l)throw c}}this.wareList=s,this.areaList=[],this.getData()},pageChange:function(t){this.page=Number(t.page),this.pageShow=Number(t.num),this.getData()},listHandle:function(t){var e=this.list[t];if(!this.storeAll)if(e.selected=!e.selected,e.selected)this.selectItem.push({mid:e.id,aid:e.areaId}),this.selList.push(e),this.selNum++,this.selNum==this.list.length&&(this.savePage.push(this.page),this.pageAll=!0);else{this.selNum--;for(var i=0;i<this.selectItem.length;i++){var a=this.selectItem[i].mid,r=this.selectItem[i].aid;if(a==e.id&&r==e.areaId){this.selectItem.splice(i,1),this.selList.splice(i,1),i--;break}}this.pageAll&&(this.removePageNum(),this.pageAll=!1)}},radioAll:function(t){if(this.list.length)if("store"==t)this.storeAll=!this.storeAll,this.pageAll=!1,this.setSelAll(this.storeAll),this.selList=[],this.selectItem=[];else if("page"==t){if(this.storeAll)return;this.pageAll=!this.pageAll,this.pageAll?(this.savePage.push(this.page),this.pageSetId("add")):(this.removePageNum(),this.pageSetId("cancel"))}},removePageNum:function(){for(var t=0;t<this.savePage.length;t++)this.savePage[t]==this.page&&(this.savePage.splice(t,1),t--)},pageSetId:function(t){if("add"==t){var e=!0,i=!1,a=void 0;try{for(var r,n=this.list[Symbol.iterator]();!(e=(r=n.next()).done);e=!0){var s=r.value,o=!1,l=!0,c=!1,u=void 0;try{for(var d,h=this.selectItem[Symbol.iterator]();!(l=(d=h.next()).done);l=!0){var m=d.value;if(s.id==m.mid&&s.areaId==m.aid){o=!0;break}}}catch(t){c=!0,u=t}finally{try{!l&&h.return&&h.return()}finally{if(c)throw u}}o||(this.selectItem.push({mid:s.id,aid:s.areaId}),this.selList.push(s),s.selected=!0)}}catch(t){i=!0,a=t}finally{try{!e&&n.return&&n.return()}finally{if(i)throw a}}}else if("cancel"==t){var f=!0,v=!1,p=void 0;try{for(var y,g=this.list[Symbol.iterator]();!(f=(y=g.next()).done);f=!0)for(var w=y.value,b=0;b<this.selectItem.length;b++){var I=this.selectItem[b].mid,_=this.selectItem[b].aid;if(I==w.id&&_==w.areaId){this.selectItem.splice(b,1),this.selList.splice(b,1),w.selected=!1,b--;break}}}catch(t){v=!0,p=t}finally{try{!f&&g.return&&g.return()}finally{if(v)throw p}}}},setSelAll:function(t){if(t){var e=!0,i=!1,a=void 0;try{for(var r,n=this.list[Symbol.iterator]();!(e=(r=n.next()).done);e=!0){r.value.selected=!0}}catch(t){i=!0,a=t}finally{try{!e&&n.return&&n.return()}finally{if(i)throw a}}}else{var s=!0,o=!1,l=void 0;try{for(var c,u=this.list[Symbol.iterator]();!(s=(c=u.next()).done);s=!0){c.value.selected=!1}}catch(t){o=!0,l=t}finally{try{!s&&u.return&&u.return()}finally{if(o)throw l}}this.selectItem=[]}}}},u=(i("09cb"),i("7610")),d=Object(u.a)(c,a,[],!1,null,"b3d327d6",null);d.options.__file="src\\module\\invoicing_system\\invoicing\\check_warehouse\\add_material.vue";e.default=d.exports}}]);