(window.webpackJsonp=window.webpackJsonp||[]).push([["output_material_batch_win"],{"0807":function(t,e,i){},"3b0b":function(t,e,i){"use strict";var a=i("0807");i.n(a).a},"40a5":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("win",{attrs:{align:"center",width:1e3,height:550,ok:t.okstyle},on:{winEvent:t.getData}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),i("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[i("section",{staticClass:"title"},[i("div",[i("span",{staticClass:"hide",attrs:{title:t.info.name}},[t._v("物料名称："+t._s(t.info.name))]),t._v(" "),i("span",[t._v("保质期："+t._s(t.info.validity)+t._s(t.validityType[t.info.validityType]))])]),t._v(" "),i("div",{staticStyle:{"vertical-align":"top"}},[i("span",{staticClass:"hide",attrs:{title:t.info.unitName}},[t._v("物料单位："+t._s(t.info.unitName))]),t._v(" "),i("span",{staticClass:"hide",attrs:{title:t.info.materialCategoryName}},[t._v("分类："+t._s(t.info.materialCategoryName))])]),t._v(" "),i("div",[i("span",[t._v("默认单位："+t._s(t.name))]),t._v(" "),i("span",[t._v("最小单位："+t._s(t.info.minName))])]),t._v(" "),i("div",[i("span",{staticClass:"clear",on:{click:t.clearInput}},[t._v("清空输入")])])]),t._v(" "),i("section",{staticClass:"menu"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.batchNum,expression:"batchNum"}],attrs:{type:"text",placeholder:"请输入批次编号"},domProps:{value:t.batchNum},on:{input:function(e){e.target.composing||(t.batchNum=e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.supplyer,expression:"supplyer"}],attrs:{type:"text",placeholder:"请输入供应商"},domProps:{value:t.supplyer},on:{input:function(e){e.target.composing||(t.supplyer=e.target.value)}}}),t._v(" "),i("div",{staticClass:"canMulti"},[i("calendar",{attrs:{time:t.startObj.time,type:0,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}}),t._v(" "),i("calendar",{attrs:{time:t.endObj.time,type:0,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1),t._v(" "),i("span",{staticClass:"blue btn",on:{click:t.search}},[t._v("筛选")]),t._v(" "),i("span",{staticClass:"gray btn",on:{click:t.reset}},[t._v("重置")])]),t._v(" "),i("section",{staticClass:"content"},[i("div",{staticClass:"top"},[i("ul",[i("li",[t._v("序号")]),t._v(" "),i("li",[t._v("批次编号")]),t._v(" "),i("li",[t._v("生产日期")]),t._v(" "),i("li",[t._v("供应商")]),t._v(" "),i("li",[t._v("所属仓库")]),t._v(" "),i("li",[t._v("当前批次数量/重量")]),t._v(" "),i("li",[t._v("出库数量/重量")])])]),t._v(" "),i("section",{staticClass:"scroll-box"},[t._l(t.backData,function(e,a){return i("div",{key:a,staticClass:"list"},[i("ul",[i("li",[t._v(t._s(t.index+1))]),t._v(" "),i("li",{attrs:{title:e.batchCode}},[t._v(t._s(e.batchCode))]),t._v(" "),i("li",[t._v(t._s(t.transFormDate(1e3*e.productionTime)))]),t._v(" "),i("li",{attrs:{title:e.supplier}},[t._v(t._s(e.supplier))]),t._v(" "),i("li",{attrs:{title:e.wName}},[t._v(t._s(e.wName))]),t._v(" "),i("li",{attrs:{title:t.comUnit(Number(e.surplus),t.info.defaultValue,t.info.defaultName,t.info.minName)}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.comUnit(Number(e.surplus),t.info.defaultValue,t.info.defaultName,t.info.minName))+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),i("li",[i("span",{staticClass:"unit-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.twoNum,expression:"item.twoNum"}],attrs:{type:"text",placeholder:"输入数字"},domProps:{value:e.twoNum},on:{input:function(i){i.target.composing||t.$set(e,"twoNum",i.target.value)}}}),t._v(" "),i("i",{attrs:{title:t.selUnitObj.name}},[t._v(t._s(t.selUnitObj.name))])])])])])}),t._v(" "),t.backData.length?t._e():i("div",{staticClass:"list empty"},[t._v("- 暂无条目 -")])],2)])])])],1)};a._withStripped=!0;var n=i("bbb9"),s=i("81a2"),r=i("05dd"),o=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var i=[],a=!0,n=!1,s=void 0;try{for(var r,o=t[Symbol.iterator]();!(a=(r=o.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){n=!0,s=t}finally{try{!a&&o.return&&o.return()}finally{if(n)throw s}}return i}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();var l={data:function(){return{title:"",okstyle:{style:{background:"#F7931E"},content:"确定"},isShowCa:!1,startObj:{time:n.a.getTime({time:new Date}).start,show:!1,detail:!1,width:150},endObj:{time:n.a.getTime({time:new Date}).end,show:!1,detail:!1,width:150},unitName:"单位切换",info:"",backData:[],index:0,showName:"",supplyer:"",batchNum:"",validityType:{0:"月",1:"日",2:"年"},name:"",selUnitObj:{}}},props:["batchInfo","wid","selectItem","shopId"],mounted:function(){this.title="批次选择",this.info=n.a.deepCopy(this.batchInfo),this.name=n.a.deepCopy(this.info.defaultName),this.info.unitName="";for(var t=0;t<this.info.unit.length;t++)this.info.unitName+=this.info.unit[t].name+",";this.selUnitObj.name=this.info.selectName,this.selUnitObj.value=this.info.selectValue,this.info.unitName=this.info.unitName.slice(0,this.info.unitName.length-1),this.getMaterialBatch()},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))},calendar:function(){return i.e("calendar_type").then(i.bind(null,"f2dd"))},selectbtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))}},methods:{clearInput:function(){var t=n.a.deepCopy(this.backData),e=!0,i=!1,a=void 0;try{for(var s,r=t[Symbol.iterator]();!(e=(s=r.next()).done);e=!0){s.value.twoNum=""}}catch(t){i=!0,a=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw a}}this.backData=t},getStartTime:function(t){this.startObj.time=t},getEndTime:function(t){this.endObj.time=t},getMaterialBatch:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var i,a,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.getMaterialBatch({data:{mid:e.batchInfo.id,wid:e.wid||"",shopId:e.shopId}});case 2:for(i=t.sent,a=0;a<i.list.length;a++)for(i.list[a].oneNum="",i.list[a].twoNum="",i.list[a].minNumber="",r=0;r<e.info.batch.length;r++)i.list[a].batchId==e.info.batch[r].batchId&&(i.list[a].oneNum=e.info.batch[r].oneNum,i.list[a].twoNum=e.info.batch[r].twoNum,i.list[a].minNumber=e.info.batch[r].minNumber,e.backItem(e.batchInfo.index));e.list=n.a.deepCopy(i.list),e.backData=i.list,e.index=e.batchInfo.index,e.setSelectItem();case 8:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(n,s){try{var r=e[n](s),o=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})})()},setSelectItem:function(){if(this.selectItem&&this.selectItem.length){var t=n.a.deepCopy(this.backData),e=!0,i=!1,a=void 0;try{for(var s,r=t[Symbol.iterator]();!(e=(s=r.next()).done);e=!0){var o=s.value,l=!0,u=!1,c=void 0;try{for(var m,h=this.selectItem[Symbol.iterator]();!(l=(m=h.next()).done);l=!0){var f=m.value;o.batchId==f.batchId&&(o.twoNum=f.twoNum)}}catch(t){u=!0,c=t}finally{try{!l&&h.return&&h.return()}finally{if(u)throw c}}}}catch(t){i=!0,a=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw a}}this.backData=t}},getData:function(t){if("ok"==t){for(var e=0;e<this.backData.length;e++){var i=Number(this.backData[e].twoNum)*Number(this.selUnitObj.value),a=Number(this.backData[e].surplus);if(a>=0&&i>a)return this.$store.commit("setWin",{content:"批次编号"+this.backData[e].batchCode+" 库存数量不足"}),!1}this.$emit("getWin",t,this.backData,this.selUnitObj)}else this.$emit("getWin",t)},startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=t},showCalendar:function(){this.isShowCa=!this.isShowCa},transFormDate:function(t){return n.a.format(new Date(t),"yyyy-MM-dd")},saveNum:function(t,e){for(var i=0;i<this.backData.length;i++)i==e&&(this.backData[e].minNumber=t)},backItem:function(t){var e=this.info.unitList[t];this.info.defaultName=e;for(var i=0;i<this.info.unit.length;i++)this.info.unit[i].name==e&&(this.info.defaultValue=this.info.unit[i].value);for(var a=0;a<this.backData.length;a++)if(Number(this.backData[a].minNumber)){var n=r.a.comUnit(Number(this.backData[a].minNumber),this.info.defaultValue,e,this.info.minName,!0);this.backData[a].oneNum=n.oNull,this.backData[a].twoNum=n.tNull}},comUnit:function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var a=o(e,5),n=a[0],s=a[1],l=a[2],u=a[3],c=a[4];return r.a.comUnit(n,s,l,u,c)},search:function(){if(this.backData=[],this.startObj.time>this.endObj.time)return this.$store.commit("setWin",{winType:"alert",content:"开始时间不能大于结束时间"}),!1;for(var t=0;t<this.list.length;t++)1e3*this.list[t].productionTime<=this.endObj.time&&1e3*this.list[t].productionTime>=this.startObj.time&&this.backData.push(this.list[t]);for(var e=0;e<this.backData.length;e++)-1==this.backData[e].supplier.indexOf(this.supplyer)&&(this.backData.splice(e,1),e--);for(var i=0;i<this.backData.length;i++)-1==this.backData[i].batchCode.indexOf(this.batchNum)&&(this.backData.splice(i,1),i--)},reset:function(){this.batchNum="",this.supplyer="",this.startObj.time=n.a.getTime({time:new Date}).start,this.endObj.time=n.a.getTime({time:new Date}).end,this.getMaterialBatch()}}},u=(i("3b0b"),i("7610")),c=Object(u.a)(l,a,[],!1,null,"7fa738e0",null);c.options.__file="src\\module\\invoicing_system\\warehouse_manage\\output_material_batch_win.vue";e.default=c.exports}}]);