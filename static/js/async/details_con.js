(window.webpackJsonp=window.webpackJsonp||[]).push([["details_con"],{"1e7c":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("section",{attrs:{id:"details_con"}},[s("div",{staticStyle:{margin:"10px 0"}},[s("el-radio-group",{on:{change:t.typeChange},model:{value:t.selectTab,callback:function(e){t.selectTab=e},expression:"selectTab"}},[s("el-radio-button",{attrs:{label:"1"}},[s("span",[s("i",{staticClass:"el-icon-tickets"}),t._v(" 列表")])]),t._v(" "),s("el-radio-button",{attrs:{label:"0"}},[s("span",[s("i",{staticClass:"el-icon-picture"}),t._v(" 图片")])])],1)],1),t._v(" "),s("section",{staticStyle:{width:"100%",height:"50px"}},[1==t.ischain||2==t.ischain?s("div",{staticStyle:{float:"left","margin-right":"10px"}},[s("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择指派类型"},on:{change:t.selectType},model:{value:t.typeName,callback:function(e){t.typeName=e},expression:"typeName"}},t._l(t.goodSec,function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1):t._e(),t._v(" "),s("elCategory",{attrs:{categoryArr:t.category,itemIndex:t.oneIndex,itemArea:t.oneArea},on:{selectCategory:t.newselectOneArea}}),t._v(" "),s("elCategory",{attrs:{categoryArr:t.child,itemIndex:t.twoIndex,itemArea:t.twoArea},on:{selectCategory:t.newselectTwoArea}}),t._v(" "),1==t.industry?s("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入名称"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){t.searchNewGood(!0)}},slot:"append"})],1):t._e(),t._v(" "),1!=t.industry?s("el-input",{staticStyle:{width:"210px"},attrs:{placeholder:"请输入名称/简码",clearable:""},on:{change:function(e){t.funSearchkeyUp(null)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){t.funSearchkeyUp(null)}},slot:"append"})],1):t._e()],1),t._v(" "),s("section",{staticStyle:{clear:"both",overflow:"hidden","margin-bottom":"10px"}},[s("el-radio-group",{on:{change:t.filterGoodsByNav},model:{value:t.selectNavId,callback:function(e){t.selectNavId=e},expression:"selectNavId"}},t._l(t.goodsNav,function(e){return s("el-radio-button",{key:e.id,attrs:{label:e.id}},[t._v(t._s(e.name))])})),t._v(" "),1==t.selectTab?s("div",{staticClass:"boxTop",staticStyle:{display:"inline-block"}},["1"==t.ischain||"2"==t.ischain?s("span",{staticClass:"aSpan"},[s("i",{staticClass:"aI"}),t._v("品牌指派\n\t\t\t\t\t")]):t._e(),t._v(" "),"1"==t.ischain||"2"==t.ischain?s("span",{staticClass:"aSpan",staticStyle:{color:"#2ea7e0"}},[s("i",{staticClass:"aI",staticStyle:{background:"#2ea7e0"}}),t._v("门店自建\n\t\t\t\t\t")]):t._e()]):t._e()],1),t._v(" "),t.load?t._e():s("div",{staticClass:"animate-div"},[t._m(0)]),t._v(" "),0==t.selectTab?s("div",{staticClass:"commodity-box"},[s("div",{ref:"addGoods",staticClass:"media-div"},[s("section",{directives:[{name:"show",rawName:"v-show",value:t.load,expression:"load"}],staticClass:"add_goods_list list-div",style:{height:t.listHeight+"px"},on:{click:function(e){t.openAddWin({})}}},[t._m(1)])]),t._v(" "),t._l(t.nowGoods,function(e,n){return s("div",{key:n,staticClass:"media-div"},[s("section",{staticClass:"list-div",style:{height:t.listHeight+"px"},on:{click:function(o){t.openAddWin(e)}}},[e.imageName?s("img",{staticClass:"imageClass",attrs:{src:e.imageName.indexOf("http")>-1?e.imageName:t.imgHost+e.imageName,alt:e.goodsName}}):s("img",{staticClass:"imageClass",attrs:{src:o("b7c2"),alt:e.goodsName}}),t._v(" "),2!=e.type?s("section",{staticClass:"shopTag"},[0==e.isVip?s("span",[t._v("未开启会员")]):t._e(),t._v(" "),2==e.isVip?s("span",[t._v("会员折扣")]):t._e(),t._v(" "),1==e.isVip&&1!=e.isGroup?s("span",[t._v("会员价格:"+t._s(e.vipPrice))]):t._e(),t._v(" "),1==e.isVip&&1==e.isGroup?s("span",[t._v("\n\t\t\t\t\t\t\t\t会员价格:\n\t\t\t\t\t\t\t\t"),t._l(e.groupStock,function(o,n){return s("i",{key:n},[t._v(t._s(o.vipPrice)+"\n\t\t\t\t\t\t\t\t\t"),e.groupStock.length-1!=n?s("i",[t._v("/")]):t._e()])})],2):t._e(),t._v(" "),2==e.status?s("span",[t._v("下架商品")]):t._e()]):t._e(),t._v(" "),1==t.ischain||2==t.ischain?s("section",{staticClass:"shopTag",staticStyle:{width:"70px",left:"10px"}},[e.id<1e5?s("span",{staticClass:"brandStyle"},[t._v("品牌")]):s("span",{staticClass:"brandStyle",staticStyle:{"background-color":"rgb(108, 194, 230)"}},[t._v("门店")])]):t._e(),t._v(" "),s("section",{staticClass:"comprice"},[s("h2",{staticClass:"commodityName"},[t._v(t._s(e.goodsName))]),t._v(" "),0==e.type||1==e.type?s("section",{staticClass:"fl",staticStyle:{height:"55px","line-height":"25px",width:"100%"}},[s("section",[1==e.isGroup&&1==e.isStock?s("section",{staticClass:"fl",staticStyle:{width:"100%","text-align":"left"}},[s("span",{staticClass:"fl",staticStyle:{width:"42px"}},[t._v("库存：")]),t._v(" "),s("span",{staticClass:"fl stockStyle"},t._l(e.groupStock,function(o,n){return s("i",{key:n},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(o.goodsNum)+"\n\t\t\t\t\t\t\t\t\t\t\t\t"),e.groupStock.length-1!=n?s("i",[t._v("/")]):t._e()])}))]):s("section",{staticClass:"fl",staticStyle:{width:"100%","text-align":"left"}},[s("span",{staticClass:"fl",staticStyle:{width:"42px"}},[t._v("库存：")]),t._v(" "),s("span",{staticClass:"fl stockStyle"},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.goodsNum?e.goodsNum:"未开启库存")+"\n\t\t\t\t\t\t\t\t\t\t")])])]),t._v(" "),s("section",[1==e.isGroup||1==e.isGroup&&1==e.isSeasonal?s("section",{staticClass:"fr price-align",staticStyle:{float:"left"}},[s("span",{staticClass:"fl"},[t._v("原价：")]),t._v(" "),s("span",{staticClass:"fl stockStyle"},t._l(e.groupStock,function(o,n){return s("i",{key:n},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(o.price)+"\n\t\t\t\t\t\t\t\t\t\t\t\t"),e.groupStock.length-1!=n?s("i",[t._v("/")]):t._e()])}))]):s("section",{staticClass:"fr",staticStyle:{float:"left"}},[s("span",{staticClass:"fl",staticStyle:{width:"50px"}},[t._v("原价：")]),t._v(" "),s("span",{staticClass:"fl stockStyle"},[t._v(t._s(e.price))])])]),t._v(" "),s("section",{staticStyle:{display:"none"}},[t._v(t._s(e.BC))])]):t._e()])])])})],2):t._e(),t._v(" "),1==t.selectTab&&t.load?s("div",{staticClass:"commodity-box"},[s("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"","header-cell-style":{"background-color":"#f5f7fa"},data:t.nowGoods,border:""}},[s("el-table-column",{attrs:{fixed:"","min-width":"160","show-overflow-tooltip":"",align:"center",prop:"goodsName",label:"名称"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==t.ischain||"2"==t.ischain?s("span",{style:{color:e.row.id<1e4?"#fe9200":"#2ea7e0",cursor:"pointer"},on:{click:function(o){t.openAddWin(e.row)}}},[t._v(t._s(e.row.goodsName))]):t._e(),t._v(" "),"0"==t.ischain||"3"==t.ischain?s("span",{staticStyle:{color:"#2ea7e0",cursor:"pointer"},on:{click:function(o){t.openAddWin(e.row)}}},[t._v(t._s(e.row.goodsName))]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80",sortable:"","show-overflow-tooltip":"",align:"center",prop:"sort",label:"排序"}}),t._v(" "),s("el-table-column",{attrs:{"min-width":"100",sortable:"","sort-by":"price","show-overflow-tooltip":"",align:"center",prop:"price",label:"价格"}}),t._v(" "),s("el-table-column",{attrs:{"min-width":"100",sortable:"","show-overflow-tooltip":"",align:"center",prop:"cost",label:"成本"}}),t._v(" "),s("el-table-column",{attrs:{"min-width":"100","show-overflow-tooltip":"",align:"center",prop:"unit",label:"单位"}}),t._v(" "),s("el-table-column",{attrs:{"min-width":"100","show-overflow-tooltip":"",align:"center",prop:"type",label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.type?s("span",[t._v("普通商品")]):t._e(),t._v(" "),"1"==e.row.type?s("span",[t._v("称重商品")]):t._e(),t._v(" "),"2"==e.row.type?s("span",[t._v("自定义商品")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"isDiscount",label:"参与优惠"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.isDiscount?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"serviceCharge",label:"服务费"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.serviceCharge?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"isRecommend",label:"推荐菜"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.isRecommend?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"isInvoicing",label:"进销存"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.isInvoicing?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"isSelf",label:"自取"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.isSelf?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"isStock",label:"开启库存"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.isStock?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"cids",label:"时价菜"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.cids?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"isVip",label:"参与会员"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:"0"==t.row.isVip?"el-icon-close":"el-icon-check"})]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80","show-overflow-tooltip":"",align:"center",prop:"vipPrice",label:"会员优惠"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.isVip?s("span",{staticClass:"el-icon-close"}):t._e(),t._v(" "),"1"==e.row.isVip?s("span",[t._v(t._s(e.row.vipPrice))]):t._e(),t._v(" "),"2"==e.row.isVip?s("span",[t._v("会员折扣")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{fixed:"right",width:"150",align:"center",prop:"totalDay",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticStyle:{color:"#FE8D2C",cursor:"pointer"},on:{click:function(o){t.openAddWin(e.row)}}},[t._v("编辑")]),t._v(" "),s("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[t._v("|")]),t._v(" "),"2"==e.row.status?s("span",{staticStyle:{color:"rgb(108, 194, 230)",cursor:"pointer"},on:{click:function(o){t.updownWin(e.row)}}},[t._v("上架")]):s("span",{staticStyle:{color:"#FD3F1F",cursor:"pointer"},on:{click:function(o){t.updownWin(e.row)}}},[t._v("下架")])]}}])})],1)],1):t._e()]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.goodsList.length>0,expression:"goodsList.length>0"}]},["1"==t.selectTab?s("el-pagination",{attrs:{background:"","current-page":Number(t.currentPage),"page-count":Number(t.totalNum),"page-size":Number(t.num),layout:"sizes, prev, pager, next","page-sizes":[10,30,50,100]},on:{"size-change":t.sizeChange,"current-change":t.pageClick}}):t._e(),t._v(" "),"0"==t.selectTab?s("el-pagination",{attrs:{background:"","current-page":Number(t.currentPage),"page-count":Number(t.totalNum),"page-size":Number(t.num),layout:"prev, pager, next"},on:{"current-change":t.pageClick}}):t._e()],1),t._v(" "),s("transition",{attrs:{name:"fade"}},[s(t.showCom,{tag:"component",attrs:{pObj:t.comObj,goIncom:"goods"},on:{throwAddGoodsWin:t.closeAddGoodsWin}})],1)],1)},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-div"},[e("img",{attrs:{src:o("b8bc")}}),this._v(" "),e("div",{staticStyle:{"font-size":"20px",color:"#999"}},[this._v("\n\t\t\t\t\t\t商品加载中,请稍后...\n\t\t\t\t\t")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"combox"},[e("img",{attrs:{src:o("f518"),alt:"添加"}}),this._v(" "),e("h3",[this._v("添加商品")])])}];s._withStripped=!0;var i=o("05dd"),r=o("f6ce"),a=o("81a2"),c=o("bbb9");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,o){return function s(n,i){try{var r=e[n](i),a=r.value}catch(t){return void o(t)}if(!r.done)return Promise.resolve(a).then(function(t){s("next",t)},function(t){s("throw",t)});t(a)}("next")})}}var d={data:function(){return{goodsNav:[{id:-1,name:"全部"},{id:0,name:"已开启库存商品"},{id:1,name:"未开启库存商品"},{id:2,name:"多规格商品"},{id:3,name:"下架商品"}],selectNavId:-1,cdn:i.a.cdnUrl,oneArea:{name:"请选择一级分类",id:-1,show:!1},oneIndex:-1,twoArea:{name:"请选择二级分类",index:-2,show:!1},twoIndex:-1,load:!1,category:[],child:[],allGoods:[],goodsList:[],pageGoods:[],tempGoods:[],nowGoods:[],brandList:null,isBrand:null,ischain:null,brandId:null,shopId:null,imgHost:null,pageBtnNum:10,num:14,currentPage:1,totalNum:null,numList:[],search:"",comObj:{},showCom:"",requestNum:1e3,requestPage:1,requestTotal:1,listHeight:200,industry:0,goodSec:[{name:"全部",id:"0"},{name:"品牌同步",id:"1"},{name:"门店自建",id:"2"}],goodType:0,typeName:"请选择商品类型",selectTab:1,showArea:!1,showTArea:!1}},mounted:function(){this.initData(),this.initSyncBtn(),this.syncRequest()},components:{openAddGoodsWin:function(){return o.e("add_goods_win").then(o.bind(null,"b6e5"))},errorGoods:function(){return o.e("import_goods_error_win").then(o.bind(null,"4a4f"))},asyncWin:function(){return o.e("async_goods_choice").then(o.bind(null,"b22c"))},elCategory:function(){return o.e("el_category").then(o.bind(null,"eff4"))}},methods:{typeChange:function(t){0==t&&14!=this.num&&(this.sizeChange(14),this.windowResize()),this.initSyncBtn()},updownWin:function(t){var e=this,o="0"==t.status?"下架":"上架";this.$store.commit("setWin",{title:"温馨提示",winType:"confirm",content:"确定"+o+"“ "+t.goodsName+" ”?",callback:function(s){"ok"==s&&e.goodUpOrDownShelf(t,o)}})},goodUpOrDownShelf:function(t,e){var o=this;return l(regeneratorRuntime.mark(function s(){return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,a.a.goodUpOrDownShelf({data:{goodsId:t.id,status:"0"==t.status?"2":"0"}});case 2:s.sent&&(o.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:e+"成功"}),o.closeAddGoodsWin("updown"));case 4:case"end":return s.stop()}},s,o)}))()},selectType:function(t){this.goodType=t,this.typeName=this.goodSec[t].name,this.filterGoodsByNav(this.selectNavId)},searchNewGood:function(t){var e=this;return l(regeneratorRuntime.mark(function o(){var s,n;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(t&&(e.currentPage=1,e.pageGoods=e.goodsList,e.tempGoods=e.goodsList,e.initPage(e.pageGoods)),e.oneArea={id:-1,name:"请选择一级分类",show:!1},e.twoArea={name:"请选择二级分类",index:-2,show:!1},e.selectNavId=-1,""!=e.search){o.next=6;break}return o.abrupt("return");case 6:return o.next=8,a.a.getListByCid({data:{goodsName:e.search}});case 8:for(s=o.sent,e.pageGoods=s.list,e.searchGoods=s.list,n=0;n<e.pageGoods.length;n++)(1*e.pageGoods[n].groupId>0||2==e.pageGoods[n].status)&&(e.pageGoods.splice(n,1),n--);e.initPage(e.pageGoods);case 13:case"end":return o.stop()}},o,e)}))()},newselectOneArea:function(t){this.oneIndex=t,this.twoIndex=-1,this.showArea=!1;var e=this.category[t];this.oneArea={id:e.id,name:e.name,show:!1},this.selectOneArea(e,t)},newselectTwoArea:function(t){this.twoIndex=t;var e=this.child[t];this.showTArea=!1,this.selectTwoArea(e,t)},selectOneArea:function(t,e){this.oneIndex=e,this.twoArea={id:-2,name:"请选择二级分类",show:!1},this.oneArea={id:t.id,name:t.name,show:!1},this.child=t.child,this.child||(this.child=[]),this.tempGoods=this.pageGoods=this.filterGoodsByCategoryByPid(this.goodsList,this.oneArea.id),"number"==typeof e&&(this.selectNavId=-1,this.currentPage=1),0!=this.search.trim().length?(this.searchGoods=this.funSearchGoods(this.tempGoods),this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods)):this.pageGoods=this.changeNav(this.selectNavId,this.tempGoods),this.initPage(this.pageGoods)},showTwoArea:function(t){return-1==this.oneArea.id?(this.$store.commit("setWin",{title:"温馨提示",content:"请先选择一级分类!"}),this.showTArea=!1,!1):0==this.child.length?(this.$store.commit("setWin",{title:"温馨提示",content:"该分类下没有二级分类!"}),this.showTArea=!1,!1):(this.twoArea.show=!this.twoArea.show,void(this.oneArea.show=!1))},selectTwoArea:function(t,e){this.twoIndex=e,this.twoArea={id:t.id,name:t.name,show:!1},this.selectNavId=-1,this.tempGoods=this.pageGoods=this.filterGoodsByCategoryByPid(this.goodsList,this.twoArea.id),0!=this.search.trim().length?(this.searchGoods=this.funSearchGoods(this.tempGoods),this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods)):this.pageGoods=this.changeNav(this.selectNavId,this.tempGoods),"number"==typeof e&&(this.selectNavId=-1,this.currentPage=1),this.initPage(this.pageGoods)},filterGoodsByCategoryByPid:function(t,e){if(-1==e)return t;var o=[];return t.forEach(function(t){t.cids||(t.cids=[]),t.cids.some(function(s){if(s==e)return o.push(t),!0})}),o},filterGoodsByNav:function(t){this.selectNavId=t,this.search=this.search.trim(),0==this.search.length?this.pageGoods=this.changeNav(this.selectNavId,this.tempGoods):this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods),this.currentPage=1,this.initPage(this.pageGoods)},changeNav:function(t,e){var o=[];if(3!=t)switch(e=e.filter(function(t){return 2!=t.status}),t+""){case"-1":o=e;break;case"0":o=e.filter(function(t){return 1==t.isStock});break;case"1":o=e.filter(function(t){return 0==t.isStock});break;case"2":o=e.filter(function(t){return 1==t.isGroup})}else 3==t&&(o=e.filter(function(t){return 2==t.status}));var s=[],n=[],i=[],r=c.a.deepCopy(o);if(0==this.goodType)s=r;else{for(var a=0;a<r.length;a++){var l=r[a];1*l.id<1e5?n.push(l):i.push(l)}1==this.goodType?s=n:2==this.goodType&&(s=i)}return o=s},funSearchkeyUp:function(){this.searchGoods=this.pageGoods=this.funSearchGoods(this.tempGoods),this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods),this.currentPage=1,this.initPage(this.pageGoods)},funSearchGoods:function(t){var e=this;return this.search&&0!=this.search.trim().length?(this.search=this.search.trim(),t.filter(function(t){var o=""+t.BC;o=o.toLowerCase();var s=t.goodsName.toLowerCase(),n=e.search.toLowerCase();return!!(o&&o.indexOf(n)>-1)||(!!(s&&s.indexOf(n)>-1)||void 0)})):t},initPage:function(t){this.totalNum=Math.ceil(t.length/this.num);var e=(this.currentPage-1)*this.num,o=this.currentPage*this.num;this.nowGoods=t.slice(e,o)},funGetPageNum:function(t){var e=this;return l(regeneratorRuntime.mark(function o(){var s;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(e.currentPage=t.page,e.num=t.num,e.initPage(e.pageGoods),!(e.currentPage>e.totalNum-2)){o.next=12;break}if(!(e.requestPage<e.requestTotal&&e.oneIndex<=0)){o.next=12;break}return e.requestPage++,o.next=8,e.getGoods();case 8:s=o.sent,e.pageGoods=e.pageGoods.concat(s),e.initPage(e.pageGoods),r.a.session("goodList",e.pageGoods);case 12:case"end":return o.stop()}},o,e)}))()},sizeChange:function(t){this.num=t,this.currentPage=1,this.initPage(this.pageGoods)},pageClick:function(t){var e=this;return l(regeneratorRuntime.mark(function o(){var s;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(e.currentPage=t,e.initPage(e.pageGoods),!(e.currentPage>e.totalNum-2)){o.next=11;break}if(!(e.requestPage<e.requestTotal&&e.oneIndex<=0)){o.next=11;break}return e.requestPage++,o.next=7,e.getGoods();case 7:s=o.sent,e.pageGoods=e.pageGoods.concat(s),e.initPage(e.pageGoods),r.a.session("goodList",e.pageGoods);case 11:case"end":return o.stop()}},o,e)}))()},closeAddGoodsWin:function(t){var e=this;"releaserelation"!=t&&(this.showCom=""),"close"!=t&&"cancel"!==t&&(this.requestPage=1,this.getGoodsList(!0).then(function(t){e.allGoods=t,e.goodsList=e.initGoodsStock(t,e.numList),e.goodsList=e.deleteChildGoods(e.goodsList),e.goodsList=e.funSortGood(e.goodsList),-2==e.twoArea.id?e.selectOneArea(e.oneArea,e.oneIndex):e.selectTwoArea(e.twoArea,e.twoIndex)}))},openAddWin:function(t){this.comObj={editGoodsId:t.id,status:t.status,ischain:this.ischain,shopId:this.shopId,category:this.category,imgHost:this.imgHost,goodsList:this.allGoods,brandId:this.brandId,title:t.id?"修改商品":"添加商品"},this.showCom="openAddGoodsWin"},initGoodsStock:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=!0,s=!1,n=void 0;try{for(var i,r=t[Symbol.iterator]();!(o=(i=r.next()).done);o=!0){var a=i.value;if(1==a.isStock){var c=!0,l=!1,d=void 0;try{for(var u,h=e[Symbol.iterator]();!(c=(u=h.next()).done);c=!0){var p=u.value;if(a.id==p.gid){a.goodsNum=p.goodsNum;break}}}catch(t){l=!0,d=t}finally{try{!c&&h.return&&h.return()}finally{if(l)throw d}}}}}catch(t){s=!0,n=t}finally{try{!o&&r.return&&r.return()}finally{if(s)throw n}}var g=!0,f=!1,v=void 0;try{for(var m,w=t[Symbol.iterator]();!(g=(m=w.next()).done);g=!0){var y=m.value;y.groupStock=[];var _=!0,b=!1,G=void 0;try{for(var x,k=t[Symbol.iterator]();!(_=(x=k.next()).done);_=!0){var S=x.value;if(y.id==S.groupId&&y.id!=S.id){var A={goodsNum:S.goodsNum,price:S.price,vipPrice:S.vipPrice};y.groupStock.push(A)}if(y.groupStock.length>=3)break}}catch(t){b=!0,G=t}finally{try{!_&&k.return&&k.return()}finally{if(b)throw G}}}}catch(t){f=!0,v=t}finally{try{!g&&w.return&&w.return()}finally{if(f)throw v}}return t},filterGoodsByStock:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=[],s=[];o=t.filter(function(t){return 1==t.isStock});var n=!0,i=!1,r=void 0;try{for(var a,c=o[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var l=a.value,d=!0,u=!1,h=void 0;try{for(var p,g=e[Symbol.iterator]();!(d=(p=g.next()).done);d=!0){var f=p.value;if(l.id==f.gid){l.goodsThreshold=f.goodsThreshold,l.goodsNum=f.goodsNum;break}}}catch(t){u=!0,h=t}finally{try{!d&&g.return&&g.return()}finally{if(u)throw h}}}}catch(t){i=!0,r=t}finally{try{!n&&c.return&&c.return()}finally{if(i)throw r}}var v=!0,m=!1,w=void 0;try{for(var y,_=o[Symbol.iterator]();!(v=(y=_.next()).done);v=!0){var b=y.value;b.relative=[];var G=!0,x=!1,k=void 0;try{for(var S,A=o[Symbol.iterator]();!(G=(S=A.next()).done);G=!0){var C=S.value;C.groupId==b.id&&C.id!=b.id&&b.relative.push(C)}}catch(t){x=!0,k=t}finally{try{!G&&A.return&&A.return()}finally{if(x)throw k}}s.push(b)}}catch(t){m=!0,w=t}finally{try{!v&&_.return&&_.return()}finally{if(m)throw w}}return s},deleteChildGoods:function(t){return t.filter(function(t){if(!Number(t.groupId))return!0})},funSortGood:function(t){return t.sort(function(t,e){return t.sort==e.sort?t.id-e.id:t.sort-e.sort})},initSyncBtn:function(){var t=this,e={};1!=this.ischain&&2!=this.ischain||(e.sync=function(){t.showCom="asyncWin"}),1==this.selectTab&&(e.addGood=function(){t.openAddWin({})}),e.leadIn=function(){t.importGoods().then(function(e){e?(t.showCom="errorGoods",t.comObj={errorInfo:e}):(t.$store.commit("setWin",{title:"温馨提示",content:"导入商品成功!"}),t.showCom=""),t.getGoodsList(!0).then(function(e){t.allGoods=e,t.goodsList=t.initGoodsStock(e,t.numList),t.goodsList=t.deleteChildGoods(t.goodsList),t.goodsList=t.funSortGood(t.goodsList),-2==t.twoArea.id?t.selectOneArea(t.oneArea,t.oneIndex):t.selectTwoArea(t.twoArea,t.twoIndex)})})},e.leadOut=function(){t.exportGoodsList()},this.$store.commit("setPageTools",e)},initData:function(){var t=r.a.session("userShop");this.imgHost=t.uploadUrl,this.shopId=t.currentShop.id;for(var e=["industry","brandId","ischain"],o=0;o<e.length;o++){var s=e[o];this[s]=t.currentShop[s]}this.isBrand="1"!=t.currentShop.ischain&&"2"!=t.currentShop.ischain},getCate:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getCategoryList({data:{shopId:t.shopId}});case 2:return o=e.sent,r.a.session("areaList",o),e.abrupt("return",o);case 5:case"end":return e.stop()}},e,t)}))()},getCategoryList:function(t,e){var o=this;return l(regeneratorRuntime.mark(function s(){var n,i;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(n=null,!t){s.next=7;break}return s.next=4,o.getCate();case 4:n=s.sent,s.next=25;break;case 7:if(i=r.a.session("httpGoodVersion")){s.next=14;break}return s.next=11,o.getCate();case 11:n=s.sent,s.next=25;break;case 14:if(i.otherConfigVer!=e){s.next=22;break}if(n=r.a.session("areaList")){s.next=20;break}return s.next=19,o.getCate();case 19:n=s.sent;case 20:s.next=25;break;case 22:return s.next=24,o.getCate();case 24:n=s.sent;case 25:return s.abrupt("return",n);case 26:case"end":return s.stop()}},s,o)}))()},getGoods:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var o,s,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=[],e.next=3,a.a.getGoodsList({data:{shopId:t.shopId,page:t.requestPage,num:t.requestNum,specification:1}});case 3:for(s=e.sent,t.requestTotal=s.total,o=s.list,n=0;n<o.length;n++)o[n].price=+o[n].price,o[n].cost=+o[n].cost,o[n].sort=+o[n].sort;return r.a.session("goodList",o),e.abrupt("return",o);case 9:case"end":return e.stop()}},e,t)}))()},getGoodsList:function(t,e){var o=this;return l(regeneratorRuntime.mark(function s(){var n,i;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(n=null,!t){s.next=7;break}return s.next=4,o.getGoods();case 4:n=s.sent,s.next=25;break;case 7:if(i=r.a.session("httpGoodVersion")){s.next=14;break}return s.next=11,o.getGoods();case 11:n=s.sent,s.next=25;break;case 14:if(i.goodsConfigVer!=e){s.next=22;break}if(n=r.a.session("goodList")){s.next=20;break}return s.next=19,o.getGoods();case 19:n=s.sent;case 20:s.next=25;break;case 22:return s.next=24,o.getGoods();case 24:n=s.sent;case 25:return s.abrupt("return",n);case 26:case"end":return s.stop()}},s,o)}))()},importGoods:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.importGoods({data:{shopId:t.shopId},timeout:6e4,formId:"form_import_good"});case 2:return o=e.sent,e.abrupt("return",o);case 4:case"end":return e.stop()}},e,t)}))()},exportGoodsList:function(){a.a.exportGoodsList()},getHttp:function(t){var e=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l(regeneratorRuntime.mark(function s(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a[t]({data:o});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},s,e)}))()},syncRequest:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var o,s,n,i,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getHttp("ShopGetExtra");case 2:return o=e.sent,e.next=5,t.getCategoryList(!1,o.otherConfigVer);case 5:return s=e.sent,e.next=8,t.getGoodsList(!1,o.goodsConfigVer);case 8:return n=e.sent,e.next=11,t.getHttp("InventoryGetlist");case 11:i=e.sent,a=i.list,s[0]&&-1!=s[0].id&&s.unshift({id:-1,name:"全部一级分类"}),t.numList=a,t.category=s,t.load=!0,t.allGoods=n,t.goodsList=t.initGoodsStock(n,t.numList),t.goodsList=t.deleteChildGoods(t.goodsList),t.goodsList=t.funSortGood(t.goodsList),t.selectOneArea(t.oneArea,t.oneIndex),r.a.session("httpGoodVersion",o);case 23:case"end":return e.stop()}},e,t)}))()},windowResize:function(){var t=this.$refs.addGoods.offsetWidth-10;this.listHeight=2*t/3}},beforeDestroy:function(){}},u=(o("4b6b"),o("6ceb")),h=Object(u.a)(d,s,n,!1,null,"6b84c54e",null);h.options.__file="src\\module\\goods_config\\details_con.vue";e.default=h.exports},"4b6b":function(t,e,o){"use strict";var s=o("87e4");o.n(s).a},"87e4":function(t,e,o){},b8bc:function(t,e,o){t.exports=o.p+"images/preloader.3e54c692.gif"},f518:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKxJREFUeNrs2LENgzAQhWE7ygAZgQ2yApsk9S1hGMJeB7ERGzhHh+w0EXdF0P8ky9IV8BVH8Yi11mCdUsqg1/s4E5HJ+j334JMdn5qZOf4W/jjgwYMHDx48ePDgwYMHD/7XxJxzV5aNOuyrmc0eBfxbWfZIYm2ugt/XZtOzGj/3oefZzFbzD9bpj9mo13KciUhkbcCDBw8ePHjw4MGDBw8e/MkC7hGPUt/lI8AAt9oYPL6CVYkAAAAASUVORK5CYII="}}]);