(window.webpackJsonp=window.webpackJsonp||[]).push([["choose_warehouse_win"],{"110c":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM3Q0IyMDNCREYxMTFFNkJCMjBCMDk4RUE1RkFBOUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM3Q0IyMDRCREYxMTFFNkJCMjBCMDk4RUE1RkFBOUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzdDQjIwMUJERjExMUU2QkIyMEIwOThFQTVGQUE5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzdDQjIwMkJERjExMUU2QkIyMEIwOThFQTVGQUE5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr9ucPQAAAFaSURBVHjarNQ7LARBHMfx2ROF9/tc4gqJREGhUduLgkYjUUmUOlEqlCqJRojCoxMVtYIoKBUaOc8gItGcZ0Mj1neSWTln/mtu3T/5JLc3s7/Mzvx3vSAIlKVSGEA79IRL7CGnHCpRcJ3GFo4xiDKUYxhnWEfyz1S9UqMXd5hGRd7/oRrM4grdlvFv4Y823GMoarIxhms0SXM8s6cbOMeMcqt5VGFcevw0HlDpsMpQI15RbxvXB9WPXbwp93rCIfqk09dtk1XFl+6QDin0E16M0ITpYevADXpihOp7LqSDSuERtUUcVCteTO+KLbVmNn/KcZWreMdk1BvVgluMOqxyAidRT5Z/0WVewTk0WCYnsYwsjuC7hGrNWMEztrGIJeyYfV9AHTLIScGe8OmrRgadpm1OcVDwgujxTYxgX/pKxeHbVvzfUGtwKUJ/BZcq9EewdFBxy8fHlwADAMK7/x/UqqS7AAAAAElFTkSuQmCC"},"950e":function(t,e,s){},f8b9:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("win",{attrs:{align:"center",height:500,width:920,ok:t.btnOk},on:{winEvent:t.closeSelfWin}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),i("div",{attrs:{slot:"content",id:"blong-content"},slot:"content"},[t.brandBtn.length?[i("div",{staticClass:"title-line"},[i("span",[t._v("品牌")]),t._v(" "),i("span",{staticClass:"slide-up",on:{click:function(e){t.showDetail=!t.showDetail}}},[t._v(t._s(t.showDetail?"收起":"展开"))])]),t._v(" "),t.showDetail?i("div",{staticClass:"brand-content select-ban",on:{click:t.chooseBrand}},t._l(t.brandBtn,function(e,s){return i("span",{key:s,class:{"sign-selected":e.selected},attrs:{"data-index":s}},[t._v(t._s(e.name))])})):t._e()]:t._e(),t._v(" "),t.ownerList.length?[i("div",{staticClass:"title-line"},[i("span",{staticClass:"shop"},[t._v("门店")])]),t._v(" "),i("div",{staticClass:"brand-content"},[i("div",{staticClass:"search"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"请输入仓库名称"},domProps:{value:t.search},on:{input:[function(e){e.target.composing||(t.search=e.target.value)},t.searchShop],propertychange:t.searchShop}}),t._v(" "),i("div",{staticClass:"category btn",on:{click:t.searchShop}},[i("img",{attrs:{src:s("110c"),alt:""}})])]),t._v(" "),i("div",{staticClass:"shop-list select-ban",on:{click:t.chooseShop}},t._l(t.ownerListRes,function(e,s){return i("span",{key:s,class:{"sign-selected":e.selected},attrs:{"data-index":s}},[t._v(t._s(e.name))])}))])]:t._e(),t._v(" "),i("div",{staticClass:"bottom-tips"},[i("span",[t._v("已选择："+t._s(t.selectedObj.name))])])],2)])};i._withStripped=!0;var n=s("bbb9"),a={data:function(){return{title:"添加仓库",btnOk:{style:"background-color:#ff9800",content:"确定"},btnCancel:{},showDetail:!0,pCom:{},search:"",isBrand:0,selectedObj:"",allList:[],owner:"",ownerIsBrand:!1,brandList:[],brandBtn:[],ownerList:[],ownerListRes:[],type:""}},props:{pObj:null},watch:{pObj:"initData"},mounted:function(){this.initData()},components:{win:function(){return s.e("win").then(s.bind(null,"f60a"))},selectStore:function(){return s.e("win").then(s.bind(null,"cb83"))}},methods:{closeSelfWin:function(t){"ok"==t?this.$emit("throwWin",t,this.selectedObj):this.$emit("throwWin",t)},searchShop:function(){var t=[],e=!0,s=!1,i=void 0;try{for(var n,a=this.ownerList[Symbol.iterator]();!(e=(n=a.next()).done);e=!0){var r=n.value;""==this.search?t=this.ownerList:r.name.includes(this.search)&&t.push(r)}}catch(t){s=!0,i=t}finally{try{!e&&a.return&&a.return()}finally{if(s)throw i}}this.ownerListRes=t},chooseBrand:function(t){var e=t.target;if("span"==e.tagName.toLocaleLowerCase()){var s=e.getAttribute("data-index");this.selectedObj=this.brandBtn[s],this.brandBtn=this.setBtnClass(this.brandBtn,this.brandBtn[s].id),this.ownerListRes=this.setBtnClass(this.ownerListRes,null),this.ownerList=this.setBtnClass(this.ownerList,null)}},chooseShop:function(t){var e=t.target;if("span"==e.tagName.toLocaleLowerCase()){var s=e.getAttribute("data-index");this.selectedObj=this.ownerListRes[s],this.ownerListRes=this.setBtnClass(this.ownerListRes,this.ownerListRes[s].id),this.ownerList=this.setBtnClass(this.ownerList,this.ownerListRes[s].id),this.brandBtn=this.setBtnClass(this.brandBtn,null)}},setBtnClass:function(t,e){var s=n.a.deepCopy(t),i=!0,a=!1,r=void 0;try{for(var o,c=s[Symbol.iterator]();!(i=(o=c.next()).done);i=!0){var l=o.value;l.selected=l.id==e}}catch(t){a=!0,r=t}finally{try{!i&&c.return&&c.return()}finally{if(a)throw r}}return s},initData:function(){for(var t in this.pObj)this[t]=this.pObj[t];var e=[],s=[],i=!0,a=!1,r=void 0;try{for(var o,c=this.allList[Symbol.iterator]();!(i=(o=c.next()).done);i=!0){var l=o.value;1==l.ischain?(l.selected=!1,e.push(l)):(l.selected=!1,s.push(l))}}catch(t){a=!0,r=t}finally{try{!i&&c.return&&c.return()}finally{if(a)throw r}}this.ownerList=s,this.brandBtn=e,this.setDefault(),this.ownerListRes=n.a.deepCopy(this.ownerList)},setDefault:function(){if(this.owner){var t=0,e=this.owner,s=this.owner.id;if(1==e.ischain){for(var i in this.brandBtn){var n=this.brandBtn[i];s==n.id?(n.selected=!0,t=i):n.selected=!1}this.selectedObj=this.brandBtn[t]}else if(0==e.ischain){for(var a in this.ownerList){var r=this.ownerList[a];s==r.id?(r.selected=!0,t=a):r.selected=!1}this.selectedObj=this.ownerList[t]}}}}},r=(s("ffbf"),s("6ceb")),o=Object(r.a)(a,i,[],!1,null,"71658a96",null);o.options.__file="src\\module\\invoicing_system\\warehouse_manage\\choose_warehouse_win.vue";e.default=o.exports},ffbf:function(t,e,s){"use strict";var i=s("950e");s.n(i).a}}]);