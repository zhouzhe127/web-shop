import utils from "./utils";
import Timer from "./timer";
    /**
     * @description 操作dom节点
     * @function dom
     * @returns {dom}
     * @constructor
     * @example 
     * window.dom("[router-id=" + parentId + "]")[0]
	 */
    var dom = function(queryStr) {
		return new dom.fn.init(queryStr);
	}
	var slice = Array.prototype.slice,push = Array.prototype.push;
	dom.fn = dom.prototype = {
		constructor: dom,
		init: function(queryStr) {

			var domList = null;
			if(queryStr){
				if(typeof queryStr=="string"){
					//选择器或者需要创建dom元素的字符串
					if(queryStr.charAt(0) === "<"&&queryStr.slice(-1) === ">"&&queryStr.length>3){
						domList = [utils.createDomWithStr(queryStr)];
					}
					else{
						domList = document.querySelectorAll(queryStr);
					}
					
				}else if(queryStr instanceof this.constructor){
					//dom对象的实例
					domList = queryStr.toArray();
				}else if(utils.isDom(queryStr)){
					//dom节点,建议传dom节点,文本节点不要传
					domList = [queryStr];
				}
				else if(utils.type(queryStr) === "array"&&utils.isDom(queryStr[0])){
					//如果是数组,数组是元素
					domList = [queryStr];
				}else if(queryStr.self === window){
					//是window对象
					domList = [window];
				}
				if(domList){
					push.apply(this,domList);
				}
			}
			return this;
		},
		/**
		 * @description 将实例转为数组
		 * @function toArray
		 * @memberof dom
		 */
		toArray:function(){
			return slice.call(this);
		},
		/**
		 * @description 服务于eq等方法
		 * @function toArray
		 * @param {Array} elems 需要压入栈的元素
		 * @memberof dom
		 */
		pushStack:function(elems){
			if(utils.type(elems)!="array") elems = [elems];
			var con = this.constructor();
			push.apply(con,elems);
			con.prevObj = this;
			return con;
		},
		/**
		 * @description 操作第几个dom节点
		 * @function eq
		 * @memberof dom
		 * @param {Number} num 第几个
		 */
		eq: function(num) {
			if(num==undefined) return this; 
			var len = this.length,j = +num + ( num < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
		first:function(){
			return this.eq(0)
		},
		last:function(){
			return this.eq(this.length-1);
		},
		/**
		 * @description 操作某一组节点
		 * @function eq
		 * @memberof dom
		 * @param {Number} num 从第几个开始截取
		 */
		slice:function(num){
			return this.pushStack(slice.call(this,num));
		},
		/**
		 * @description 将eq选择后的返回上一个栈点
		 * @function prev
		 * @memberof dom
		 */
		prev:function(){
			return this.prevObj||this.constructor();
		},
		/**
		 * @description 添加类名
		 * @function addClass
		 * @memberof dom
		 * @param {Number} value 需要添加的类名 多个类名的话中间以空格隔开
		 */
		addClass: function(value) {
			var classNames, i, l, elem, setClass, c, cl, rtrim;
			if(value && typeof value === "string") {
				classNames = value.split(" "); // 用空白符分割类名 转换为数组
				for(i = 0; i < this.length; i++) {
					elem = this[i];
					if(elem.nodeType === 1) {
						if(!elem.className && classNames.length === 1) {
							elem.className = value;
						} else {
							setClass = " " + elem.className + " ";
							for(c = 0, cl = classNames.length; c < cl; c++) {
								if(!~setClass.indexOf(" " + classNames[c] + " ")) {
									setClass += classNames[c] + " "; // 追加，最后加一个空格
								}
							}
							rtrim = /(^\s*)|(\s*$)/g;
							elem.className = setClass.toString().replace(rtrim,"");
						}

					}
				}
			}
			
			return this;
		},
		toggleClass:function(str){

			var className = " " + value + " ",
			i,
			l = this.length;
			
			for(i = 0; i < l;i++) {
				// 必须是Element，技巧同样是前后加空格，同样是indexOf
				if(this[i].nodeType === 1 && (" " + this[i].className + " ").replace("", " ").indexOf(str) > -1) {
					className = this[i].className.replace(str,"");
					this[0].className = className;
				}
				else{
					this[i].className += " " +  str;
				}
			}
			
		},
		/**
		 * @description 移除类名
		 * @function removeClass
		 * @memberof dom
		 * @param {Number} value 需要移除的类名  不传就是移除所有类名
		 */
		removeClass: function(value) {
			if((value && typeof value === "string") || value === undefined) {
				var classNames, i, l, elem, className, c, cl,rtrim;
				classNames = (value || "").split(" "); // 分割成数组
				for(i = 0, l = this.length; i < l; i++) { // 遍历匹配的元素，缓存集合长度 
					elem = this[i];
					if(elem.nodeType === 1 && elem.className) {
						if(value) {
							className = (" " + elem.className + " ").replace("", " "); // 前后加空格，将\n\t\r替换为空格
							for(c = 0, cl = classNames.length; c < cl; c++) {
								className = className.replace(" " + classNames[c] + " ", " "); // 将要删除的className替换为空格
							}
							rtrim = /(^\s*)|(\s*$)/g;
							elem.className = className.toString().replace(rtrim, "");
						} else {
							elem.className = "";
						}
					}
				}
			}

			return this;
		},
		position(){
			return utils.getDOMPosition(this[0],true);
		},
		remove(){
			
			for(var i = 0;i<this.length;i++){
				this[i].parentNode.removeChild(this[i]);
			}
			
		},
		append(str){
			var parent = this[0];
			if(utils.type(str) === "string"){
				var d = utils.createDomWithStr(str);
				parent.appendChild(d);
			}else if(utils.isDom(str)){
				parent.appendChild(str);
			}
			return this;
		},
		/**
		 * @description 判断是否含有类名
		 * @function hasClass
		 * @memberof dom
		 * @param {Number} value 需要检测的类(唯一)
		 */
		hasClass: function(value) {
			var className = " " + value + " ",
				i,
				l = this.length;
				
			for(i = 0; i < l;i++) {
				// 必须是Element，技巧同样是前后加空格，同样是indexOf
				if(this[i].nodeType === 1 && (" " + this[i].className + " ").replace("", " ").indexOf(className) > -1) {
					return true;
				}
			}
			return false;
		},
		antProp:{
			thisDom:null,
			animateTimer:"", //动画定时器
			frameOriginal:null,//动画原始样式
			display:"block", //保存dom的显示隐藏，用于show hide方法
			height:null, //保存dom的高度，用于slideUp slideDown方法
			slideTime:null, //保存slide方法的过渡时间，用于中途反向执行
			shTime:null //保存show hide方法的过渡时间，用于中途反向执行
		},
		/**
		 * @description 动画封装 目前只支持带有数字单位的属性，暂不支持修改颜色，如color
		 * @function animate
		 * @memberof dom
		 * @param {Object} prop 需要设置的动画属性 示例{width:"100px"} 属性值必须带单位
		 * @param {Object} prop.time 动画执行的时间 default:300，默认300毫秒 也可以是字符串 "300ms"
		 * @param {Object} prop.ease 动画缓动曲线 default:"linear"，匀速开始到结束 写法：easeIn 驼峰写法
		 * @param {Object} prop.mode 动画重复执行模式 default:"repeat" 重复执行 即从头开始重复播放,"loop"：循环执行 即从动画末尾倒带播放
		 * @param {Object} prop.modeNum 动画重复执行次数 default:1  默认一次
		 * @param {Function} callback 回调函数
		 * @example:
		 *  dom.animate({
		  		width:"100px",
		  		time:500, //数字不需要带引号
		  		ease:"easeIn",
		  		mode:"repeat" || "loop"  //数字不需要带引号,
		  		modeNum:5
		  	},function(){
		  		alert("这个动画很不错！");
		  		dom.animate({}); //若要继续执行其他动画，需要再次调用 animate();
			})
		 * 目前支持的缓动曲线:
		 	easeIn easeOut easeInOut //正常速度
		 	easeInFast easeOutFast easeInOutFast //快速缓动
		 	easeInElastic x x   //指数衰减的正弦曲线缓动 超过范围，反弹多次
		 	easeInBack x x  //超过范围反弹运动 超过范围 反弹一次
		 	easeInBounce x x  //指数衰减的反弹缓动 不会超过范围 反弹多次  一般用在自由落体反弹
		 */
		animate:function(prop, callback){
			var $this = this;
			var exp1 = /^[a-z]+([A-Z])[a-z]+$/ ; //匹配驼峰写法
			var frameStart = '', //开始样式集合
				frameResult='', //最终样式集合
				frameStyle = '',//单帧样式
				curve='';//动画过渡曲线
				
			//this.antProp.frameOriginal=this.antProp.frameOriginal==null?this.attr("style"):this.antProp.frameOriginal;//原样式集合
			
			if(this.antProp.thisDom == this){
				this.antProp.animateTimer&&Timer.clear(this.antProp.animateTimer);
			}
			
			var time = prop.time,
				ease = prop.ease,
				mode = prop.mode,
				modeNum = prop.modeNum;

			//动画每帧的样式，num从1开始
			//遍历要添加的样式
			var pointExp = /([\d.]+)/;//匹配数字可包含小数点
			//解析参数，并重新命名后添加到数组中

			//原样式处理
			var frameOriginal = this.attr("style") || "";
			
			if(frameOriginal&&frameOriginal.slice(-1) != ";") frameOriginal = frameOriginal+";";
		
			var addNum = 0;
			var styleArr=[],arrNum=0;
			var numValue,numInitial;
			for(var itemKey in prop){
				if(itemKey != "time" && itemKey != "ease" && itemKey != "mode" && itemKey != "modeNum"){
					var styleName = itemKey;
					var reg = styleName.match(exp1);
					if(reg){
						var lower = RegExp.$1.toLowerCase();
						styleName = styleName.replace(/[A-Z]+/g,"-"+lower);
					}
					(prop[itemKey]+"").match(pointExp);
					numValue = RegExp.$1-0;

					this.css(styleName).match(pointExp);
					numInitial = RegExp.$1-0;

					styleArr[arrNum] = { //把正确的样式名添加到数组
						"name" : styleName,
						"value" : prop[itemKey],
						"numValue": numValue, //匹配后取出的样式数值
						"numStart": numInitial //匹配后取出的原样式数值
					}
					arrNum++;
					var itemStart = styleName+':'+ this.css(styleName)+';'; //单个开始样式
					var itemResult = styleName+':'+prop[itemKey]+';'; //单个最终样式
					
					frameStart = frameOriginal + (frameStart += itemStart);//开始样式集合
					frameResult = frameOriginal + (frameResult += itemResult); //最终样式集合
					
				}
			}
			
			//设置默认值
			time = time ||　300;
			ease = ease || "linear";

			time = parseInt(time);//字符串转数字
			
			//计算动画帧数，帧宽(1000/60)ms,也就是秒60Hz
			var frameTime = 1000/60;
			var frameNum = Math.ceil(time/frameTime);
			
			//单帧动画样式计算
			function frameMethod($ease){
				var frameAll='',frameValue,initial,change;
				for(var i=0;i<styleArr.length;i++){
					var start = styleArr[i].numStart; //初始值
					change = styleArr[i].numValue-styleArr[i].numStart; //需要改变的值，即过渡值
					
					frameValue = utils.Ease[$ease](addNum,start,change,frameNum); //速度曲线计算
					if(isNaN(styleArr[i].value)){
						frameValue = styleArr[i].value.replace(pointExp,frameValue);
					}
					var frameitem = styleArr[i].name+':'+frameValue+';'; //返回单个帧的样式
					frameAll = frameAll += frameitem;
				}
				
				return frameOriginal+frameAll
			}
			
			//循环模式
			function modeMatch(){
				if(mode == "repeat"){
					for(var d=0;d<$this.length;d++){
						$this[d].style.cssText = frameOriginal;	
					}
					run();
				}else if(mode == "loop"){
					for(var i=0;i<styleArr.length;i++){
						var a = styleArr[i].numStart;
						styleArr[i].numStart = styleArr[i].numValue;
						styleArr[i].numValue = a;
					}
					var b = frameStart;
					frameStart = frameResult;
					frameResult = b;
					run();
				}
			}
			
			//回调操作
			function allCallBack(){
				//$this.antProp.frameOriginal = $this[0].getAttribute("style");
				//Timer.clear($this.antProp.animateTimer);
				callback && callback();
			}
			
			//动画执行方法
			function run(){
				addNum=0,$this.antProp.thisDom = $this;
					$this.antProp.animateTimer = Timer.add(function(){
					addNum++;
					if(addNum<frameNum){
						for(var d=0;d<$this.length;d++){
							$this[d].style.cssText = frameMethod(ease);
						}
					}else{
						for(var d=0;d<$this.length;d++){
							$this[d].style.cssText = frameResult;
						}
					}
				},frameTime,frameNum,false,function(){
					if(mode){ //如果设置了循环模式
						if(modeNum){ //如果设置了循环次数
							modeNum = parseInt(modeNum);
							if(modeNum<=1){
								allCallBack();
							}else{
								modeNum--;
								modeMatch();
							}
						}else{//没设置循环次数则无限循环
							modeMatch();
						}
					}else{
						allCallBack();
					}
				},null,null,false);
			}
			//开始运行
			run();
		
			return this;
		},
		/**
		 * @description 获取和设置宽度 宽度为绝对宽度，包括padding跟border的宽
		 * @function width
		 * @memberof dom
		 * @param {String} value 需要设置的值
		 */
		width:function(value){
			if(!value){
				return this[0] === window?window.innerWidth:this[0].offsetWidth;
			}else{
				for(var d=0;d<this.length;d++){
					var num = parseInt(value);
					if(isNaN(num)){
						this[d].style.width = value;
					}else{
						this[d].style.width = parseInt(value) +"px";	
					}
				}
				return this;
			}
		},
		/**
		 * @description 获取和设置高度 宽度为内容，包括padding跟border的宽
		 * @function height
		 * @memberof dom
		 * @param {String} value 需要设置的值
		 */
		height:function(value){
			if(!value){
				return this[0] === window?window.innerHeight:this[0].offsetHeight;
			}else{
				for(var d=0;d<this.length;d++){
					var num = parseInt(value);
					if(isNaN(num)){
						this[d].style.height = value;
					}else{
						this[d].style.height = parseInt(value) +"px";	
					}
				}
				return this;
			}
		},
		/**
		 * @description 设置Y滚动条位置
		 * @function scrollTop
		 * @memberof dom
		 * @param {Number} value 需要设置的值
		 */
		scrollTop:function(value){
			var y = 0 || value;
			for(var d=0;d<this.length;d++){
				this[0].scrollTo(0,y);
			}
		},
		/**
		 * @description 设置X滚动条位置
		 * @function scrollTop
		 * @memberof dom
		 * @param {Number} value 需要设置的值
		 */
		scrollLeft:function(value){
			var x = 0 || value;
			for(var d=0;d<this.length;d++){
				this[0].scrollTo(x,0);
			}	
		},
		
		/**
		 * @description dom元素的显示,默认立即显示无过渡,也可传入参数实现过渡效果
		 * @function show
		 * @memberof dom
		 * @param {Number} timeVal 过渡时间 以毫秒计算
		 * @param {String} easeVal 动画过渡ease曲线
		 * @param {Function} callback 过渡执行完之后的回调函数
		 */
		show:function(timeVal,easeVal,callback){
			var $this = this;
			if(!timeVal){ //如果没有过渡时间,则立即显示,无动画
				this.css("display","block");
			}else{ //过渡效果
				var opacity = this.css("opacity"),
					dis = this.css("display");

				if(utils.type(easeVal)=="function"){
				 	callback = easeVal;
				 	easeVal = null;
				}
		
				if(opacity == 1 && dis == "none"){ //显示的过渡需要先设置display为显示,并设置opacity为0,因为隐藏的元素无法过渡
					this.css({"opacity":"0","display":this.antProp.display});
				}

				this.animate({opacity:1,time:timeVal,ease:easeVal},function(){
					$this.removeStyle("opacity");
					callback && callback();
				});
			} 
			return this;
		},
		/**
		 * @description dom元素的隐藏,默认立即隐藏无过渡,也可传入参数实现过渡效果
		 * @function hide
		 * @memberof dom
		 * @param {Number} timeVal 过渡时间 以毫秒计算
		 * @param {String} easeVal 动画过渡ease曲线
		 * @param {Function} callback 过渡执行完之后的回调函数
		 */
		hide:function(timeVal,easeVal,callback){
			var $this = this;
			if(!timeVal){
				this.css("display","none");
			}else{
				var dis = $this.css("display");
				if(utils.type(easeVal)=="function"){
					callback = easeVal;
					easeVal = null;
				} 
				
				this.animate({opacity:0,time:timeVal,ease:easeVal},function(){
					$this.css({"display":"none"});
					$this.antProp.display = dis;
					$this.removeStyle("opacity");
					callback && callback();
				});
			}
			return this;
		},
		/**
		 * @description dom元素的上缩,默认立即上缩无过渡,也可传入参数实现过渡效果
		 * @function slideUp
		 * @memberof dom
		 * @param {Number} timeVal 过渡时间 以毫秒计算
		 * @param {String} easeVal 动画过渡ease曲线
		 * @param {Function} callback 过渡执行完之后的回调函数
		 */
		slideUp:function(timeVal,easeVal,callback){
			var $this = this,
				dis = $this.css("display");
				
			if(utils.type(easeVal)=="function"){
				callback = easeVal;
				easeVal = null;
			} 

			$this.animate({height:"0px",time:timeVal,ease:easeVal},function(){
				$this.css({"display":"none"});
				$this.antProp.display = dis;
				$this.removeStyle("height");
				callback && callback();
			});
			return this;
		},
		/**
		 * @description dom元素的上拉,默认立即下拉无过渡,也可传入参数实现过渡效果
		 * @function slideDown
		 * @memberof dom
		 * @param {Number} timeVal 过渡时间 以毫秒计算
		 * @param {String} easeVal 动画过渡ease曲线
		 * @param {Function} callback 过渡执行完之后的回调函数
		 */
		slideDown:function(timeVal,easeVal,callback){
			var $this = this,
				dis = $this.css("display");
				
			if(utils.type(easeVal)=="function"){
				callback = easeVal;
				easeVal = null;
			} 
			
			$this.antProp.height = $this.antProp.height==null?$this.css("height"):$this.antProp.height;
			if(dis == "none"){ //下拉需要先设置display,切高度为0,因为隐藏的元素无法实现过渡
				$this.css({"display":$this.antProp.display,"height":"0px"});
			} 
			$this.animate({height:$this.antProp.height,time:timeVal,ease:easeVal},function(){
				$this.removeStyle("height");
				callback && callback();
			});
			return this;
		},
		/**
		 * @description 获取外联css的样式，并设置属性
		 * @function css
		 * @memberof dom
		 * @param {String object} styleName 需要设置的属性名称 可以是字符串string类型 ，同时设置多个则传入"{}"包裹的键值对
		 * @param {String} value 需要设置的单个属性值
		 * @example
		 	dom.css({
		 		"margin-left":"100px",
		 		marginTop:"100px"
		 	});
		 */
		css:function(styleName, value){
			var cssStyle='';
			var exp = /^[a-z]+([A-Z])[a-z]+$/ ; //匹配驼峰写法
			var ori = this.attr("style")||"";
			if(ori.slice(-1) != ";") ori = ori+";";
			if(typeof styleName == "string"){
				var reg = styleName.match(exp);
				if(reg){
					var low = RegExp.$1.toLowerCase();
					styleName = styleName.replace(/[A-Z]+/g,"-"+low);
				}
				if(!value){ //直接获取单个样式值
					if(this[0].currentStyle){
						cssStyle = this[0].currentStyle[styleName];
					}else{
						cssStyle = window.getComputedStyle(this[0] ,null)[styleName];
					}
					return cssStyle;
				}else{ //设置单个样式
					for(var d=0;d<this.length;d++){
						this[d].style[styleName] = value;
					}
					return this;
				}
			}else if(typeof styleName == "object"){//同时设置多个样式
				var str='';
				for(var itemKey in styleName){
					var sName = itemKey;
					var reg = itemKey.match(exp);
					if(reg){
						var low = RegExp.$1.toLowerCase();
						sName = sName.replace(/[A-Z]+/g,"-"+low);
					}
					var item = sName+":"+styleName[itemKey]+';';
					str += item;
				}
				for(var d=0;d<this.length;d++){
					this[d].style.cssText = ori+str;
				}
				return this;
			}
		},
		removeStyle:function(name){
			var oriStyle = this.attr("style");
			if(oriStyle.slice(-1) != ";") oriStyle = oriStyle+";";
			
			var exp = new RegExp(name+":[\\s\\S]*?;","g");
			var reg = oriStyle.match(exp);
			if(reg){
				var newStyle = oriStyle.replace(exp,"");
				this.attr("style",newStyle);
			}
			return this;
		},
		/**
		 * @description 获取元素html内容
		 * @function html
		 * @memberof dom
		 * @param {Object} htmlContent 需要设置的html内容
		 */
		html:function(htmlContent){
			if(!htmlContent){ //直接获取属性值
				return this[0].innerHTML;
			}else{ //设置属性
				for(var d=0;d<this.length;d++){
					this[d].innerHTML = htmlContent;
				}
				return this;
			}
		},
		/**
		 * @description 获取元素文本内容
		 * @function text
		 * @memberof dom
		 * @param {String} value 需要设置的text内容
		 */
		text:function(value){
			if(!value){ //直接获取属性值
				return this[0].textContent;
			}else{ //设置属性
				for(var d=0;d<this.length;d++){
					this[d].textContent = value;
				}
				return this;
			}
		},
		/**
		 * @description 设置元素的属性
		 * @function attr
		 * @memberof dom
		 * @param {string object} attrName 要获取的属性名称,同时设置多个则传入"{}"包裹的键值对
		 * @param {string} value 需要设置的单个属性值
		 */
		attr:function(attrName,value){
			if(!this[0]) return this;
			if(typeof attrName == "string"){
				if(!value){ //获取单个属性值
					return this[0].getAttribute(attrName);
				}else{ //设置单个属性
					this[0].setAttribute(attrName,value);
					return this;
				}
			}else if(typeof attrName == "object"){ //同时设置多个属性
				for(var itemKey in attrName){
					for(var d=0;d<this.length;d++){
						this[d].setAttribute(itemKey,attrName[itemKey]);
					}
				}
				return this;
			}
		},
		/**
		 * @description 获取元素的兄弟节点
		 * @function text
		 * @memberof dom
		 * @param {string} sibName 指定兄弟节点名称，可以是元素，可以是class
		 */
		siblings:function(sibName){
			var thisDom = this[0];
			var sib=[];
			var allChild = thisDom.parentNode.children;
			for(var i=0;i<allChild.length;i++){
				if(!sibName){ //直接获取所以兄弟节点
					if(allChild[i] != thisDom) sib.push(allChild[i]);
				}else{ //带参数
					var prop;
					if(sibName.slice(0,1) == "."){ //传入class
						sibName = sibName.substring(1);
						prop = allChild[i].className;
					}else{ //传入元素名 nodeName
						prop = allChild[i].tagName.toLowerCase();
					} 
					if(prop == sibName){
						if(allChild[i] != thisDom) sib.push(allChild[i]);
					}
				}	
			}
			return this.pushStack(sib);
		},
		/**
		 * @description 获取子节点
		 * @function parent
		 * @memberof dom
		 * @param {string} str 指定要获取的子节点名称，可以是元素，可以是class
		 */
		children:function(str){
			var childDom = this[0].children,
				query = dom(str),
				childArr = [];
			if(!str){
				for(var i=0;i<childDom.length;i++){
					childArr.push(childDom[i]);
				}
			}else{
				for(var n=0;n<query.length;n++){
					for(var i=0;i<childDom.length;i++){
						if(query[n] == childDom[i]) childArr.push(childDom[i]);
					}
				}
			}
			return this.pushStack(childArr);
		},
		/**
		 * @description 获取祖先节点,如果不穿参数,则获取父节点
		 * @function parents
		 * @memberof dom
		 * @param {string} str 指定要获取的父节点名称，可以是元素，可以是class
		 */
		parents:function(str){
			var parDom = this[0].parentNode,
				query = dom(str),
				isFind = true;
			if(!str){
				return this.pushStack(parDom);
			}else{
				while(isFind){
					for(var i=0;i<query.length;i++){
						if(query[i] == parDom) return this.pushStack(parDom);
					}
					parDom = parDom.parentNode;
					if(!parDom) isFind = false;
				}
			}
		},
		/**
		 * @description 获取祖先节点
		 * @function find
		 * @memberof dom
		 * @param {string} str 指定要获取的子孙节点名称，可以是元素，可以是class
		 */
		find:function(str){
			var childDom = this[0].children,
				query = dom(str),
				isFind = true,
				findArr = [],
				childArr = [];
			if(!str){ //不传参数,则返回所以子元素
				for(var i=0;i<childDom.length;i++){
					findArr.push(childDom[i]);
				}
				return this.pushStack(findArr);
			}else{ //有参数,开始匹配
				while(isFind){
					if(childDom.length){
						//指定名称dom跟一级子元素匹配,匹配相等的加入数组中
						for(var i = 0 ; i < childDom.length ; i++){
							for(var o = 0 ; o < query.length ; o++){
								if(query[o] == childDom[i]) findArr.push(childDom[i]);
							}
						}
						//第一级子元素匹配完成后,查找所以下一级子元素
						for(var m = 0 ; m < childDom.length ; m++){
							var $childDom = childDom[m].children;
							if($childDom.length){
								for(var n = 0 ; n < $childDom.length ; n++){
									childArr.push($childDom[n]);
								}
							}
						}
						childDom = childArr; //替换为下次循环要匹配的子元素
						childArr = []; //接收数组清空
					}else{
						isFind = false;
						return this.pushStack(findArr);
					}
				}
			}
			
		},
		index:function(str){
			var sib=[];
			if(!str){ //获取自身处于兄弟元素的位置 不指定
				sib = this.parents().children();
				for(var i=0;i<sib.length;i++){
					if(sib[i]==this[0]) return i;
				}
			}else{	//指定元素
				sib = this.parents().children(str);
				for(var i=0;i<sib.length;i++){
					if(sib[i]==this[0]) return i;
				}
			}
		},
		on:function(addEvent,callback){
			for(var d=0;d<this.length;d++){
				this[d].addEventListener(addEvent,function(){
					callback();
				})
			}
		},
		off:function(addEvent,callback){
			for(var d=0;d<this.length;d++){
				this[d].removeEventListener(addEvent,function(){
					callback();
				})
			}
		}
	}

	dom.fn.init.prototype = dom.prototype;
    export default dom;


