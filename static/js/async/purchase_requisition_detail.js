(window.webpackJsonp=window.webpackJsonp||[]).push([["purchase_requisition_detail"],{"4a23":function(t,e,i){"use strict";var n=i("e8c7");i.n(n).a},bab4:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.showCom?e("detail",{attrs:{type:this.tab},on:{detailData:this.getStatus}}):this._e()],1)};n._withStripped=!0;var a=i("9719"),s=i("f6ce"),o=i("81a2"),r={data:function(){return{showCom:!1,status:{},auditStatus:[{id:1,name:"审核中"},{id:2,name:"已取消"},{id:3,name:"审核未通过"},{id:4,name:"审核通过"}],dispatchStatus:[{id:1,name:"未调度"},{id:2,name:"调度中"},{id:3,name:"未出货"},{id:4,name:"全部取消"},{id:5,name:"待入货"},{id:6,name:"已完成"},{id:7,name:"已完成（异常）"}],tab:null,btnArr:[]}},methods:(Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t})({},Object(a.b)(["setPageTools","setWin"]),{initBtn:function(){var t=this,e=this.status,i=e.auditStatus,n=e.dispatchStatus,a=e.id,r={width:"100px",height:"40px",lineHeight:"38px",fontSize:"16px",textAlign:"center",backgroundColor:"#fff"};this.btnArr=[{name:"返回",style:{border:"1px solid #ccc",color:"#666"},fn:function(){s.a.session("tab",1),t.$router.go(-1)}},{name:"修改信息",style:{border:"1px solid #ff8d01",color:"#ff8d01"},fn:function(){t.alert("修改后会用新单替换旧单,是否要继续修改信息?",function(){var e=t.$route.query;e.tab=1,t.$router.push({path:"./purchaseRequisition",query:e})})}},{name:"取消申请单",style:{border:"1px solid #ff3d04",color:"#ff3d04"},fn:function(){t.alert("入货申请单取消后废弃,是否取消入货申请单?",function(){o.a.dispatchCancelApplication({data:{applyId:a}}).then(function(e){t.showCom=!1;var i=e?"成功取消申请单!":"取消失败!";t.alert(i),t.btnArr.splice(1,2),t.$nextTick(function(){t.showCom=!0})})})}}];var u=!0,c=!1,l=void 0;try{for(var d,h=this.btnArr[Symbol.iterator]();!(u=(d=h.next()).done);u=!0){var f=d.value;Object.assign(f.style,r)}}catch(t){c=!0,l=t}finally{try{!u&&h.return&&h.return()}finally{if(c)throw l}}1==i&&1==n||this.btnArr.splice(1,2),this.setPageTools(this.btnArr)},alert:function(t,e){var i={content:t,title:"操作提醒"};e&&(i={content:t,title:"操作提醒",winType:"confirm",callback:function(t){"ok"==t&&e()}}),this.setWin(i)},getStatus:function(t){this.status=t,this.initBtn()}}),computed:{},mounted:function(){4==this.$route.query.auditStatus&&(this.tab=1),this.showCom=!0},components:{detail:function(){return i.e("detail_verify").then(i.bind(null,"c1f8"))}},beforeDestroy:function(){"/admin/schedulingApplication"!=this.$route.path&&s.a.session("subObj",null);var t=this.$route.query;delete t.auditStatus,delete t.dispatchStatus}},u=(i("4a23"),i("7610")),c=Object(u.a)(r,n,[],!1,null,"24c8c136",null);c.options.__file="src\\module\\invoicing_system\\warehouse_manage\\purchase_requisition_detail.vue";e.default=c.exports},e8c7:function(t,e,i){}}]);