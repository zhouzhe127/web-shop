(window.webpackJsonp=window.webpackJsonp||[]).push([["customer_record"],{"485f":function(t,e,n){"use strict";var a=n("d93d");n.n(a).a},ba9e:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"customer"}},[t.addworker?n("addWorker",{attrs:{staffFansId:t.staffFansId},on:{addBack:t.addBack}}):[n("header",{staticClass:"worker_staff_belongs"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.keyWords,expression:"keyWords",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入用户昵称"},domProps:{value:t.keyWords},on:{input:function(e){e.target.composing||(t.keyWords=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),n("button",{staticClass:"shop_selects",on:{click:t.selectWorker}},[t._v("筛选")]),t._v(" "),n("button",{staticClass:"shop_resert",on:{click:t.resertWorker}},[t._v("重置")])]),t._v(" "),n("section",[n("com-table",{attrs:{listHeight:80,listWidth:1e3,showHand:!0,titleData:t.shoptitleList,introData:t.formList,listName:"工作人员",showTitle:1,allTotal:t.allFormList.length,widthType:!1},scopedSlots:t._u([{key:"con-0",fn:function(e){return n("div",{on:{click:function(n){t.deleteUser(e.data)}}},[t._v("删除")])}},{key:"con-2",fn:function(e){return n("div",{},[t._v(t._s(t.formatTime(e.data.bindingTime)))])}}])})],1),t._v(" "),n("section",{staticClass:"turn-page"},[n("pageElement",{attrs:{page:Number(t.page),total:Number(t.endTotal),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.getPageNum}})],1)]],2)};a._withStripped=!0;var r=n("81a2"),s=n("bbb9");function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function a(r,s){try{var i=e[r](s),o=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})}}var o={data:function(){return{page:1,num:10,endTotal:0,shoptitleList:[{titleName:"操作",titleStyle:{fontSize:"16px",flex:"none",width:"200px"},conStyle:{color:"#ff3d04",cursor:"pointer"}},{titleName:"用户昵称 ",dataName:"name",titleStyle:{fontSize:"16px"}},{titleName:"绑定日期",dataName:"bindingTime",titleStyle:{fontSize:"16px"}}],allFormList:[],allList:[],formList:[],keyWords:"",addworker:!1}},props:{staffFansId:String},methods:{getPageNum:function(t){this.page=t.page,this.num=t.num,this.setPage()},setPage:function(){this.endTotal=Math.ceil(this.allFormList.length/this.num);var t=(this.page-1)*this.num,e=this.page*this.num,n=this.allFormList.slice(t,e);this.formList=n},selectWorker:function(){var t,e=new RegExp(this.keyWords);t=this.allList.filter(function(t){return e.test(t.name)}),this.allFormList=Object.values(t),this.setPage()},resertWorker:function(){this.page=1,this.num=10,this.keyWords="",this.getCustomerByStaffId()},getCustomerByStaffId:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.getCustomerByStaffId({data:{staffFansId:t.staffFansId}});case 2:(n=e.sent)&&(t.allFormList=n,t.allList=t.allFormList,t.$nextTick(function(){t.setPage()}));case 4:case"end":return e.stop()}},e,t)}))()},wentBack:function(){this.$store.commit("setPageTools",{}),this.$emit("customerBack")},deleteUser:function(t){var e=this;this.$store.commit("setWin",{title:"温馨提示",winType:"confirm",content:"确定删除客户吗",callback:function(n){"ok"==n&&e.unbinding(t)}})},unbinding:function(t){var e=this;return i(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,r.a.unbinding({data:{fansId:t.id}});case 2:n.sent&&(e.$store.commit("setWin",{content:"解除成功",title:"操作提示",winType:"alert"}),e.getCustomerByStaffId());case 4:case"end":return n.stop()}},n,e)}))()},formatTime:function(t){return 10==t.length&&(t*=1e3),s.a.format(new Date(t),"yyyy-MM-dd hh:mm:ss")},addCustomer:function(){this.addworker=!0},addBack:function(){var t=this;this.addworker=!1,this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){t.wentBack()}},{name:"增加客户",className:["fd-blue"],fn:function(){t.addCustomer()}}])}},components:{comTable:function(){return n.e("table").then(n.bind(null,"4360"))},pageElement:function(){return n.e("page_element").then(n.bind(null,"5921"))},addWorker:function(){return n.e("add_customer").then(n.bind(null,"c516"))}},mounted:function(){var t=this;this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){t.wentBack()}},{name:"增加客户",className:["fd-blue"],fn:function(){t.addCustomer()}}]),this.getCustomerByStaffId()}},u=(n("485f"),n("7610")),c=Object(u.a)(o,a,[],!1,null,"18a70d6e",null);c.options.__file="src\\module\\seller_assistant\\customer_record.vue";e.default=c.exports},d93d:function(t,e,n){}}]);