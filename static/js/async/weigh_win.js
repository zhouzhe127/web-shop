(window.webpackJsonp=window.webpackJsonp||[]).push([["weigh_win"],{"11fa":function(t,i,e){},"36b0":function(t,i,e){"use strict";var s=e("f6f9");e.n(s).a},c7c0:function(t,i,e){"use strict";var s=e("11fa");e.n(s).a},f6f9:function(t,i,e){},faf1:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("win",{attrs:{align:"right",width:600,height:660,ok:t.okStyle,cancel:t.cancelStyle},on:{winEvent:t.getDetail}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),e("div",{attrs:{slot:"content",id:"weighTan"},slot:"content"},[1==t.type?e("div",[e("h2",{staticClass:"tag"},[t._v("配置名称:")]),t._v(" "),e("div",{staticClass:"mes"},[t._v(t._s(t.list.name))]),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"tag"},[t._v("识别码设置:")]),t._v(" "),e("div",{staticClass:"mes"},[t._v(t._s(t.list.code))]),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"tag"},[t._v("重量单位:")]),t._v(" "),e("div",{staticClass:"mes"},[t._v(t._s(t.list.weightCompany))]),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"tag"},[t._v("重量格式:")]),t._v(" "),e("div",{staticClass:"mes weightType"},[t._v(t._s(t.list.weighType))]),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"tag"},[t._v("价格格式:")]),t._v(" "),e("div",{staticClass:"mes weightType"},[t._v(t._s(t.list.priceType))]),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"tag"},[t._v("价格取整:")]),t._v(" "),e("div",{staticClass:"mes"},[t._v(t._s(t.list.priceRound))]),t._v(" "),e("div",{staticStyle:{width:"100%",clear:"both"}})]):e("div",[e("h2",{staticClass:"tag"},[t._v("配置名称")]),t._v(" "),e("div",{staticClass:"mes"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.list.name,expression:"list.name"}],attrs:{type:"text",placeholder:"输入配置名称",maxlength:"10"},domProps:{value:t.list.name},on:{input:function(i){i.target.composing||t.$set(t.list,"name",i.target.value)}}})]),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"required tag"},[t._v("识别码设置")]),t._v(" "),e("div",{staticClass:"mes"},[t.edit?e("span",{staticStyle:{"padding-left":"12px"}},[t._v(t._s(t.list.code))]):e("input",{directives:[{name:"model",rawName:"v-model",value:t.list.code,expression:"list.code"}],staticStyle:{width:"210px"},attrs:{type:"text",placeholder:"输入识别码（2位,从1开始）",onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:"2"},domProps:{value:t.list.code},on:{input:function(i){i.target.composing||t.$set(t.list,"code",i.target.value)}}})]),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"required tag"},[t._v("重量单位")]),t._v(" "),e("div",{staticClass:"mes"},[e("radiobtn",{attrs:{list:t.weightList,index:t.list.weightCompany,name:"name"},on:{selOn:t.editWeightCompany}})],1),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"required tag"},[t._v("重量格式")]),t._v(" "),e("div",{staticClass:"mes weightType"},[e("radiobtn",{attrs:{list:t.typeList,index:t.list.weighType,name:"name"},on:{selOn:t.editWeighType}})],1),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"required tag"},[t._v("价格格式")]),t._v(" "),e("div",{staticClass:"mes weightType"},[e("radiobtn",{attrs:{list:t.priceList,index:t.list.priceType,name:"name"},on:{selOn:t.editPriceType}})],1),t._v(" "),e("div",{staticClass:"clear"}),t._v(" "),e("h2",{staticClass:"required tag"},[t._v("价格取整")]),t._v(" "),e("div",{staticClass:"mes"},[e("radiobtn",{attrs:{list:t.round,index:t.list.priceRound,name:"name"},on:{selOn:t.editPriceRound}})],1),t._v(" "),e("div",{staticStyle:{width:"100%",clear:"both"}})])])])],1)};s._withStripped=!0;var a={data:function(){return{title:"",edit:!1,list:{name:"",code:"",weightCompany:-1,weighType:-1,priceType:-1,priceRound:-1},weightList:[{name:"g"},{name:"Kg"}],typeList:[{name:"保留小数点前一位（如：XXX.）"},{name:"保留小数点后一位（如：XXX.X）"},{name:"保留小数点后两位（如：XXX.XX）"},{name:"保留小数点后三位（如：XX.XXX）"}],priceList:[{name:"保留小数点前一位（如：￥XXX.）"},{name:"保留小数点后一位（如：￥XXX.X）"},{name:"保留小数点后两位（如：￥XXX.XX）"}],round:[{name:"四舍五入"},{name:"上取整"},{name:"下取整"}],okStyle:null,cancelStyle:null}},props:{configList:Object,type:Number},methods:{getDetail:function(t){if((2==this.type||3==this.type)&&"ok"==t){var i=this.list;if(""==i.name)return this.errorShow("请输入名称"),!1;if(i.code.length<2||i.code<10)return this.errorShow("识别码请输入大于10的两位整数"),!1;if(-1==i.weightCompany)return this.errorShow("请选择重量单位"),!1;if(-1==i.weighType)return this.errorShow("请选择重量格式"),!1;if(-1==i.priceType)return this.errorShow("请选择价格格式"),!1;if(-1==i.priceRound)return this.errorShow("请选择价格取整"),!1}this.$emit("detail",t,this.list)},errorShow:function(t){this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:t})},editWeightCompany:function(t){this.list.weightCompany=t},editWeighType:function(t){this.list.weighType=t},editPriceType:function(t){this.list.priceType=t},editPriceRound:function(t){this.list.priceRound=t}},mounted:function(){var t=this;this.okStyle={content:"确定",style:{background:"#f8941f"}},1==this.type?(this.title="称重商品类型详情",this.list.name=this.configList.name,this.list.code=this.configList.code,this.list.weightCompany=this.configList.weightCompany,this.list.weighType=this.typeList[this.configList.weighType].name,this.list.priceType=this.priceList[this.configList.priceType].name,this.list.priceRound=this.round[this.configList.priceRound].name):2==this.type?this.title="新建称重商品类型":(this.cancelStyle={content:"删除",style:{background:"#c33"}},this.title="修改称重商品类型",this.edit=!0,setTimeout(function(){t.list=t.configList,t.list.weightCompany="g"==t.configList.weightCompany?0:1}))},components:{win:function(){return e.e("win").then(e.bind(null,"f60a"))},radiobtn:function(){return e.e("radio_btn").then(e.bind(null,"4dfe"))}}},n=(e("36b0"),e("c7c0"),e("6ceb")),l=Object(n.a)(a,s,[],!1,null,"0e5708be",null);l.options.__file="src\\module\\invoicing_system\\config_manage\\weigh_win.vue";i.default=l.exports}}]);