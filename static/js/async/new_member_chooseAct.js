(window.webpackJsonp=window.webpackJsonp||[]).push([["new_member_chooseAct"],{"39c0":function(t,e,n){"use strict";n.r(e);var i=n("f6ce"),a={props:{selectedList:Array},data:function(){return{timeList:[{name:"自定义营销",id:0},{name:"消费额激励",id:1}],flag1:0,payType:0}},methods:{winEvent:function(t){if("ok"==t){var e=[],n=!0,a=!1,s=void 0;try{for(var r,c=this.selectedList[Symbol.iterator]();!(n=(r=c.next()).done);n=!0){var o=r.value;e.push(o.memberId)}}catch(t){a=!0,s=t}finally{try{!n&&c.return&&c.return()}finally{if(a)throw s}}switch(i.a.session("memberIds",e),this.payType){case 0:this.$router.push("/admin/activity/generalActivity/custom");break;case 1:this.$router.push("/admin/activity/generalActivity/encourage")}}this.$emit("winEvent","")},changeRadio:function(t){var e=t.id;this.payType=e}},components:{radio:function(){return n.e("radio").then(n.bind(null,"4dfe"))},Win:function(){return n.e("win").then(n.bind(null,"f60a"))}}},s=(n("7e30"),n("d801")),r=Object(s.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{attrs:{id:"addActivity"}},[n("Win",{attrs:{width:750,height:350},on:{winEvent:t.winEvent}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v("选择活动类型")]),t._v(" "),n("section",{staticClass:"sec",attrs:{slot:"content"},slot:"content"},[n("div",{staticClass:"sp"},t._l(t.timeList,function(e,i){return n("span",{key:i,class:{effect:t.payType==e.id},on:{click:function(n){t.changeRadio(e)}}},[t._v(t._s(e.name))])}))])])],1)},[],!1,null,"f3fea4fa",null);e.default=r.exports},"7e30":function(t,e,n){"use strict";var i=n("eb7f");n.n(i).a},eb7f:function(t,e,n){}}]);