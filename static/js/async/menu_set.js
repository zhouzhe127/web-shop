(window.webpackJsonp=window.webpackJsonp||[]).push([["menu_set"],{1224:function(t,e,i){"use strict";var s=i("6e63");i.n(s).a},3645:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mall-menu",staticStyle:{width:"1517px"},attrs:{id:"menu"}},[i("header",{staticClass:"menu_header"},[i("ul",[i("li",[i("button",{staticClass:"btns",class:0==t.menuIndex?"btn_blue":"",on:{click:function(e){t.selectMenu("default",0)}}},[t._v("默认菜单")])]),t._v(" "),t._l(t.menuName,function(e,s){return i("li",{key:s},[i("button",{staticClass:"btns",class:s+1==t.menuIndex?"btn_blue":"",on:{click:function(i){t.selectMenu(e,s+1)}}},[t._v(t._s(e.name))])])})],2)]),t._v(" "),i("div",{staticClass:"menu-reveal fl"},[i("div",{staticClass:"menu-title"},[t._v("闪店商家")]),t._v(" "),i("div",{staticClass:"menu-content"},[i("ul",{staticClass:"menu-list",attrs:{id:"js-menuList"}},[t._l(t.menuList,function(e,s){return t.menuList.length>=1?i("li",{key:s,class:{"Parent ParentOn":"1"==e.status,Parent:"1"!=e.status}},[i("span",{on:{click:function(e){t.getDetailParent(s,e)}}},[t._v(t._s(e.name))]),t._v(" "),t.parentIndex==s?i("div",{staticClass:"menu-child"},[i("ul",[t._l(e.sub_button,function(e,a){return i("li",{key:a,class:{ParentOn:"1"==e.status},on:{click:function(e){t.getDetailChild(s,a)}}},[t._v(t._s(e.name))])}),t._v(" "),i("li",{on:{click:function(e){t.addChildMenu(e)}}},[t._m(0,!0)])],2)]):t._e()]):t._e()}),t._v(" "),i("li",{staticClass:"menu-list-add",on:{click:t.addParentMenu}},[t._m(1)])],2)])]),t._v(" "),i("section",{staticClass:"clearfix fl",staticStyle:{width:"771px"}},[t.addParent||t.addChild?i("div",{staticClass:"menu-config"},[i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl required"},[t._v("菜单配置")]),t._v(" "),i("div",{staticClass:"rightHalf"},[t.addParent?[i("input",{directives:[{name:"model",rawName:"v-model",value:t.parentTitle,expression:"parentTitle"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入菜单名称"},domProps:{value:t.parentTitle},on:{blur:t.selectType,input:function(e){e.target.composing||(t.parentTitle=e.target.value)}}}),t._v(" "),t._m(2),t._v(" "),i("a",{staticClass:"fr menu-del",attrs:{href:"javascript:void(0)"},on:{click:t.delParent}},[t._v("删除菜单")])]:t._e(),t._v(" "),t.addChild?[i("input",{directives:[{name:"model",rawName:"v-model",value:t.childTitle,expression:"childTitle"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入菜单名称"},domProps:{value:t.childTitle},on:{blur:t.selectType,input:function(e){e.target.composing||(t.childTitle=e.target.value)}}}),t._v(" "),t._m(3),t._v(" "),i("a",{staticClass:"fr menu-del",attrs:{href:"javascript:void(0)"},on:{click:t.delChild}},[t._v("删除子菜单")])]:t._e()],2)]),t._v(" "),t.parentHide?t._e():i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl required"},[t._v("菜单内容")]),t._v(" "),i("div",{staticClass:"rightHalf"},[i("radioBtn",{attrs:{list:t.typeList,index:t.typeIndex,name:"name"},on:{selOn:t.doThrowWinResult}})],1)]),t._v(" "),t.parentHide||"1"!=t.type?t._e():i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl required"},[t._v("发送消息")]),t._v(" "),i("div",{staticClass:"rightHalf"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],attrs:{placeholder:"请输入发送消息内容...",maxlength:"150"},domProps:{value:t.message},on:{blur:t.selectType,input:function(e){e.target.composing||(t.message=e.target.value)}}})])]),t._v(" "),t.parentHide||"2"!=t.type?t._e():i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl required"},[t._v("跳转页面")]),t._v(" "),i("div",{staticClass:"rightHalf"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.urls,expression:"urls"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入url地址"},domProps:{value:t.urls},on:{blur:t.selectType,input:function(e){e.target.composing||(t.urls=e.target.value)}}})])]),t._v(" "),t.parentHide||"38"!=t.type?t._e():i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl"},[t._v("小程序跳转")]),t._v(" "),i("div",{staticClass:"rightHalf"},[i("div",{staticClass:"app_t clearfix"},[i("span",{staticClass:"fl required"},[t._v("小程序链接")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.appurl,expression:"appurl"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入小程序链接"},domProps:{value:t.appurl},on:{blur:t.selectType,input:function(e){e.target.composing||(t.appurl=e.target.value)}}}),t._v(" "),t._m(4)]),t._v(" "),i("div",{staticClass:"app_t clearfix"},[i("span",{staticClass:"fl required"},[t._v("小程序appId")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.appIds,expression:"appIds"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入小程序appId",onkeyup:"value=value.replace(/[^a-zA-Z\\d]/g,'')"},domProps:{value:t.appIds},on:{blur:t.selectType,input:function(e){e.target.composing||(t.appIds=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"app_t clearfix"},[i("span",{staticClass:"fl required"},[t._v("小程序页面路径")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.appPath,expression:"appPath"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入小程序页面路径"},domProps:{value:t.appPath},on:{blur:t.selectType,input:function(e){e.target.composing||(t.appPath=e.target.value)}}})])])]),t._v(" "),t.parentHide||"39"!=t.type?t._e():i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl required"},[t._v("推送图片")]),t._v(" "),i("div",{staticClass:"rightHalf"},[i("section",{staticClass:"clearfix",staticStyle:{"margin-bottom":"20px"}},[i("div",{staticClass:"uploadImgs fl"},[i("a",{staticClass:"addclassify fl",staticStyle:{"margin-right":"15px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),i("form",{attrs:{enctype:"multipart/form-data",id:"startImage"}},[i("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:function(e){t.upNameChange("1")}}})])]),t._v(" "),t._m(5)]),t._v(" "),""!=t.imgUrl?i("div",{staticClass:"smallimg"},[i("img",{attrs:{alt:"logo",src:t.imgUrl}})]):t._e()])]),t._v(" "),t.parentHide||"40"!=t.type?t._e():i("div",{staticClass:"online-box clearfix"},[i("span",{staticClass:"online-sub fl"}),t._v(" "),i("div",{staticClass:"rightHalf"},[i("div",{staticClass:"uploadImgs"},[i("a",{staticClass:"addclassify fl",staticStyle:{"margin-right":"15px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),i("form",{attrs:{enctype:"multipart/form-data",id:"startImage"}},[i("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:function(e){t.upNameChange("2")}}})])]),t._v(" "),t._m(6),t._v(" "),""!=t.graphicimgUrl?i("div",{staticClass:"imgshow"},[i("img",{attrs:{alt:"logo",src:t.graphicimgUrl}})]):t._e(),t._v(" "),i("div",{staticClass:"app_t clearfix"},[i("span",{staticClass:"fl required"},[t._v("推送标题")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.graphicTitle,expression:"graphicTitle"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入推送标题"},domProps:{value:t.graphicTitle},on:{blur:t.selectType,input:function(e){e.target.composing||(t.graphicTitle=e.target.value)}}}),t._v(" "),t._m(7)]),t._v(" "),i("div",{staticClass:"app_t clearfix"},[i("span",{staticClass:"fl required"},[t._v("推送链接")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.graphicUrl,expression:"graphicUrl"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入推送标题"},domProps:{value:t.graphicUrl},on:{blur:t.selectType,input:function(e){e.target.composing||(t.graphicUrl=e.target.value)}}})]),t._v(" "),i("section",{staticClass:"clearfix",staticStyle:{"margin-bottom":"20px"}},[i("a",{staticClass:"addclassify fl",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.addsencPushlanguage()}}},[t._v("增加二级图文关联")]),t._v(" "),t._m(8)]),t._v(" "),t.secondary.length>0?i("section",[i("ul",{staticClass:"title"},t._l(t.secondary,function(e,s){return i("li",{class:t.ruleIndex==s?"active":"",on:{click:function(e){t.getDetails(s)}}},[t._v("二级图文"+t._s(s+1)+"\n\t\t\t\t\t\t\t\t"),i("i",{staticClass:"deletes",on:{click:function(e){e.stopPropagation(),t.deletesecPush(t.index,s)}}})])})),t._v(" "),t._l(t.secondary,function(e,s){return t.ruleIndex==s?i("div",{staticClass:"content"},[i("div",{staticClass:"uploadImgs"},[i("a",{staticClass:"addclassify fl",staticStyle:{"margin-right":"15px"},attrs:{href:"javascript:void(0);"}},[t._v("上传图片")]),t._v(" "),i("form",{attrs:{enctype:"multipart/form-data",id:"endImage"}},[i("input",{attrs:{type:"file",id:"bg_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image",onclick:"this.value = ''"},on:{change:function(e){t.bgNameChange(s)}}})])]),t._v(" "),t._m(9,!0),t._v(" "),""!=e.imgUrl?i("div",{staticClass:"smallimg"},[i("img",{attrs:{alt:"logo",src:e.imgUrl}})]):t._e(),t._v(" "),i("div",{staticClass:"app_t clearfix"},[i("span",{staticClass:"fl required"},[t._v("推送标题")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"int.title"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入推送标题"},domProps:{value:e.title},on:{blur:t.selectType,input:function(i){i.target.composing||t.$set(e,"title",i.target.value)}}}),t._v(" "),t._m(10,!0)]),t._v(" "),i("div",{staticClass:"app_t clearfix"},[i("span",{staticClass:"fl required"},[t._v("推送链接")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.url,expression:"int.url"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入推送标题"},domProps:{value:e.url},on:{blur:t.selectType,input:function(i){i.target.composing||t.$set(e,"url",i.target.value)}}})])]):t._e()})],2):t._e()])])]):i("div",{staticClass:"menu-config"},[i("span",{staticClass:"tip"},[t._v("点击左侧菜单进行编辑操作")])]),t._v(" "),i("div",{staticClass:"menu-setMenu"},[i("a",{staticClass:"setMenu-config gray fl",attrs:{href:"javascript:void(0)"},on:{click:t.delMenu}},[t._v("删除")]),t._v(" "),i("a",{staticClass:"yellow setMenu-config fl",attrs:{href:"javascript:void(0)"},on:{click:t.saveMenu}},[t._v("保存并发布")])])]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.isShowMenuWin?i("win",{attrs:{width:591,height:248},on:{winEvent:t.winEvent}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v("新建分组菜单")]),t._v(" "),i("div",{staticClass:"menu_win",attrs:{slot:"content"},slot:"content"},[i("div",{staticClass:"menu_content_group"},[i("span",[t._v("关联用户组")]),t._v(" "),i("mul-select",{attrs:{styles:{border:"1px solid RGB(210,210,210)",margin:"9px 10px 0 0"},list:t.menuselName,selects:t.selects,name:"name",keys:"id",isradio:!0}})],1)])]):t._e()],1)],1)};s._withStripped=!0;var a=i("81a2"),n=i("f6ce"),r=i("bbb9");function u(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(a,n){try{var r=e[a](n),u=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(u).then(function(t){s("next",t)},function(t){s("throw",t)});t(u)}("next")})}}var l={data:function(){return{userData:Object,shopId:"",uploadUrl:"",menuList:[],addParent:!1,addChild:!1,parentIndex:null,childIndex:null,parentTitle:"菜单名称",childTitle:"子菜单名称",index:null,message:String,type:"1",urls:String,typeList:[],typeIndex:0,parentHide:!1,menuName:[],isShowMenuWin:!1,menuselName:[],selects:[],allMenu:[],menuIndex:0,menuId:"default",saveStatus:!0,msg_1:"示例:恭喜您,已经成功关注公众号,我们将送您100积分.正值活动期间,快去用积分兑换商品吧!",appIds:"",appPath:"",imgUrl:"",media_id:"",appurl:"",graphicTitle:"",graphicUrl:"",graphicimgUrl:"",secondary:[],ruleIndex:0,groupId:""}},mounted:function(){var t=this;this.$store.commit("setPageTools",[{name:"新建分组菜单",fn:function(){t.createNewMenu()},className:"userLabel"}]);var e=n.a.session("userShop");this.userData=e,this.shopId=e.currentShop.id,this.uploadUrl=e.uploadUrl,this.getMenu(),this.getSelfMenu(),this.getUserGroups()},methods:{winEvent:function(t){if("ok"==t){var e=!0,i=!1,s=void 0;try{for(var a,n=this.menuName[Symbol.iterator]();!(e=(a=n.next()).done);e=!0){if(a.value.matchRule==this.selects[0])return this.valiData("不能重复创建分组菜单"),!1}}catch(t){i=!0,s=t}finally{try{!e&&n.return&&n.return()}finally{if(i)throw s}}this.isShowMenuWin=!1,this.createMenuGroup()}else this.isShowMenuWin=!1},createMenuGroup:function(){var t=!0,e=!1,i=void 0;try{for(var s,a=this.menuselName[Symbol.iterator]();!(t=(s=a.next()).done);t=!0){var n=s.value;if(this.selects[0]==n.id){this.menuName.push({id:n.id,name:n.name,menuId:"newType"});break}}}catch(t){e=!0,i=t}finally{try{!t&&a.return&&a.return()}finally{if(e)throw i}}this.menuIndex=this.menuName.length,this.menuList=[],this.menuId="newType",this.matchRule=this.selects[0]},delMenu:function(){var t=this;return u(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("default"!=t.menuId){e.next=3;break}return t.valiData("默认菜单无法删除"),e.abrupt("return",!1);case 3:if("newType"!=t.menuId){e.next=9;break}return t.menuName.pop(),t.valiData("删除成功"),t.menuIndex=0,t.menuList=t.allMenu.menu,e.abrupt("return",!1);case 9:return e.next=11,a.a.delMenuGroup({data:{menuId:t.menuId,groupId:t.matchRule}});case 11:t.valiData("删除成功"),t.allMenu.conditionalmenu.splice(t.menuIndex-1,1),t.menuName.splice(t.menuIndex-1,1),t.menuIndex=0,t.menuList=t.allMenu.menu,t.menuId="default";case 17:case"end":return e.stop()}},e,t)}))()},selectMenu:function(t,e){this.menuIndex=e,"default"==t?(this.menuId="default",this.menuList=this.allMenu.menu):"newType"==t.menuId?(this.menuId=t.menuId,this.menuList=[],this.matchRule=this.selects[0]):(this.menuId=t.menuId,this.menuList=this.allMenu.conditionalmenu[e-1].menu,this.matchRule=t.matchRule)},getUserGroups:function(){var t=this;return u(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getUserGroups({data:{}});case 2:(i=e.sent)&&(t.menuselName=Object.values(i));case 4:case"end":return e.stop()}},e,t)}))()},createNewMenu:function(){var t=!0,e=!1,i=void 0;try{for(var s,a=this.menuName[Symbol.iterator]();!(t=(s=a.next()).done);t=!0){if("newType"==s.value.menuId)return this.$store.commit("setWin",{title:"操作提示",content:"请保存菜单后再创建",winType:"alert"}),!1}}catch(t){e=!0,i=t}finally{try{!t&&a.return&&a.return()}finally{if(e)throw i}}this.isShowMenuWin=!0,this.selects=[]},doThrowWinResult:function(t){this.typeIndex=t,this.selectType()},isURL:function(t){return!/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]':+!]*([^<>"''])*$/.test(t)},fucCheckLength:function(t){var e=void 0,i=0;for(e=0;e<t.length;e++)t.charCodeAt(e)>=0&&t.charCodeAt(e)<=255?i+=1:i+=2;return i},getMenu:function(){var t=this;return u(regeneratorRuntime.mark(function e(){var i,s,n,r,u,l,o,h,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getWeChatMenu({data:{}});case 2:if(!(i=e.sent)||""==i){e.next=28;break}for(t.allMenu=i,s=i.conditionalmenu.reverse(),n=[],r=!0,u=!1,l=void 0,e.prev=10,o=s[Symbol.iterator]();!(r=(h=o.next()).done);r=!0)c=h.value,n.push({name:c.groupInfo.menuName,menuId:c.groupInfo.menuId,matchRule:c.groupInfo.matchRule.group_id});e.next=18;break;case 14:e.prev=14,e.t0=e.catch(10),u=!0,l=e.t0;case 18:e.prev=18,e.prev=19,!r&&o.return&&o.return();case 21:if(e.prev=21,!u){e.next=24;break}throw l;case 24:return e.finish(21);case 25:return e.finish(18);case 26:t.menuName=n,"default"==t.menuId?(t.menuList=i.menu,t.menuIndex=0):(t.menuList=s[t.menuIndex-1].menu,t.menuId=s[t.menuIndex-1].groupInfo.menuId,t.menuIndex=t.menuName.length);case 28:case"end":return e.stop()}},e,t,[[10,14,18,26],[19,,21,25]])}))()},getSelfMenu:function(){var t=this;return u(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getSelfMenu({data:{shopId:t.userData.currentShop.id}});case 2:(i=e.sent)&&(t.typeList=i);case 4:case"end":return e.stop()}},e,t)}))()},valiData:function(t,e,i){this.$store.commit("setWin",{content:t,title:e,winType:i})},checkForm:function(){if(!this.saveStatus)return this.valiData("请勿重复保存!"),!1;var t=this.menuList,e=void 0,i=void 0;for(e=0;e<t.length;e++){if(void 0==t[e].sub_button){if("1"==t[e].type&&""==t[e].message)return this.valiData(t[e].name+"请填写消息内容！"),!1;if("2"==t[e].type&&""==t[e].url)return this.valiData(t[e].url+"请填写url地址！"),!1;if("38"==t[e].type){if(""==t[e].appid)return this.valiData(t[e].name+"请填写小程序appId！"),!1;if(""==t[e].pagepath)return this.valiData(t[e].name+"请填写小程序页面路径！"),!1;if(""==t[e].url)return this.valiData(t[e].name+"请填写小程序链接！"),!1}if("39"==t[e].type&&""==t[e].message.picUrl)return this.valiData(t[e].name+"请上传图片！"),!1;if("40"==t[e].type){if(""==t[e].message[0].PicUrl)return this.valiData(t[e].name+"图文推送请上传图片!"),!1;if(""==t[e].message[0].Title)return this.valiData(t[e].name+"图文推送请填写标题!"),!1;if(""==t[e].message[0].Url)return this.valiData(t[e].name+"图文推送请填写链接!"),!1;for(var s=1;s<t[e].message.length;s++){if(""==t[e].message[s].PicUrl)return this.valiData(t[e].name+"图文推送二级图文关联请上传图片!"),!1;if(""==t[e].message[s].Title)return this.valiData(t[e].name+"图文推送二级图文关联请填写标题!"),!1;if(""==t[e].message[s].Url)return this.valiData(t[e].name+"图文推送二级图文关联请填写链接!"),!1}}}if(void 0!=t[e].sub_button)for(i=0;i<t[e].sub_button.length;i++){if("1"==t[e].sub_button[i].type&&""==t[e].sub_button[i].message)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"请填写消息内容！"),!1;if("2"==t[e].sub_button[i].type&&""==t[e].sub_button[i].url)return this.valiData(t[e].url+"二级菜单"+t[e].sub_button[i].name+"请填写url地址！"),!1;if("38"==t[e].sub_button[i].type){if(""==t[e].sub_button[i].appid)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"请填写小程序appId！"),!1;if(""==t[e].sub_button[i].pagepath)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"请填写小程序页面路径！"),!1;if(""==t[e].sub_button[i].url)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"请填写小程序链接！"),!1}if("39"==t[e].sub_button[i].type&&""==t[e].sub_button[i].message.picUrl)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"请上传图片！"),!1;if("40"==t[e].sub_button[i].type){if(""==t[e].sub_button[i].message[0].PicUrl)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"图文推送请上传图片!"),!1;if(""==t[e].sub_button[i].message[0].Title)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"图文推送请填写标题!"),!1;if(""==t[e].sub_button[i].message[0].Url)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"图文推送请填写链接!"),!1;for(var a=1;a<t[e].sub_button[i].message.length;a++){if(""==t[e].sub_button[i].message[a].PicUrl)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"图文推送二级图文关联请上传图片!"),!1;if(""==t[e].sub_button[i].message[a].Title)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"图文推送二级图文关联请填写标题!"),!1;if(""==t[e].sub_button[i].message[a].Url)return this.valiData(t[e].name+"二级菜单"+t[e].sub_button[i].name+"图文推送二级图文关联请填写链接!"),!1}}}}return!0},saveMenu:function(){var t=this;return u(regeneratorRuntime.mark(function e(){var i,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.checkForm()){e.next=2;break}return e.abrupt("return");case 2:if(i="","default"!=t.menuId){e.next=9;break}return e.next=6,a.a.saveWeChateMenu({data:{menuData:JSON.stringify(t.menuList)}});case 6:i=e.sent,e.next=24;break;case 9:if(s="",!isNaN(t.menuId)){e.next=14;break}s=!0,e.next=19;break;case 14:return t.saveStatus=!1,e.next=17,a.a.delMenuGroup({data:{menuId:t.menuId,groupId:t.matchRule}});case 17:(s=e.sent)&&(t.saveStatus=!0);case 19:if(!s){e.next=24;break}return t.saveStatus=!1,e.next=23,a.a.saveIndividuation({data:{menuData:JSON.stringify(t.menuList),matchRule:{tag_id:t.matchRule}}});case 23:i=e.sent;case 24:i&&(t.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"保存成功！"}),t.getMenu(!0),t.saveStatus=!0,t.addParent=!1,t.addChild=!1);case 25:case"end":return e.stop()}},e,t)}))()},getDetailParent:function(t){if(this.addParent=!0,this.addChild=!1,this.Highlight(),this.parentIndex=t,this.menuList[t].sub_button&&this.menuList[t].sub_button.length>0?this.parentHide=!0:this.parentHide=!1,void 0!=t){if(this.parentTitle=this.menuList[t].name,this.type=void 0==this.menuList[t].type?"1":this.menuList[t].type,"string"==typeof this.menuList[t].message?this.message=this.menuList[t].message:this.message="",this.urls=void 0==this.menuList[t].url?"":this.menuList[t].url,this.appIds=void 0==this.menuList[t].appid?"":this.menuList[t].appid,this.appPath=void 0==this.menuList[t].pagepath?"":this.menuList[t].pagepath,this.appurl=void 0==this.menuList[t].pagepath?"":this.menuList[t].url,this.menuList[t].message instanceof Object&&(this.imgUrl=void 0==this.menuList[t].message.picUrl?"":this.menuList[t].message.picUrl,this.media_id=void 0==this.menuList[t].message.media_id?"":this.menuList[t].message.media_id),this.menuList[t].message instanceof Array&&(this.graphicTitle=this.menuList[t].message[0].Title,this.graphicUrl=this.menuList[t].message[0].Url,this.graphicimgUrl=this.menuList[t].message[0].PicUrl,this.menuList[t].message.length>1)){this.secondary=[];for(var e=1;e<this.menuList[t].message.length;e++){var i={imgUrl:this.menuList[t].message[e].PicUrl,title:this.menuList[t].message[e].Title,url:this.menuList[t].message[e].Url};this.secondary.push(i)}}var s=this.menuList[t];s.status="1",this.menuList.splice(t,1,s),this.menuList=r.a.deepCopy(this.menuList),void 0!=this.menuList[t].type?this.getTypeIndex():this.typeIndex=0}else this.parentTitle="菜单名称"},getDetailChild:function(t,e){if(this.index=t,this.childIndex=e,this.Highlight(),void 0!=this.menuList[t].sub_button?this.parentHide=!1:this.parentHide=!0,void 0!=e){if(this.childTitle=this.menuList[this.index].sub_button[e].name,this.type=this.menuList[this.index].sub_button[e].type,"string"==typeof this.menuList[this.index].sub_button[e].message?this.message=this.menuList[this.index].sub_button[e].message:this.message="",this.urls=void 0==this.menuList[this.index].sub_button[e].url?"":this.menuList[this.index].sub_button[e].url,this.appIds=void 0==this.menuList[this.index].sub_button[e].appid?"":this.menuList[this.index].sub_button[e].appid,this.appPath=void 0==this.menuList[this.index].sub_button[e].pagepath?"":this.menuList[this.index].sub_button[e].pagepath,this.appurl=void 0==this.menuList[this.index].sub_button[e].pagepath?"":this.menuList[this.index].sub_button[e].url,this.menuList[this.index].sub_button[e].message instanceof Object&&(this.imgUrl=void 0==this.menuList[this.index].sub_button[e].message.picUrl?"":this.menuList[this.index].sub_button[e].message.picUrl,this.media_id=void 0==this.menuList[this.index].sub_button[e].message.media_id?"":this.menuList[this.index].sub_button[e].message.media_id),this.menuList[this.index].sub_button[e].message instanceof Array&&(this.graphicTitle=this.menuList[this.index].sub_button[e].message[0].Title,this.graphicUrl=this.menuList[this.index].sub_button[e].message[0].Url,this.graphicimgUrl=this.menuList[this.index].sub_button[e].message[0].PicUrl,this.menuList[this.index].sub_button[e].message.length>1)){this.secondary=[];for(var i=1;i<this.menuList[this.index].sub_button[e].message.length;i++){var s={imgUrl:this.menuList[this.index].sub_button[e].message[i].PicUrl,title:this.menuList[this.index].sub_button[e].message[i].Title,url:this.menuList[this.index].sub_button[e].message[i].Url};this.secondary.push(s)}}var a=this.menuList[t].sub_button[e];a.status="1",this.menuList[t].sub_button.splice(e,1,a),this.menuList=r.a.deepCopy(this.menuList),this.getTypeIndex()}else this.childTitle="子菜单名称",this.typeIndex=0;this.addChild=!0,this.addParent=!1},selectType:function(){if(this.type=this.typeList[this.typeIndex].type,"2"==this.type&&""!=r.a.trim(this.urls)&&this.isURL(this.urls))return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"url地址格式错误！"}),!1;this.Highlight();var t={},e=[];if(this.addParent){if(this.fucCheckLength(r.a.trim(this.parentTitle))>8)return this.$store.commit("setWin",{title:"错误提示",winType:"alter",content:"菜单名称长度超出！"}),!1;if(e=r.a.deepCopy(this.menuList[this.parentIndex].sub_button),this.menuList[this.parentIndex]={},t.name=this.parentTitle,t.type=this.type,t.status="1","1"==this.type&&(t.message=this.message),"2"==this.type&&(t.url=this.urls),"38"==this.type&&(t.url=this.appurl,t.appid=this.appIds,t.pagepath=this.appPath),"39"==this.type){var i={picUrl:this.imgUrl,media_id:this.media_id};t.message=i}if("40"==this.type){var s=[],a={title:this.graphicTitle,imgUrl:this.graphicimgUrl,url:this.graphicUrl};s.push(a);var n=s.concat(this.secondary),u=[],l=!0,o=!1,h=void 0;try{for(var c,m=n[Symbol.iterator]();!(l=(c=m.next()).done);l=!0){var d=c.value,p={Title:d.title,Description:"",PicUrl:d.imgUrl,Url:d.url};u.push(p)}}catch(t){o=!0,h=t}finally{try{!l&&m.return&&m.return()}finally{if(o)throw h}}t.message=u}t.sub_button=e,this.menuList.splice(this.parentIndex,1,t)}else{if(this.fucCheckLength(r.a.trim(this.childTitle))>16)return this.$store.commit("setWin",{title:"错误提示",winType:"alter",content:"菜单名称长度超出！"}),!1;if(this.menuList[this.parentIndex].sub_button[this.childIndex]={},t.name=this.childTitle,t.type=this.type,t.status="1","1"==this.type&&(t.message=this.message),"2"==this.type&&(t.url=this.urls),"38"==this.type&&(t.url=this.appurl,t.appid=this.appIds,t.pagepath=this.appPath),"39"==this.type){var v={picUrl:this.imgUrl,media_id:this.media_id};t.message=v}if("40"==this.type){var f=[],g={title:this.graphicTitle,imgUrl:this.graphicimgUrl,url:this.graphicUrl};f.push(g);var _=f.concat(this.secondary),b=[],y=!0,x=!1,C=void 0;try{for(var I,L=_[Symbol.iterator]();!(y=(I=L.next()).done);y=!0){var w=I.value,T={Title:w.title,Description:"",PicUrl:w.imgUrl,Url:w.url};b.push(T)}}catch(t){x=!0,C=t}finally{try{!y&&L.return&&L.return()}finally{if(x)throw C}}t.message=b}this.menuList[this.parentIndex].sub_button.splice(this.childIndex,1,t)}},getTypeIndex:function(){var t=void 0;for(t=0;t<this.typeList.length;t++)this.typeList[t].type==this.type&&(this.typeIndex=t)},addParentMenu:function(){this.parentTitle="菜单名称",this.message="",this.urls="",this.addParent=!0,this.addChild=!1,this.type="1",this.Highlight(),this.menuList.push({name:this.parentTitle,type:"1",status:"1"}),this.typeIndex=0,this.parentIndex=0==this.menuList.length?0:this.menuList.length-1},addChildMenu:function(){if(this.menuList=r.a.deepCopy(this.menuList),void 0==this.menuList[this.parentIndex].sub_button&&(this.menuList[this.parentIndex].sub_button=[]),5==this.menuList[this.parentIndex].sub_button.length)return this.$store.commit("setWin",{title:"操作提示",winType:"alter",content:"最多添加5个子菜单！"}),!1;this.childTitle="子菜单名称",this.message="",this.urls="",this.addChild=!0,this.addParent=!1,this.type="1",this.Highlight(),this.menuList[this.parentIndex].sub_button.push({name:this.childTitle,type:"1",status:"1"}),this.typeIndex=0,this.childIndex=this.menuList[this.parentIndex].sub_button.length-1},delParent:function(){var t=this;this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"确认删除菜单？",callback:function(e){"ok"==e&&(t.menuList.splice(t.parentIndex,1),t.addChild=!1,t.addParent=!1,t.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"删除成功！"}))}})},delChild:function(){var t=this;this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"确认删除子菜单？",callback:function(e){"ok"==e&&(1==t.menuList[t.parentIndex].sub_button.length?(t.menuList[t.parentIndex].sub_button.splice(t.childIndex,1),delete t.menuList[t.parentIndex].sub_button):t.menuList[t.parentIndex].sub_button.splice(t.childIndex,1),t.addChild=!1,t.addParent=!1,t.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"删除成功！"}))}})},Highlight:function(){var t=void 0,e=void 0;for(t=0;t<this.menuList.length;t++)if(this.menuList[t].status="0",void 0!=this.menuList[t].sub_button)for(e=0;e<this.menuList[t].sub_button.length;e++)this.menuList[t].sub_button[e].status="0"},upNameChange:function(t){var e=this;return u(regeneratorRuntime.mark(function i(){var s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,a.a.uploadImg({data:{type:8,shopId:e.shopId},formId:"startImage"});case 2:s=i.sent,"1"==t?e.imgUrl=e.uploadUrl+s:"2"==t&&(e.graphicimgUrl=e.uploadUrl+s),e.selectType();case 5:case"end":return i.stop()}},i,e)}))()},bgNameChange:function(t){var e=this;return u(regeneratorRuntime.mark(function i(){var s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,a.a.uploadImg({data:{type:8,shopId:e.shopId},formId:"endImage"});case 2:s=i.sent,e.secondary[t].imgUrl=e.uploadUrl+s,e.selectType();case 5:case"end":return i.stop()}},i,e)}))()},addsencPushlanguage:function(){if(this.secondary.length>=5)return this.valiData("关注推送语二级图文关联最多添加5条!"),!1;this.secondary.push({imgUrl:"",title:"",url:""}),this.selectType()},deletesecPush:function(t,e){this.ruleIndex>=e&&(this.ruleIndex=0),this.secondary.splice(e,1)},getDetails:function(t){this.ruleIndex=t}},components:{radioBtn:function(){return i.e("radio_btn").then(i.bind(null,"4dfe"))},"mul-select":function(){return i.e("mul_select").then(i.bind(null,"7d09"))},win:function(){return i.e("win").then(i.bind(null,"f60a"))},addPushlan:function(){return i.e("push_language_component").then(i.bind(null,"04cf"))}}},o=(i("1224"),i("6ceb")),h=Object(o.a)(l,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"addChild",staticStyle:{width:"100%",height:"100%"},attrs:{href:"javascript:void(0);",title:"最多添加5个子菜单",draggable:"false"}},[e("i",{staticClass:"icon-menu-add"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"pre_menu_link",staticStyle:{width:"100%",height:"100%"},attrs:{href:"javascript:void(0);",title:"最多添加3个菜单",draggable:"false"}},[e("i",{staticClass:"icon-menu-add"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 字数不超过4个汉字或8个字母\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 字数不超过8个汉字或16个字母\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 仅认证公众号可配置\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 最大支持1M上传\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"handle-tips",staticStyle:{"margin-bottom":"20px"}},[e("i"),this._v(" 尺寸:680PX*480PX最佳\n\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 限20字\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 上限5篇二级图文\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"handle-tips",staticStyle:{"margin-bottom":"20px"}},[e("i"),this._v(" 尺寸:180PX*180PX最佳\n\t\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 限20字\n\t\t\t\t\t\t\t\t")])}],!1,null,"5b55a862",null);h.options.__file="src\\module\\public_number_configuration\\menu_set.vue";e.default=h.exports},"6e63":function(t,e,i){}}]);