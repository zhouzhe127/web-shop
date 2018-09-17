(window.webpackJsonp=window.webpackJsonp||[]).push([["worker_staff"],{4244:function(t,e,s){},8702:function(t,e,s){"use strict";var n=s("4244");s.n(n).a},"8ddd":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"worker_staff"}},["worker"==t.workerType?[s("header",{staticClass:"worker_staff_belongs"},[s("span",[t._v("所属门店")]),t._v(" "),s("select-btn",{attrs:{sorts:t.sorts,name:t.defaultName,width:184},on:{selOn:t.selectData}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.keyWords,expression:"keyWords",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"关键字"},domProps:{value:t.keyWords},on:{input:function(e){e.target.composing||(t.keyWords=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("button",{staticClass:"shop_selects",on:{click:t.selectWorker}},[t._v("筛选")]),t._v(" "),s("button",{staticClass:"shop_resert",on:{click:t.resertWorker}},[t._v("重置")])],1),t._v(" "),s("com-table",{key:t.index,attrs:{listWidth:1470,listHeight:80,listName:"工作人员",showTitle:1,introData:t.userList,titleData:t.titleList,allTotal:t.wokerList.length,widthType:!0},scopedSlots:t._u([{key:"con-0",fn:function(e){return s("div",{staticClass:"operate_worker"},[s("span",{on:{click:function(s){t.editUser(e.data,e.index)}}},[t._v("编辑")]),t._v(" "),s("span",{on:{click:function(s){t.deleteUser(e.data,e.index)}}},[t._v("删除")])])}},{key:"con-1",fn:function(e){return s("div",{},[t._v(t._s(10*(t.page-1)+e.index+1))])}},{key:"con-3",fn:function(t){return s("div",{staticClass:"imgStyle"},[s("img",{attrs:{src:t.data.imageUrl,alt:t.data.name}})])}},{key:"con-5",fn:function(e){return s("div",{on:{click:function(s){t.openCustomer(e.data)}}},[t._v(t._s(e.data.customerNum))])}},{key:"con-6",fn:function(e){return s("div",{on:{click:function(s){t.openCoin(e.data)}}},[t._v(t._s(e.data.coins))])}},{key:"con-9",fn:function(e){return s("div",{},[t._v(t._s(t.statusType[e.data.position]))])}}])}),t._v(" "),s("section",{staticClass:"turn-page"},[s("pageElement",{attrs:{page:Number(t.page),total:Number(t.total),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.pageChange}})],1)]:t._e(),t._v(" "),"addworker"==t.workerType?s("setup-user",{attrs:{editData:t.editData},on:{wengBack:t.getwengBack}}):t._e(),t._v(" "),"customer"==t.workerType?s("customer",{attrs:{staffFansId:t.staffFansId},on:{customerBack:t.customerBack}}):t._e(),t._v(" "),"coins"==t.workerType?s("coins",{attrs:{staffFansId:t.staffFansId},on:{coinsBack:t.coinsBack}}):t._e()],2)};n._withStripped=!0;var r=s("81a2"),a=s("f6ce");function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function n(r,a){try{var i=e[r](a),o=i.value}catch(t){return void s(t)}if(!i.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var o={data:function(){return{index:null,titleList:[{titleName:"操作",titleStyle:{width:"180px",flex:"none",fontSize:"16px"}},{titleName:"序号"},{titleName:"用户昵称",dataName:"nickNmae"},{titleName:"头像"},{titleName:"姓名",dataName:"staffName"},{titleName:"客户",dataName:"customerNum",conStyle:{color:"#27a8e0"}},{titleName:"金币",dataName:"coins",conStyle:{color:"#27a8e0"}},{titleName:"累计获得金币",dataName:"coinsTotal"},{titleName:"所属门店",dataName:"shopNames"},{titleName:"职位",dataName:"createTime"}],allTotal:0,userShop:"",sorts:[],allList:[],wokerList:[],userList:[],page:1,total:0,num:10,selects:"",keyWords:"",editData:"",editIndex:"",ischain:"",defaultName:"全部门店",statusType:{1:"店长",2:"店员",3:"收银员"},workerType:"worker",staffFansId:""}},created:function(){var t={titleStyle:{fontSize:"16px"}},e=!0,s=!1,n=void 0;try{for(var r,a=this.titleList[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var i=r.value;"操作"!=i.titleName&&Object.assign(i,t)}}catch(t){s=!0,n=t}finally{try{!e&&a.return&&a.return()}finally{if(s)throw n}}},methods:{selectWorker:function(){var t=new RegExp(this.keyWords),e=[];if(""!=this.selects.toString()){var s=new RegExp(this.sorts[this.selects]);e=this.allList.filter(function(e){return s.test(e.shopNames)&&t.test(e.staffName||t.test(e.nickNmae))})}else e=this.allList.filter(function(e){return t.test(e.nickNmae)||t.test(e.staffName)});this.wokerList=Object.values(e),this.setPage()},resertWorker:function(){this.page=1,this.keyWords="",this.selects="",3==this.ischain&&(this.selects="",this.defaultName="全部门店"),this.getshopList(),this.getAssistantstaff()},selectData:function(t){this.selects=t},editUser:function(t){this.workerType="addworker",this.editData=t},deleteUser:function(t,e){var s=this;return i(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return s.editIndex=e+s.page*s.num-s.num,n.next=3,r.a.deleteAssistantstaff({data:{id:t.id,fansId:t.fansId}});case 3:s.$store.commit("setWin",{content:"删除成功",title:"操作提示",winType:"alert"}),s.wokerList.splice(s.editIndex,1),s.setPage();case 6:case"end":return n.stop()}},n,s)}))()},getAssistantstaff:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.getAssistantstaff();case 2:s=e.sent,t.allList=Object.values(s),t.wokerList=t.allList,t.$nextTick(function(){t.setPage()});case 6:case"end":return e.stop()}},e,t)}))()},pageChange:function(t){this.page=t.page,this.num=t.num,this.setPage()},setPage:function(){this.total=Math.ceil(this.wokerList.length/this.num);var t=(this.page-1)*this.num,e=this.page*this.num;this.userList=this.wokerList.slice(t,e)},getshopList:function(){if(3==this.ischain){var t=this.userShop.currentShop.direct,e=[],s=!0,n=!1,r=void 0;try{for(var a,i=t[Symbol.iterator]();!(s=(a=i.next()).done);s=!0){var o=a.value;e.push(o.name)}}catch(t){n=!0,r=t}finally{try{!s&&i.return&&i.return()}finally{if(n)throw r}}var c=this.userShop.currentShop.franchise,u=!0,l=!1,f=void 0;try{for(var d,h=c[Symbol.iterator]();!(u=(d=h.next()).done);u=!0){var m=d.value;e.push(m.name)}}catch(t){l=!0,f=t}finally{try{!u&&h.return&&h.return()}finally{if(l)throw f}}this.sorts=e}else this.sorts=[this.userShop.currentShop.name]},addworker:function(){this.$store.commit("setPageTools",{}),this.workerType="addworker",this.editData=""},getwengBack:function(){var t=this;this.workerType="worker",this.getAssistantstaff(),this.$store.commit("setPageTools",{addworker:function(){t.addworker()}})},openCustomer:function(t){this.$store.commit("setPageTools",{}),this.workerType="customer",this.staffFansId=t.fansId},customerBack:function(){var t=this;this.workerType="worker",this.getAssistantstaff(),this.$store.commit("setPageTools",{addworker:function(){t.addworker()}})},openCoin:function(t){this.$store.commit("setPageTools",{}),this.workerType="coins",this.staffFansId=t.fansId},coinsBack:function(){var t=this;this.workerType="worker",this.$store.commit("setPageTools",{addworker:function(){t.addworker()}})}},mounted:function(){var t=this;this.$store.commit("setPageTools",{addworker:function(){t.addworker()}}),this.getAssistantstaff(),this.userShop=a.a.session("userShop"),this.ischain=a.a.session("userShop").currentShop.ischain,this.getshopList()},components:{comTable:function(){return s.e("table").then(s.bind(null,"4360"))},pageElement:function(){return s.e("page_element").then(s.bind(null,"5921"))},"select-btn":function(){return s.e("select_btn").then(s.bind(null,"3d41"))},"setup-user":function(){return s.e("setup_user").then(s.bind(null,"cc9e"))},customer:function(){return s.e("customer_record").then(s.bind(null,"ba9e"))},coins:function(){return s.e("gold_record").then(s.bind(null,"6474"))}}},c=(s("8702"),s("6ceb")),u=Object(c.a)(o,n,[],!1,null,"5072e71a",null);u.options.__file="src\\module\\seller_assistant\\worker_staff.vue";e.default=u.exports}}]);