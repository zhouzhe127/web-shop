(window.webpackJsonp=window.webpackJsonp||[]).push([["receivable_man"],{8144:function(e,t,n){},c0c8:function(e,t,n){"use strict";var i=n("8144");n.n(i).a},fc57:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"receivableMan"}},[e.showClearing?e._e():n("section",{staticClass:"seac_top",staticStyle:{height:"50px"}},[n("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择账户类型"},model:{value:e.recType,callback:function(t){e.recType=t},expression:"recType"}},e._l(e.accountType,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),n("span",[e._v("-")]),e._v(" "),n("el-input",{staticStyle:{width:"225px"},attrs:{clearable:"",maxlength:"11",placeholder:"请输入账户名称/联系人/电话"},model:{value:e.seachValue,callback:function(t){e.seachValue=t},expression:"seachValue"}}),e._v(" "),n("a",{staticClass:"blue",staticStyle:{width:"110px",height:"40px","line-height":"40px"},attrs:{href:"javascript:;"},on:{click:e.seachFn}},[e._v("筛选")]),e._v(" "),n("a",{staticClass:"gray",staticStyle:{width:"110px",height:"40px","line-height":"40px"},attrs:{href:"javascript:;"},on:{click:e.resetFn}},[e._v("重置")])],1),e._v(" "),e.showClearing?e._e():n("section",{staticClass:"allList"},[n("section",{staticClass:"oBox"},[n("div",{staticClass:"boxTop"},[n("span",{staticStyle:{"font-size":"16px","margin-right":"20px"}},[e._v("挂账账户列表 · 共"),n("span",{staticStyle:{color:"#ff3c04","font-size":"inherit"}},[e._v(e._s(e.recList.length))]),e._v("个条目")]),e._v(" "),"1"==e.ischain||"2"==e.ischain?n("span",{staticClass:"aSpan"},[n("i",{staticClass:"aI"}),e._v("品牌指派\n\t\t\t\t")]):e._e(),e._v(" "),"1"==e.ischain||"2"==e.ischain?n("span",{staticClass:"aSpan",staticStyle:{color:"#2ea7e0"}},[n("i",{staticClass:"aI",staticStyle:{background:"#2ea7e0"}}),e._v("门店自建\n\t\t\t\t")]):e._e()]),e._v(" "),n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{stripe:"","header-cell-style":{"background-color":"#f5f7fa"},data:e.list,fixed:""}},[n("el-table-column",{attrs:{fixed:"","min-width":"300",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return["3"==e.ischain?n("span",{staticStyle:{color:"#01AAE5",cursor:"pointer"},on:{click:function(n){e.toShop(t.row)}}},[e._v("指派")]):e._e(),e._v(" "),"3"==e.ischain?n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[e._v("|")]):e._e(),e._v(" "),n("span",{staticStyle:{color:"#FE8D2C",cursor:"pointer"},on:{click:function(n){e.clearing(t.row)}}},[e._v("结算")]),e._v(" "),n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[e._v("|")]),e._v(" "),n("span",{staticStyle:{color:"#01AAE5",cursor:"pointer"},on:{click:function(n){e.getDetial(t.row)}}},[e._v("详情")]),e._v(" "),n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[e._v("|")]),e._v(" "),n("span",{staticStyle:{color:"#FD950E",cursor:"pointer"},on:{click:function(n){e.edit(t.row)}}},[e._v("编辑")]),e._v(" "),n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[e._v("|")]),e._v(" "),"0"==t.row.status?n("span",{staticStyle:{color:"#FD3F03",cursor:"pointer"},on:{click:function(n){e.stopman(t.row,t.$index)}}},[e._v("停用")]):e._e(),e._v(" "),1==t.row.status?n("span",{staticStyle:{color:"#01AAE5",cursor:"pointer"},on:{click:function(n){e.stopman(t.row,t.$index)}}},[e._v("启用")]):e._e(),e._v(" "),n("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[e._v("|")]),e._v(" "),n("span",{staticStyle:{color:"#FE3D06",cursor:"pointer"},on:{click:function(n){e.delman(t.row,t.$index)}}},[e._v("删除")])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"账户类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.type?n("span",[e._v("企业用户")]):e._e(),e._v(" "),1==t.row.type?n("span",[e._v("个人用户")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",align:"center",prop:"name",label:"账户名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isAppoint?n("span",{staticStyle:{color:"#fe9200"}},[e._v(e._s(t.row.name))]):e._e(),e._v(" "),0==t.row.isAppoint?n("span",{style:{color:"1"==e.ischain||"2"==e.ischain?"#29abe2":"#333"}},[e._v(e._s(t.row.name))]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",prop:"contactMan",align:"center",label:"联系人"}}),e._v(" "),n("el-table-column",{attrs:{prop:"mobile","min-width":"120",align:"center",label:"电话"}}),e._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",prop:"contactMan",align:"center",label:"挂账人"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.type?n("span",[e._v(e._s(t.row.personNum)+"人")]):e._e(),e._v(" "),1==t.row.type?n("span",[e._v(e._s(t.row.contactMan))]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",prop:"singlePrice",align:"center",label:"挂账额度(单笔)"},scopedSlots:e._u([{key:"default",fn:function(t){return[1*t.row.singlePrice==0?n("span",[e._v("无上限")]):e._e(),e._v(" "),1*t.row.singlePrice>0?n("span",[e._v(e._s(t.row.singlePrice))]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":"","min-width":"120",align:"center",prop:"allPrice",label:"挂账额度(总额)"},scopedSlots:e._u([{key:"default",fn:function(t){return[1*t.row.allPrice==0?n("span",[e._v("无上限")]):e._e(),e._v(" "),1*t.row.allPrice>0?n("span",[e._v(e._s(t.row.allPrice))]):e._e()]}}])})],1)],1)]),e._v(" "),e.showClearing?e._e():n("div",{staticStyle:{"margin-top":"10px"}},[n("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.num,layout:"sizes, prev, pager, next","page-count":e.totalNum,"page-sizes":[10,20,30]},on:{"size-change":e.handleSizeChange,"current-change":e.pageClick}})],1),e._v(" "),e.showMan?n("add-receivable-man",{attrs:{manDetial:e.manDetial,isAdd:e.isAdd},on:{winResult:e.doResult}}):e._e(),e._v(" "),e.showShop?n("elShopListWin",{attrs:{shopIds:[]},on:{chooseShop:e.shopResult}}):e._e(),e._v(" "),e.showClearing?n("clearingReceivable",{attrs:{manDetial:e.manDetial,isAClearing:e.isAClearing},on:{clearResult:e.clearingResult}}):e._e()],1)};i._withStripped=!0;var a=n("81a2"),r=n("f6ce"),s=n("bbb9");function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function i(a,r){try{var s=t[a](r),o=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(o).then(function(e){i("next",e)},function(e){i("throw",e)});e(o)}("next")})}}var c={data:function(){return{shopId:"",ischain:"",accountType:[{name:"全部",id:0},{name:"个人用户",id:1},{name:"企业用户",id:2}],recType:"",seachValue:"",manDetial:{},showMan:!1,showClearing:!1,showShop:!1,recList:[],copyRecList:[],isAClearing:!1,currentPage:1,num:10}},mounted:function(){this.isTatle()},computed:{totalNum:function(){return Math.ceil(this.recList.length/this.num)},list:function(){var e=(this.currentPage-1)*this.num,t=this.currentPage*this.num;return this.recList.slice(e,t)}},components:{AddReceivableMan:function(){return n.e("add_receivable_man").then(n.bind(null,"8fc5"))},clearingReceivable:function(){return n.e("clearing_receivable").then(n.bind(null,"db5e"))},elShopListWin:function(){return n.e("el_shopList_win").then(n.bind(null,"6c2c"))}},created:function(){var e=r.a.session("userShop");this.shopId=e.currentShop.id,this.ischain=e.currentShop.ischain,this.init()},methods:{pageClick:function(e){this.currentPage=e},handleSizeChange:function(e){this.num=e,this.currentPage=1},isTatle:function(){var e=[{name:"添加挂账账户",className:["addStaff","export-btn"],fn:this.add,type:2}];this.$store.commit("setPageTools",e)},init:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.getBillList();case 2:n=t.sent,e.recList=n,e.copyRecList=n;case 5:case"end":return t.stop()}},t,e)}))()},seachFn:function(){var e=[];this.currentPage=1;for(var t=this.copyRecList,n=0;n<t.length;n++){var i=t[n].name,a=t[n].mobile,r=t[n].contactMan;this.seachValue.trim().length>0&&-1==i.indexOf(this.seachValue)&&-1==a.indexOf(this.seachValue)&&-1==r.indexOf(this.seachValue)||(0!=this.recType&&this.recType!=t[n].type||e.push(t[n]))}this.recList=e,0==this.seachValue.trim().length&&0==this.recType&&(this.recList=this.copyRecList)},resetFn:function(){this.seachValue="",this.recType="",this.recList=this.copyRecList},add:function(){this.showMan=!0,this.isAdd=!0,this.manDetial={name:"",type:"1",contactMan:"",mobile:"",singlePrice:"",allPrice:"",billPerson:[]}},edit:function(e){var t=this;return o(regeneratorRuntime.mark(function n(){var i,r;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t.showMan=!0,t.isAdd=!1,e.billPerson=[],t.manDetial=e,n.next=6,a.a.getOneBill({data:{billId:e.id}});case 6:for(i=n.sent,r=0;r<i.billPerson.length;r++)i.billPerson[r].isEdit=!1;t.manDetial=i;case 9:case"end":return n.stop()}},n,t)}))()},delman:function(e,t){var n=this;this.$store.commit("setWin",{title:"温馨提示",winType:"confirm",content:"确定删除帐号名称为“"+e.name+"”的帐号吗?",callback:function(i){"ok"==i&&n.deleteBill(e,t)}})},clearing:function(e){var t=this;return o(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.getOneBill({data:{billId:e.id}});case 2:t.manDetial=n.sent,t.showClearing=!0,t.isAClearing=!0;case 5:case"end":return n.stop()}},n,t)}))()},getDetial:function(e){var t=this;return o(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.getOneBill({data:{billId:e.id}});case 2:t.manDetial=n.sent,t.showClearing=!0,t.isAClearing=!1;case 5:case"end":return n.stop()}},n,t)}))()},stopman:function(e,t){var n=this;this.manDetial=e,this.$store.commit("setWin",{title:"温馨提示",winType:"confirm",content:"确定停用帐号名称为“"+e.name+"”的帐号吗?",callback:function(i){"ok"==i&&n.isStopman(e,t)}})},isStopman:function(e,t){var n=this;return o(regeneratorRuntime.mark(function i(){return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,a.a.changeBillStatus({data:{billId:e.id,status:"0"==e.status?"1":"0"}});case 2:i.sent&&(n.recList[t].status=1==n.recList[t].status?0:1);case 4:case"end":return i.stop()}},i,n)}))()},deleteBill:function(e,t){var n=this;return o(regeneratorRuntime.mark(function i(){return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,a.a.deleteBill({data:{billId:e.id}});case 2:i.sent&&n.recList.splice(t,1);case 4:case"end":return i.stop()}},i,n)}))()},toShop:function(e){this.showShop=!0,this.manDetial=e},doResult:function(e,t){var n=this;return o(regeneratorRuntime.mark(function i(){var r,o,c,l,u;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if("ok"!=e){i.next=26;break}if(!n.isOk(t)){i.next=23;break}for(r=[],o=s.a.deepCopy(t),c=t.billPerson,l=0;l<c.length;l++)u="",u=c[l].name+","+c[l].mobile,r.push(u);if(o.billPerson=r,n.manDetial=t,!n.isAdd){i.next=15;break}return i.next=11,a.a.createBill({data:o});case 11:i.sent&&(n.recList.push(t),n.$store.commit("setWin",{winType:"alert",content:"添加成功！"}),n.init(),n.showMan=!1),i.next=21;break;case 15:return o.billId=o.id,i.next=18,a.a.editBill({data:o});case 18:i.sent&&(n.$store.commit("setWin",{winType:"alert",content:"修改成功！"}),n.showMan=!1,n.init()),console.log(n.manDetial);case 21:i.next=24;break;case 23:n.showMan=!0;case 24:i.next=27;break;case 26:n.showMan=!1;case 27:case"end":return i.stop()}},i,n)}))()},shopResult:function(e,t){if(console.log(t),"ok"==e){if(0==t.length)return this.$store.commit("setWin",{winType:"alert",content:"请选择要指派的店铺！"}),!1;var n={};n.billId=this.manDetial.id,n.shopIds=t.join(","),console.log(n),this.selectShop(n)}this.showShop=!1},selectShop:function(e){var t=this;return o(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.billAppoint({data:e});case 2:n.sent&&t.$store.commit("setWin",{winType:"alert",content:"指派成功！"});case 4:case"end":return n.stop()}},n,t)}))()},clearingResult:function(){var e=[{name:"添加挂账账户",className:["addStaff","export-btn"],fn:this.add,type:2}];this.$store.commit("setPageTools",e),this.showClearing=!1},isOk:function(e){var t=/^1[\d]{10,10}$/;if(0==e.name.trim().length)return this.$store.commit("setWin",{winType:"alert",content:"账户名称不能为空"}),!1;if(0==e.contactMan.trim().length)return this.$store.commit("setWin",{winType:"alert",content:"联系人不能为空"}),!1;if(0==e.mobile.trim().length)return this.$store.commit("setWin",{winType:"alert",content:"手机号不能为空"}),!1;if(""!==e.mobile&&!t.test(e.mobile)||11!=e.mobile.length)return this.$store.commit("setWin",{winType:"alert",content:"手机号格式错误。"}),!1;if(2==e.type){if(e.billPerson.length<1)return this.$store.commit("setWin",{winType:"alert",content:"企业账户则必须添加一个挂账人"}),!1;for(var n=0;n<e.billPerson.length;n++){if(0==e.billPerson[n].name.trim().length)return this.$store.commit("setWin",{winType:"alert",content:"挂账人姓名不能为空"}),!1;if(0==e.billPerson[n].mobile.trim().length)return this.$store.commit("setWin",{winType:"alert",content:"挂账人手机号不能为空"}),!1;if(""!==e.billPerson[n].mobile&&!t.test(e.billPerson[n].mobile||11!=e.billPerson[n].mobile.length))return this.$store.commit("setWin",{winType:"alert",content:"手机号格式错误。"}),!1}}var i=/((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/;return e.singlePrice.trim().length>0&&!i.test(e.singlePrice)?(this.$store.commit("setWin",{content:"单笔额度请输入正确的数字!"}),!1):e.allPrice.trim().length>0&&!i.test(e.allPrice)?(this.$store.commit("setWin",{content:"总额度请输入正确的数字!"}),!1):!(""!==e.singlePrice&&""!==e.allPrice&&1*e.singlePrice>1*e.allPrice)||(this.$store.commit("setWin",{winType:"alert",content:"单笔额度不能大于总额"}),!1)}}},l=(n("c0c8"),n("6ceb")),u=Object(l.a)(c,i,[],!1,null,"47863ee2",null);u.options.__file="src\\module\\shop_config\\receivable_man.vue";t.default=u.exports}}]);