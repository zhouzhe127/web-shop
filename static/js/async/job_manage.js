(window.webpackJsonp=window.webpackJsonp||[]).push([["job_manage"],{"3d57":function(t,e,n){"use strict";n.r(e);var i=n("81a2"),r=n("f6ce"),s=n("bbb9");function a(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(r,s){try{var a=e[r](s),o=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(o).then(function(t){i("next",t)},function(t){i("throw",t)});t(o)}("next")})}}var o={data:function(){return{titleList:[{titleName:"操作",titleStyle:{width:"20%"}},{titleName:"序号",titleStyle:{width:"10%"}},{titleName:"职位名称",titleStyle:{width:"30%"},dataName:"name"},{titleName:"权限数量",titleStyle:{width:"20%"},dataName:"nodeNum"},{titleName:"职位人数",titleStyle:{width:"20%"},dataName:"personNum"}],showWin:!1,userData:Object,list:[],copyList:[],isAdd:!0,jobId:"",jobIndex:"",search:"",num:10,currentPage:1,pagenumArr:[10,20,50],ischain:""}},mounted:function(){this.userData=r.a.session("userShop"),this.ischain=this.userData.currentShop.ischain,this.$store.commit("setPageTools",[{name:"添加职位",className:["addStaff","export-btn"],fn:this.add}]),this.init()},computed:{totalNum:function(){return Math.ceil(this.list.length/this.num)},lists:function(){var t=(this.currentPage-1)*this.num,e=this.currentPage*this.num;return this.list.slice(t,e)}},methods:{init:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.newGetJobInfoList({data:{}});case 2:(n=e.sent)&&(t.list=n,t.copyList=n,t.sortList());case 4:case"end":return e.stop()}},e,t)}))()},pageClick:function(t){this.currentPage=t},numChange:function(t){this.num=t,this.currentPage=1},keyUp:function(){var t=[];this.currentPage=1;for(var e=this.copyList,n=0;n<e.length;n++){if(""!=this.search)if(-1==(e[n].name+"").indexOf(this.search))continue;t.push(e[n])}this.list=t},reset:function(){this.search="",this.keyUp()},addJob:function(t){var e=this;return a(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.newAddJob({data:t});case 2:n.sent?(e.init(),e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"添加成功"})):e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"返回数据错误，请刷新后重试"});case 4:case"end":return n.stop()}},n,e)}))()},editJob:function(t){var e=this;return a(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.newEditJob({data:t});case 2:n.sent?(e.init(),e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"修改成功"})):e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"返回数据错误，请刷新后重试"});case 4:case"end":return n.stop()}},n,e)}))()},add:function(){this.isAdd=!0,this.showWin=!0},edit:function(t,e){this.isAdd=!1,this.jobId=t,this.jobIndex=e,this.showWin=!0},doThrowWinResult:function(t,e){"ok"==t?(this.isAdd?this.addJob(e):this.editJob(e),this.showWin=!1):this.showWin="cancel"!=t&&"close"!=t},deljob:function(t,e){var n=this;this.$store.commit("setWin",{title:"温馨提示",winType:"confirm",content:"确定删除“ "+t.name+" ”职位信息?",callback:function(i){"ok"==i&&n.deleteJob(t.id,e)}})},deleteJob:function(t,e){var n=this;return a(regeneratorRuntime.mark(function r(){return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,i.a.newDeleteJob({data:{id:t}});case 2:r.sent&&(n.list.splice(e,1),0==n.list.length&&(n.currentPage=n.currentPage-1),n.init());case 4:case"end":return r.stop()}},r,n)}))()},sortList:function(){this.list=s.a.sortByAll(this.list,["sort","id"],!0)}},components:{jobWin:function(){return n.e("job_manage_one").then(n.bind(null,"1090"))},pageElement:function(){return n.e("page_element").then(n.bind(null,"5921"))},comTable:function(){return n.e("table").then(n.bind(null,"4360"))}}},c=(n("969b"),n("d801")),l=Object(c.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"100%"},attrs:{id:"joblist"}},[n("section",{staticClass:"jobTop"},[n("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请输入职位名称"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.keyUp}},[t._v("搜索")]),t._v(" "),n("el-button",{attrs:{type:"info"},on:{click:t.reset}},[t._v("重置")])],1),t._v(" "),n("section",{staticClass:"allList"},[n("section",{staticClass:"oBox"},[n("div",{staticClass:"boxTop"},[n("span",{staticStyle:{"font-size":"16px","margin-right":"20px"}},[t._v("职位列表 · 共"),n("span",{staticStyle:{color:"#ff3c04","font-size":"inherit"}},[t._v(t._s(t.list.length))]),t._v("个条目")])]),t._v(" "),n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{stripe:"","header-cell-style":{"background-color":"#f5f7fa"},data:t.lists,border:""}},[n("el-table-column",{attrs:{fixed:"","min-width":"120",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{color:"#FE8D2C",cursor:"pointer"},on:{click:function(n){t.edit(e.row.id,e.$index)}}},[t._v("编辑")]),t._v(" "),n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[t._v("|")]),t._v(" "),n("span",{staticStyle:{color:"#FD3F1F",cursor:"pointer"},on:{click:function(n){t.deljob(e.row,e.$index)}}},[t._v("删除")])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",align:"center",prop:"name",label:"职位名称"}}),t._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",prop:"nodeNum",align:"center",label:"权限数量"}}),t._v(" "),n("el-table-column",{attrs:{prop:"personNum","min-width":"120",align:"center",label:"职位人数"}})],1)],1),t._v(" "),n("div",{staticStyle:{"margin-top":"10px"}},[n("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":t.num,layout:"sizes, prev, pager, next","page-count":t.totalNum,"page-sizes":[10,20,30]},on:{"size-change":t.numChange,"current-change":t.pageClick}})],1)]),t._v(" "),t.showWin?n("job-win",{attrs:{isAdd:t.isAdd,jobId:t.jobId,jobIndex:t.jobIndex,list:t.copyList},on:{throwWinResult:t.doThrowWinResult}}):t._e()],1)},[],!1,null,"37a3ed0a",null);e.default=l.exports},"969b":function(t,e,n){"use strict";var i=n("c026");n.n(i).a},c026:function(t,e,n){}}]);