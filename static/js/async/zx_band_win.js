(window.webpackJsonp=window.webpackJsonp||[]).push([["zx_band_win"],{"0aa5":function(e,t,s){"use strict";var i=s("f7ab");s.n(i).a},daf2:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{attrs:{id:"table"}},[s("div",{staticClass:"topTitle"},[e._v("中信银行入驻表格")]),e._v(" "),e._m(0),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("商户性质")]),e._v(" "),s("selectBtn",{attrs:{sorts:e.busisNature,name:e.busisName,selected:e.busisNatureSel},on:{emit:e.changeWxType,"update:selected":function(t){e.busisNatureSel=t}}})],1),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("商户全称")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.mchtNm,expression:"merInfo.mchtNm"}],class:{redborder:""===e.merInfo.mchtNm&&e.isRed},attrs:{type:"text",placeholder:"请输入商户全称",maxlength:"20"},domProps:{value:e.merInfo.mchtNm},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"mchtNm",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("商户简称")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.mchtCnAbbr,expression:"merInfo.mchtCnAbbr"}],class:{redborder:""===e.merInfo.mchtCnAbbr&&e.isRed},attrs:{type:"text",placeholder:"请输入商户简称",maxlength:"12"},domProps:{value:e.merInfo.mchtCnAbbr},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"mchtCnAbbr",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading"},[e._v("经营范围")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.manageScope,expression:"merInfo.manageScope"}],attrs:{type:"text",placeholder:"请输入经营范围",maxlength:"20"},domProps:{value:e.merInfo.manageScope},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"manageScope",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("商户电话")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.mchtTel,expression:"merInfo.mchtTel"}],class:{redborder:""===e.merInfo.mchtTel&&e.isRed},attrs:{type:"text",placeholder:"请输入商户电话",maxlength:"18",onkeyup:"value=value.replace(/[^0-9-]/g,'')"},domProps:{value:e.merInfo.mchtTel},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"mchtTel",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("联系人姓名")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.contact,expression:"merInfo.contact"}],class:{redborder:""===e.merInfo.contact&&e.isRed},attrs:{type:"text",placeholder:"请输入联系人姓名",maxlength:"20"},domProps:{value:e.merInfo.contact},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"contact",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("联系人电话")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.commTel,expression:"merInfo.commTel"}],class:{redborder:""===e.merInfo.commTel&&e.isRed},attrs:{type:"text",placeholder:"请输入联系人电话",maxlength:"18",onkeyup:"value=value.replace(/[^0-9-]/g,'')"},domProps:{value:e.merInfo.commTel},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"commTel",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("联系人邮箱")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.commEmail,expression:"merInfo.commEmail"}],class:{redborder:""===e.merInfo.commEmail&&e.isRed},attrs:{type:"text",placeholder:"请输入联系人邮箱"},domProps:{value:e.merInfo.commEmail},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"commEmail",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("商户种类")]),e._v(" "),s("selectBtn",{attrs:{sorts:e.busisType,name:e.busisTypeName,selected:e.busisTypeSel},on:{emit:e.changeBusisTypeSel,"update:selected":function(t){e.busisTypeSel=t}}})],1),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("营业执照编号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.licenceNo,expression:"merInfo.licenceNo"}],class:{redborder:""===e.merInfo.licenceNo&&e.isRed},attrs:{type:"text",placeholder:"请输入营业执照编号",maxlength:"22"},domProps:{value:e.merInfo.licenceNo},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"licenceNo",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading"},[e._v("税务证编号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.taxNo,expression:"merInfo.taxNo"}],attrs:{type:"text",placeholder:"请输入税务证编号",maxlength:"22"},domProps:{value:e.merInfo.taxNo},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"taxNo",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading"},[e._v("组织结构代码")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.bankLicenceNo,expression:"merInfo.bankLicenceNo"}],attrs:{type:"text",placeholder:"请输入组织结构代码",maxlength:"10"},domProps:{value:e.merInfo.bankLicenceNo},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"bankLicenceNo",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("法人姓名")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.manager,expression:"merInfo.manager"}],class:{redborder:""===e.merInfo.manager&&e.isRed},attrs:{type:"text",placeholder:"请输入法人姓名",maxlength:"20"},domProps:{value:e.merInfo.manager},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"manager",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("法人身份证")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.identityNo,expression:"merInfo.identityNo"}],class:{redborder:""===e.merInfo.identityNo&&e.isRed},attrs:{type:"text",placeholder:"请输入法人身份证",maxlength:"18"},domProps:{value:e.merInfo.identityNo},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"identityNo",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("商户所属地区")]),e._v(" "),s("selectBtn",{attrs:{sorts:e.oneArea,name:e.oneName,selected:e.oneAreaSel},on:{emit:e.changeOnearea,"update:sorts":function(t){e.oneArea=t},"update:name":function(t){e.oneName=t},"update:selected":function(t){e.oneAreaSel=t}}}),e._v(" "),s("selectBtn",{attrs:{sorts:e.twoArea,name:e.twoName,selected:e.twoAreaSel},on:{emit:e.changeTwoarea,"update:sorts":function(t){e.twoArea=t},"update:name":function(t){e.twoName=t},"update:selected":function(t){e.twoAreaSel=t}}}),e._v(" "),s("selectBtn",{attrs:{sorts:e.threeArea,name:e.threeName,selected:e.threeAreaSel},on:{emit:e.changethreearea,"update:sorts":function(t){e.threeArea=t},"update:name":function(t){e.threeName=t},"update:selected":function(t){e.threeAreaSel=t}}})],1),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("详细地址")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.addr,expression:"merInfo.addr"}],class:{redborder:""===e.merInfo.addr&&e.isRed},attrs:{type:"text",placeholder:"请输入详细地址",maxlength:"20"},domProps:{value:e.merInfo.addr},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"addr",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading"},[e._v("备注")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.memo,expression:"merInfo.memo"}],attrs:{type:"text",placeholder:"请输入备注",maxlength:"30"},domProps:{value:e.merInfo.memo},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"memo",t.target.value)}}})]),e._v(" "),e._m(1),e._v(" "),s("div",{staticClass:"content-box multi"},[s("span",{staticClass:"fl sub-heading required"},[e._v("开通微信")]),e._v(" "),s("section",{staticClass:"pay"},[s("radioBtn",{attrs:{list:e.wxList.list,index:e.wxList.flag,name:"name"},on:{selOn:e.openWx,"update:list":function(t){e.$set(e.wxList,"list",t)},"update:index":function(t){e.$set(e.wxList,"flag",t)}}})],1)]),e._v(" "),s("div",{staticClass:"content-box multi"},[s("span",{staticClass:"fl sub-heading",class:{required:0===e.wxList.flag}},[e._v("微信支付方式")]),e._v(" "),s("section",{staticClass:"pay"},[s("mulSelect",{key:"id",attrs:{list:e.wxpayList,selects:e.wxpaySelects,name:"name"},on:{selOn:e.selWx,"update:list":function(t){e.wxpayList=t},"update:selects":function(t){e.wxpaySelects=t}}})],1)]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading",class:{required:-1!=e.wxpaySelects.indexOf(2)}},[e._v("关联公众号appid")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.subAppid,expression:"merInfo.subAppid"}],attrs:{type:"text",placeholder:"商户公众号对应的appid",maxlength:"20"},domProps:{value:e.merInfo.subAppid},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"subAppid",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading"},[e._v("推荐关注公众号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.subscribeAppid,expression:"merInfo.subscribeAppid"}],attrs:{type:"text",placeholder:"请输入公众号",maxlength:"20"},domProps:{value:e.merInfo.subscribeAppid},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"subscribeAppid",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading",class:{required:0===e.wxList.flag}},[e._v("微信一级类目")]),e._v(" "),s("div",{staticClass:"statisticsList",on:{click:function(e){e.stopPropagation()}}},[s("section",{staticClass:"tableListInp chairFix",on:{click:function(t){e.wxOneshowSort(t)}}},[s("span",{staticClass:"extent",attrs:{title:e.wxOneName.name}},[e._v(e._s(e.wxOneName.name))]),e._v(" "),e._m(2)]),e._v(" "),e.wxOne?s("ul",{staticClass:"tableListUl"},e._l(e.wxOneType,function(t,i){return s("li",{key:i,attrs:{title:t.name},on:{click:function(s){e.wxOnesortselShow(t)}}},[e._v(e._s(t.name))])})):e._e()])]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading",class:{required:0===e.wxList.flag}},[e._v("微信二级类目")]),e._v(" "),s("div",{staticClass:"statisticsList",on:{click:function(e){e.stopPropagation()}}},[s("section",{staticClass:"tableListInp chairFix",on:{click:function(t){e.wxTwoshowSort(t)}}},[s("span",{staticClass:"extent",attrs:{title:e.wxTwoName.name}},[e._v(e._s(e.wxTwoName.name))]),e._v(" "),e._m(3)]),e._v(" "),e.wxTwo?s("ul",{staticClass:"tableListUl"},e._l(e.wxTwoType,function(t,i){return s("li",{key:i,attrs:{title:t.name},on:{click:function(s){e.wxTwosortselShow(t)}}},[e._v(e._s(t.name))])})):e._e()])]),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),e._m(6),e._v(" "),s("div",{staticClass:"content-box",staticStyle:{overflow:"hidden"}},[s("span",{staticClass:"fl sub-heading required"},[e._v("开通支付宝")]),e._v(" "),s("section",{staticClass:"pay"},[s("radioBtn",{attrs:{list:e.aliList.list,index:e.aliList.flag,name:"name"},on:{selOn:e.openAli,"update:list":function(t){e.$set(e.aliList,"list",t)},"update:index":function(t){e.$set(e.aliList,"flag",t)}}})],1)]),e._v(" "),s("div",{staticClass:"content-box multi",staticStyle:{overflow:"hidden"}},[s("span",{staticClass:"fl sub-heading",class:{required:0===e.aliList.flag}},[e._v("支付宝支付方式")]),e._v(" "),s("section",{staticClass:"pay"},[s("mulSelect",{key:"id",attrs:{list:e.alipayList,selects:e.alipaySelects,name:"name"},on:{selOn:e.selZfb,"update:list":function(t){e.alipayList=t},"update:selects":function(t){e.alipaySelects=t}}})],1)]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading",class:{required:0===e.aliList.flag}},[e._v("支付宝一级类目")]),e._v(" "),s("div",{staticClass:"statisticsList",on:{click:function(e){e.stopPropagation()}}},[s("section",{staticClass:"tableListInp chairFix",on:{click:e.showSort}},[s("span",{staticClass:"extent",attrs:{title:e.aliTypeName.name}},[e._v(e._s(e.aliTypeName.name))]),e._v(" "),e._m(7)]),e._v(" "),e.sortSel?s("ul",{staticClass:"tableListUl"},e._l(e.aliType,function(t,i){return s("li",{key:i,attrs:{title:t.name},on:{click:function(s){e.sortselShow(t)}}},[e._v(e._s(t.name))])})):e._e()])]),e._v(" "),e._m(8),e._v(" "),e._m(9),e._v(" "),e._m(10),e._v(" "),"1"==e.shopType.flag||"1"==e.busisTypeSel?s("div",{staticClass:"content-box multi"},[s("span",{staticClass:"fl sub-heading required"},[e._v("账户类型")]),e._v(" "),s("section",{staticClass:"pay"},[s("radioBtn",{attrs:{list:e.shopType.list,index:e.shopType.flag,name:"name"},on:{selOn:e.getShopType,"update:list":function(t){e.$set(e.shopType,"list",t)},"update:index":function(t){e.$set(e.shopType,"flag",t)}}})],1)]):e._e(),e._v(" "),"1"==e.shopType.flag?s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("开户人身份证号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.accIdeNo,expression:"merInfo.accIdeNo"}],class:{redborder:""===e.merInfo.settleAcctNm&&e.isRed},attrs:{type:"text",placeholder:"请输入开户人身份证号",maxlength:"18"},domProps:{value:e.merInfo.accIdeNo},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"accIdeNo",t.target.value)}}})]):e._e(),e._v(" "),"1"==e.shopType.flag?s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("开户人手机号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.accPhone,expression:"merInfo.accPhone"}],class:{redborder:""===e.merInfo.settleAcctNm&&e.isRed},attrs:{type:"text",onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入开户人手机号",maxlength:"11"},domProps:{value:e.merInfo.accPhone},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"accPhone",t.target.value)}}})]):e._e(),e._v(" "),s("div",{staticClass:"content-box multi"},[s("span",{staticClass:"fl sub-heading required"},[e._v("是否为中信银行账户")]),e._v(" "),s("section",{staticClass:"pay"},[s("radioBtn",{attrs:{list:e.iszxBank.list,index:e.iszxBank.flag,name:"name"},on:{selOn:e.openZx,"update:list":function(t){e.$set(e.iszxBank,"list",t)},"update:index":function(t){e.$set(e.iszxBank,"flag",t)}}})],1)]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("结算开户名")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.settleAcctNm,expression:"merInfo.settleAcctNm"}],class:{redborder:""===e.merInfo.settleAcctNm&&e.isRed},attrs:{type:"text",placeholder:"请输入结算开户名",maxlength:"30"},domProps:{value:e.merInfo.settleAcctNm},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"settleAcctNm",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("结算账户")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.settleAcct,expression:"merInfo.settleAcct"}],class:{redborder:""===e.merInfo.settleAcct&&e.isRed},attrs:{type:"text",placeholder:"请输入结算账户",maxlength:"30",onkeyup:"value=value.replace(/[^0-9]/g,'')"},domProps:{value:e.merInfo.settleAcct},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"settleAcct",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading required"},[e._v("收款银行全称")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.settleBankAllName,expression:"merInfo.settleBankAllName"}],class:{redborder:""===e.merInfo.settleBankAllName&&e.isRed},attrs:{type:"text",placeholder:"请输入收款银行全称",maxlength:"50"},domProps:{value:e.merInfo.settleBankAllName},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"settleBankAllName",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"content-box"},[s("span",{staticClass:"fl sub-heading",class:{required:1===e.iszxBank.flag}},[e._v("收款银行行号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.merInfo.settleBankCode,expression:"merInfo.settleBankCode"}],attrs:{type:"text",placeholder:"请输入收款银行行号",maxlength:"12"},domProps:{value:e.merInfo.settleBankCode},on:{input:function(t){t.target.composing||e.$set(e.merInfo,"settleBankCode",t.target.value)}}})]),e._v(" "),s("a",{staticClass:"fl yellow",staticStyle:{width:"200px","margin-left":"25px","margin-top":"50px"},attrs:{href:"javascript: void(0)"},on:{click:e.save}},[e._v("提交")])])};i._withStripped=!0;var a=s("05dd"),n=s("81a2");function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,s){return function i(a,n){try{var o=t[a](n),r=o.value}catch(e){return void s(e)}if(!o.done)return Promise.resolve(r).then(function(e){i("next",e)},function(e){i("throw",e)});e(r)}("next")})}}var r=null,l=null,c={data:function(){return{wxList:{flag:-1,list:[{id:1,name:"是"},{id:2,name:"否"}]},aliList:{flag:0,list:[{id:1,name:"是"},{id:2,name:"否"}]},iszxBank:{flag:-1,list:[{id:1,name:"是"},{id:2,name:"否"}]},wxpayList:[{id:0,name:"被扫"},{id:1,name:"主扫"},{id:2,name:"公众号支付"}],shopType:{flag:-1,list:[{id:1,name:"对公账户"},{id:2,name:"个人账户"}]},wxpaySelects:[],alipayList:[{id:0,name:"二清被扫"},{id:1,name:"二清主扫,交易创建接口"}],alipaySelects:[],busisNature:["政府机构","国营企业","私营企业","外资企业","个体工商户","事业单位"],busisName:"请选择",busisNatureSel:-1,busisType:["企业","个体工商户"],busisTypeName:"请选择",busisTypeSel:-1,oneArea:[],arr1:[],oneAreaSel:-1,oneName:"请选择所属省",twoArea:[],arr2:[],twoAreaSel:-1,twoName:"请选择所属市",threeArea:[],arr3:[],threeAreaSel:-1,threeName:"请选择所属区",aliType:[{id:20150507e8,name:"美食"},{id:0x728b6ef3f89bd,name:"超市便利店"},{id:0x728b06a50f4dd,name:"生活服务"},{id:0x728b0527933ad,name:"休闲娱乐"},{id:0x728b052792cc6,name:"购物"},{id:0x729993902bbac,name:"爱车"},{id:0x72994672ee694,name:"教育培训"},{id:0x729993902bc58,name:"医疗健康"},{id:0x728b4835b5601,name:"航旅"},{id:0x729993902bc81,name:"专业销售/批发"},{id:0x729993902bca3,name:"政府/社会组织"}],aliTypeName:{id:-1,name:"请选择一级类目"},sortSel:!1,wxOneType:[],wxOne:!1,wxOneName:{id:-1,name:"请选择一级类目",list:[]},wxTwoType:[],wxTwo:!1,wxTwoName:{id:-1,name:"请选择二级类目"},merInfo:{mchtNm:this.config?this.config.mchtNm:"",mchtCnAbbr:this.config?this.config.mchtCnAbbr:"",manageScope:this.config?this.config.manageScope:"",etpsAttr:"",etpsTp:"",mchtTel:this.config?this.config.mchtTel:"",contact:this.config?this.config.contact:"",commTel:this.config?this.config.commTel:"",commEmail:this.config?this.config.commEmail:"",licenceNo:this.config?this.config.licenceNo:"",taxNo:this.config?this.config.taxNo:"",bankLicenceNo:this.config?this.config.bankLicenceNo:"",manager:this.config?this.config.manager:"",identityNo:this.config?this.config.identityNo:"",provCode:"",cityCode:"",areaCode:"",addr:this.config?this.config.addr:"",memo:this.config?this.config.memo:"",WXActive:"",olCode1:"",subAppid:this.config?this.config.subAppid:"",subscribeAppid:this.config?this.config.subscribeAppid:"",qGroupId:"",categroryId:"",ZFBActive:"",olCodeA:"",categIdC:"",isOrNotZxMchtNo:"",settleAcctNm:this.config?this.config.settleAcctNm:"",settleAcct:this.config?this.config.settleAcct:"",settleBankAllName:this.config?this.config.settleBankAllName:"",settleBankCode:this.config?this.config.settleBankCode:"",acctType:this.config?this.config.acctType:"",accIdeNo:this.config?this.config.accIdeNo:"",accPhone:this.config?this.config.accPhone:""},isRed:!1,person:[],company:[],gov:[]}},components:{selectBtn:function(){return s.e("select_btn").then(s.bind(null,"3d41"))},radioBtn:function(){return s.e("radio_btn").then(s.bind(null,"4dfe"))},mulSelect:function(){return s.e("mul_select").then(s.bind(null,"7d09"))}},props:["config","types"],watch:{oneAreaSel:"changeOnearea",twoAreaSel:"changeTwoarea",threeAreaSel:"changethreearea",busisNatureSel:"changeWxType"},mounted:function(){var e=this;return o(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.e("zx_band_info").then(s.bind(null,"bf34"));case 2:l=(l=t.sent).default,e.person=l.person,e.company=l.company,e.gov=l.gov,document.addEventListener("click",e.close),e.$store.commit("setPageTools",[{name:"返回",className:["gray"],fn:e.back}]),e.inteConfig();case 10:case"end":return t.stop()}},t,e)}))()},created:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var i,a,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.e("zx_area").then(s.bind(null,"0025"));case 2:for(r=(r=t.sent).default.data,i=0;i<r.length;i++)(a=[]).push(r[i].id),a.push(r[i].name),e.arr1.push(a);for(n=0;n<e.arr1.length;n++)e.oneArea.push(e.arr1[n][1]),e.config.provCode==e.arr1[n][0]&&(e.oneAreaSel=n,e.oneName=e.arr1[n][1]);"810000"==e.config.cityCode&&(e.oneName="香港特别行政区",e.oneAreaSel=32),"820000"==e.config.cityCode&&(e.oneName="澳门特别行政区",e.oneAreaSel=33);case 8:case"end":return t.stop()}},t,e)}))()},destroyed:function(){document.removeEventListener("click",this.close)},methods:{close:function(){this.sortSel=!1,this.wxOne=!1,this.wxTwo=!1},getShopType:function(e){this.shopType.flag=e},inteConfig:function(){this.$nextTick(function(){if(this.config){if(this.config.etpsAttr&&(7==this.config.etpsAttr?(this.busisNatureSel=5,this.busisName="事业单位"):(this.busisNatureSel=Number(this.config.etpsAttr)-1,this.busisName=this.busisNature[Number(this.config.etpsAttr)-1])),1==this.config.etpsTp?(this.busisTypeSel=0,this.busisTypeName="企业"):2==this.config.etpsTp&&(this.busisTypeSel=1,this.busisTypeName="个体工商户"),"N"==this.config.WXActive?this.wxList.flag=1:this.wxList.flag=0,this.config.olCode1)for(var e=this.config.olCode1.split("|"),t=0;t<e.length;t++)"01"==e[t]?this.wxpaySelects.push(0):"02"==e[t]?this.wxpaySelects.push(1):"03"==e[t]&&this.wxpaySelects.push(2);if("N"==this.merInfo.ZFBActive?this.aliList.flag=1:this.aliList.flag=0,this.config.olCodeA)for(var s=this.config.olCodeA.split("|"),i=0;i<s.length;i++)"D1"==s[i]?this.alipaySelects.push(0):"D2"==s[i]&&this.alipaySelects.push(1);for(var a=0;a<this.aliType.length;a++)this.config.categIdC==this.aliType[a].id&&(this.aliTypeName=this.aliType[a]);"Y"==this.merInfo.isOrNotZxMchtNo?this.iszxBank.flag=0:this.iszxBank.flag=1,"1"==this.merInfo.acctType?this.shopType.flag=0:this.shopType.flag=1}})},back:function(){this.$emit("zxBandWin",this.config)},zxBandWin:function(){this.$emit("zxBandWin",this.config)},openZx:function(e){this.iszxBank.flag=e},openWx:function(e){this.wxList.flag=e},selWx:function(e){this.wxpaySelects=e},openAli:function(e){this.aliList.flag=e},selZfb:function(e){this.alipaySelects=e},changeBusisTypeSel:function(e){this.shopType.flag="1"==e?1:0,this.busisTypeSel=e,this.busisTypeName=this.busisType[e]},changeOnearea:function(e){this.oneAreaSel=e,this.twoArea.length=0,this.twoName="请选择所属市",this.twoAreaSel=-1,this.threeName="请选择所属区",this.threeAreaSel=-1,this.merInfo.provCode=this.arr1[this.oneAreaSel][0],this.arr2=[];for(var t=0;t<r.length;t++)if(t==e)for(var s=0;s<r[t].child.length;s++){var i=[];i.push(r[t].child[s].id),i.push(r[t].child[s].name),this.arr2.push(i)}for(var a=0;a<this.arr2.length;a++)this.twoArea.push(this.arr2[a][1]);if("810000"!=this.merInfo.provCode&&"820000"!=this.merInfo.provCode||(this.merInfo.provCode="1"),this.config)for(var n=0;n<this.arr2.length;n++)this.config.cityCode==this.arr2[n][0]&&(this.twoAreaSel=n,this.twoName=this.arr2[n][1])},changeTwoarea:function(e){if(this.twoAreaSel=e,this.threeArea.length=0,this.threeName="请选择所属区",this.threeAreaSel=-1,this.arr3=[],-1!=this.twoAreaSel){this.merInfo.cityCode=this.arr2[this.twoAreaSel][0];for(var t=0;t<r.length;t++)if(t==this.oneAreaSel)for(var s=0;s<r[t].child.length;s++)if(s==e)for(var i=0;i<r[t].child[s].child.length;i++){var a=[];a.push(r[t].child[s].child[i].id),a.push(r[t].child[s].child[i].name),this.arr3.push(a)}for(var n=0;n<this.arr3.length;n++)this.threeArea.push(this.arr3[n][1])}else this.threeArea=[];if(this.config)for(var o=0;o<this.arr3.length;o++)this.config.areaCode==this.arr3[o][0]&&(this.threeAreaSel=o,this.threeName=this.arr3[o][1])},changethreearea:function(e){this.threeAreaSel=e},changeWxType:function(e){if(this.busisNatureSel=e,this.wxOneType=[],this.wxOneName={id:-1,name:"请选择一级类目",list:[]},this.wxTwoType=[],this.wxTwoName={id:-1,name:"请选择二级类目"},0==this.busisNatureSel||5==this.busisNatureSel?this.wxOneType=this.gov:1==this.busisNatureSel||2==this.busisNatureSel||3==this.busisNatureSel?this.wxOneType=this.company:4==this.busisNatureSel&&(this.wxOneType=this.person),this.config){for(var t=0;t<this.wxOneType.length;t++)this.config.qGroupId==this.wxOneType[t].id&&(this.wxOneName=this.wxOneType[t],this.wxTwoType=this.wxOneType[t].list);for(var s=0;s<this.wxTwoType.length;s++)this.config.categroryId==this.wxTwoType[s].id&&(this.wxTwoName=this.wxTwoType[s])}},wxOnesortselShow:function(e){this.wxTwoName={id:-1,name:"请选择二级类目"},this.wxOne=!1,this.wxOneName=e,this.wxTwoType=e.list},wxOneshowSort:function(e){if(e.stopPropagation(),-1==this.busisNatureSel)return this.errorShow("请选择商户性质！"),!1;this.wxTwo=!1,this.sortSel=!1,this.wxOne=!this.wxOne},wxTwosortselShow:function(e){this.wxTwo=!1,this.wxTwoName=e},wxTwoshowSort:function(e){e.stopPropagation(),this.wxOne=!1,this.sortSel=!1,this.wxTwo=!this.wxTwo},sortselShow:function(e){this.sortSel=!1,this.aliTypeName=e},showSort:function(e){e.stopPropagation(),this.wxOne=!1,this.wxTwo=!1,this.sortSel=!this.sortSel},applyZxMerId:function(e){var t=this;return o(regeneratorRuntime.mark(function s(){var i;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,n.a.applyZxMerId({data:{merInfo:e}});case 2:(i=s.sent)&&i.secMerId&&(t.$store.commit("setWin",{winType:"alert",content:"保存成功"}),t.back());case 4:case"end":return s.stop()}},s,t)}))()},errorShow:function(e){this.$store.commit("setWin",{winType:"alert",content:e})},save:function(){if(!a.a.checkData({mchtNm:"请输入商户全称！",mchtCnAbbr:"请输入商户简称！",mchtTel:"请输入商户电话！",contact:"请输入联系人姓名！",commTel:"请输入联系人电话！",commEmail:{reg:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,pro:"请输入正确的邮箱编号！"},licenceNo:"请输入营业执照编号！",manager:"请输入法人姓名！",identityNo:"请输入法人身份证！",addr:"请输入详细地址！",settleAcctNm:"请输入结算开户名！",settleAcct:"请输入结算账号！",settleBankAllName:"请输入收款银行全称！"},this.merInfo))return!1;if(!a.a.checkData({busisNatureSel:{cond:"$$ != -1",pro:"请选择商户性质！"},busisTypeSel:{cond:"$$ != -1",pro:"请选择商户种类！"},wxList:{cond:"$$.flag != -1",pro:"请选择是否开通微信！"},aliList:{cond:"$$.flag != -1",pro:"请选择是否开通支付宝！"},iszxBank:{cond:"$$.flag != -1",pro:"请选择是否为中信银行账户！"},shopType:{cond:"$$.flag != -1",pro:"请选择账户类型"}},this))return!1;if(-1==this.oneAreaSel||-1==this.twoAreaSel||-1==this.threeAreaSel)return this.errorShow("请选择商户所属地区！"),!1;if(0===this.wxList.flag&&0===this.wxpaySelects.length)return this.errorShow("请选择微信支付方式！"),!1;if(-1!=this.wxpaySelects.indexOf(2)&&""==this.merInfo.subAppid)return this.errorShow("请输入关联公众号！"),!1;if(0===this.wxList.flag&&-1==this.wxOneName.id)return this.errorShow("请选择微信一级类目！"),!1;if(0===this.wxList.flag&&-1==this.wxTwoName.id)return this.errorShow("请选择微信二级类目！"),!1;if(1==this.wxList.flag&&1==this.aliList.flag)return this.errorShow("支付宝至少开通一项！"),!1;if(0===this.aliList.flag&&0===this.alipaySelects.length)return this.errorShow("请选择支付宝支付方式！"),!1;if(0===this.aliList.flag&&-1==this.aliTypeName.id)return this.errorShow("请选择支付宝一级类目！"),!1;if(1==this.iszxBank.flag&&!this.merInfo.settleBankCode)return this.errorShow("请填写收款银行行号！"),!1;if(1==this.shopType.flag&&""==this.accIdeNo)return this.errorShow("请输入开户人身份证号"),!1;if(1==this.shopType.flag&&""==this.accPhone)return this.errorShow("请输入开户人手机号"),!1;5==this.busisNatureSel?this.merInfo.etpsAttr=7:this.merInfo.etpsAttr=this.busisNatureSel+1,this.merInfo.etpsTp=this.busisTypeSel+1,this.merInfo.areaCode=this.arr3[this.threeAreaSel][0],0===this.wxList.flag?this.merInfo.WXActive="Y":this.merInfo.WXActive="N",0===this.wxList.flag?(this.merInfo.qGroupId=this.wxOneName.id,this.merInfo.categroryId=this.wxTwoName.id):(this.merInfo.qGroupId="",this.merInfo.categroryId=""),this.merInfo.olCode1="";for(var e=0;e<this.wxpaySelects.length;e++)0==this.wxpaySelects[e]?this.merInfo.olCode1+="01|":1==this.wxpaySelects[e]?this.merInfo.olCode1+="02|":2==this.wxpaySelects[e]?this.merInfo.olCode1+="03|":3==this.wxpaySelects[e]&&(this.merInfo.olCode1+="06|");this.merInfo.olCode1=this.merInfo.olCode1.substring(0,this.merInfo.olCode1.length-1),0===this.aliList.flag?this.merInfo.ZFBActive="Y":this.merInfo.ZFBActive="N",this.merInfo.olCodeA="";for(var t=0;t<this.alipaySelects.length;t++)0==this.alipaySelects[t]?this.merInfo.olCodeA+="D1|":1==this.alipaySelects[t]&&(this.merInfo.olCodeA+="D2|");this.merInfo.olCodeA=this.merInfo.olCodeA.substring(0,this.merInfo.olCodeA.length-1),this.merInfo.categIdC=this.aliTypeName.id,0===this.iszxBank.flag?this.merInfo.isOrNotZxMchtNo="Y":this.merInfo.isOrNotZxMchtNo="N",1==this.shopType.flag?this.merInfo.acctType=2:this.merInfo.acctType=1,this.applyZxMerId(this.merInfo)}}},h=(s("0aa5"),s("7610")),m=Object(h.a)(c,i,[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("div",{staticClass:"content-title"},[t("span",{staticClass:"titles"},[this._v("商户信息")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("div",{staticClass:"content-title"},[t("span",{staticClass:"titles"},[this._v("微信账号信息")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"fr"},[t("i")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"fr"},[t("i")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("span",{staticClass:"fl sub-heading"},[this._v("微信手续费：")]),this._v(" "),t("span",{staticClass:"sub-heading"},[this._v("0.3%")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("span",{staticClass:"fl sub-heading"},[this._v("微信结算周期：")]),this._v(" "),t("span",{staticClass:"sub-heading"},[this._v("交易日次日(n+1)")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("div",{staticClass:"content-title"},[t("span",{staticClass:"titles"},[this._v("支付宝账号信息")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"fr"},[t("i")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("span",{staticClass:"fl sub-heading"},[this._v("支付宝商户手续费：")]),this._v(" "),t("span",{staticClass:"sub-heading"},[this._v("0.3%")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("span",{staticClass:"fl sub-heading"},[this._v("支付宝结算周期：")]),this._v(" "),t("span",{staticClass:"sub-heading"},[this._v("交易日次日(n+1)")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-box"},[t("div",{staticClass:"content-title"},[t("span",{staticClass:"titles"},[this._v("银行账户信息\n\t\t\t\t")])])])}],!1,null,"5d1ac998",null);m.options.__file="src\\module\\shop_config\\zx_band_win.vue";t.default=m.exports},f7ab:function(e,t,s){}}]);