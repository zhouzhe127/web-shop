(window.webpackJsonp=window.webpackJsonp||[]).push([["speech_config"],{"9dc4":function(e,t,n){},dd8f:function(e,t,n){"use strict";var s=n("9dc4");n.n(s).a},e6c4:function(e,t,n){"use strict";n.r(t);var s=n("81a2");var c={data:function(){return{speechList:[],isShowSpeechWin:!1,speechs:[],speechName:"",speechId:"",speechType:"",type:""}},methods:{getSpeechList:function(){var e,t=this;return(e=regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.getSpeechList();case 2:n=e.sent,t.speechList=Object.values(n);case 4:case"end":return e.stop()}},e,t)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function s(c,i){try{var h=t[c](i),p=h.value}catch(e){return void n(e)}if(!h.done)return Promise.resolve(p).then(function(e){s("next",e)},function(e){s("throw",e)});e(p)}("next")})})()},createSpeech:function(e,t){if(this.type=e,t&&"0"==t.type?this.type="oldnew":t&&"1"==t.type&&(this.type="oldpath"),this.judgeLength(e)>=10)return"new"==e?this.$store.commit("setWin",{content:"最多添加10组常用话术",winType:"alert",title:"操作提示"}):"path"==e&&this.$store.commit("setWin",{content:"最多添加10组路径话术",winType:"alert",title:"操作提示"}),!1;this.isShowSpeechWin=!0,"new"==e||"path"==e?(this.speechName="",this.speechs=[]):(this.speechName=t.name,this.speechs=t.content,this.speechId=t.id,this.speechType=t.type)},closeWin:function(e){this.isShowSpeechWin=!1,"success"==e&&this.getSpeechList()},judgeLength:function(e){for(var t=0,n=0;n<this.speechList.length;n++)"new"==e&&"0"==this.speechList[n].type&&t++,"path"==e&&"1"==this.speechList[n].type&&t++;return t}},mounted:function(){var e=this;this.$store.commit("setPageTools",{createSpeech:function(){e.createSpeech("new")},newPath:function(){e.createSpeech("path")}}),this.getSpeechList()},components:{"speech-win":function(){return n.e("speech_win").then(n.bind(null,"b3b0"))}}},i=(n("dd8f"),n("d801")),h=Object(i.a)(c,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"speech_config"}},[n("section",{staticClass:"speech_content"},[e._l(e.speechList,function(t,s){return n("div",{key:s,staticClass:"content_list",on:{click:function(n){e.createSpeech("old",t)}}},[n("div",{staticClass:"content_header"},[n("span",[e._v(e._s(t.name))]),e._v(" "),n("span",[e._v(e._s(s+1))])]),e._v(" "),n("div",{staticClass:"content_content"},["0"==t.type?n("span",{staticStyle:{"background-color":"#6ac2e9"}},[e._v("常用")]):e._e(),e._v(" "),"1"==t.type?n("span",{staticStyle:{"background-color":"#fdaa00"}},[e._v("路径")]):e._e()]),e._v(" "),n("p",{staticClass:"content_foot"},[n("span",[e._v("数量")]),e._v(" "),n("span",[e._v(e._s(t.content.length))])])])}),e._v(" "),e.speechList<=0?n("div",{staticClass:"nolist"},[e._v("-  暂无话术组,请新建  -")]):e._e()],2),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.isShowSpeechWin?n("speech-win",{attrs:{speechId:e.speechId,speechName:e.speechName,speechs:e.speechs,type:e.type,speechType:e.speechType},on:{closeWin:e.closeWin}}):e._e()],1)],1)},[],!1,null,"5bdbca42",null);t.default=h.exports}}]);