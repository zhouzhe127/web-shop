(window.webpackJsonp=window.webpackJsonp||[]).push([["channel_goods_win"],{"31c3":function(t,e,s){"use strict";var n=s("7888");s.n(n).a},7888:function(t,e,s){},b8bc:function(t,e,s){t.exports=s.p+"images/preloader.3e54c692.gif"},bf1c:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{attrs:{id:"channel-good"}},[n("section",{staticClass:"oCont",staticStyle:{height:"45px",width:"100%",clear:"both"}},[n("div",{staticClass:"Box",staticStyle:{width:"160px",float:"left"}},[n("section",{staticClass:"oDe",class:{act:t.toggleMenu},staticStyle:{"border-left":"none",width:"50%"},on:{click:function(e){t.toggleMenu=!0}}},[t._v("商品")]),t._v(" "),n("section",{staticClass:"oDe",class:{act:!t.toggleMenu},on:{click:function(e){t.toggleMenu=!1}}},[t._v("套餐")])]),t._v(" "),n("div",{staticStyle:{clear:"both"}},[n("a",{staticClass:"blue fl",staticStyle:{width:"100px",height:"40px","margin-top":"10px","line-height":"40px","margin-right":"20px"},on:{click:function(e){t.openGoodConfig(1)}}},[t._v("菜单配置")]),t._v(" "),"1"==t.channel.id||"2"==t.channel.id?n("a",{staticClass:"blue fl",staticStyle:{"margin-top":"10px",width:"100px",height:"40px","line-height":"40px","margin-right":"20px",position:"relative"},on:{click:function(e){t.openGoodConfig(2)}}},[t._v("人均商品\n\t\t\t\t\t"),n("span",{staticStyle:{position:"absolute",top:"-8px",right:"-8px",padding:"5px",height:"18px","line-height":"10px","border-radius":"50px",background:"red",color:"#fff"}},[t._v(t._s(t.perGoodsNum))])]):t._e(),t._v(" "),n("ul",{staticStyle:{width:"815px",float:"left",margin:"10px 0"}},[n("li",{directives:[{name:"show",rawName:"v-show",value:t.toggleMenu,expression:"toggleMenu"}],staticStyle:{width:"210px",float:"left"},on:{click:t.catchEvent}},[n("section",{staticClass:"staList fl detLi"},[n("section",{staticClass:"tableList",on:{click:t.showOneArea}},[n("span",{staticClass:"oSpan"},[t._v(t._s(t.oneArea.name))]),t._v(" "),t._m(0)]),t._v(" "),t.oneArea.show?n("div",{staticClass:"detDiv"},[n("i",{staticClass:"detI"}),t._v(" "),n("div",{staticStyle:{width:"100%",height:"100%","overflow-y":"auto","z-index":"16"}},[t._l(t.category,function(e,s){return[n("section",{key:s,staticClass:"shoName",class:{"shoName-select-one":t.oneArea.id==e.id},on:{click:function(n){t.selectOneArea(e,s)}}},[t._v(t._s(e.name))])]})],2)]):t._e()])]),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.toggleMenu,expression:"toggleMenu"}],staticStyle:{width:"210px","margin-left":"20px",float:"left"},on:{click:t.catchEvent}},[n("section",{staticClass:"staList fl detLi"},[n("section",{staticClass:"tableList",on:{click:t.showTwoArea}},[n("span",{staticClass:"oSpan"},[t._v(t._s(t.twoArea.name))]),t._v(" "),t._m(1)]),t._v(" "),t.twoArea.show?n("div",{staticClass:"detDiv"},[n("i",{staticClass:"detI"}),t._v(" "),n("div",{staticStyle:{width:"100%",height:"100%","overflow-y":"auto","z-index":"16"}},[t._l(t.child,function(e,s){return[n("section",{key:s,staticClass:"shoName",class:{"shoName-select-one":t.twoArea.id==e.id},on:{click:function(n){t.selectTwoArea(e,s)}}},[t._v(t._s(e.name))])]})],2)]):t._e()])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.toggleMenu,expression:"!toggleMenu"}],staticStyle:{height:"50px",overflow:"hidden",display:"inline-block"}},t._l(t.packMenu,function(e,s){return n("a",{key:s,staticClass:"raduobtn",class:{selectbtn:e.id==t.packMenuId},attrs:{href:"javascript:void(0);"},on:{click:function(s){t.selectPack(e.id)}}},[t._v(t._s(e.name))])})),t._v(" "),n("li",{staticStyle:{"margin-left":"20px",float:"left"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticStyle:{width:"150px",height:"40px","line-height":"40px",float:"left","padding-left":"10px"},attrs:{type:"text",maxlength:"18",placeholder:"请输入名称/简码"},domProps:{value:t.search},on:{keyup:function(e){t.funSeach(null)},input:function(e){e.target.composing||(t.search=e.target.value)}}})])])])]),t._v(" "),t.loading?n("div",{staticStyle:{width:"128px",margin:"200px auto"}},[n("img",{attrs:{src:s("b8bc")}})]):t._e(),t._v(" "),t.loading?t._e():n("section",{staticClass:"user-info",staticStyle:{width:"100%","margin-top":"20px"}},[n("section",{staticClass:"commodity-box",staticStyle:{width:"100%",overflow:"hidden"}},[t._l(t.nowGoods,function(e,i){return t.toggleMenu?[n("section",{key:i,staticClass:"fl",on:{click:function(s){t.showDetail(e,i)}}},[e.imageName?n("img",{staticClass:"cname",staticStyle:{width:"300px",height:"200px"},attrs:{src:t.imgHost+e.imageName,alt:"商品"}}):t._e(),t._v(" "),e.imageName?t._e():n("img",{attrs:{src:s("b7c2"),width:"300",height:"200",alt:"商品"}}),t._v(" "),1==t.ischain||2==t.ischain?n("section",{staticStyle:{width:"70px",position:"absolute",top:"0",left:"10px"}},[e.id>=1e5?n("span",{staticClass:"brandShop",staticStyle:{"background-color":"#6cc2e6"}},[t._v("门店")]):n("span",{staticClass:"brandShop",staticStyle:{"background-color":"#fcaa30"}},[t._v("品牌")])]):t._e(),t._v(" "),n("section",{staticClass:"comprice"},[n("h2",{staticClass:"commodityName"},[t._v(t._s(e.goodsName))]),t._v(" "),n("section",[1==e.isGroup||1==e.isGroup&&1==e.isSeasonal?n("section",{staticClass:"fr",staticStyle:{width:"100%","text-align":"left"}},[n("span",{staticClass:"fl",staticStyle:{width:"50px"}},[t._v("原价：")]),t._v(" "),n("span",{staticClass:"fl",staticStyle:{width:"200px","margin-right":"3px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},t._l(e.groupStock,function(s,i){return n("i",{key:i},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t"+t._s(s.price)+"\n\t\t\t\t\t\t\t\t\t\t\t"),i!=e.groupStock.length-1?n("i",[t._v("/")]):t._e()])}))]):n("section",{staticClass:"fr",staticStyle:{width:"100%","text-align":"left"}},[n("span",{staticClass:"fl",staticStyle:{width:"50px"}},[t._v("原价：")]),t._v(" "),n("span",{staticClass:"fl",staticStyle:{width:"200px","margin-right":"3px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.price))])])]),t._v(" "),n("section",{staticStyle:{display:"none"}},[t._v(t._s(e.BC))])])])]:t._e()}),t._v(" "),t._l(t.nowPackages,function(e,i){return t.toggleMenu?t._e():[n("section",{key:i,staticClass:"fl",on:{click:function(s){t.showDetail(e,i)}}},[e.imageName?n("img",{staticClass:"cname",staticStyle:{width:"300px",height:"200px"},attrs:{src:t.imgHost+e.imageName,alt:"商品"}}):t._e(),t._v(" "),e.imageName?t._e():n("img",{attrs:{src:s("b7c2"),width:"300",height:"200",alt:"商品"}}),t._v(" "),1==t.ischain||2==t.ischain?n("section",{staticStyle:{width:"70px",position:"absolute",top:"0",right:"10px"}},[e.id>=1e5?n("span",{staticClass:"brandShop",staticStyle:{"background-color":"#6cc2e6"}},[t._v(" 门店")]):n("span",{staticClass:"brandShop",staticStyle:{"background-color":"#fcaa30"}},[t._v("品牌")])]):t._e(),t._v(" "),n("section",{staticClass:"comprice"},[n("h2",{staticClass:"commodityName"},[t._v(t._s(e.packageName))]),t._v(" "),0==e.type||1==e.type?n("section",{staticClass:"fl",staticStyle:{height:"30px","line-height":"30px",width:"100%"}},[n("section",{staticClass:"fl",staticStyle:{width:"33.33%","text-align":"left"}},[n("span",{staticClass:"fl",staticStyle:{width:"42px"}},[t._v("库存：")]),t._v(" "),n("span",{staticClass:"fl",staticStyle:{width:"48px","margin-right":"3px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.goodsNum))])]),t._v(" "),n("section",{staticClass:"fl",staticStyle:{width:"33.33%","text-align":"center"}}),t._v(" "),n("section",{staticClass:"fl",staticStyle:{width:"33.33%","text-align":"right"}},[n("span",{staticClass:"fl",staticStyle:{width:"42px"}},[t._v("原价：")]),t._v(" "),n("span",{staticClass:"fl",staticStyle:{width:"48px","margin-right":"3px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.price))])]),t._v(" "),n("section",{staticStyle:{display:"none"}},[t._v(t._s(e.BC))])]):t._e()])])]}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.toggleMenu,expression:"toggleMenu"}],staticClass:"fl",staticStyle:{width:"100%",height:"45px"}},[n("div",{staticStyle:{float:"left"}},[n("page-turn",{attrs:{page:t.currentPage,total:t.totalNum,num:t.pageNum,isNoPaging:!0},on:{pageNum:t.funGetPageNum}})],1)])],2)]),t._v(" "),n("transition",{attrs:{name:"fade"}},[n(t.showCom,{tag:"component",attrs:{pObj:t.comObj,pGoodsList:t.goodCom},on:{throwDetailWin:t.closeDetailWin,throwGoodListWin:t.closeGoodConfig}})],1)],1)};n._withStripped=!0;var i=s("f6ce"),o=s("81a2");function a(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function n(i,o){try{var a=e[i](o),r=a.value}catch(t){return void s(t)}if(!a.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});t(r)}("next")})}}var r={data:function(){return{shopId:null,ischain:null,channel:{},imgHost:null,packMenu:[{id:-1,name:"全部"},{id:0,name:"固定套餐"},{id:1,name:"可选套餐"}],packMenuId:-1,goodsIds:[],packageIds:[],perGoodsIds:[],goodsList:[],allGoods:[],nowGoods:[],pageGoods:[],parentGoods:[],childGoods:[],packages:[],allPackages:[],seachPackages:[],nowPackages:[],category:[],child:[],oneArea:{id:-1,show:!1,name:"请选择一级分类"},twoArea:{id:-2,show:!1,name:"请选择二级分类"},currentPage:1,totalNum:null,pageBtnNum:10,pageNum:15,search:"",loading:!0,toggleMenu:!0,showCom:null,comObj:{},goodCom:{},configType:null}},props:{pChannel:null},methods:{initBtn:function(){var t=this;this.$store.commit("setPageTools",[{name:"返回",className:["back"],fn:function(){t.returnChannel()}}])},showOneArea:function(){this.search="",this.oneArea.show=!this.oneArea.show,this.twoArea.show=!1},selectOneArea:function(t,e){this.oneArea={id:t.id,show:!1,name:t.name},this.twoArea={id:-2,show:!1,name:"请选择二级分类"},"number"==typeof e&&(this.child=t.child),this.child||(this.child=[]),this.pageGoods=this.filterGoodsByPid(t.id,this.goodsList),this.parentGoods=this.copyData(this.pageGoods),"number"==typeof e&&(this.currentPage=1),this.initPage(this.parentGoods)},showTwoArea:function(){this.search="",-1!=this.oneArea.id?0!=this.child.length?(-1!=this.child[0].id&&this.child.unshift({id:-1,name:"全部二级分类"}),this.twoArea.show=!this.twoArea.show,this.oneArea.show=!1):this.$store.commit("setWin",{title:"温馨提示",content:"该分类下不存在二级分类"}):this.$store.commit("setWin",{title:"温馨提示",content:"请先选择一级分类"})},selectTwoArea:function(t,e){this.twoArea.name=t.name,this.twoArea.id=t.id,this.twoArea.show=!1,this.oneArea.show=!1,this.pageGoods=this.filterGoodsByCid({pid:this.oneArea.id,cid:t.id,goods:this.goodsList},this.category),this.childGoods=this.copyData(this.pageGoods),"number"==typeof e&&(this.currentPage=1),this.initPage(this.childGoods)},selectPack:function(t){this.packMenuId=t,this.seachPackages=this.filterPackagesByType(this.packages,t),this.nowPackages=this.copyData(this.seachPackages)},filterPackagesByType:function(t,e){if(-1==e)return t;return t.filter(function(t){return t.type==e})},funSeach:function(t){if(this.toggleMenu){if(0==this.goodsList.length)return;this.pageGoods=this.funCommonSearch(this.search),t||(this.currentPage=1),this.initPage(this.pageGoods)}else{if(0==this.packages.length)return;this.nowPackages=this.funCommonSearch(this.search)}},funCommonSearch:function(t){var e=[];if(this.toggleMenu){if(e=-2==this.twoArea.id?this.parentGoods:this.childGoods,!t||0==t.trim().length)return e;t=t.toUpperCase(),e=e.filter(function(e){return-1!=e.BC.toUpperCase().indexOf(t)||(-1!=e.goodsName.toUpperCase().indexOf(t)||void 0)})}else{if(e=this.seachPackages,!t||0==t.trim().length)return e;t=t.toUpperCase(),e=e.filter(function(e){return-1!=e.BC.toUpperCase().indexOf(t)||(-1!=e.packageName.toUpperCase().indexOf(t)||void 0)})}return e},filterGoodsByPid:function(t,e){if(-1==t)return e;var s=[];return e.forEach(function(e){e.cids.some(function(n){if(n==t)return s.push(e),!0})}),s=this.funSortGood(s)},filterGoodsByCid:function(t,e){var s=t.pid,n=t.cid,i=t.goods,o=[];if(-1==n){var a=[];e.some(function(t){if(t.id==s)return a=t.child,!0}),i.forEach(function(t){var e=t.cids;a.some(function(s){var n=!1;return e.some(function(e){if(e==s.id)return o.push(t),n=!0,!0}),n})})}else i.forEach(function(t){t.cids.some(function(e){if(e==n)return o.push(t),!0})});return o=this.funSortGood(o)},returnChannel:function(){this.$emit("throwChannelGoodWin")},openGoodConfig:function(t){if(this.configType=t,2==t){var e=[];this.allGoods.forEach(function(t){0!=t.status&&1!=t.status||0!=t.type||(!Number(t.groupId)&&!Number(t.isGroup)||Number(t.groupId)>0&&!Number(t.isGroup))&&e.push(t)}),this.goodCom={title:"人均商品配置",goodsList:e,selGoods:this.perGoodsIds,type:1}}else{var s=this.filterGoodsByMode(this.allGoods),n=[];this.allPackages.forEach(function(t){2==t.status&&n.push(t.id)}),this.goodCom={title:"菜单配置",goodsList:s,selGoods:this.goodsIds,selPack:this.packageIds,delPack:n,type:0}}this.showCom="goodList"},closeGoodConfig:function(t,e){var s=this;if(this.showCom="",this.search="","ok"==t)if(1==this.configType){var n=this.getObjectId(e.goodArr),i=this.getObjectId(e.packArr);if(this.checkDataSame(this.goodsIds,n)&&this.checkDataSame(this.packageIds,i))return;this.ChannelEditGoods(n,i).then(function(t){t?s.initChannel().then(function(){s.goodsList=s.filterGoodsByGoodsIds(s.allGoods,s.goodsIds),s.goodsList=s.funSortGood(s.goodsList);var t=s.copyData(s.twoArea);s.selectOneArea(s.oneArea),-2!=t.id&&s.selectTwoArea(t);var e=s.filterGoodsByGoodsIds(s.allPackages,s.packageIds);e=s.funSortGood(e),s.packages=e,s.selectPack(s.packMenuId)}):s.$store.commit("setWin",{title:"温馨提示",content:"添加失败"})})}else{var o=this.getObjectId(e.goodArr);if(this.checkDataSame(this.perGoodsIds,o))return;this.ChannelEditPerGoods(o).then(function(t){t&&(s.perGoodsIds=o)})}},funGetPageNum:function(t){this.currentPage=parseInt(t.page),this.initPage(this.pageGoods)},initPage:function(t){this.totalNum=Math.ceil(t.length/this.pageNum);var e=(this.currentPage-1)*this.pageNum,s=this.currentPage*this.pageNum;this.nowGoods=t.slice(e,s)},showDetail:function(t){this.showCom="detail",this.comObj.toggleMenu=this.toggleMenu,this.comObj.id=t.id,this.comObj.goods=this.allGoods,this.comObj.shopId=this.shopId,this.comObj.ischain=this.ischain,this.comObj.channelId=this.channel.id},closeDetailWin:function(t,e){if(this.showCom="","update"==t){if(e.isPack){var s=this.packages.filter(function(t){return t.id!=e.id});this.packages=this.funSortGood(s),this.selectPack(this.packMenuId),this.packageIds=this.packageIds.filter(function(t){return t!=e.id})}else{this.goodsList=this.goodsList.filter(function(t){return t.id!=e.id}),this.goodsList=this.funSortGood(this.goodsList);var n=this.copyData(this.twoArea);this.selectOneArea(this.oneArea),-2!=n.id&&this.selectTwoArea(n),this.goodsIds=this.goodsIds.filter(function(t){return t!=e.id})}this.funSeach(!0)}},filterGoodsByMode:function(t){var e=t;switch(""+this.pChannel.id){case"2":case"3":e=e.filter(function(t){return 2!=t.type})}return e=e.filter(function(t){return!(Number(t.groupId)>0&&0==t.type&&!Number(t.isGroup))&&(1==t.status||0==t.status||void 0)})},checkDataSame:function(t,e){var s=!0;return t.length!=e.length?s=!1:(t=t.sort(function(t,e){return t-e}),e=e.sort(function(t,e){return t-e}),t.some(function(t,n){if(t!=e[n])return s=!1,!0})),s},getObjectId:function(t){var e=[];return t.forEach(function(t){e.push(t.id)}),e},funSortGood:function(t){return t.sort(function(t,e){return t.sort-e.sort})},formatStrToArr:function(t){var e=[];return t?e=t.split(","):e},initGoodsStock:function(t){return t.map(function(e){return e.groupStock=[],t.forEach(function(t){if(e.id==t.groupId&&e.id!=t.id){var s={goodsNum:t.goodsNum,price:t.price};e.groupStock.push(s)}}),e})},copyData:function(t){var e=[];return e=JSON.stringify(t),e=JSON.parse(e)},filterGoodsByGoodsIds:function(t,e){var s=[],n=e.length;return t.some(function(t){var i=!1;return e.forEach(function(e){t.id==e&&(s.push(t),s.length==n&&(i=!0))}),i}),s},initChannel:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.ChannelGetOne();case 2:s=e.sent,t.goodsIds=t.formatStrToArr(s.goodsIds),t.packageIds=t.formatStrToArr(s.packageIds),t.perGoodsIds=[],s.perGoodsIds.forEach(function(e){t.perGoodsIds.push(e.gid)});case 7:case"end":return e.stop()}},e,t)}))()},asyncRequest:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var s,n,i,o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.initChannel();case 2:return e.next=4,t.ShopGetExtra();case 4:return s=e.sent,e.next=7,t.getCategoryList(!1,s.otherConfigVer);case 7:return n=e.sent,t.category=n,t.category.unshift({id:-1,name:"全部"}),t.loading=!1,e.next=13,t.getGoodsList(!1,s.goodsConfigVer);case 13:return i=e.sent,t.allGoods=i,t.goodsList=t.initGoodsStock(i,s.otherConfigVer),t.goodsList=t.filterGoodsByGoodsIds(i,t.goodsIds),t.goodsList=t.funSortGood(t.goodsList),t.selectOneArea(t.oneArea),e.next=21,t.getpackagelist(!1);case 21:return o=e.sent,t.allPackages=o,a=t.filterGoodsByGoodsIds(o,t.packageIds),a=t.funSortGood(a),t.packages=a,t.nowPackages=a,t.seachPackages=t.copyData(a),t.loading=!1,e.abrupt("return",s);case 30:case"end":return e.stop()}},e,t)}))()},getPack:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.getpackagelist({data:{shopId:t.shopId,page:1,num:9999}});case 2:return s=e.sent,i.a.session("packList",s),e.abrupt("return",s);case 5:case"end":return e.stop()}},e,t)}))()},getpackagelist:function(t,e){var s=this;return a(regeneratorRuntime.mark(function n(){var o,a;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(o=null,!t){n.next=7;break}return n.next=4,s.getPack();case 4:o=n.sent,n.next=25;break;case 7:if(a=i.a.session("httpGoodVersion")){n.next=14;break}return n.next=11,s.getPack();case 11:o=n.sent,n.next=25;break;case 14:if(a.otherConfigVer!=e){n.next=22;break}if(o=i.a.session("packList")){n.next=20;break}return n.next=19,s.getPack();case 19:o=n.sent;case 20:n.next=25;break;case 22:return n.next=24,s.getPack();case 24:o=n.sent;case 25:return n.abrupt("return",o);case 26:case"end":return n.stop()}},n,s)}))()},getCate:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.getCategoryList({data:{shopId:t.shopId}});case 2:return s=e.sent,i.a.session("areaList",s),e.abrupt("return",s);case 5:case"end":return e.stop()}},e,t)}))()},getCategoryList:function(t,e){var s=this;return a(regeneratorRuntime.mark(function n(){var o,a;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(o=null,!t){n.next=7;break}return n.next=4,s.getCate();case 4:o=n.sent,n.next=25;break;case 7:if(a=i.a.session("httpGoodVersion")){n.next=14;break}return n.next=11,s.getCate();case 11:o=n.sent,n.next=25;break;case 14:if(a.otherConfigVer!=e){n.next=22;break}if(o=i.a.session("areaList")){n.next=20;break}return n.next=19,s.getCate();case 19:o=n.sent;case 20:n.next=25;break;case 22:return n.next=24,s.getCate();case 24:o=n.sent;case 25:return n.abrupt("return",o);case 26:case"end":return n.stop()}},n,s)}))()},getGoods:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var s,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s=null,e.next=3,o.a.getGoodsList({data:{shopId:t.shopId,page:1,num:9999,specification:1}});case 3:return n=e.sent,s=n.list,i.a.session("goodList",s),e.abrupt("return",s);case 7:case"end":return e.stop()}},e,t)}))()},getGoodsList:function(t,e){var s=this;return a(regeneratorRuntime.mark(function n(){var o,a;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(o=null,!t){n.next=7;break}return n.next=4,s.getGoods();case 4:o=n.sent,n.next=25;break;case 7:if(a=i.a.session("httpGoodVersion")){n.next=14;break}return n.next=11,s.getGoods();case 11:o=n.sent,n.next=25;break;case 14:if(a.goodsConfigVer!=e){n.next=22;break}if(o=i.a.session("goodList")){n.next=20;break}return n.next=19,s.getGoods();case 19:o=n.sent;case 20:n.next=25;break;case 22:return n.next=24,s.getGoods();case 24:o=n.sent;case 25:return n.abrupt("return",o);case 26:case"end":return n.stop()}},n,s)}))()},ShopGetExtra:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.ShopGetExtra({data:{}});case 2:return s=t.sent,t.abrupt("return",s);case 4:case"end":return t.stop()}},e,t)}))()},ChannelGetOne:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.ChannelGetOne({data:{shopId:t.shopId,id:t.channel.id}});case 2:return s=e.sent,e.abrupt("return",s);case 4:case"end":return e.stop()}},e,t)}))()},ChannelEditGoods:function(t,e){var s=this;return a(regeneratorRuntime.mark(function n(){var i;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.ChannelEditGoods({data:{shopId:s.shopId,id:s.channel.id,goodsIds:t.join(","),packageIds:e.join(",")}});case 2:return i=n.sent,n.abrupt("return",i);case 4:case"end":return n.stop()}},n,s)}))()},ChannelEditPerGoods:function(t){var e=this;return a(regeneratorRuntime.mark(function s(){var n,i;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return n=[],t.forEach(function(t){var e={};e.gid=t,e.goodsNum="1",n.push(e)}),s.next=4,o.a.ChannelEditPerGoods({data:{id:e.channel.id,perGoodsIds:n,shopId:e.shopId}});case 4:return i=s.sent,s.abrupt("return",i);case 6:case"end":return s.stop()}},s,e)}))()},domClick:function(){(this.twoArea.show||this.oneArea.show)&&(this.showCom=""),this.twoArea.show=this.oneArea.show=!1},catchEvent:function(t){t.cancelBubble=!0}},computed:{perGoodsNum:function(){return this.perGoodsIds.length}},mounted:function(){var t=i.a.session("userShop");this.shopId=t.currentShop.id,this.ischain=t.currentShop.ischain,this.channel=this.pChannel,this.imgHost=t.uploadUrl,this.initBtn(),this.asyncRequest().then(function(t){i.a.session("httpGoodVersion",t)}),document.addEventListener("click",this.domClick,!1)},components:{pageTurn:function(){return s.e("page_element").then(s.bind(null,"5921"))},detail:function(){return s.e("good_detail_win").then(s.bind(null,"302a"))},goodList:function(){return Promise.all([s.e("goods_package_win"),s.e("good_package_win")]).then(s.bind(null,"f163"))}},beforeDestroy:function(){document.removeEventListener("click",this.domClick),this.$store.commit("setPageTools",[])}},c=(s("31c3"),s("7610")),h=Object(c.a)(r,n,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("i")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("i")])}],!1,null,"9f42373e",null);h.options.__file="src\\module\\goods_config\\multi_channel\\channel_goods_win.vue";e.default=h.exports}}]);