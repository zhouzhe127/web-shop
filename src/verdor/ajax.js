import utils from "src/verdor/utils";

/**       IE10+ 
         * @description ajax请求
         * @function ajax
         * @param {Object} obj 一个对象
         * @param {Object} obj.data ajax请求中附加的数据
         * @param {String} obj.url 请求地址  支持多域
         * @param {String} obj.mothed 请求方式
         * @param {Function} obj.success 请求成功时的回调
         * @param {Function} obj.error 请求失败时的回调
         * @param {Boolean} obj.async 是否异步 
         * @param {String} obj.type 数据类型 json text script
         * @param {Array} obj.ajaxId 获取ajax的唯一id
         * @param {int} obj.timeout 多少毫秒之后自动取消
         * @example
            let ajaxId = [];//可以获取当前这个ajax的引用,供后期取消使用
            let obj = {
                url: 'http://60.205.222.103:3000',
                mothed: "get",
                type: "json",
                id:ajaxId
            }
            let p = ajax(obj);
    
            p.then(function(obj) {
                    console.log(obj);
                })['catch'](function(e) {
                    console.log(e);
                })
         * @returns {Promise}
         * @constructor
         */

let accepts = {
	xml: "application/xml, text/xml",
	html: "text/html",
	script: "text/javascript, application/javascript",
	json: "application/json, text/javascript",
	text: "text/plain",
	_default: ""
};
let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

