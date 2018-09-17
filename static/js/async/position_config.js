(window.webpackJsonp=window.webpackJsonp||[]).push([["position_config"],{9806:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"joblist"}},[i("section",{staticClass:"top"},[i("section",{staticClass:"top_input"},[i("el-select",{attrs:{placeholder:"选择结算方式"},model:{value:t.selectedType,callback:function(e){t.selectedType=e},expression:"selectedType"}},t._l(t.options,function(t,e){return i("el-option",{key:e,attrs:{label:t,value:e}})}))],1),t._v(" "),i("section",{staticClass:" top_input"},[i("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请输入职位名称"},model:{value:t.positionName,callback:function(e){t.positionName=e},expression:"positionName"}})],1),t._v(" "),i("section",{staticClass:" top_input"},[i("a",{staticClass:"blue btn",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.searchPosition()}}},[t._v("筛选")]),t._v(" "),i("a",{staticClass:"gray btn",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.resetSearch()}}},[t._v("重置")])])]),t._v(" "),i("section",{staticClass:"oBox"},[i("div",{staticClass:"boxTop"},[i("span",{staticStyle:{"font-size":"16px","margin-right":"20px"}},[t._v("职位管理列表 · 共"),i("span",{staticStyle:{color:"#ff3c04","font-size":"inherit"}},[t._v(t._s(t.newrecordList.length))]),t._v("个条目")])]),t._v(" "),i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{stripe:"","header-cell-style":{"background-color":"#f5f7fa"},data:t.currentList,border:""}},[i("el-table-column",{attrs:{fixed:"","min-width":"120",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticStyle:{color:"#FE8D2C",cursor:"pointer"},on:{click:function(i){t.toEdit(e.row,e.$index)}}},[t._v("编辑")]),t._v(" "),i("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[t._v("|")]),t._v(" "),i("span",{staticStyle:{color:"#FD3F1F",cursor:"pointer"},on:{click:function(i){t.delJob(e.row,e.$index)}}},[t._v("删除")])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center","min-width":"100",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",align:"center",prop:"name",label:"职位名称"}}),t._v(" "),i("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",align:"center",label:"职位类型"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.type?i("span",[t._v("门店")]):t._e(),t._v(" "),"1"==e.row.type?i("span",[t._v("品牌")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",prop:"nodeNum",align:"center",label:"权限数量"}}),t._v(" "),i("el-table-column",{attrs:{prop:"personNum","min-width":"120",align:"center",label:"职位人数"}})],1)],1),t._v(" "),i("section",{staticStyle:{"margin-top":"10px"}},[i("el-pagination",{attrs:{background:"","current-page":t.page,"page-size":t.num,layout:"sizes, prev, pager, next","page-count":t.total,"page-sizes":[10,20,30]},on:{"size-change":t.numChange,"current-change":t.pageClick}})],1),t._v(" "),t.isOpenWin?i("positionWin",{attrs:{item:t.item,isAdd:t.isAdd,isShop:t.isShop,userData:t.userData,list:t.list,jobIndex:t.jobIndex,currentList:t.currentList,newrecordList:t.newrecordList},on:{throwWinResult:t.doThrowWinResult}}):t._e()],1)};n._withStripped=!0;var s=i("81a2"),o=i("f6ce"),r=i("bbb9");function a(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(s,o){try{var r=e[s](o),a=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(a).then(function(t){n("next",t)},function(t){n("throw",t)});t(a)}("next")})}}var c={data:function(){return{list:[],newrecordList:[],currentList:[],userData:Object,isShop:!1,isAdd:!1,isOpenWin:!1,item:Object,jobIndex:"",options:["全部","门店职位","品牌职位"],selectedType:"",selectedName:"请选择职位类型",positionName:"",num:10,count:0,total:0,page:1,titleData:[],bannerStyle:null,contentStyle:null}},created:function(){this.titleData=[{titleName:"操作"},{titleName:"序号"},{titleName:"职位名称",dataName:"name"},{titleName:"职位类型"},{titleName:"权限数量",dataName:"nodeNum"},{titleName:"职位人数",dataName:"personNum"}],this.bannerStyle={backgroundColor:"#F2F2F2",color:"#434149",fontSize:"16px"},this.contentStyle={color:"#666666",fontSize:"14px"}},mounted:function(){this.userData=o.a.session("userShop"),this.init(),this.getList()},watch:{currentList:{handler:function(t){0==t.length&&this.page>1&&(this.page=this.page-1,this.paging(1))}}},methods:{init:function(){var t=this,e={openShopPosition:function(){t.openShop()},openBrandPosition:function(){t.openBrand()}};this.$store.commit("setPageTools",e)},selectType:function(t){this.selectedType=t},openShop:function(){this.item={},this.isAdd=!0,this.isShop=!0,this.isOpenWin=!0},openBrand:function(){this.item={},this.isAdd=!0,this.isShop=!1,this.isOpenWin=!0},getList:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.RoleGetList({data:{}});case 2:(i=e.sent)&&(i=i.map(function(t){return t.personNum=t.personNum+"",t}),t.list=i,t.newrecordList=i,t.sortList(),t.paging());case 4:case"end":return e.stop()}},e,t)}))()},toEdit:function(t,e){this.item=t,this.jobIndex=(this.page-1)*this.num+e,this.isOpenWin=!0,this.isAdd=!1},deleteJob:function(t,e){var i=this;return a(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.deletePosition({data:{id:t.id}});case 2:n.sent&&(i.newrecordList.splice((i.page-1)*i.num+e,1),i.sortList(),i.paging(1),i.list=i.newrecordList,i.$store.commit("setWin",{title:"操作提示",winType:"alter",content:"删除成功"}));case 4:case"end":return n.stop()}},n,i)}))()},delJob:function(t,e){var i=this;Number(t.personNum)>0?this.$store.commit("setWin",{title:"操作提示",winType:"alter",content:"有"+t.personNum+"位员工绑定该职位，请解除帮定后再进行删除操作！"}):this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"确定删除该职位信息?",callback:function(n){"ok"==n&&i.deleteJob(t,e)}})},doThrowWinResult:function(t){"ok"==t?(this.sortList(),this.isOpenWin=!1,this.paging(1),this.list=this.newrecordList,this.isAdd?this.$store.commit("setWin",{title:"操作提示",winType:"alter",content:"添加成功"}):this.$store.commit("setWin",{title:"操作提示",winType:"alter",content:"修改成功"})):"cancel"==t?this.isOpenWin=!1:"close"==t&&(this.isOpenWin=!1)},searchPosition:function(){var t=[];if(""==this.positionName&&0==this.selectedType)return this.getList(),!1;if(""!=this.positionName&&0==this.selectedType)for(var e=0;e<this.list.length;e++)-1!=this.list[e].name.indexOf(this.positionName)&&t.push(this.list[e]);else if(0!=this.selectedType&&""==this.positionName)for(var i=0;i<this.list.length;i++)Number(this.list[i].type)+1==this.selectedType&&t.push(this.list[i]);else for(var n=0;n<this.list.length;n++)-1!=this.list[n].name.indexOf(this.positionName)&&Number(this.list[n].type)+1==this.selectedType&&t.push(this.list[n]);this.newrecordList=t,this.paging()},resetSearch:function(){this.positionName="",this.selectedType="",this.selectedName="全部",this.options=["全部","门店职位","品牌职位"],this.getList()},pageClick:function(t){this.page=t,console.log(t),this.total=Math.ceil(this.newrecordList.length/this.num),this.currentList=this.newrecordList.slice((this.page-1)*this.num,(this.page-1)*this.num+this.num)},numChange:function(t){this.num=t,this.page=1,this.total=Math.ceil(this.newrecordList.length/this.num),this.currentList=this.newrecordList.slice((this.page-1)*this.num,(this.page-1)*this.num+this.num)},paging:function(t){this.total=Math.ceil(this.newrecordList.length/this.num),this.count=this.newrecordList.length,1!=t&&(this.page=1),this.currentList=this.newrecordList.slice((this.page-1)*this.num,(this.page-1)*this.num+this.num)},sortList:function(){this.newrecordList=r.a.sortByAll(this.newrecordList,["sort","id"],!0)}},components:{positionWin:function(){return i.e("position_config_one_win").then(i.bind(null,"40f0"))}}},l=(i("b4b7"),i("6ceb")),h=Object(l.a)(c,n,[],!1,null,"06868110",null);h.options.__file="src\\module\\brand_configuration\\position_config.vue";e.default=h.exports},b4b7:function(t,e,i){"use strict";var n=i("c9c7");i.n(n).a},c9c7:function(t,e,i){}}]);