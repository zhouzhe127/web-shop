(window.webpackJsonp=window.webpackJsonp||[]).push([["add_customer"],{"70a6":function(e,t,s){},"89ca":function(e,t,s){"use strict";var n=s("70a6");s.n(n).a},c516:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"addCustomer"}},[s("div",{staticClass:"search"},[s("span",[e._v("关键字")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],attrs:{type:"text",placeholder:"请输入用户昵称"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.employeeName,expression:"employeeName"}],attrs:{type:"text",placeholder:"请输入员工姓名"},domProps:{value:e.employeeName},on:{input:function(t){t.target.composing||(e.employeeName=t.target.value)}}}),e._v(" "),s("div",{staticClass:"businessHours"},[s("div",{class:{active:e.isMember},on:{click:e.selectBusinessHours}}),e._v(" "),s("span",[e._v("只看无导购粉丝")])]),e._v(" "),s("a",{staticClass:"blue",attrs:{href:"javascript:;"},on:{click:e.screening}},[e._v("筛选")]),e._v(" "),s("a",{staticClass:"gray",attrs:{href:"javascript:;"},on:{click:e.resetFun}},[e._v("重置")])]),e._v(" "),s("section",[s("com-table",{attrs:{listHeight:80,listWidth:1e3,showHand:!0,titleData:e.shoptitleList,introData:e.formList,listName:"工作人员",showTitle:1,allTotal:e.count,widthType:!1},scopedSlots:e._u([{key:"con-0",fn:function(t){return s("div",{staticClass:"circle"},[s("span",{class:{actives:t.data.selected},on:{click:function(s){e.ocSelOne(t.data)}}})])}}])},[s("div",{staticClass:"circle",attrs:{slot:"title-0"},slot:"title-0"},[s("span",{class:{actives:e.allselect},on:{click:e.allSelectedOne}})])])],1),e._v(" "),s("section",{staticClass:"turn-page"},[s("pageElement",{attrs:{page:Number(e.page),total:Number(e.endTotal),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:e.getPageNum}})],1)])};n._withStripped=!0;var i=s("81a2");function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,s){return function n(i,a){try{var r=t[i](a),c=r.value}catch(e){return void s(e)}if(!r.done)return Promise.resolve(c).then(function(e){n("next",e)},function(e){n("throw",e)});e(c)}("next")})}}var r={data:function(){return{page:1,num:10,count:"",endTotal:0,nickname:"",employeeName:"",shoptitleList:[{titleName:"操作类型",titleStyle:{fontSize:"16px",flex:"none",width:"200px",height:"100%"}},{titleName:"用户昵称 ",dataName:"name",titleStyle:{fontSize:"16px"}},{titleName:"已绑定店员",dataName:"staffName",titleStyle:{fontSize:"16px"}}],allFormList:[],formList:[],isMember:!1,selectedList:[],allselect:!1}},props:{staffFansId:String},methods:{getPageNum:function(e){this.page=e.page,this.num=e.num,this.getFansListByCondition()},getFansListByCondition:function(){var e=this;return a(regeneratorRuntime.mark(function t(){var s,n,a,r,c,o,l,u,d,m,f,h,p;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.getFansListByCondition({data:{nickName:e.nickname,staffName:e.employeeName,noStaff:Number(e.isMember),page:e.page,num:e.num}});case 2:if(!(s=t.sent)){t.next=67;break}e.count=s.count?s.count:e.count,e.endTotal=s.total?s.total:e.endTotal,n=!0,a=!1,r=void 0,t.prev=9,c=s.list[Symbol.iterator]();case 11:if(n=(o=c.next()).done){t.next=52;break}if(l=o.value,0!=e.selectedList.length){t.next=17;break}l.selected=!1,t.next=47;break;case 17:u=!0,d=!1,m=void 0,t.prev=20,f=e.selectedList[Symbol.iterator]();case 22:if(u=(h=f.next()).done){t.next=33;break}if((p=h.value).id!=l.id){t.next=29;break}return l.selected=p.selected,t.abrupt("break",33);case 29:l.selected=!1;case 30:u=!0,t.next=22;break;case 33:t.next=39;break;case 35:t.prev=35,t.t0=t.catch(20),d=!0,m=t.t0;case 39:t.prev=39,t.prev=40,!u&&f.return&&f.return();case 42:if(t.prev=42,!d){t.next=45;break}throw m;case 45:return t.finish(42);case 46:return t.finish(39);case 47:e.allselect=!0,l.selected||(e.allselect=!1);case 49:n=!0,t.next=11;break;case 52:t.next=58;break;case 54:t.prev=54,t.t1=t.catch(9),a=!0,r=t.t1;case 58:t.prev=58,t.prev=59,!n&&c.return&&c.return();case 61:if(t.prev=61,!a){t.next=64;break}throw r;case 64:return t.finish(61);case 65:return t.finish(58);case 66:e.formList=s.list;case 67:case"end":return t.stop()}},t,e,[[9,54,58,66],[20,35,39,47],[40,,42,46],[59,,61,65]])}))()},selectBusinessHours:function(){this.isMember=!this.isMember},wentBack:function(){this.$store.commit("setPageTools",{}),this.$emit("addBack")},screening:function(){this.page=1,this.getFansListByCondition()},resetFun:function(){this.nickname="",this.employeeName="",this.isMember=!1,this.screening()},ocSelOne:function(e){if(e.selected=!e.selected,e.selected){this.selectedList.push(e);for(var t=0;t<this.formList.length;t++)if(1!=this.formList[t].selected)return;this.allselect=!0}else{this.allselect=!1;for(var s=0;s<this.selectedList.length;s++)this.selectedList[s].id==e.id&&this.selectedList.splice(s,1)}},allSelectedOne:function(){if(1==this.allselect)for(var e=0;e<this.formList.length;e++){this.formList[e].selected=!1;for(var t=0;t<this.selectedList.length;t++)this.selectedList[t].id==this.formList[e].id&&this.selectedList.splice(t,1)}else for(var s=0;s<this.formList.length;s++)this.formList[s].selected=!0,-1==JSON.stringify(this.selectedList).indexOf(JSON.stringify(this.formList[s]))&&this.selectedList.push(this.formList[s]);this.allselect=!this.allselect},batchBinding:function(){var e=this;return a(regeneratorRuntime.mark(function t(){var s,n,a,r,c,o,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(s=[],n=!0,a=!1,r=void 0,t.prev=4,c=e.selectedList[Symbol.iterator]();!(n=(o=c.next()).done);n=!0)l=o.value,s.push(l.id);t.next=12;break;case 8:t.prev=8,t.t0=t.catch(4),a=!0,r=t.t0;case 12:t.prev=12,t.prev=13,!n&&c.return&&c.return();case 15:if(t.prev=15,!a){t.next=18;break}throw r;case 18:return t.finish(15);case 19:return t.finish(12);case 20:return t.next=22,i.a.batchBinding({data:{staffFansId:e.staffFansId,fansIds:s.join(",")}});case 22:t.sent&&(e.$store.commit("setWin",{content:"新增成功",title:"操作提示",winType:"alert"}),e.selectedList=[],e.screening());case 24:case"end":return t.stop()}},t,e,[[4,8,12,20],[13,,15,19]])}))()},addCustomer:function(){if(this.selectedList.length<=0)return this.$store.commit("setWin",{content:"请选择需要绑定的客户",title:"操作提示",winType:"alert"}),!1;this.batchBinding()}},components:{comTable:function(){return s.e("table").then(s.bind(null,"4360"))},pageElement:function(){return s.e("page_element").then(s.bind(null,"5921"))}},mounted:function(){var e=this;this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){e.wentBack()}},{name:"增加选中客户",className:["userLabel"],fn:function(){e.addCustomer()}}]),this.getFansListByCondition()}},c=(s("89ca"),s("6ceb")),o=Object(c.a)(r,n,[],!1,null,"47a05e60",null);o.options.__file="src\\module\\seller_assistant\\add_customer.vue";t.default=o.exports}}]);