function ajax(params) {
	return new Promise(function (resolve, reject) {
		var obj = utils.deepCopy(params);
		ajax.checkCrossDomain(obj.url);

		let url = obj.url;

		let method = obj.method || "get";
		let timeout = obj.timeout || 20000;
		let async = typeof obj.async == "undefined" ? true : obj.async;
		let type = obj.type || "json";
		let id = "a_" + ajax.id++;
		let globalData = Object.assign(obj.globalData || {}, {
			format: "json"
		});
		let source = obj.source; //post请求时单独发送字符串
		//回调出ajax的id

		if (obj.id != undefined) {
			if (ajax.isArray(obj.id)) {
				obj.id.push(id);
			}
		} else {
			obj.id = id;
		}

		if (!source) { //中信一键转账接口不需要添加全局参数 source判断
			url += "?" + ajax.paramsajaxData(globalData);
		}
		//解析参数
		if (method === "get" && obj.data) {
			let pd = ajax.paramsajaxData(obj.data);
			if (pd != "") {
				if (url.indexOf("?") > 0) {
					url += "&" + ajax.paramsajaxData(obj.data);
				} else {
					url += "?" + ajax.paramsajaxData(obj.data);
				}
			}
		}
		if (url.indexOf("?") > 0) url += "&r=" + Math.random();
		else url = source ? url : url += "?r=" + Math.random(); //中信一键转账接口不需要添加全局参数 source判断

		let xhr = ajax.createajax();
		xhr._data = obj;
		ajax.loadQueue[id] = xhr;

		//xhr2和XDomainRequest
		if ("onload" in xhr && async) {
			xhr.onload = function (event) {

				//下载文件
				if(type == "file"){
					var blob = this.response;
					var reader = new FileReader();
					reader.readAsDataURL(blob);    // 转换为base64，可以直接放入a
					var suf = /^[\w]+\/(.+)/g.exec(blob.type)[1];
					var time = new Date();
					var fileName = obj.fileName || (time.getFullYear() + ("00" + (time.getMonth()+1) ).slice(-2) + ("00" + time.getDate() ).slice(-2)); 
					reader.onload = function (e) {

						let str = e.target.result;

						// data:text/html;base64,eyJlcnJvciI6eyJjb2RlIjoyODE4LCJtZXNzYWdlIjoiXHU2MGE4XHU2Y2ExXHU2NzA5XHU2NzQzXHU5NjUwXHVmZjBjXHU4YmY3XHU4MDU0XHU3Y2ZiXHU3NmY4XHU1MTczXHU0ZWJhXHU1NDU4In19

						if (str.length < 1000) {
							let strCopy = decode(str.split(",")[1]);//将字符串分离
							let obj = null;
							try {
								obj = JSON.parse(strCopy);
								destroyed({
									message: obj.error.message
								});
							}
							catch (e) {
								downfile(fileName, suf, str);
							}
							
						} else {
							downfile(fileName, suf, str);
						}

						
						
						
					}
				}else{
					parseData(xhr.responseText);
				}
				
			};
			xhr.onerror = function (event) {
				destroyed({
					message: source ? "asdasdasd" : "请求出错,请稍后再试!"
				});
			};
		} else {
			xhr.onreadystatechange = function (event) {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						parseData(xhr.responseText);
					} else {
						destroyed({
							message: "请求出错",
							code: xhr.status
						});
					}
				}
			};
		}

		function downfile(fileName, suf, str) { 
			var a = document.createElement('a');
			a.download = fileName + "." + suf;
			a.href = str;
			document.body.append(a);
			a.click();
			a.parentNode.removeChild(a);
			parseData();
		}

		function destroyed(data) {
			data && reject(data);
			ajax.removeStatus(id);
			obj.timer && clearTimeout(obj.timer);
		}

		function parseData(str) {
			if (type == "json") {
				try {
					let o = JSON.parse(str);
					resolve(o);
				} catch (e) {
					reject("json解析失败");
				}
			} else if (type == "text") {
				resolve({
					data: str
				});
			} else if (type == "script") {
				ajax.DOMEval(str);
				resolve(str);
			}else if(type == "file"){
				resolve({
					data: "下载成功"
				});
			}
			destroyed();
		}

		//到时间后取消请求
		if (timeout && timeout > 0) {
			//注意此事件不能用在加载文件的接口中
			// xhr.timeout = timeout;
			// xhr.ontimeout = function(event){
			//     reject('请求超时,已经取消');
			//     ajax.removeStatus(id);
			// }

			obj.timer = setTimeout(function () {
				reject({
					message: "请求超时,已经取消"
				});
				ajax.stop(id);
				ajax.removeStatus(id);
			}, timeout);
		}

		//发送请求
		let sendPam = [method, url, async];
		xhr.open.apply(xhr, ajax.xDomain ? sendPam : sendPam.slice(0, 2));
		//如果请求时下载文件
		if(type == "file") xhr.responseType = "blob";  
		!ajax.xDomain && xhr.setRequestHeader("Accept", accepts[type] || "/");

		if (method === "post") {
			!ajax.xDomain &&
				xhr.setRequestHeader(
					"Content-Type",
					"application/x-www-form-urlencoded"
				);
			xhr.send(source ? obj.data : ajax.paramsajaxData(obj.data));
		} else {
			xhr.send(null);
		}
	});
}
/**
 * @description 执行js
 * @function isArray
 * @memberof ajax
 * @param {Object} obj 需要判断的对象
 * @returns {Boolean}
 */
ajax.DOMEval = function (code) {
	code = utils.trim(code);
	if (!utils.NotIE8) {
		// ( window.execScript || function( data ) {
		//     window[ "eval" ].call( window, data );
		// } )( code );
		new Function(code)(code);
	} else {
		var script = document.createElement("script");
		script.text = code;
		document.head.appendChild(script).parentNode.removeChild(script);
	}
};
/**
 * @description 移除当前ajax的状态
 * @function isArray
 * @memberof ajax
 * @param {Object} obj 需要判断的对象
 * @returns {Boolean}
 */
ajax.removeStatus = function (id) {
	ajax.loadQueue[id] = null;
	delete ajax.loadQueue[id];
};
/**
 * @description 判断目标是否是数组
 * @function isArray
 * @memberof ajax
 * @param {Object} obj 需要判断的对象
 * @returns {Boolean}
 */
ajax.isArray = function (obj) {
	return Object.prototype.toString.call(obj) === "[object Array]";
};
/**
 * @description 移除还在加载的ajax对象
 * @function stop
 * @memberof ajax
 */
ajax.stop = function (id) {
	ajax.loadQueue[id].abort();
	ajax.loadQueue[id] = null;
	delete ajax.loadQueue[id];
};

