(window.webpackJsonp=window.webpackJsonp||[]).push([["category_synchronous_win"],{1196:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABkCAIAAAAUt7kAAAAFIUlEQVR4Ae3c2U4kMQyF4Wlo9k3w/k+IuEDsOxOpRy3zVZRyMbeeqzg5WervyHZSxay+v7///N+/RSOsVqv8bIy8qC+zfH19xRqGwozKbnmnW1uVYwIrfs+xetP69vYWZTs7P9Dv7u7GVsrj6RiKvszLRJj0HZusCnO6qh8PPB66WrcEitoWxYJCUVsAaystalsUCwq/iQbj4XGlT09PUY/58vISWz8/P6PJUIeHh7F1b28vmkdHR9FEvChWMO80L6m9FlFny0UtSyrqilqkkS0XtSypqPtNNHh/f49D4NEfHx9j6+vrazTx9xwPccOY5Og46f39/TgRweH4+HjQylBR2S3XXutimaksajOAus1FrYtlprKozQDqNq+7teNKosHz83PUPzw8RBMxCT0uPHZsZWIFPpuRx1EIMSMTKwg7rKqZtdemTOZrito8o6miqE2ZzNcUtXlGU8Wa/HujwO/iaG9ubuJAHx8f0aTMjQ2tvAqgleud8/PzKFivf4Sy8R0Uj8AR5eDgII5MNEDcVlV7LeLKlotallTUFbVII1suallSUbfeOH5iAqkzd0G4cEIHJkPhaPHouH/EV1dXcemU8dmcWFgGrXd3d3E0wg7nmaasvRZxZctFLUsq6opapJEtF7Usqaj7l14TDcizSay53sH9MxQnB25s6ItHp/X+/j4uHSdNyGIZiFkGt1uIMdsT1V6LP0S2XNSypKKuqEUa2XJRy5KKuh+XLdsGPCuHAVL2ba9NARdOuo/JUMQZLnDI4En3eV3NyMxLX6IQwZCjQnvM2mv86CmzqKUwISpqAEmZRS2FCdG/aIALJ3Umz2YIXCl+Fwc/vhribS7m6elpnPr6+jqaPAImR5TYcVrmHglBizO112CSMotaChOiogaQlFnUUpgQ9d8i4ztxf3h0RsQcZ+GICSz0Jc4gxv1j8kQ8wlg87Vt7jR8uZRa1FCZERQ0gKbOopTAh6t8U4WjpM76T4SDBpRNHBb444oaeaMC3TGTwOHiWQUAbBxZaGbnRqL3GlkiZRS2FCVFRA0jKLGopTIj60QA3TB9MHDxueBw6uAsiODARQ419NgGN7J8HJPsfL6OtqvYaP03KLGopTIiKGkBSZlFLYULU/8L08vIy6kjKyeDxu3hWEuuLi4s4Mn6X9xXMiwtn5PEyiAYcFVhGXGG3XHuti2WmsqjNAOo2F7UulpnKojYDqNvcf4tM2s23PfhdDgM4Wk4OuHDWxMdLHAb4tofPQokVzMuauWXiv7HgDxt4wDZR7TV+uJRZ1FKYEBU1gKTMopbChKh/U4QrPTk5id3GX3oSDThIjLNwvDIHCU4OuP+4wlYmoI1bWdXZ2VnUc65oTbXXIp9suahlSUVdUYs0suWiliUVdf1ogAvndp9oQOo8Nsn+CR38mds4+4+P0cr4bM4VTIS/59TBUDxRizO114CfMotaChOiogaQlFnUUpgQpf4PU7Lwsc/mT7dwpcQZ/C4Tcb2DGBMxJtk/L0YIDowMsmbWXpsyma8pavOMpoqiNmUyX1PU5hlNFaloMO0Wa7iDv729ja0EB5x0VLYy1zt4ZW6KaOV2i/MMf7lGcODkwKqIUS2+1V4DUcosailMiIoaQFJmUUthQvSbaDD26PhObmwWmbh/3ioQOnD/XP6M/T1QxmZ7wNprY0T91qLW5zKuLWpjPv3WotbnMq5NRQNuezAXOVoiCX1J91k6cYa+iDFZM+Z4XsRt3tpr4E2ZRS2FCdFfD60WKpNyL5cAAAAASUVORK5CYII="},bf57:function(t,n,e){"use strict";var a=e("e3a8");e.n(a).a},e3a8:function(t,n,e){},f2ae:function(t,n,e){"use strict";e.r(n);var a=e("f6ce"),r=e("81a2");function s(t){return function(){var n=t.apply(this,arguments);return new Promise(function(t,e){return function a(r,s){try{var o=n[r](s),i=o.value}catch(t){return void e(t)}if(!o.done)return Promise.resolve(i).then(function(t){a("next",t)},function(t){a("throw",t)});t(i)}("next")})}}var o={data:function(){return{shopId:null,brandId:null,isBrand:null,category:[],btnOk:{content:"确定同步",style:"background-color:#f8941f"},btnCancel:{content:"暂不同步",style:"background-color:#918686"}}},methods:{closeSelfWin:function(t){var n=this;"ok"==t?this.SynchronousCategory().then(function(t){t&&n.$emit("throwSynchronousWin","change")}):this.$emit("throwSynchronousWin","close")},getCategoryStatus:function(){var t=this;return s(regeneratorRuntime.mark(function n(){var e;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,r.a.GetCategoryStatus({data:{shopId:t.shopId,brandId:t.brandId}});case 2:return e=n.sent,n.abrupt("return",e);case 4:case"end":return n.stop()}},n,t)}))()},SynchronousCategory:function(){var t=this;return s(regeneratorRuntime.mark(function n(){var e;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,r.a.SynchronousCategory({data:{shopId:t.shopId,brandId:t.brandId}});case 2:return e=n.sent,n.abrupt("return",e);case 4:case"end":return n.stop()}},n,t)}))()},initData:function(){var t=a.a.session("userShop");this.shopId=t.currentShop.id,this.brandId=t.currentShop.brandId,this.isBrand=1!=t.currentShop.ischain&&2!=t.currentShop.ischain}},mounted:function(){var t=this;this.initData(),this.getCategoryStatus().then(function(n){t.category=n})},components:{win:function(){return e.e("win").then(e.bind(null,"f60a"))}},filters:{sliceStr:function(t){return t?(t+="").length<11?t:t.slice(0,10)+"...":""}}},i=(e("bf57"),e("d801")),c=Object(i.a)(o,function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("win",{attrs:{align:"center",height:600,width:980,ok:t.btnOk,cancel:t.btnCancel},on:{winEvent:t.closeSelfWin}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("同步品牌下所有的分类")]),t._v(" "),a("div",{attrs:{slot:"content",id:"category_synchronous"},slot:"content"},[t._l(t.category,function(n,e){return t.category.length>0?a("div",{key:e,staticClass:"cList"},[a("div",{staticClass:"borderTop"}),t._v(" "),a("div",{staticClass:"borderBottom"}),t._v(" "),a("section",{staticClass:"title"},[a("div",{staticClass:"cate-hand"},[1==n.checkStatus?a("span",{staticStyle:{color:"#FA8E2C"}},[t._v(t._s(t._f("sliceStr")(n.name)))]):a("span",[t._v(t._s(t._f("sliceStr")(n.name)))])])]),t._v(" "),a("ul",{staticClass:"oUl"},[t._l(n.child,function(n,e){return[a("li",{key:e,staticClass:"oLi"},[1==n.checkStatus?a("span",{staticStyle:{color:"#FA8E2C"}},[t._v(t._s(n.name))]):a("span",[t._v(t._s(n.name))])])]})],2)]):t._e()}),t._v(" "),a("div",{staticClass:"tip-container"},[a("img",{attrs:{src:e("1196")}}),t._v(" "),a("h3",{staticClass:"yellow-part"},[t._v("橙色部分为本店没有同步部分, ")]),t._v(" "),a("h3",{staticClass:"gray-part"},[t._v("灰色部分为本店已和品牌同步部分")])])],2)])},[],!1,null,"5dd969fe",null);n.default=c.exports}}]);