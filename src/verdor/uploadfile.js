import utils from './utils';
import timer from './timer';
import global from 'src/manager/global';
import storage from 'src/verdor/storage';

/**
 * @description 异步上传文件专用
 * @namespace upload
 */
let uploadfile = {
	/**
	 * @description 获取url
	 * @function getUrl
	 * @param {String} url 字符串
	 * @returns {String} 字符串
	 * @memberof upload
	 */
	getUrl: function(url, urlParams) {
		let sendParams = '';

		if (urlParams) {
			for (let key in urlParams) {
				sendParams += '&' + key + '=' + urlParams[key];
			}
		}
		if (utils.type(url) == 'object') {
			url = global.host[url.type] || global.host.shop;
			url += url.url;
		}

		url += '?' + sendParams;

		return url;
	},
	checkFile(file, fn) {
		file = file.files[0];
		let val = true;
		file && fn && (val = fn(file));
		if (!val) return false;
		let type = file.type;
		if (type.indexOf('image') > -1) {
			if (file.size > 1024 * 1024) {
				return '图片大小不能大于1M';
			}
		}

		return false;
	},
	onlyid: 0,
	Queue: {},
	/**
	 * @description 跨域上传文件
	 * @function ajax
	 * @param {Object} obj 一个对象
	 * @param {String} obj.url 请求地址
	 * @param {String} obj.formIdOrJson 表单id
	 * @param {String} obj.data 参数
	 * @memberof upload
	 */
	crosrouteroMain({
		url,
		formId,
		data,
		fn
	}) {
		return new Promise((resolve, reject) => {

			let f = null;
			let dom = null;
			if(typeof formId == 'string'){
				dom = document.querySelector('#' + formId);
				if (typeof formId == 'string') {
					if (dom.tagName != 'FORM') {
						throw new Error('id等于' + formId + '的form表单不存在');
					}
				}
				f = document.querySelector(`#${formId} input[type=file]`);
			}else{
				f = formId;
				let temp = f;
				while(temp.tagName.toLocaleLowerCase() != 'form'){
					temp = temp.parentNode;
				}
				dom = temp;
			}
			
			let oid = ++this.onlyid;

			let returnStr = this.checkFile(f, fn);
			if (returnStr) {
				reject(returnStr);
				return;
			}
			data = Object.assign({
				oid: oid,
				format: 'script',
				token: storage.session('token')
			}, data);

			let obj = {
				url: this.getUrl(url, data),
				formId,
				oid,
				resolve,
				reject,
				timerStr: ''
			};

			this.Queue[oid] = obj;
			timer.init();

			let parserEvent = function(event) {
				accData(event, obj);
			};
			if (this.onlyid == 1) {
				window.addEventListener('message', parserEvent, false);
			}

			let accData = (e) => {

				let strArr = e.data && e.data.data && e.data.data.split('&');
				
				if (strArr && strArr.length > 1) {
					//暂时不启用

					if (!(Object.keys(this.Queue) + '')) {
						window.removeEventListener('message', parserEvent, false);
						this.onlyid = 0;
					}
					let obj = {};
					for (let i = 0; i < strArr.length; i++) {
						let item = strArr[i];
						let itemArr = item.split('=');
						obj[itemArr[0]] = itemArr[1];
					}
					
					if (obj && obj.oid && this.Queue[obj.oid]) {
						timer.clear(this.Queue[obj.oid].timerStr);
						let backStr = decodeURIComponent(obj.encode);
						let errStr = obj.error;

						if (errStr) {
							//捕捉后台报错
							this.Queue[obj.oid].resolve('error: ' + errStr);
						} else {
							//成功的情况下
							try {
								let jsondata = JSON.parse(backStr);
								this.Queue[obj.oid].resolve(jsondata.data);
							} catch (e) {
								this.Queue[obj.oid].resolve('encode数据格式错误或成功的回调函数有问题');
							}
						}


						// window.removeEventListener('message', parserEvent, false);
						delete this.Queue[obj.oid];

						if (data.iframe) data.iframe.remove();
					}
				}
			};

			let postHandle = data => {
				//eslint-disable-next-line
				data.timerStr = timer.add(function() {}, 10000, 1, false, () => {
					if (data.iframe) data.iframe.remove();
					
					this.Queue[obj.oid].reject('timeout!');
					delete this.Queue[data.oid];
					if (!(Object.keys(this.Queue) + '')) {
						this.onlyid = 0;
						window.removeEventListener('message', parserEvent, false);
					}
				});
			};

			let createFrame = function(name) {
				let dom = document.createElement('iframe');
				dom.setAttribute('id', name);
				dom.setAttribute('name', name);
				dom.setAttribute('style', 'display:none');
				return dom;
			};

			let load = function() {
				let ifname = obj.formId + oid;
				obj.iframe = createFrame(ifname);
				document.body.appendChild(obj.iframe);

				let mform = dom;
				mform.setAttribute('action', obj.url);
				mform.setAttribute('target', ifname);
				mform.setAttribute('method', 'post');
				mform.submit();

				postHandle(obj);
			};

			load();
		});
	}
};

export default uploadfile;