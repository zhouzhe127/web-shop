(window.webpackJsonp=window.webpackJsonp||[]).push([["unbrand_build"],{"01c3":function(e,t,i){"use strict";i.r(t);var a=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("h3",{staticClass:"titleName"},[this._v("建立门店")]),this._v(" "),t("h3",{staticClass:"titleDashed"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"fl"},[t("i")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{staticStyle:{width:"100%",height:"40px","margin-left":"90px",color:"#929292"}},[t("img",{staticStyle:{width:"20px",height:"20px",float:"left",margin:"10px"},attrs:{src:i("1196")}}),this._v(" "),t("div",{staticStyle:{display:"inline-block","line-height":"40px"}},[this._v("最多添加三个标签")])])}],s=i("81a2"),n=i("05dd"),r=i("f6ce");function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,i){return function a(s,n){try{var r=t[s](n),o=r.value}catch(e){return void i(e)}if(!r.done)return Promise.resolve(o).then(function(e){a("next",e)},function(e){a("throw",e)});e(o)}("next")})}}var l=r.a.session("userShop"),c={data:function(){return{isNobrand:!1,iscrBrandDetial:!1,selectBrandName:"",allArea1:"请选择品牌",areaBtn1:!1,areaList1:r.a.session("shopList"),createShopName:"",createShopAddress:"",labelNameList:[],creatShopPeople:"",creatShopPhone:"",businessLicenseNum:"",businessLicenseimg:"",healthLicense:"",description:"",labelName:"",index:2,tagList:[],indexList:[],list:[{id:1,name:"直营店"},{id:2,name:"加盟店"},{id:0,name:"无品牌"}],typeList:[{type:0,name:"餐饮"},{type:1,name:"零售"}],typeIndex:-1,item:"",imglogo1:"",imglogo2:"",brandId:0}},methods:{getVipRadio:function(e){2==e?(this.allArea1="不选择",this.isNobrand=!0,this.labelNameList=[]):(this.allArea1="请选择品牌",this.isNobrand=!1),this.index=e},typeRadio:function(e){this.typeIndex=e},lsitRadio:function(e){if(e&&(this.labelNameList=e,this.indexList=e,this.labelNameList.length>3))return this.alert("提示","标签最多只能选择三个！"),this.labelNameList.splice(3,1),!1},getTagList:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.getAreaTag({data:{}});case 2:i=t.sent,e.tagList=i;case 4:case"end":return t.stop()}},t,e)}))()},imgUpload:function(e){var t=this;return o(regeneratorRuntime.mark(function i(){var a;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,s.a.bigImgUpload({data:{type:4,shopId:1},formId:"imageUpForm"});case 2:a=i.sent,t.businessLicenseimg=e.target.value,t.imglogo1=a;case 5:case"end":return i.stop()}},i,t)}))()},imgUpload2:function(e){var t=this;return o(regeneratorRuntime.mark(function i(){var a;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,s.a.bigImgUpload({data:{type:4,shopId:1},formId:"imageUpForm2"});case 2:a=i.sent,t.healthLicense=e.target.value,t.imglogo2=a;case 5:case"end":return i.stop()}},i,t)}))()},alert:function(e,t){this.$store.commit("setWin",{title:e,content:t})},showAreaList1:function(e){2!=this.index?(e.stopPropagation(),this.areaBtn1=!this.areaBtn1):this.$store.commit("setWin",{title:"操作提示",content:"无品牌门店不能选择品牌"})},selectUlArea1:function(e){this.allArea1=e.name,this.areaBtn1=!this.areaBtn1,this.brandId=e.id},addlabel:function(){if(this.labelName.length>5)return this.$store.commit("setWin",{title:"操作提示",content:"标签长度最长5位"}),!1;if(""==this.labelName)return this.$store.commit("setWin",{title:"操作提示",content:"标签名不能为空"}),!1;if(this.labelNameList.length+1>3)return this.$store.commit("setWin",{title:"操作提示",content:"标签最多只能添加3个"}),!1;for(var e=0;e<this.labelNameList.length;e++)if(this.labelName==this.labelNameList[e])return this.$store.commit("setWin",{title:"操作提示",content:"标签名重复，请重新添加。"}),!1;this.labelNameList.push(this.labelName),this.labelName=""},closeLabel:function(e){this.labelNameList.splice(e,1),this.labelNameList.length>3&&this.$store.commit("setWin",{title:"操作提示",content:"标签最多只能选择三个！"})},addTagList:function(){if(this.labelNameList.length>3)return this.$store.commit("setWin",{title:"操作提示",content:"标签最多只能选择三个！"}),this.labelNameList.splice(3,1),!1},spliceFileName:function(e){var t=e.split("\\");return t[t.length-1]},returnList:function(){this.$router.push("/brandAudit")},creatStoresSubmit:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var i,a,o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0==e.list[e.index].id||"请选择品牌"!=e.allArea1||e.iscrBrandDetial){t.next=5;break}return e.$store.commit("setWin",{title:"操作提示",content:"请选择品牌！"}),t.abrupt("return",!1);case 5:if(0==e.list[e.index].id||""!=e.selectBrandName||!e.iscrBrandDetial){t.next=8;break}return e.$store.commit("setWin",{title:"操作提示",content:"1请选择品牌！"}),t.abrupt("return",!1);case 8:if(!(e.typeIndex<0)){t.next=11;break}return e.$store.commit("setWin",{title:"操作提示",content:"店铺行业分类不能为空！"}),t.abrupt("return",!1);case 11:if(n.a.checkData({createShopName:"店铺名称不能为空！",createShopAddress:"店铺地址不能为空！",creatShopPeople:"店铺负责人不能为空！",creatShopPhone:{reg:/^1[\d]{10,10}$/,pro:"联系方式不符合规范,应为1开头的11位数字"},businessLicenseNum:"营业执照编号不能为空！",businessLicenseimg:"请上传营业执照！",description:"详细介绍不能为空！"},e)){t.next=13;break}return t.abrupt("return");case 13:if(0!=e.typeIndex||""!=e.imglogo2){t.next=16;break}return e.$store.commit("setWin",{title:"操作提示",content:"餐饮行业需上传卫生许可证！"}),t.abrupt("return",!1);case 16:return i=e.labelNameList.join(","),t.next=19,s.a.addShop({data:{ischain:e.list[e.index].id,brandId:0==e.list[e.index].id?"":e.brandId,shopName:e.createShopName,address:e.createShopAddress,areaTag:i,contactMan:e.creatShopPeople,telephone:e.creatShopPhone,licenseNum:e.businessLicenseNum,license:e.imglogo1,healthLicense:e.imglogo2,description:e.description,industry:e.typeIndex}});case 19:if(a={name:e.createShopName,address:e.createShopAddress,telephone:e.creatShopPhone,contactMan:e.creatShopPeople,status:1},0!=e.brandId)for(o in l.shopList.brand)l.shopList.brand[o].id==e.brandId&&(1==e.list[e.index].id?(a.ischain=1,l.shopList.brand[o].direct.push(a)):(a.ischain=2,l.shopList.brand[o].franchise.push(a)));else a.ischain=0,l.shopList.noBrand.push(a);r.a.session("userShop",l),window.history.go(-1);case 23:case"end":return t.stop()}},t,e)}))()}},components:{radioBtn:function(){return i.e("radio_btn").then(i.bind(null,"4dfe"))},mulSelect:function(){return i.e("mul_select").then(i.bind(null,"7d09"))}},mounted:function(){r.a.session("shopList",null),r.a.session("shopIn")&&(this.item=r.a.session("shopIn"),this.iscrBrandDetial=!0,this.selectBrandName=this.item.name,this.brandId=this.item.id,this.index=0,this.list.pop()),this.getTagList()}},p=(i("569b"),i("d801")),d=Object(p.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"creatStores"},[e._m(0),e._v(" "),a("section",{staticClass:"oLeft"},[a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("店铺类型")]),e._v(" "),a("radio-btn",{staticStyle:{width:"auto"},attrs:{list:e.list,index:e.index,styleObj:{backgroundColor:"#F1F1F1"},name:"name"},on:{selOn:e.getVipRadio}})],1),e._v(" "),a("section",{staticClass:"obox",staticStyle:{position:"relative"}},[e.isNobrand?a("div",{staticClass:"oZhe"}):e._e(),e._v(" "),e.iscrBrandDetial?[a("h2",{staticClass:"required"},[e._v("品牌名称")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectBrandName,expression:"selectBrandName"}],staticClass:"input",attrs:{disabled:"disabled",type:"text",maxlength:"15",placeholder:"输入名称"},domProps:{value:e.selectBrandName},on:{input:function(t){t.target.composing||(e.selectBrandName=t.target.value)}}})]:[a("h2",{staticClass:"required"},[e._v("选择品牌")]),e._v(" "),a("section",{staticClass:"statisticsList fl",staticStyle:{"margin-right":"40px"}},[a("section",{staticClass:"tableListInp",on:{click:e.showAreaList1}},[a("span",{staticClass:"oSpan"},[e._v(e._s(e.allArea1))]),e._v(" "),e._m(1)]),e._v(" "),e.areaBtn1?a("ul",{staticClass:"tableListUl"},e._l(e.areaList1,function(t,i){return a("li",{key:i,on:{click:function(i){e.selectUlArea1(t)}}},[e._v(e._s(t.name))])})):e._e()])]],2),e._v(" "),a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("店铺名称")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createShopName,expression:"createShopName"}],staticClass:"input",attrs:{type:"text",maxlength:"30",placeholder:"请输入店铺名称"},domProps:{value:e.createShopName},on:{input:function(t){t.target.composing||(e.createShopName=t.target.value)}}})]),e._v(" "),a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("行业分类")]),e._v(" "),a("radio-btn",{staticStyle:{width:"auto"},attrs:{list:e.typeList,index:e.typeIndex,styleObj:{backgroundColor:"#F1F1F1"},name:"name"},on:{selOn:e.typeRadio}})],1),e._v(" "),a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("店铺地址")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createShopAddress,expression:"createShopAddress"}],staticClass:"input",attrs:{type:"text",maxlength:"50",placeholder:"请输入店铺地址"},domProps:{value:e.createShopAddress},on:{input:function(t){t.target.composing||(e.createShopAddress=t.target.value)}}})]),e._v(" "),a("section",{staticClass:"obox",staticStyle:{position:"relative"}},[e.isNobrand?a("div",{staticClass:"oZhe"}):e._e(),e._v(" "),a("h2",{staticStyle:{float:"left",width:"80px",height:"40px","line-height":"40px","text-align":"right","margin-right":"10px"}},[e._v("标签")]),e._v(" "),a("div",{staticClass:"addinput"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.labelName,expression:"labelName"}],staticClass:"input",staticStyle:{width:"115px",height:"30px","line-height":"30px",border:"none"},attrs:{type:"text",maxlength:"5",placeholder:"请输入标签"},domProps:{value:e.labelName},on:{input:function(t){t.target.composing||(e.labelName=t.target.value)}}}),e._v(" "),a("div",{staticClass:"oDiv",on:{click:function(t){e.addlabel()}}},[a("img",{staticStyle:{margin:"8px"},attrs:{src:i("363e"),alt:""}})])]),e._v(" "),e._l(e.labelNameList,function(t,s){return a("div",{key:s,staticClass:"labeldetial"},[a("div",{staticClass:"dClose",on:{click:function(t){e.closeLabel(s)}}},[a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:i("9ed1")}})]),e._v(" "),a("h3",{staticStyle:{padding:"0 10px",height:"40px",float:"left",cursor:"pointer"}},[e._v(e._s(t))])])})],2),e._v(" "),a("section",{staticClass:"obox",staticStyle:{position:"relative",height:"80px"}},[e.isNobrand?a("div",{staticClass:"oZhe",staticStyle:{height:"75px"}}):e._e(),e._v(" "),a("div",{staticStyle:{"margin-left":"90px"}},[a("mul-select",{attrs:{styles:{backgroundColor:"#F1F1F1"},list:e.tagList,name:"name",isradio:!1,selects:e.indexList,keys:"name"},on:{selOn:e.lsitRadio}})],1),e._v(" "),e._m(2)])]),e._v(" "),a("section",{staticClass:"oLeft"},[a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("店铺负责人")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShopPeople,expression:"creatShopPeople"}],staticClass:"input",attrs:{type:"text",maxlength:"10",placeholder:"请输入店铺负责人"},domProps:{value:e.creatShopPeople},on:{input:function(t){t.target.composing||(e.creatShopPeople=t.target.value)}}})]),e._v(" "),a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("联系方式")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.creatShopPhone,expression:"creatShopPhone"}],staticClass:"input",attrs:{type:"text",maxlength:"11",placeholder:"请输入店铺联系方式"},domProps:{value:e.creatShopPhone},on:{input:function(t){t.target.composing||(e.creatShopPhone=t.target.value)}}})]),e._v(" "),a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("营业执照编号")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.businessLicenseNum,expression:"businessLicenseNum"}],staticClass:"input",attrs:{maxlength:"50",type:"text",placeholder:"请输入营业执照号"},domProps:{value:e.businessLicenseNum},on:{input:function(t){t.target.composing||(e.businessLicenseNum=t.target.value)}}})]),e._v(" "),a("form",{staticClass:"fr",staticStyle:{width:"100%"},attrs:{id:"imageUpForm",enctype:"multipart/form-data"}},[a("section",{staticClass:"obox",staticStyle:{position:"relative"}},[a("h2",{staticClass:"required"},[e._v("上传营业执照")]),e._v(" "),a("a",{staticClass:"blue",staticStyle:{width:"120px",height:"40px","line-height":"40px","margin-top":"-5px"},attrs:{href:"javascript:void(0);"}},[e._v("立刻上传")]),e._v(" "),a("input",{staticStyle:{cursor:"pointer",display:"block",position:"absolute",left:"110px",top:"-5px",width:"120px",height:"40px",opacity:"0",background:"red"},attrs:{type:"file",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image"},on:{change:e.imgUpload}}),e._v(" "),""!==e.businessLicenseimg?a("div",{staticStyle:{display:"inline-block"}},[a("span",[e._v("( 已上传：")]),e._v(" "),a("span",[e._v(e._s(e.spliceFileName(e.businessLicenseimg)))]),e._v(" "),a("span",[e._v(" )")])]):e._e()])]),e._v(" "),a("form",{directives:[{name:"show",rawName:"v-show",value:0==e.typeIndex,expression:"typeIndex == 0"}],staticClass:"fr",staticStyle:{width:"100%"},attrs:{id:"imageUpForm2",enctype:"multipart/form-data"}},[a("section",{staticClass:"obox",staticStyle:{position:"relative"}},[a("h2",{staticClass:"required"},[e._v("卫生许可证")]),e._v(" "),a("a",{staticClass:"blue",staticStyle:{width:"120px",height:"40px","line-height":"40px","margin-top":"-5px"},attrs:{href:"javascript:void(0);"}},[e._v("立刻上传")]),e._v(" "),a("input",{staticStyle:{cursor:"pointer",display:"block",position:"absolute",left:"110px",top:"-5px",width:"120px",height:"40px",opacity:"0",background:"red"},attrs:{type:"file",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image"},on:{change:e.imgUpload2}}),e._v(" "),""!==e.healthLicense?a("div",{staticStyle:{display:"inline-block"}},[a("span",[e._v("( 已上传：")]),e._v(" "),a("span",[e._v(e._s(e.spliceFileName(e.healthLicense)))]),e._v(" "),a("span",[e._v(" )")])]):e._e()])]),e._v(" "),a("section",{staticClass:"obox"},[a("h2",{staticClass:"required"},[e._v("详细介绍")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"description"}],staticClass:"describe",staticStyle:{width:"324px",height:"90px",border:"1px solid #bbbbbb"},attrs:{maxlength:"50",placeholder:"请输入详情介绍，不多于50个字"},domProps:{value:e.description},on:{input:function(t){t.target.composing||(e.description=t.target.value)}}})])]),e._v(" "),a("section",{staticStyle:{width:"100%"}},[a("a",{staticClass:"gray return",attrs:{href:"javascript:void(0);"},on:{click:e.returnList}},[e._v("返回")]),e._v(" "),a("a",{staticClass:"yellow nextsubmit",attrs:{href:"javascript:void(0);"},on:{click:e.creatStoresSubmit}},[e._v("提交")])])])},a,!1,null,"0b48392c",null);t.default=d.exports},1196:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABkCAIAAAAUt7kAAAAFIUlEQVR4Ae3c2U4kMQyF4Wlo9k3w/k+IuEDsOxOpRy3zVZRyMbeeqzg5WervyHZSxay+v7///N+/RSOsVqv8bIy8qC+zfH19xRqGwozKbnmnW1uVYwIrfs+xetP69vYWZTs7P9Dv7u7GVsrj6RiKvszLRJj0HZusCnO6qh8PPB66WrcEitoWxYJCUVsAaystalsUCwq/iQbj4XGlT09PUY/58vISWz8/P6PJUIeHh7F1b28vmkdHR9FEvChWMO80L6m9FlFny0UtSyrqilqkkS0XtSypqPtNNHh/f49D4NEfHx9j6+vrazTx9xwPccOY5Og46f39/TgRweH4+HjQylBR2S3XXutimaksajOAus1FrYtlprKozQDqNq+7teNKosHz83PUPzw8RBMxCT0uPHZsZWIFPpuRx1EIMSMTKwg7rKqZtdemTOZrito8o6miqE2ZzNcUtXlGU8Wa/HujwO/iaG9ubuJAHx8f0aTMjQ2tvAqgleud8/PzKFivf4Sy8R0Uj8AR5eDgII5MNEDcVlV7LeLKlotallTUFbVII1suallSUbfeOH5iAqkzd0G4cEIHJkPhaPHouH/EV1dXcemU8dmcWFgGrXd3d3E0wg7nmaasvRZxZctFLUsq6opapJEtF7Usqaj7l14TDcizSay53sH9MxQnB25s6ItHp/X+/j4uHSdNyGIZiFkGt1uIMdsT1V6LP0S2XNSypKKuqEUa2XJRy5KKuh+XLdsGPCuHAVL2ba9NARdOuo/JUMQZLnDI4En3eV3NyMxLX6IQwZCjQnvM2mv86CmzqKUwISpqAEmZRS2FCdG/aIALJ3Umz2YIXCl+Fwc/vhribS7m6elpnPr6+jqaPAImR5TYcVrmHglBizO112CSMotaChOiogaQlFnUUpgQ9d8i4ztxf3h0RsQcZ+GICSz0Jc4gxv1j8kQ8wlg87Vt7jR8uZRa1FCZERQ0gKbOopTAh6t8U4WjpM76T4SDBpRNHBb444oaeaMC3TGTwOHiWQUAbBxZaGbnRqL3GlkiZRS2FCVFRA0jKLGopTIj60QA3TB9MHDxueBw6uAsiODARQ419NgGN7J8HJPsfL6OtqvYaP03KLGopTIiKGkBSZlFLYULU/8L08vIy6kjKyeDxu3hWEuuLi4s4Mn6X9xXMiwtn5PEyiAYcFVhGXGG3XHuti2WmsqjNAOo2F7UulpnKojYDqNvcf4tM2s23PfhdDgM4Wk4OuHDWxMdLHAb4tofPQokVzMuauWXiv7HgDxt4wDZR7TV+uJRZ1FKYEBU1gKTMopbChKh/U4QrPTk5id3GX3oSDThIjLNwvDIHCU4OuP+4wlYmoI1bWdXZ2VnUc65oTbXXIp9suahlSUVdUYs0suWiliUVdf1ogAvndp9oQOo8Nsn+CR38mds4+4+P0cr4bM4VTIS/59TBUDxRizO114CfMotaChOiogaQlFnUUpgQpf4PU7Lwsc/mT7dwpcQZ/C4Tcb2DGBMxJtk/L0YIDowMsmbWXpsyma8pavOMpoqiNmUyX1PU5hlNFaloMO0Wa7iDv729ja0EB5x0VLYy1zt4ZW6KaOV2i/MMf7lGcODkwKqIUS2+1V4DUcosailMiIoaQFJmUUthQvSbaDD26PhObmwWmbh/3ioQOnD/XP6M/T1QxmZ7wNprY0T91qLW5zKuLWpjPv3WotbnMq5NRQNuezAXOVoiCX1J91k6cYa+iDFZM+Z4XsRt3tpr4E2ZRS2FCdFfD60WKpNyL5cAAAAASUVORK5CYII="},"363e":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUUyRTNBN0QwQkJBMTFFN0E2NTc5MTBCNzc5QTI5N0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUUyRTNBN0UwQkJBMTFFN0E2NTc5MTBCNzc5QTI5N0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RTJFM0E3QjBCQkExMUU3QTY1NzkxMEI3NzlBMjk3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RTJFM0E3QzBCQkExMUU3QTY1NzkxMEI3NzlBMjk3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjspjBAAAACHSURBVHjaYvw+WY6BTFAPpRtZKDCgAcZhotQAILBgotCAHUAcwESpAUD8kwlJQT05BoA4LFgUNJJiACxgLZAUNKC5iKABMJeABDcAsQeSQQxY2FgNgBnyEyq5Hog9sWjGawByOgFJBgLxdixq8BqAnthgBu0gxQCYdxjQDIJ5jZEYA0AAIMAARNkrEMCy+bUAAAAASUVORK5CYII="},"4b3a":function(e,t,i){},"4ece":function(e,t,i){"use strict";var a=i("4b3a");i.n(a).a},"569b":function(e,t,i){"use strict";var a=i("7a2b");i.n(a).a},"7a2b":function(e,t,i){},"9ed1":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATVJREFUeNq0l9ENgjAQQMvFfxmBDdQf/cXoAI7CKI7CACb21x/FDRxBJ8CrFkKAQnt3bXIhaZu8R3u5S5P7YZsqpdbqP6rN5fZWkcbjuMvwY0IhR4MFX21o3JBGAhtO1WEp6O1ZxRCwYI2x7M4b+AvjE0vAAX7+4Hj2Bp7HEJgA5+2xo0AlLTAFbpK6vXNJAR/wIOEkBHzBY9nOEggBj8KpAqFgJzxUgAKehPsKUMFmJHVdc5KowCgpYG/4VInsDW/w7LF7XAEZHATvCBSO5VNoOwZC5To7lsvQSgjMkslqx8AsmXtOKQYG2CSX5vQC4NZqTi8AiSZBFQCpJkERAAkwVQCkwBQBkASHCoA0OEQA7BNGFOwj0Px5FgPsITDIdlHwXDte2MfbPvYr1QjY3Mqaua8AAwDdBypa1zOAWQAAAABJRU5ErkJggg=="},a495:function(e,t,i){"use strict";i.r(t);var a=i("81a2"),s=i("05dd"),n=i("f6ce");function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,i){return function a(s,n){try{var r=t[s](n),o=r.value}catch(e){return void i(e)}if(!r.done)return Promise.resolve(o).then(function(e){a("next",e)},function(e){a("throw",e)});e(o)}("next")})}}var o=n.a.session("userShop"),l={data:function(){return{xx:{yy:""},isNobrand:!1,iscrBrandDetial:!1,selectBrandName:"",allArea1:"请选择品牌",areaBtn1:!1,areaList1:n.a.session("shopList"),createShopName:"",createShopAddress:"",labelNameList:[],creatShopPeople:"",creatShopPhone:"",businessLicenseNum:"",businessLicenseimg:"",healthLicense:"",description:"",labelName:"",index:2,tagList:[],indexList:[],typeList:[{type:0,name:"餐饮"},{type:1,name:"零售"}],typeIndex:-1,item:"",imglogo1:"",imglogo2:"",brandId:null,rules:{shopType:[{required:!0,message:"请选择店铺类型",trigger:"change"}],yy:[{required:!0,message:"请输入店铺名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}]}}},methods:{getVipRadio:function(e){2==e?(this.allArea1="不选择",this.isNobrand=!0,this.labelNameList=[]):(this.allArea1="请选择品牌",this.isNobrand=!1),this.index=e},typeRadio:function(e){this.typeIndex=e},lsitRadio:function(e){if(e&&(this.labelNameList=e,this.indexList=e,this.labelNameList.length>3))return this.alert("提示","标签最多只能选择三个！"),this.labelNameList.splice(3,1),!1},getTagList:function(){var e=this;return r(regeneratorRuntime.mark(function t(){var i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.getAreaTag({data:{}});case 2:i=t.sent,e.tagList=i;case 4:case"end":return t.stop()}},t,e)}))()},imgUpload:function(e){var t=this;return r(regeneratorRuntime.mark(function i(){var s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,a.a.bigImgUpload({data:{type:4,shopId:1},formId:"imageUpForm"});case 2:s=i.sent,t.businessLicenseimg=e.target.value,t.imglogo1=s;case 5:case"end":return i.stop()}},i,t)}))()},imgUpload2:function(e){var t=this;return r(regeneratorRuntime.mark(function i(){var s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,a.a.bigImgUpload({data:{type:4,shopId:1},formId:"imageUpForm2"});case 2:s=i.sent,t.healthLicense=e.target.value,t.imglogo2=s;case 5:case"end":return i.stop()}},i,t)}))()},alert:function(e,t){this.$store.commit("setWin",{title:e,content:t})},showAreaList1:function(e){2!=this.index?(e.stopPropagation(),this.areaBtn1=!this.areaBtn1):this.$store.commit("setWin",{title:"操作提示",content:"无品牌门店不能选择品牌"})},selectUlArea1:function(e){this.allArea1=e.name,this.areaBtn1=!this.areaBtn1,this.brandId=e.id},addlabel:function(){if(this.labelName.length>5)return this.$store.commit("setWin",{title:"操作提示",content:"标签长度最长5位"}),!1;if(""==this.labelName)return this.$store.commit("setWin",{title:"操作提示",content:"标签名不能为空"}),!1;if(this.labelNameList.length+1>3)return this.$store.commit("setWin",{title:"操作提示",content:"标签最多只能添加3个"}),!1;for(var e=0;e<this.labelNameList.length;e++)if(this.labelName==this.labelNameList[e])return this.$store.commit("setWin",{title:"操作提示",content:"标签名重复，请重新添加。"}),!1;this.labelNameList.push(this.labelName),this.labelName=""},closeLabel:function(e){this.labelNameList.splice(e,1),this.labelNameList.length>3&&this.$store.commit("setWin",{title:"操作提示",content:"标签最多只能选择三个！"})},addTagList:function(){if(this.labelNameList.length>3)return this.$store.commit("setWin",{title:"操作提示",content:"标签最多只能选择三个！"}),this.labelNameList.splice(3,1),!1},spliceFileName:function(e){var t=e.split("\\");return t[t.length-1]},returnList:function(){this.$router.push("/brandAudit")},creatStoresSubmit:function(){var e=this;return r(regeneratorRuntime.mark(function t(){var i,r,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0==e.list[e.index].id||"请选择品牌"!=e.allArea1||e.iscrBrandDetial){t.next=5;break}return e.$store.commit("setWin",{title:"操作提示",content:"请选择品牌！"}),t.abrupt("return",!1);case 5:if(0==e.list[e.index].id||""!=e.selectBrandName||!e.iscrBrandDetial){t.next=8;break}return e.$store.commit("setWin",{title:"操作提示",content:"1请选择品牌！"}),t.abrupt("return",!1);case 8:if(!(e.typeIndex<0)){t.next=11;break}return e.$store.commit("setWin",{title:"操作提示",content:"店铺行业分类不能为空！"}),t.abrupt("return",!1);case 11:if(s.a.checkData({createShopName:"店铺名称不能为空！",createShopAddress:"店铺地址不能为空！",creatShopPeople:"店铺负责人不能为空！",creatShopPhone:{reg:/^1[\d]{10,10}$/,pro:"联系方式不符合规范,应为1开头的11位数字"},businessLicenseNum:"营业执照编号不能为空！",businessLicenseimg:"请上传营业执照！",description:"详细介绍不能为空！"},e)){t.next=13;break}return t.abrupt("return");case 13:if(0!=e.typeIndex||""!=e.imglogo2){t.next=16;break}return e.$store.commit("setWin",{title:"操作提示",content:"餐饮行业需上传卫生许可证！"}),t.abrupt("return",!1);case 16:return i=e.labelNameList.join(","),t.next=19,a.a.addShop({data:{ischain:e.list[e.index].id,brandId:0==e.list[e.index].id?"":e.brandId,shopName:e.createShopName,address:e.createShopAddress,areaTag:i,contactMan:e.creatShopPeople,telephone:e.creatShopPhone,licenseNum:e.businessLicenseNum,license:e.imglogo1,healthLicense:e.imglogo2,description:e.description,industry:e.typeIndex}});case 19:if(r={name:e.createShopName,address:e.createShopAddress,telephone:e.creatShopPhone,contactMan:e.creatShopPeople,status:1},0!=e.brandId)for(l in o.shopList.brand)o.shopList.brand[l].id==e.brandId&&(1==e.list[e.index].id?(r.ischain=1,o.shopList.brand[l].direct.push(r)):(r.ischain=2,o.shopList.brand[l].franchise.push(r)));else r.ischain=0,o.shopList.noBrand.push(r);n.a.session("userShop",o),window.history.go(-1);case 23:case"end":return t.stop()}},t,e)}))()}},components:{radioBtn:function(){return i.e("radio_btn").then(i.bind(null,"4dfe"))},mulSelect:function(){return i.e("mul_select").then(i.bind(null,"7d09"))}},mounted:function(){n.a.session("shopList",null),n.a.session("shopIn")&&(this.item=n.a.session("shopIn"),this.iscrBrandDetial=!0,this.selectBrandName=this.item.name,this.brandId=this.item.id,this.index=0,this.list.pop()),this.getTagList()}},c=(i("4ece"),i("d801")),p=Object(c.a)(l,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"creatStores"},[e._m(0),e._v(" "),i("section",{staticClass:"oLeft"},[i("el-form",{attrs:{model:e.xx,rules:e.rules,"label-position":"right","label-width":"90px"}},[i("el-form-item",{attrs:{label:"店铺类型",required:""}},[i("el-radio-group",{attrs:{required:""},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},[i("el-radio-button",{attrs:{label:"1"}},[e._v("直营店")]),e._v(" "),i("el-radio-button",{attrs:{label:"2"}},[e._v("加盟店")]),e._v(" "),i("el-radio-button",{attrs:{label:"0"}},[e._v("无品牌")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"选择品牌",required:""}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.brandId,callback:function(t){e.brandId=t},expression:"brandId"}},e._l(e.areaList1,function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"店铺名称",prop:"yy"}},[i("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.xx.yy,callback:function(t){e.$set(e.xx,"yy",t)},expression:"xx.yy"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"行业分类",required:""}},[i("el-radio-group",{model:{value:e.typeIndex,callback:function(t){e.typeIndex=t},expression:"typeIndex"}},[i("el-radio",{attrs:{label:"0",border:""}},[e._v("餐饮")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")]),e._v(" "),i("el-radio",{attrs:{label:"1",border:""}},[e._v("零售")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"店铺地址",required:""}},[i("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.createShopAddress,callback:function(t){e.createShopAddress=t},expression:"createShopAddress"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"标签"}},[i("el-input",{staticClass:"input-add-tag",attrs:{placeholder:"请输入内容"},model:{value:e.labelName,callback:function(t){e.labelName=t},expression:"labelName"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-check"},on:{click:e.addlabel},slot:"append"})],1),e._v(" "),e._l(e.labelNameList,function(t,a){return i("el-tag",{key:a,staticStyle:{"margin-left":"10px"},attrs:{type:"success",closable:""}},[e._v(e._s(t))])}),e._v(" "),e.isNobrand?e._e():i("div",e._l(e.tagList,function(t,a){return i("el-checkbox",{key:a,attrs:{label:t.name,border:"",size:"medium"},model:{value:t.select,callback:function(i){e.$set(t,"select",i)},expression:"v.select"}})})),e._v(" "),e.labelNameList.length>=3?i("el-alert",{staticClass:"sd-alert",attrs:{title:"最多添加三个标签",type:"warning",center:"","show-icon":""}}):e._e()],2)],1)],1),e._v(" "),i("section",{staticClass:"oLeft"},[i("el-form",{attrs:{rules:e.rules,"label-position":"right","label-width":"110px"}},[i("el-form-item",{attrs:{label:"店铺负责人"}},[i("el-input",{attrs:{placeholder:"请输入店铺负责人",clearable:""},model:{value:e.creatShopPeople,callback:function(t){e.creatShopPeople=t},expression:"creatShopPeople"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"联系方式"}},[i("el-input",{attrs:{placeholder:"请输入店铺联系方式",clearable:""},model:{value:e.creatShopPhone,callback:function(t){e.creatShopPhone=t},expression:"creatShopPhone"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"营业执照编号"}},[i("el-input",{attrs:{placeholder:"请输入营业执照号",clearable:""},model:{value:e.businessLicenseNum,callback:function(t){e.businessLicenseNum=t},expression:"businessLicenseNum"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"上传营业执照"}},[i("form",{staticClass:"fr",staticStyle:{width:"100%"},attrs:{id:"imageUpForm",enctype:"multipart/form-data"}},[i("form",{staticClass:"fr",staticStyle:{width:"100%"},attrs:{id:"imageUpForm",enctype:"multipart/form-data"}},[i("section",{staticClass:"obox",staticStyle:{position:"relative"}},[i("el-button",{attrs:{type:"success"}},[e._v("立刻上传")]),e._v(" "),i("input",{staticStyle:{cursor:"pointer",display:"block",position:"absolute",left:"110px",top:"-5px",width:"120px",height:"40px",opacity:"0",background:"red"},attrs:{type:"file",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image"},on:{change:e.imgUpload}}),e._v(" "),""!==e.businessLicenseimg?i("div",{staticStyle:{display:"inline-block"}},[i("span",[e._v("( 已上传：")]),e._v(" "),i("span",[e._v(e._s(e.spliceFileName(e.businessLicenseimg)))]),e._v(" "),i("span",[e._v(" )")])]):e._e()],1)])])]),e._v(" "),0==e.typeIndex?i("el-form-item",{attrs:{label:"卫生许可证"}},[i("form",{directives:[{name:"show",rawName:"v-show",value:0==e.typeIndex,expression:"typeIndex == 0"}],staticClass:"fr",staticStyle:{width:"100%"},attrs:{id:"imageUpForm2",enctype:"multipart/form-data"}},[i("section",{staticClass:"obox",staticStyle:{position:"relative"}},[i("el-button",{attrs:{type:"success"}},[e._v("立刻上传")]),e._v(" "),i("input",{staticStyle:{cursor:"pointer",display:"block",position:"absolute",left:"110px",top:"-5px",width:"120px",height:"40px",opacity:"0",background:"red"},attrs:{type:"file",accept:"image/jpeg,image/png,image/gif,image/tiff",name:"image"},on:{change:e.imgUpload2}}),e._v(" "),""!==e.healthLicense?i("div",{staticStyle:{display:"inline-block"}},[i("span",[e._v("( 已上传：")]),e._v(" "),i("span",[e._v(e._s(e.spliceFileName(e.healthLicense)))]),e._v(" "),i("span",[e._v(" )")])]):e._e()],1)])]):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"详细介绍"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1)],1)],1),e._v(" "),i("section",{staticStyle:{width:"100%",clear:"both"}},[i("div",{staticClass:"footerSubmit"},[i("el-button",{attrs:{type:"info"},on:{click:e.returnList}},[e._v("返回")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.creatStoresSubmit}},[e._v("提交")])],1)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("h3",{staticClass:"titleName"},[this._v("建立门店")]),this._v(" "),t("h3",{staticClass:"titleDashed"})])}],!1,null,"79a75550",null);t.default=p.exports}}]);