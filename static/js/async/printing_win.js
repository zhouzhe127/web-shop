(window.webpackJsonp=window.webpackJsonp||[]).push([["printing_win"],{8297:function(t,e,s){},db13:function(t,e,s){"use strict";var i=s("8297");s.n(i).a},f6e4:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("win",{attrs:{width:t.width,height:t.height,align:"center"},on:{winEvent:t.winEvent},scopedSlots:t._u([{key:"content",fn:function(e){return s("div",{attrs:{id:"tan"}},[0==t.goodsDel.type?s("div",{staticClass:"general-goods"},[s("span",[t._v("打印条码数量：")]),t._v(" "),s("input",{staticStyle:{width:"200px",border:"1px solid #CCCCCC"},attrs:{numIndex:1,maxlength:"20",placeholder:"请输入数量",type:"text"},on:{input:t.toPraparseInt}})]):t._e(),t._v(" "),1==t.goodsDel.type?s("div",{staticClass:"weigh-item"},[s("div",{staticClass:"tanTop"},[s("div",{staticClass:"barName"},[s("span",[t._v("商品名称：")]),t._v(" "),s("span",[t._v(t._s(t.goodsDel.gName))])]),t._v(" "),s("div",{staticClass:"barPice"},[s("span",[t._v("售价：")]),t._v(" "),s("span",{staticStyle:{display:"inline-block",height:"20px"}},[t._v(t._s(t.goodsDel.price)+"元")])])]),t._v(" "),t._l(t.addNum,function(e){return s("div",{key:e,staticClass:"tanContent"},[s("div",{staticClass:"barweight"},[s("span",[t._v("重量("+t._s(t.goodsDel.unit)+")")]),t._v(" "),s("input",{attrs:{type:"text",dataIndex:e,id:"",value:"",maxlength:"20",placeholder:"输入重量"},on:{input:t.resOn}})]),t._v(" "),s("div",{staticClass:"barNum"},[s("span",[t._v("打印数量")]),t._v(" "),s("input",{attrs:{type:"text",numIndex:e,maxlength:"20",value:"",placeholder:"打印数量"},on:{input:t.toPraparseInt}})]),t._v(" "),e==t.addNum&&1!=e?s("p",{on:{click:t.delBar}}):t._e()])}),t._v(" "),s("a",{staticClass:"addclassify",staticStyle:{width:"100px",display:"block",margin:"10px auto"},attrs:{href:"javascript:void(0);"},on:{click:t.addbar}},[t._v("添加")])],2):t._e()])}}])},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))])])};i._withStripped=!0;var a={data:function(){return{width:700,height:300,addNum:1,classWeight:[],classification:[]}},props:{goodsDel:Object,title:String,listDel:Object},methods:{addbar:function(){this.addNum<5?this.addNum++:this.addNum=5},delBar:function(){this.addNum>1?this.addNum--:this.addNum=1,this.classWeight.length=this.addNum,this.classification.length=this.addNum},toPraparseInt:function(t){var e=t.target.getAttribute("numIndex")-1,s=t.target.value;if(isNaN(s))return this.alert("输入不合法"),void(t.target.value="");s&&(t.target.value=Math.floor(s)),this.classification[e]=s},resOn:function(){var t=event.target.getAttribute("dataIndex")-1,e=event.target.value;if(isNaN(e))return this.alert("输入不合法"),void(event.target.value="");if(e=e.indexOf(".")>-1?e.substr(0,6):e.substr(0,5),3==this.listDel.weighType){this.classWeight[t]=e;var s=e.split(".");2==s.length?(s[0]=s[0].substr(0,2),this.classWeight[t]=s[0]+"."+s[1].substr(0,3)):this.classWeight[t]=s[0].substr(0,2),event.target.value=this.classWeight[t]}else if(2==this.listDel.weighType){this.classWeight[t]=e;var i=e.split(".");2==i.length?(i[0]=i[0].substr(0,3),this.classWeight[t]=i[0]+"."+i[1].substr(0,2)):this.classWeight[t]=i[0].substr(0,3),event.target.value=this.classWeight[t]}else if(1==this.listDel.weighType){this.classWeight[t]=e;var a=e.split(".");2==a.length?(a[0]=a[0].substr(0,4),this.classWeight[t]=a[0]+"."+a[1].substr(0,1)):this.classWeight[t]=a[0].substr(0,4),event.target.value=this.classWeight[t]}else event.target.value=Math.floor(e),this.classWeight[t]=e},winEvent:function(t){this.$emit("winEvent",t)},alert:function(t,e){this.$store.commit("setWin",{title:e,winType:"alert",content:t})}},components:{win:function(){return s.e("win").then(s.bind(null,"f60a"))}}},n=(s("db13"),s("6ceb")),l=Object(n.a)(a,i,[],!1,null,"649c13b2",null);l.options.__file="src\\module\\invoicing_system\\invoicing\\printing_win.vue";e.default=l.exports}}]);