(window.webpackJsonp=window.webpackJsonp||[]).push([["address_linkage"],{4867:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"address-linkage"},[i("div",{ref:"addressBtn",staticClass:"inp-box",on:{click:t.showMain}},[i("input",{style:t.btnWidth,attrs:{type:"text",placeholder:"请选择地区",readonly:"readonly"},domProps:{value:t.inputStr}}),t._v(" "),t._m(0)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.addressShow,expression:"addressShow"}],staticClass:"main",on:{click:t.stopProp}},[i("div",{staticClass:"tab",on:{click:t.tabClick}},t._l(t.tabName,function(e,a){return i("span",{key:a,class:{active:t.tabIndex==a},attrs:{"data-index":a}},[t._v(t._s(e.name))])})),t._v(" "),0==t.tabIndex?i("div",{staticClass:"list",on:{click:t.chooseProvince}},t._l(t.provinceList,function(e,a){return i("div",{key:a,staticClass:"item"},[i("div",{staticClass:"sort"},[t._v("\n\t\t\t\t\t"+t._s(e.letter)+"\n\t\t\t\t")]),t._v(" "),i("ul",[0==a?i("li",{staticClass:"clear",attrs:{"data-code":""}},[t._v("清除")]):t._e(),t._v(" "),t._l(e.arr,function(e,a){return i("li",{key:a,class:{active:e.selected},attrs:{"data-code":e.code}},[t._v(t._s(e.name))])})],2)])})):t._e(),t._v(" "),1==t.tabIndex?i("div",{staticClass:"list",on:{click:t.chooseCity}},[t._l(t.cityList,function(e,a){return i("div",{key:a,staticClass:"item"},[i("div",{staticClass:"sort"},[t._v("\n\t\t\t\t\t"+t._s(e.letter)+"\n\t\t\t\t")]),t._v(" "),i("ul",[0==a?i("li",{staticClass:"clear",attrs:{"data-code":""}},[t._v("清除")]):t._e(),t._v(" "),t._l(e.arr,function(e,a){return i("li",{key:a,class:{active:e.selected},attrs:{"data-code":e.code}},[t._v(t._s(e.name))])})],2)])}),t._v(" "),t.cityList.length?t._e():i("div",{staticClass:"empty"},[t._v("请选择省份")])],2):t._e(),t._v(" "),2==t.tabIndex?i("div",{staticClass:"list",on:{click:t.chooseArea}},[t._l(t.areaList,function(e,a){return i("div",{key:a,staticClass:"item"},[i("div",{staticClass:"sort"},[t._v("\n\t\t\t\t\t"+t._s(e.letter)+"\n\t\t\t\t")]),t._v(" "),i("ul",[0==a?i("li",{staticClass:"clear",attrs:{"data-code":""}},[t._v("清除")]):t._e(),t._v(" "),t._l(e.arr,function(e,a){return i("li",{key:a,class:{active:e.selected},attrs:{"data-code":e.code}},[t._v(t._s(e.name))])})],2)])}),t._v(" "),t.areaList.length?t._e():i("div",{staticClass:"empty"},[t._v("请选择城市")])],2):t._e()])])};a._withStripped=!0;i("bbb9");function s(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}var r=null,n={props:["province","city","area","width"],data:function(){return{addressShow:!1,tabIndex:0,provinceList:[],cityList:[],areaList:[],provinceCode:"",cityCode:"",areaCode:"",provinceName:"",cityName:"",areaName:"",inputStr:"",tabName:[{name:"省份",show:!0},{name:"城市",show:!1},{name:"地区",show:!1}],section:["A-G","H-K","L-S","T-Z"],btnWidth:"width:150px"}},watch:{province:"setDefault",city:"setDefault",area:"setDefault"},mounted:function(){this.btnWidth=this.width?"width:"+(this.width-42)+"px;":"width:150px;",this.getAreaCn()},methods:{init:function(){this.getProvince(),this.setDefault()},close:function(t){for(var e=this.$refs.addressBtn.getElementsByTagName("*"),i=!0,a=0;a<e.length;a++)t.target==e[a]&&(i=!1);i&&this.hidePop()},showMain:function(t){this.addressShow?this.hidePop():this.showPop()},showPop:function(){this.addressShow=!0,document.addEventListener("click",this.close)},hidePop:function(){this.addressShow=!1,document.removeEventListener("click",this.close)},stopProp:function(t){t.stopPropagation()},setDefault:function(){var t=this.province?parseInt(this.province):"",e=this.city?parseInt(this.city):"",i=this.area?parseInt(this.area):"";0!==t&&t!=this.provinceCode&&this.setProvince(this.province),0!==e&&e!=this.cityCode&&this.setCity(this.city),0!==i&&i!=this.areaCode&&this.setArea(this.area)},getAreaCn:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.e("area_cn").then(i.bind(null,"f529"));case 2:a=t.sent,r=a.default,e.init();case 5:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(s,r){try{var n=e[s](r),o=n.value}catch(t){return void i(t)}if(!n.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})})()},getProvince:function(){this.provinceList=this.sort(r.get1(),this.section)},chooseProvince:function(t){var e=t.target;if("li"==e.tagName.toLocaleLowerCase()){this.clear("province");var i=e.getAttribute("data-code"),a=e.textContent;this.setProvince(i,a)}},chooseCity:function(t){var e=t.target;if("li"==e.tagName.toLocaleLowerCase()){this.clear("city");var i=e.getAttribute("data-code"),a=e.textContent;this.setCity(i,a)}},chooseArea:function(t){var e=t.target;if("li"==e.tagName.toLocaleLowerCase()){var i=e.getAttribute("data-code"),a=e.textContent;this.setArea(i,a)}},setProvince:function(t,e){t?(this.provinceCode=t,this.provinceName=e||r.getNameByCode(t),this.cityList=this.sort(r.get2(this.provinceCode),this.section),this.tabIndex=1):(this.clear("province"),this.tabIndex=0),this.setClass(this.provinceList,t)},setCity:function(t,e){t?(this.cityCode=t,this.cityName=e||r.getNameByCode(t),this.areaList=this.sort(r.get3(this.cityCode),this.section),this.tabIndex=2):(this.clear("city"),this.tabIndex=1),this.setClass(this.cityList,t)},setArea:function(t,e){t&&(this.areaCode=t,this.areaName=e||r.getNameByCode(t),this.addressShow=!1),this.setClass(this.areaList,t)},tabClick:function(t){var e=t.target;if("span"==e.tagName.toLocaleLowerCase()){var i=parseInt(e.getAttribute("data-index"));this.tabIndex=i}},clear:function(t){"province"==t?(this.provinceCode="",this.provinceName="",this.cityCode="",this.cityName="",this.cityList=[],this.tabName[1].show=!1,this.tabName[2].show=!1):"city"==t&&(this.cityCode="",this.cityName="",this.tabName[2].show=!1),this.areaList=[],this.areaCode="",this.areaName=""},setClass:function(t,e){var i=!0,a=!1,s=void 0;try{for(var r,n=t[Symbol.iterator]();!(i=(r=n.next()).done);i=!0){var o=r.value,c=!0,h=!1,l=void 0;try{for(var d,v=o.arr[Symbol.iterator]();!(c=(d=v.next()).done);c=!0){var u=d.value;e==u.code?u.selected=!0:u.selected=!1}}catch(t){h=!0,l=t}finally{try{!c&&v.return&&v.return()}finally{if(h)throw l}}}}catch(t){a=!0,s=t}finally{try{!i&&n.return&&n.return()}finally{if(a)throw s}}this.setChoose()},setChoose:function(){var t=this.cityName?" / "+this.cityName:"",e=this.areaName?" / "+this.areaName:"";this.inputStr=this.provinceName+t+e;var i={province:this.provinceCode,city:this.cityCode,area:this.areaCode,provinceName:this.provinceName,cityName:this.cityName,areaName:this.areaName};this.$emit("emit",i)},sort:function(t,e){var i="*abcdefghjklmnopqrstwxyz".split(""),a="阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split(""),r=[],n=[];return i.forEach(function(e,i){var s={letter:e,data:[]};t.forEach(function(t){if((!a[i-1]||a[i-1].localeCompare(t[1],"zh")<=0)&&-1==t[1].localeCompare(a[i],"zh")){var e={code:t[0],name:t[1],selected:!1};s.data.push(e)}}),s.data.length&&r.push(s)}),(e||e.length)&&e.forEach(function(t,e){var i=t.split("-"),a=[];if(i.forEach(function(t,e){i[e]=t.toLocaleLowerCase()}),r.forEach(function(t,e){t.letter!=i[0]&&t.letter!=i[1]||a.push.apply(a,s(t.data)),1==t.letter.localeCompare(i[0])&&-1==t.letter.localeCompare(i[1])&&a.push.apply(a,s(t.data))}),a.length){var o={letter:t,arr:a};n.push(o)}}),n}}},o=(i("aee5"),i("7610")),c=Object(o.a)(n,a,[function(){var t=this.$createElement,e=this._self._c||t;return e("em",[e("i")])}],!1,null,null,null);c.options.__file="src\\components\\address_linkage.vue";e.default=c.exports},aee5:function(t,e,i){"use strict";var a=i("fa48");i.n(a).a},fa48:function(t,e,i){}}]);