/**
 * @description 判断是否存在需要移除的对象
 * @function abortLoad
 * @param {Array} obj 可以是数组也可以是字符串
 * @memberof ajax
 * @example
 * ajax.abortLoad(ajaxId);
 */
ajax.abortLoad = function (obj = Object.keys(ajax.loadQueue)) {
	//数组
	if (this.isArray(obj)) {
		let i = 0;

		for (; i < obj.length; i++) {
			let id = obj[i];
			let timer = ajax.loadQueue[id]._data.timer;
			clearTimeout(timer);
			ajax.loadQueue[id] && ajax.stop(id);
		}
		obj.length = 0;
	} else if (typeof obj == "string") {
		ajax.loadQueue[obj] && ajax.stop(obj);
	}
};
/**
 * @description ajax累加器
 * @type {Number}
 * @let id
 * @memberof ajax
 */
ajax.id = 0;
/**
 * @description 当前正在加载的ajax队列,供取消时使用
 * @type {Object}
 * @let loadQueue
 * @memberof ajax
 */
ajax.loadQueue = {};
/**
 * @description ajax存储对象
 * @type {Array}
 * @let cacheajax
 * @memberof ajax
 */
ajax.cacheajax = [];
/**
 * @description 解析ajax发送的数据
 * @function ajax
 * @param {Object} data 一个对象
 * @returns {String} 加工之后可以用的字符串
 * @memberof ajax
 */
ajax.paramsajaxData = function (data) {
	if (!data) return "";
	let arr = [];
	for (let str in data) {
		arr.push(
			encodeURIComponent(str) +
			"=" +
			encodeURIComponent(
				typeof data[str] == "object" ? JSON.stringify(data[str]) : data[str]
			)
		);
	}
	return arr.join("&");
};
/**
 * @description 创建ajax
 * @function createajax
 * @memberof ajax
 */
ajax.createajax = function () {
	let i = 0;
	for (; i < ajax.cacheajax.length; i++) {
		if (
			(ajax.cacheajax[i].readyState == 0 ||
			ajax.cacheajax[i].readyState == 4) && ajax.cacheajax[i].responseType == ""
		) {
			
			return ajax.cacheajax[i];
		}
	}
	let xmlhttp = new XMLHttpRequest();
	//如果浏览器不支持CORS并且是跨域请求时 IE9-
	//XDomainRequest不支持cookie的上传
	if (!("withCredentials" in xmlhttp) && ajax.crossDomain) {
		xmlhttp = null;
		xmlhttp = new XDomainRequest();
		this.xDomain = true;
	} else {
		ajax.cacheajax[ajax.cacheajax.length] = xmlhttp;
		this.xDomain = false;
	}

	// xmlhttp.withCredentials = true; //允许跨域发送cookie

	return xmlhttp;
};

//检测当前的请求是否跨域
ajax.checkCrossDomain = function (str) {
	if (str.indexOf("http") != 0) {
		ajax.crossDomain = false;
		return;
	}
	let locOrigin =
		location.origin ||
		location.href
		.split("/")
		.slice(0, 3)
		.join("/");
	let remoteOrigin = str
		.split("/")
		.slice(0, 3)
		.join("/");
	ajax.crossDomain = true;
	if (locOrigin === utils.trim(remoteOrigin)) {
		ajax.crossDomain = false;
	}
};

//请求是否使用的XDomainRequest
ajax.xDomain = true;
//是不是跨域的请求
ajax.crossDomain = false;


function decode(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = _keyStr.indexOf(input.charAt(i++));
		enc2 = _keyStr.indexOf(input.charAt(i++));
		enc3 = _keyStr.indexOf(input.charAt(i++));
		enc4 = _keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	output = _utf8_decode(output);
	return output;
} 


// private method for UTF-8 decoding
function _utf8_decode(utftext) {
	var string = "";
	var i = 0;
	var c = 0,c1 = 0,c2 = 0,c3=undefined;
	while (i < utftext.length) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}

export default ajax;