(window.webpackJsonp=window.webpackJsonp||[]).push([["member_grade_win"],{1654:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("win",{attrs:{width:550,height:571,align:"right",ok:{content:"保存"},cancel:t.cancel},on:{winEvent:t.closeWin}},[i("span",[t._v(t._s(t.title))]),t._v(" "),i("div",{staticClass:"member-win",attrs:{slot:"content"},slot:"content"},[i("div",{staticClass:"win-Title"},[i("span",{staticClass:"fl required"},[t._v("等级名称")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.gradeName,expression:"gradeName"}],staticClass:"fl",staticStyle:{width:"380px"},attrs:{type:"text",placeholder:"请输入等级",maxlength:"20"},domProps:{value:t.gradeName},on:{input:function(e){e.target.composing||(t.gradeName=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"win-concent"},[i("div",{staticClass:"win-box"},[i("span",{staticClass:"fl"},[t._v("享有折扣")]),t._v(" "),i("div",{staticClass:"fl win-toggle"},[i("on-off",{attrs:{status:t.isDiscount},on:{statusChange:function(e){return t.isDiscount=e}}})],1),t._v(" "),1==t.isDiscount?i("span",{staticClass:"fl"},[t._v("折扣率")]):t._e(),t._v(" "),1==t.isDiscount?i("input",{directives:[{name:"model",rawName:"v-model",value:t.discounts,expression:"discounts"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入折扣率",maxlength:"3"},domProps:{value:t.discounts},on:{input:function(e){e.target.composing||(t.discounts=e.target.value)}}}):t._e()]),t._v(" "),i("div",{staticClass:"win-box"},[i("span",{staticClass:"fl"},[t._v("积分翻倍")]),t._v(" "),i("div",{staticClass:"fl win-toggle"},[i("on-off",{attrs:{status:t.integral},on:{statusChange:t.doubleIntegral}})],1),t._v(" "),1==t.integral?i("section",[i("span",{staticClass:"fl"},[t._v("积分获取")]),t._v(" "),i("singleSelect",{key:"id",attrs:{index:t.result,styles:{border:"1px solid #cecdcd",marginRight:"8px"},list:t.list,name:"name"},on:{selOn:t.haveIndex}})],1):t._e()]),t._v(" "),1==t.integral&&0==t.result?i("div",{staticClass:"win-box"},[i("span",{staticClass:"fl proportion"},[t._v("设置该等级积分比例")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.cashs,expression:"cashs"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入现金",onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:"6"},domProps:{value:t.cashs},on:{input:function(e){e.target.composing||(t.cashs=e.target.value)}}}),t._v(" "),i("i",{staticClass:"fl colon"},[t._v(":")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.points,expression:"points"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入积分",onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:"8"},domProps:{value:t.points},on:{input:function(e){e.target.composing||(t.points=e.target.value)}}})]):t._e(),t._v(" "),1==t.integral&&1==t.result?i("div",{staticClass:"win-box"},[i("span",{staticClass:"fl"},[t._v("获得基础积分")]),t._v(" "),i("section",{staticClass:"sinp"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.multiples,expression:"multiples"}],staticClass:"cumulative",attrs:{type:"text",placeholder:"请输入倍数",maxlength:"6"},domProps:{value:t.multiples},on:{blur:function(e){t.formatValue("4")},input:function(e){e.target.composing||(t.multiples=e.target.value)}}}),t._v(" "),i("span",[t._v("倍")])]),t._v(" "),i("div",{staticClass:"fl handle-tips"},[i("i"),t._v(" 允许输入区间：0.01~99.99\n\t\t\t\t\t")])]):t._e(),t._v(" "),i("div",{staticClass:"win-box"},[i("span",{staticClass:"fl"},[t._v("免服务费")]),t._v(" "),i("div",{staticClass:"win-toggle fl"},[i("on-off",{attrs:{status:t.isService},on:{statusChange:function(e){return t.isService=e}}})],1)]),t._v(" "),i("div",{staticClass:"win-box"},[i("span",{staticClass:"fl"},[t._v("升级规则")]),t._v(" "),i("div",{staticClass:"win-toggle fl"},[i("on-off",{attrs:{status:t.isNext},on:{statusChange:function(e){return t.isNext=e}}})],1),t._v(" "),1==t.isNext?i("span",{staticClass:"fl"},[t._v("升级金额")]):t._e(),t._v(" "),1==t.isNext?i("input",{directives:[{name:"model",rawName:"v-model",value:t.totalCharges,expression:"totalCharges"}],staticClass:"fl",attrs:{type:"text",placeholder:"请输入充值累计金额",maxlength:"8"},domProps:{value:t.totalCharges},on:{blur:function(e){t.formatValue("1")},input:function(e){e.target.composing||(t.totalCharges=e.target.value)}}}):t._e()]),t._v(" "),1==t.isNext?i("div",{staticClass:"win-box"},[i("span",{staticClass:"fl"},[t._v("升级后等级")]),t._v(" "),""==t.gradeCName?i("span",{staticClass:"fl",staticStyle:{width:"400px","background-color":"#fff",border:"1px solid #ccc",color:"#666",cursor:"pointer"},on:{click:t.openGrade}},[t._v("选择会员等级")]):i("span",{staticClass:"fl",staticStyle:{width:"270px","background-color":"#fff",border:"1px solid #ccc",color:"#666",cursor:"pointer",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"},on:{click:t.openGrade}},[t._v(t._s(t.gradeCName))]),t._v(" "),""!=t.gradeCName?i("span",{staticClass:"fl",staticStyle:{width:"110px","background-color":"#fff",border:"1px solid #ccc",color:"#666",cursor:"pointer","margin-left":"20px"},on:{click:t.clean}},[t._v("清除等级关联")]):t._e()]):t._e(),t._v(" "),i("div",{staticClass:"interests"},[i("span",{staticClass:"fl"},[t._v("会员权益")]),t._v(" "),i("section",{staticClass:"fl",staticStyle:{width:"auto",height:"auto"}},[t.configure.length<=9?i("div",{staticStyle:{height:"40px",padding:"0",position:"relative",cursor:"pointer","margin-bottom":"10px"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"fl",staticStyle:{width:"220px",height:"36px",padding:"0",border:"1px solid #999","text-indent":"10px","margin-top":"2px"},attrs:{type:"text",placeholder:"请输入规则,限30字",maxlength:"30"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}}),t._v(" "),i("div",{staticClass:"bg",staticStyle:{border:"1px solid #999",width:"68px",float:"left",height:"36px","border-left":"none","margin-right":"10px","margin-top":"2px"},on:{click:t.saveConcont}}),t._v(" "),i("span",[t._v("最多定义10条")])]):t._e(),t._v(" "),t._l(t.configure,function(e,s){return t.configure.length>=1?i("div",{key:s,staticClass:"rlues",staticStyle:{width:"320px","min-height":"36px",border:"1px solid #999","text-align":"center","line-height":"36px",position:"relative","background-color":"#fff","margin-bottom":"25px"}},[t._v(t._s(e)+"\n\t\t\t\t\t\t\t"),i("i",{on:{click:function(e){t.delConcont(s)}}})]):t._e()})],2)]),t._v(" "),i("div",{staticClass:"win-box",staticStyle:{height:"200px","border-bottom":"none"}},[i("span",{staticClass:"fl required"},[t._v("设置图片")]),t._v(" "),i("span",{staticClass:"fl",staticStyle:{width:"110px","background-color":"#fff",border:"1px solid #ccc",color:"#666",cursor:"pointer",position:"relative"},attrs:{id:"image"}},[t._v("\n\t\t\t\t\t提交图片\n\t\t\t\t\t"),i("form",{attrs:{enctype:"multipart/form-data",id:"comForm"}},[i("input",{staticStyle:{position:"absolute",bottom:"0",height:"40px",width:"90px",opacity:"0",cursor:"pointer",left:"0"},attrs:{type:"file",id:"file_upload",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image"},on:{change:t.fileNameChange}})])]),t._v(" "),i("span",{staticClass:"fl",staticStyle:{width:"250px",color:"#666"}},[t._v("图片大小请小于1M(750 x 400最佳)")]),t._v(" "),t.fileName?i("div",{staticClass:"win-imgShow"},[i("img",{attrs:{id:"imgs",src:t.imgHost+t.fileName}})]):i("div",{staticClass:"win-imgShow"},[i("img",{attrs:{id:"imgs"}})])])])])]),t._v(" "),t.gradeWin?i("win",{attrs:{width:565,height:300,align:"center",ok:{content:"保存"}},on:{winEvent:t.chooseGrand}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v("选择等级")]),t._v(" "),i("div",{staticStyle:{padding:"20px"},attrs:{slot:"content"},slot:"content"},[i("mul-select",{attrs:{isradio:!0,list:t.gradeLists,selects:t.index,name:"name",keys:"asdaisdj",styles:{backgroundColor:"rgb(236,236,236)",marginRight:"8px"}},on:{selOn:function(e){t.index=arguments[0]}}})],1)]):t._e()],1)};s._withStripped=!0;var n=i("f6ce"),a=i("bbb9"),r=i("81a2");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(n,a){try{var r=e[n](a),o=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})}}var l={data:function(){return{gradeName:"",discount:"",totalCharge:"",isDiscount:!1,isService:!1,isNext:!1,gradeIndex:null,gradeCName:"",gradeId:null,isDefault:!1,isDefaultVip:!1,fileName:this.wfileName,imgHosts:this.imgHost,gradeWin:!1,index:[-1],gradeLists:this.gradeList,ischain:"",content:"",configure:[],integral:!1,result:0,list:[{name:"按比例",id:0},{name:"按积分规则",id:1}],cash:"",point:"",multiple:""}},props:{addEidteWin:{type:Boolean,default:!1},gid:null,memberInfo:null,gradeList:null,imgHost:{type:String,default:""},wfileName:null,type:null,title:String,brandId:null},computed:{cancel:function(){return"edit"===this.type?{content:"删除",style:{background:"#c33"}}:{content:"取消"}},totalCharges:{get:function(){return this.totalCharge},set:function(t){this.totalCharge=t.replace(/[^\d]/g,"")}},discounts:{get:function(){return this.discount},set:function(t){this.discount=t.replace(/[^\d]/g,"")}},cashs:{get:function(){return this.cash},set:function(t){this.cash=t.replace(/[^\d]/g,"")}},points:{get:function(){return this.point},set:function(t){this.point=t.replace(/[^\d]/g,"")}},multiples:{get:function(){return this.multiple},set:function(t){this.multiple=t.replace(/[^\d]/g,"")}}},methods:{formatValue:function(t){switch(t){case"1":this.totalCharge=a.a.toFloatStr(this.totalCharge,2);break;case"4":this.multiple=a.a.toFloatStr(this.multiple,2)}},chooseGrand:function(t){if("ok"==t){if(this.gradeIndex=this.index,this.gradeCName=this.gradeList[this.index].name,this.gradeId=this.gradeList[this.index].id,this.gradeId==this.gid)return this.$store.commit("setWin",{content:"不能选择自身等级！",winType:"alert",title:"提示信息"}),this.gradeCName="",this.gradeId=0,!1;this.gradeWin=!1}else this.gradeWin=!1},validata:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"alert",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"提示信息";this.$store.commit("setWin",{content:t,title:i,winType:e})},closeWin:function(t){var e=this;if("ok"==t){if(""==this.gradeName||this.gradeName.length<=0)return this.validata("请输入等级名称！"),!1;if(1==this.isDiscount&&this.discount.length<=0)return this.validata("请输入折扣率！"),!1;if(Number(this.discount)>100)return this.validata("折扣率不能大于100！"),!1;if(this.integral&&0==this.result){if(this.cash.length<=0)return this.validata("请输入等级积分比例现金!"),!1;if(Number(this.cash)<=0)return this.validata("等级积分比例现金应大于0"),!1;if(this.point.length<=0)return this.validata("请输入等级积分比例积分!"),!1;if(Number(this.point)<=0)return this.validata("等级积分比例积分应大于0"),!1}if(this.integral&&1==this.result){if(this.multiple.length<=0)return this.validata("请输入积分倍数!"),!1;if(Number(this.multiple)<=0||Number(this.multiple)>99.99)return this.validata("积分倍数输入区间0.01~99.99!"),!1}if(1==this.isNext&&this.totalCharge.length<=0)return this.validata("请输入升级金额！"),!1;if(!this.fileName)return this.validata("请上传图片"),!1;if(1==this.isDefault)for(var i=0;i<this.gradeList.length;i++)if(this.gradeList[i].id!=this.gid&&"1"==this.gradeList[i].status)return this.validata("已有默认等级,不能再次设置！"),!1;for(var s=0;s<this.gradeList.length;s++)"1"==this.gradeList[s].status&&this.gradeList[s].id==this.gradeId&&this.validata("您关联的为默认等级,该等级不会生效");"add"==this.type?this.addLevel():this.editLevel()}else"edit"!=this.type||"cancel"!=t||"0"!=this.brandId&&"3"!=this.brandId?this.$emit("isChangeEdit"):this.$store.commit("setWin",{content:"确认删除会员等级？",winType:"confirm",title:"提示信息",callback:function(t){"ok"==t&&e.delLevel()}})},delLevel:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("1"!=t.memberInfo.status){e.next=5;break}return t.validata("该会员等为默认等级,不可删除"),e.abrupt("return",!1);case 5:return e.next=7,r.a.delMemberlevel({data:{id:t.gid}});case 7:i=e.sent,t.$emit("isChangeEdit",{type:"splice",payload:{data:i}}),t.$store.commit("setWin",{content:"删除成功,1秒后关闭窗口！",title:"提示信息",winType:"alert",timerPowerOff:1e3});case 10:case"end":return e.stop()}},e,t)}))()},addLevel:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.addMemberlevel({data:{name:t.gradeName,isDiscount:Number(t.isDiscount),discount:0==Number(t.isDiscount)?"100":t.discount,isService:Number(t.isService),isNext:Number(t.isNext),totalCharge:t.totalCharge,nextLevel:t.gradeId,isDefault:Number(t.isDefault),imgName:t.fileName,interests:t.configure.join("!#!"),isDouble:Number(t.integral),pointType:t.result,point:t.point,cash:t.cash,pointMultiples:t.multiple}});case 2:i=e.sent,t.$emit("isChangeEdit",{type:"push",payload:{data:i}}),t.$store.commit("setWin",{content:"新建成功,1秒后关闭窗口！",title:"提示信息",winType:"alert",timerPowerOff:1e3});case 5:case"end":return e.stop()}},e,t)}))()},editLevel:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("0"!=t.ischain&&"3"!=t.ischain){e.next=6;break}if("1"!=Number(t.isDefaultVip)||"0.00"==t.totalCharge){e.next=4;break}return t.validata("默认等级升级金额必须为0"),e.abrupt("return",!1);case 4:return e.next=6,r.a.editMemberlevel({data:{id:t.gid,name:t.gradeName,isDiscount:Number(t.isDiscount),discount:0==Number(t.isDiscount)?"100":t.discount,isService:Number(t.isService),isNext:Number(t.isNext),totalCharge:t.totalCharge,nextLevel:t.gradeId,isDefault:Number(t.isDefault),imgName:t.fileName,interests:t.configure.join("!#!"),isDouble:Number(t.integral),pointType:t.result,point:t.point,cash:t.cash,pointMultiples:t.multiple}});case 6:t.$emit("isChangeEdit");case 7:case"end":return e.stop()}},e,t)}))()},getDetail:function(t){var e=this;return o(regeneratorRuntime.mark(function i(){var s,n,a,o;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,r.a.getMemberlevelDetail({data:{id:t}});case 2:for(s=i.sent,e.gradeName=s.name,e.discount=s.discount,e.totalCharge=s.totalCharge,e.isDiscount=Boolean(Number(s.isDiscount)),e.isService=Boolean(Number(s.isService)),e.isDefault=Boolean(Number(s.status)),e.isDefaultVip="1"==s.status,n=[],a=0;a<e.gradeList.length;a++)"0"==e.gradeList[a].status&&(n.push(e.gradeList[a]),n.length==e.gradeList.length&&(e.isDefaultVip=!0));if(e.isNext=Boolean(Number(s.isNext)),""!=s.nextLevel){for(o=0;o<e.gradeList.length;o++)e.gradeList[o].id==s.nextLevel&&(e.gradeCName=e.gradeList[o].name);e.gradeId=s.nextLevel}""!=s.interests&&(e.configure=s.interests.split("!#!")),e.integral=Boolean(Number(s.isDouble)),e.result=Number(s.pointType),e.point=s.point,e.cash=s.cash,e.multiple=s.pointMultiples;case 20:case"end":return i.stop()}},i,e)}))()},openGrade:function(){this.gradeWin=!0;for(var t=0;t<this.gradeLists.length;t++)this.gradeLists[t].id==this.gradeId&&(this.index=[t])},clean:function(){this.gradeCName="",this.gradeId=0,this.gradeIndex=null},fileNameChange:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.fileUpload({data:{type:7,shopId:n.a.session("shopId")},formId:"comForm"});case 2:i=e.sent,t.fileName=i;case 4:case"end":return e.stop()}},e,t)}))()},saveConcont:function(){return""==this.content.trim()?(this.$store.commit("setWin",{content:"请填写规则内容！",time:1e3}),!1):10==this.configure.length?(this.$store.commit("setWin",{content:"最多添加十条！",time:1e3}),!1):(this.configure.push(this.content),void(this.content=""))},delConcont:function(t){this.configure.splice(t,1),this.content=""},doubleIntegral:function(t){this.integral=t},haveIndex:function(t){this.result=t}},mounted:function(){"edit"==this.type&&this.getDetail(this.gid),this.ischain=n.a.session("userShop").currentShop.ischain},components:{"on-off":function(){return i.e("on_off").then(i.bind(null,"034b"))},win:function(){return i.e("win").then(i.bind(null,"f60a"))},"mul-select":function(){return i.e("mul_select").then(i.bind(null,"7d09"))},singleSelect:function(){return i.e("mul_select").then(i.bind(null,"7231"))}}},c=(i("2f22"),i("7610")),u=Object(c.a)(l,s,[],!1,null,"2c7b8dd1",null);u.options.__file="src\\module\\member_system\\member_grade_win.vue";e.default=u.exports},"26c3":function(t,e,i){},"2f22":function(t,e,i){"use strict";var s=i("26c3");i.n(s).a}}]);