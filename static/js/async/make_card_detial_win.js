(window.webpackJsonp=window.webpackJsonp||[]).push([["make_card_detial_win"],{"173f":function(t,a,s){"use strict";s.r(a);var i=s("f6ce"),e=s("bbb9"),l={data:function(){return{shopId:"",title:"查看详情",okStyle:null,cancelStyle:null,printDetial:null,ischain:"",userData:"",aName:"",bName:"",cName:"",cardTimename:["无限期","this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1')","item.startCardTime + '天'"]}},components:{win:function(){return s.e("win").then(s.bind(null,"f60a"))}},mounted:function(){this.userData=i.a.session("userShop"),this.ischain=this.userData.currentShop.ischain,this.okStyle={content:"确定",style:{backgroundColor:"#29ABE2",color:"#fff"}},this.cancelStyle={content:"取消",style:{backgroundColor:"#a0a0a0",color:"#fff"}},this.aName=this.getShopsName("1"),this.bName=this.getShopsName("2"),this.cName=this.getShopsName()},props:{detailObj:Object},methods:{makeCardDetialWim:function(t){this.$emit("makeCardDetialWim",t)},filterShopType:function(){var t=[];if("1"==this.ischain||"2"==this.ischain){for(var a=this.userData.currentShop.brandId,s=this.userData.currentShop.shopList.brand,i=0;i<s.length;i++)if(a.match(s[i].id)){t=(t=t.concat(s[i].direct)).concat(s[i].franchise);break}}else if("3"==this.ischain){var e=this.userData.currentShop.direct,l=this.userData.currentShop.franchise;e.filter(function(t,a){"0"!=t.status&&e.splice(a,1)}),l.filter(function(t,a){"0"!=t.status&&e.splice(a,1)}),t=(t=t.concat(e)).concat(l)}else"0"==this.ischain&&(t=this.userData.shopList.noBrand);return t},getShopsName:function(t){var a=this.filterShopType(),s="";if("1"==t){var i=String(this.detailObj.applyShopIds);if("0"==i)s="仅发卡门店";else if("-1"==i)s="无";else{for(var e=0;e<a.length;e++)i.match(a[e].id)&&(s+=a[e].name+",");s=s.substring(0,s.length-1)}}else if("2"==t){var l=String(this.detailObj.depositShopIds);if("0"==l)s="仅发卡门店";else if("-1"==l)s="无";else{for(var n=0;n<a.length;n++)l.match(a[n].id)&&(s+=a[n].name+",");s=s.substring(0,s.length-1)}}else for(var c=String(this.detailObj.shopId),r=0;r<a.length;r++)c.match(a[r].id)&&(s+=a[r].name);return s},translateTime:function(t){return e.a.format(new Date(1e3*Number(t)),"yyyy/MM/dd hh:mm")}}},n=(s("8c7a"),s("d801")),c=Object(n.a)(l,function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("win",{attrs:{align:"right",width:580,height:500,ok:t.okStyle,cancel:t.cancelStyle},on:{winEvent:t.makeCardDetialWim}},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),s("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[s("div",{staticClass:"getDetail"},[s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("卡性质：")]),t._v(" "),s("span",{staticClass:"fl"},["1"==t.detailObj.cardAttr?[t._v("通用")]:t._e(),t._v(" "),"2"==t.detailObj.cardAttr?[t._v("直营店")]:t._e(),t._v(" "),"3"==t.detailObj.cardAttr?[t._v("加盟店")]:t._e()],2)]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("卡类型名称：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.detailObj.name))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("卡类型编号：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.detailObj.abbr))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("编号：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.detailObj.initCardNumber)+" "+t._s(t.detailObj.initCardNumber)+"-"+t._s(t.detailObj.num)+" "+t._s(t.detailObj.num))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("适用门店：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.aName))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("储值门店：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.bName))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("卡属门店：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.cName))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("购卡金：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.detailObj.price))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("卡内初始余额：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.detailObj.cardAmount))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("卡内初始积分：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v(t._s(t.detailObj.cardPoint))])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl",staticStyle:{width:"112px"}},[t._v("卡内附赠优惠券：")]),t._v(" "),t._l(t.detailObj.cardCoupon,function(a){return t.detailObj.cardCoupon&&t.detailObj.cardCoupon.length>=1?s("span",{staticClass:"fl"},[t._v("\n\t\t\t\t\t"+t._s(a.name)+"("+t._s(a.num)+"张),\n\t\t\t\t")]):t._e()}),t._v(" "),0==t.detailObj.cardCoupon.length?s("span",{staticClass:"fl",staticStyle:{width:"395px"}},[t._v("无")]):t._e()],2),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("享有折扣：")]),t._v(" "),"100"!=t.detailObj.discount?s("span",{staticClass:"fl"},[t._v("\n\t\t\t\t\t"+t._s(t.detailObj.discount/10)+"折\n\t\t\t\t")]):t._e(),t._v(" "),"100"==t.detailObj.discount?s("span",{staticClass:"fl"},[t._v("无折扣")]):t._e()]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("有效期：")]),t._v(" "),s("span",{staticClass:"fl"},[t._v("\n\t\t\t\t\t"+t._s(t.cardTimename[Number(t.detailObj.cardTimeType)])+"\n\t\t\t\t")])]),t._v(" "),s("div",{staticClass:"detailItem"},[s("span",{staticClass:"fl"},[t._v("状态：")]),t._v(" "),s("span",{staticClass:"fl"},["0"==t.detailObj.status?[t._v("待启用")]:t._e(),t._v(" "),"1"==t.detailObj.status?[t._v("启用")]:t._e(),t._v(" "),"2"==t.detailObj.status?[t._v("停用")]:t._e()],2)])])])])},[],!1,null,"19c20502",null);a.default=c.exports},"8c7a":function(t,a,s){"use strict";var i=s("a9de");s.n(i).a},a9de:function(t,a,s){}}]);