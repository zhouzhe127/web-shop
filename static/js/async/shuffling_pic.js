(window.webpackJsonp=window.webpackJsonp||[]).push([["shuffling_pic","shuffling_pic_win"],{"0bd9":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("section",{staticStyle:{"text-align":"left"},attrs:{id:"picList"}},[n("section",{staticClass:"title"},["3"==t.ischain?n("span",{staticClass:"select"},[t._v("闪店卖手")]):t._l(t.list,function(i,e){return n("span",{key:e,class:{select:i.id==t.type},on:{click:function(e){t.channel(i.slideshow,i.id)}}},[t._v(t._s(i.name))])})],2),t._v(" "),n("ul",{staticClass:"pic-list"},[n("li",{staticClass:"add-pic",on:{click:t.add}},[t._m(0)]),t._v(" "),t._l(t.bannerList,function(i,s){return n("li",{key:s,staticClass:"li-pic",on:{click:function(e){t.edit(s,i)}}},[""!=i.image?n("img",{staticClass:"cname",attrs:{src:t.imgHost+i.image}}):t._e(),t._v(" "),""==i.image?n("img",{attrs:{src:e("61ba"),width:"300",height:"200",alt:"商品"}}):t._e(),t._v(" "),n("h2",{staticStyle:{"font-size":"38px",color:"#c0c0c0"}},[t._v(t._s(s+1))])])})],2),t._v(" "),t.showWin?n(t.ass,{tag:"component",attrs:{index:t.index,detial:t.detial,types:t.types,type:t.type},on:{shufflingPicWin:t.getResult}}):t._e()],1)};n._withStripped=!0;var s=e("81a2"),a=e("f6ce");function o(t){return function(){var i=t.apply(this,arguments);return new Promise(function(t,e){return function n(s,a){try{var o=i[s](a),r=o.value}catch(t){return void e(t)}if(!o.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});t(r)}("next")})}}var r={data:function(){return{shopId:null,imgHost:"",ischain:null,bannerList:[],list:"",type:"",showWin:!1,detial:{},index:0,types:""}},mounted:function(){var t=a.a.session("userShop");this.shopId=t.currentShop.id,this.ischain=t.currentShop.ischain,this.imgHost=t.uploadUrl,this.inte()},components:{shufflingPicWin:e("4076").default},methods:{getResult:function(t,i){var e=this;if("ok"==t){if("add"==i.types){var n={shopId:this.shopId,image:i.image,sort:i.sort,type:i.type};this.addPic(n)}else if("edit"==i.types){var s={shopId:this.shopId,id:i.id,image:i.image,sort:i.sort,type:i.type};this.editPic(s),this.bannerList.splice(this.index,1,s)}this.showWin=!1}else if("cancel"==t&&"add"!==i.types){var a={shopId:this.shopId,id:i.id,type:i.type};this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"确定删除该轮播图?",callback:function(t){"ok"==t&&(e.delSlideShow(a),e.bannerList.splice(e.index,1),e.showWin=!1)}})}else this.showWin=!1},channel:function(t,i){this.bannerList=t,this.type=i},addPic:function(t){var i=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.addSlideShow({data:t});case 2:e.sent&&i.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"保存成功"}),i.inte();case 5:case"end":return e.stop()}},e,i)}))()},editPic:function(t){var i=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.updateSlideShow({data:t});case 2:e.sent&&i.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"保存成功"});case 4:case"end":return e.stop()}},e,i)}))()},inte:function(){var t=this;return o(regeneratorRuntime.mark(function i(){var e,n,a;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,s.a.selSlideShow({data:{shopId:t.shopId}});case 2:if(e=i.sent,n=e.slideImage,""===t.type)t.bannerList=n[0].slideshow,t.type=n[0].id;else for(a=0;a<n.length;a++)t.type==n[a].id&&(t.bannerList=n[a].slideshow);t.list=n,"3"==t.ischain&&t.channel(t.list[3].slideshow,t.list[3].id);case 7:case"end":return i.stop()}},i,t)}))()},delSlideShow:function(t){var i=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,s.a.delSlideShow({data:t});case 2:case"end":return i.stop()}},e,i)}))()},add:function(){this.types="add",this.showWin=!0,this.detial={image:"",sort:"1",type:this.type},this.ass="shufflingPicWin"},edit:function(t,i){this.types="edit",this.ass="shufflingPicWin",this.index=t,this.detial=i,this.showWin=!0},imageUpload:function(t){t&&(this.good.imageName=t.imageName)}}},c=(e("ea72"),e("6ceb")),l=Object(c.a)(r,n,[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"addTo"},[i("input",{staticStyle:{position:"absolute",left:"0px",top:"0px",height:"50px",opacity:"0",width:"100%",cursor:"pointer"}}),this._v(" "),i("span",{staticClass:"blue",staticStyle:{width:"100px",height:"50px","line-height":"50px"}},[this._v("编辑图片")])])}],!1,null,"7f69e834",null);l.options.__file="src\\module\\shop_config\\shuffling_pic.vue";i.default=l.exports},"31bf":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCQThBNjA5NTcxNTExRTdCNzI4QzVFQTBERTkzQkVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCQThBNjBBNTcxNTExRTdCNzI4QzVFQTBERTkzQkVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUJBOEE2MDc1NzE1MTFFN0I3MjhDNUVBMERFOTNCRUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUJBOEE2MDg1NzE1MTFFN0I3MjhDNUVBMERFOTNCRUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4kIzh0AAABmklEQVR42oyUTSgFURTHvdfzke+yYMNiUKOXyIKUCK9slJKPbGyUslBWVhIrK/UUexsLxEaRzxI2Sh4WJDNJsfGRFFHy/I/+U891Z8apX/d0z73/OXPuuTdgWVaSxppAN8cizt2AHbAAtp2FhmH8jCFFwASzoEYjXkL6QQz0gAsnGExY2ACOXURUqwQn3PNLSDJZBWkem8dAOwXEUsC6bdum82sBMAfSPUT2wTj9ZDBPPxUsQywsGTWDKp9fqQMdzHxYiZWBiGTU5SHwClbAPRgE9S7rhkI8Yp1tgiPWbo9zDyBPs7ZWfq1QE7hlzwyAAs5lsj46yxGhD00gF0yAA7DIuSjIdquBCN1p5jM49nLMB30etXwRoUOX4BR4pD/tc6qnQfaQau9glH4jj34GPLsITYrQBjhTAkuSLv03MEI/SyNiS4vI8cfZSzF2qlgpKGYNw6ATVGhEPkErXoC4c/vlFrcwO7lD1eDKpy4iEoHIuXr7d/nVy3/c/mtQzj1/nhEnM5PZrYEn8MWvS1dvgTZ5zxLfIrFvAQYAHHVSK1WxAuMAAAAASUVORK5CYII="},3680:function(t,i,e){},4076:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("win",{attrs:{align:"center",width:500,height:350,ok:t.okStyle,cancel:t.cancelStyle},on:{winEvent:t.shufflingPicWin}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[n("div",{staticClass:"picCon"},[n("div",{staticClass:"imgBox"},[""!=t.image?n("img",{attrs:{id:"imgs",src:t.imgHost+t.image,alt:"轮播图"}}):t._e(),t._v(" "),""==t.image?n("img",{attrs:{src:e("b7c2"),width:"300",height:"200",alt:"商品"}}):t._e(),t._v(" "),n("form",{staticClass:"addTo",attrs:{id:"imageUpForm",enctype:"multipart/form-data"}},[n("input",{staticStyle:{position:"absolute",left:"0px",top:"0px",height:"50px",opacity:"0",width:"100%",cursor:"pointer"},attrs:{type:"file",accept:"image/jpeg,image/png,image/jpg,image/bmp",id:"file_upload",name:"image",onclick:"this.value = ''"},on:{change:t.fileNameChange}}),t._v(" "),n("span",{staticClass:"blue",staticStyle:{width:"100px",height:"50px","line-height":"50px"}},[t._v("编辑图片")])])]),t._v(" "),n("p",[n("img",{staticClass:"icon-i",attrs:{src:e("31bf")}}),t._v(" "),t.status?n("span",[t._v("建议图片大小\n\t\t\t\t\t"),0===t.type?n("i",[t._v("2124*1468PX")]):n("i",[t._v("1280*1240PX")])]):n("span",[1==t.type||4==t.type?n("i",[t._v("建议图片大小1000*1080PX")]):6==t.type?n("i",[t._v("建议图片大小750*300PX")]):n("i",[t._v("建议图片大小2048*1536PX")])])]),t._v(" "),n("div",{staticClass:"sort"},[n("span",{staticClass:"sortword fl"},[t._v("排序")]),t._v(" "),n("div",{staticClass:"fl",staticStyle:{width:"185px"}},[n("subaddBtn",{attrs:{minnum:1,bindnum:t.num,maxnum:255,sign:!1},on:{toClick:t.changeNum}})],1)])])])])};n._withStripped=!0;var s=e("81a2"),a=e("f6ce");var o={data:function(){return{shopId:null,imgHost:"",id:"",uid:"",fileName:"",bannerName:"",num:this.detial.sort?this.detial.sort:1,maxNum:255,title:"",okStyle:null,cancelStyle:null,printDetial:null,image:""}},components:{win:e("f60a").default,subaddBtn:function(){return e.e("radio_btn").then(e.bind(null,"e7ea"))}},props:{index:Number,detial:Object,types:String,status:Boolean,type:[String,Number]},mounted:function(){var t=a.a.session("userShop");this.shopId=t.currentShop.id,this.imgHost=t.uploadUrl,this.image=this.detial.image,"add"==this.types?(this.title="添加图片",this.okStyle={content:"保存",style:{backgroundColor:"#bd823e",color:"#fff"}},this.cancelStyle={content:"取消",style:{backgroundColor:"#a0a0a0",color:"#fff"}}):"edit"==this.types&&(this.title="修改图片",this.okStyle={content:"确定",style:{backgroundColor:"#29ABE2",color:"#fff"}},this.cancelStyle={content:"删除",style:{backgroundColor:"#982c2c",color:"#fff"}})},methods:{shufflingPicWin:function(t){var i=this.detial;if(i.types=this.types,i.image=this.image,""==i.image&&"ok"==t)return this.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"请添加图片"}),!1;this.$emit("shufflingPicWin",t,i)},changeNum:function(t){this.num=t,this.detial.sort=t},fileNameChange:function(){var t,i=this;return(t=regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.uploadImg({formId:"imageUpForm",data:{type:8,shopId:i.shopId}});case 2:e=t.sent,i.image=e;case 4:case"end":return t.stop()}},t,i)}),function(){var i=t.apply(this,arguments);return new Promise(function(t,e){return function n(s,a){try{var o=i[s](a),r=o.value}catch(t){return void e(t)}if(!o.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});t(r)}("next")})})()}}},r=(e("d1f4"),e("6ceb")),c=Object(r.a)(o,n,[],!1,null,"4d91d983",null);c.options.__file="src\\module\\shop_config\\shuffling_pic_win.vue";i.default=c.exports},"61ba":function(t,i,e){t.exports=e.p+"images/test.90111ab3.jpg"},bfb7:function(t,i,e){},d1f4:function(t,i,e){"use strict";var n=e("3680");e.n(n).a},ea72:function(t,i,e){"use strict";var n=e("bfb7");e.n(n).a}}]);