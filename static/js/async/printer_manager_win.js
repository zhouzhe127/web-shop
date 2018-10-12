(window.webpackJsonp=window.webpackJsonp||[]).push([["printer_manager_win"],{"566b":function(t,e,i){},a727:function(t,e,i){"use strict";i.r(e);var n=i("81a2"),s=i("f6ce");var r={data:function(){return{shopId:"",createUid:"",title:"打印机",okStyle:null,cancelStyle:null,list:[{type:0,name:"网口打印机"},{type:2,name:"T1打印机"},{type:3,name:"V1打印机"},{type:4,name:"不干胶打印机"}],type:0,index:0,num:255,sign:"",printerName:"",ip:"",slaveIp:"",maxLen:"",isDisabled:!1,isNum:!1,isTest:!0,reTime:5,reTi:!1,newPrintDetial:{id:0}}},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))}},mounted:function(){var t=s.a.session("userShop");this.shopId=t.currentShop.id,this.createUid=t.user.createUid,"addPrint"==this.types?(this.title="添加打印机",this.okStyle={content:"保存",style:{backgroundColor:"#bd823e",color:"#fff"}},this.cancelStyle={content:"取消",style:{backgroundColor:"#a0a0a0",color:"#fff"}}):"edit"==this.types&&(this.title="修改打印机",this.okStyle={content:"确定",style:{backgroundColor:"#29ABE2",color:"#fff"}},this.cancelStyle={content:"删除",style:{backgroundColor:"#982c2c",color:"#fff"}}),"edit"==this.types&&this.getPrintDetial()},props:{printerId:String,types:String,printIndex:Number,showWin:!1,printerList:Array,printDetial:Object},methods:{printMueueWin:function(t){var e={};e.printerId=this.printerId,e.shopId=this.shopId,e.createUid=this.createUid,e.printerName=this.printerName,e.ip=this.ip,e.slaveIp=this.slaveIp,e.maxLen=this.maxLen,e.type=this.list[this.index].type,e.sort=this.num,"ok"==t?this.isOk()&&this.$emit("printManagerWin",t,e):this.$emit("printManagerWin",t,e)},changeIndex:function(t){this.index=t,this.type=this.list[this.index].type,2==this.list[this.index].type||3==this.list[this.index].type?this.isNum=!0:this.isNum=!1,this.isTest=0==t,this.reTi=!1},isOk:function(){var t=/^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;if(""==this.printerName)return this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"请输入打印机名称"}),!1;if(""==this.ip||0!=this.index&&3!=this.index){if((0==this.index||3==this.index)&&""==this.ip)return this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"ip段不能为空"}),!1}else if(!t.test(this.ip))return this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"ip段格式错误"}),!1;return""==this.slaveIp||0!=this.index&&3!=this.index||t.test(this.slaveIp)?1!=this.index&&2!=this.index||""!=this.ip?1!=this.index&&2!=this.index||""==this.ip||/^[0-9a-zA-Z]*$/g.test(this.ip)?""==this.maxLen?(this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"字宽不能为空"}),!1):isNaN(this.maxLen)?(this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"字宽格式错误！"}),!1):"0"!=this.maxLen||(this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"字宽不能为0"}),!1):(this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"序列号只能为数字或字母"}),!1):(this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"序列号不能为空"}),!1):(this.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"备用ip段格式错误！"}),!1)},changeNum:function(t){this.num=t},testPrinter:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=!1,"addPrint"!=e.types){t.next=12;break}return t.next=4,n.a.addPrint({data:{createUid:e.createUid,printerName:e.printerName,ip:e.ip,slaveIp:e.slaveIp,maxLen:e.maxLen,type:e.type,sort:e.num}});case 4:return e.newPrintDetial=t.sent,e.newPrintDetial.id=e.newPrintDetial.id+"",t.next=8,n.a.printerTestPage({data:{shopId:e.shopId,printerId:e.newPrintDetial.id}});case 8:i=t.sent,e.printerList.push(e.newPrintDetial),t.next=20;break;case 12:if("edit"!=e.types){t.next=20;break}return t.next=15,n.a.editPrinter({data:{printerId:e.printerId,createUid:e.createUid,printerName:e.printerName,ip:e.ip,slaveIp:e.slaveIp,maxLen:e.maxLen,type:e.type,sort:e.num}});case 15:return e.newPrintDetial=t.sent,t.next=18,n.a.printerTestPage({data:{shopId:e.shopId,printerId:e.newPrintDetial.id}});case 18:i=t.sent,e.printerList.splice(e.printIndex,1,e.newPrintDetial);case 20:i&&e.$store.commit("setWin",{title:"提示",winType:"alert",content:"测试打印已出单"});case 21:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(s,r){try{var a=e[s](r),l=a.value}catch(t){return void i(t)}if(!a.done)return Promise.resolve(l).then(function(t){n("next",t)},function(t){n("throw",t)});t(l)}("next")})})()},savePrinter:function(){if(this.isOk()){this.isTest=!1,this.reTi=!0;var t=this,e=setInterval(function(){t.reTime--,t.reTime<1&&(t.isTest=!0,t.reTi=!1,clearInterval(e),t.reTime=5)},1e3);t.testPrinter()}},getPrintDetial:function(){this.printerName=this.printDetial.printerName,this.ip=this.printDetial.ip,this.slaveIp=this.printDetial.slaveIp,this.maxLen=this.printDetial.maxLen,0==parseInt(this.printDetial.type)?this.isTest=!0:2==parseInt(this.printDetial.type)?(this.index=1,this.isNum=!0,this.isDisabled=!0,this.isTest=!1):3==parseInt(this.printDetial.type)?(this.index=2,this.isNum=!0,this.isDisabled=!0,this.isTest=!1):4==parseInt(this.printDetial.type)?(this.index=3,this.isDisabled=!1,this.isTest=!1):this.isTest=!1,this.num=this.printDetial.sort}}},a=(i("e050"),i("d801")),l=Object(a.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("win",{attrs:{align:"right",width:580,height:"auto",ok:t.okStyle,cancel:t.cancelStyle},on:{winEvent:t.printMueueWin}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),i("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[i("section",{staticClass:"print-form"},[i("el-form",{ref:"printDetial",attrs:{model:t.printDetial,"label-width":"100px"}},[i("el-form-item",{attrs:{required:"",label:"打印机名称"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入名称",maxlength:"30"},model:{value:t.printerName,callback:function(e){t.printerName=e},expression:"printerName"}})],1),t._v(" "),t.isNum?t._e():i("el-form-item",{attrs:{required:"",label:"IP地址"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入IP地址"},model:{value:t.ip,callback:function(e){t.ip=e},expression:"ip"}})],1),t._v(" "),t.isNum?t._e():i("el-form-item",{attrs:{label:"备用IP地址"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入备用IP地址"},model:{value:t.slaveIp,callback:function(e){t.slaveIp=e},expression:"slaveIp"}}),t._v(" "),i("label",{staticClass:"fl",staticStyle:{"line-height":"20px","margin-top":"10px","font-size":"16px",color:"#b5b5b5"}},[t._v("\n\t\t\t\t\t\t(局域网IP地址,例如：192.168.66.11。"),i("br"),t._v("  电脑打印机的IP地址必须设为127.0.0.1)\n\t\t\t\t\t")])],1),t._v(" "),t.isNum?i("el-form-item",{attrs:{required:"",label:"序列号"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入设备唯一序列号",maxlength:"15"},model:{value:t.ip,callback:function(e){t.ip=e},expression:"ip"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{required:"",label:"最大字宽"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入最大字宽，建议为48",maxlength:"2"},model:{value:t.maxLen,callback:function(e){t.maxLen=e},expression:"maxLen"}}),t._v(" "),i("label",{staticClass:"fl",staticStyle:{"line-height":"20px","margin-top":"10px","font-size":"16px",color:"#b5b5b5"}},[t._v("\n\t\t\t\t\t\t(每行最多打印英文字的个数。"),i("br"),t._v("  80mm打印机:<=48;58mm打印机:<=32)\n\t\t\t\t\t")])],1),t._v(" "),i("el-form-item",{attrs:{required:"",label:"通信类型"}},[i("el-radio-group",{model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},t._l(t.list,function(e,n){return i("el-radio",{key:n,staticClass:"labItem",attrs:{label:n,border:""},on:{change:function(e){t.changeIndex(n)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),i("el-form-item",{attrs:{required:"",label:"排序"}},[i("el-input-number",{staticStyle:{width:"150px"},attrs:{min:1,max:255},on:{change:t.changeNum},model:{value:t.num,callback:function(e){t.num=e},expression:"num"}}),t._v(" "),t.isTest?i("button",{staticStyle:{width:"110px",height:"30px","margin-left":"20px","text-align":"center","margin-top":"5px"},on:{click:t.savePrinter}},[t._v("测试并保存")]):t._e(),t._v(" "),t.reTi?i("button",{staticStyle:{width:"110px",height:"30px","margin-left":"20px","text-align":"center","margin-top":"5px","background-color":"#ccc"}},[t._v(t._s(t.reTime)+"秒后重新测试")]):t._e()],1)],1)],1)])])},[],!1,null,"48659924",null);e.default=l.exports},e050:function(t,e,i){"use strict";var n=i("566b");i.n(n).a}}]);