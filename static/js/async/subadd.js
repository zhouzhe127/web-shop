(window.webpackJsonp=window.webpackJsonp||[]).push([["subadd"],{b94c:function(n,t,i){"use strict";var s=i("fa6f");i.n(s).a},e7ea:function(n,t,i){"use strict";i.r(t);var s=i("bbb9"),u={props:["maxnum","minnum","bindnum","sign","item"],data:function(){return{min:1,max:255,addDown:0,subDown:0,num:1}},mounted:function(){s.a.isNumeric(this.maxnum)&&(this.max=parseInt(this.maxnum)),s.a.isNumeric(this.minnum)&&(this.min=parseInt(this.minnum)),s.a.isNumeric(this.bindnum)&&(this.num=parseInt(this.bindnum))},destroyed:function(){this.$off("toClick")},beforeUpdate:function(){s.a.isNumeric(this.bindnum)&&(this.num=parseInt(this.bindnum))},watch:{num:function(){this.$emit("toClick",this.num,this.item)}},methods:{change:function(n){var t=n.target.value;t=parseFloat(t.replace(/[^\d]/g,"")),(isNaN(t)||t<this.min)&&(t=this.min),t>this.max&&(t=this.max),this.num=t,n.target.value=this.num},mouseDown:function(n){var t=this;"add"==n?(this.addDown=(new Date).getTime(),setTimeout(function(){!function n(){0!=t.addDown&&(t.add(),setTimeout(n,100))}()},200)):(this.subDown=(new Date).getTime(),setTimeout(function(){!function n(){0!=t.subDown&&(t.sub(),setTimeout(n,100))}()},200))},mouseUp:function(){(new Date).getTime()-this.addDown<200&&this.add(),this.addDown=0,(new Date).getTime()-this.subDown<200&&this.sub(),this.subDown=0},mouseOut:function(){this.addDown=0,this.subDown=0},add:function(){if("function"!=s.a.type(this.addCheck)||!this.addCheck(this.num+1))if(this.sign)this.num=this.max;else{var n=this.num;++n>this.max&&(n=this.max),this.num=n}},sub:function(){if("function"!=s.a.type(this.subCheck)||!this.subCheck(this.num-1))if(this.sign)this.num=this.min;else{var n=this.num;--n<this.min&&(n=this.min),this.num=n}}}},e=(i("b94c"),i("d801")),a=Object(e.a)(u,function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("span",{staticClass:"sd-subadd"},[i("a",{staticClass:"on-span subtract",on:{mousedown:function(t){n.mouseDown("sub")},mouseup:function(t){n.mouseUp()},mouseout:function(t){n.mouseOut()}}}),n._v(" "),i("input",{staticClass:"input-content",attrs:{readonly:n.sign},domProps:{value:n.bindnum},on:{input:n.change,propertychange:n.change}}),n._v(" "),i("a",{staticClass:"on-span add",on:{mousedown:function(t){n.mouseDown("add")},mouseup:function(t){n.mouseUp()},mouseout:function(t){n.mouseOut()}}})])},[],!1,null,"77e498c0",null);t.default=a.exports},fa6f:function(n,t,i){}}]);