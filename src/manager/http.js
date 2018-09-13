import Ajax from 'src/verdor/ajax';
import storage from 'src/verdor/storage';
import httpConfig from 'src/config/http/http_config';
import {
	store
} from 'src/manager/store';
import httpMd5 from 'src/manager/httpMd5';
import uploadfile from 'src/verdor/uploadfile';
import global from 'src/manager/global';
//let model = {};
let http = {};

export let globalData = {
	format: 'json'
};

// if (Proxy != null) {
//     http = new Proxy({}, {
//         get(target, key, receiver) {

//             let obj = httpConfig[key];
//             if (obj) {
//                 //单条请求
//                 return getOne(key, obj);
//             } else if (key === 'All') {
//                 //多条请求同时进行时
//                 // http.All([{httpId:'',data:{data:{ name:'123',phone:'2222' }}}])
//                 return getAll();
//             }
//             return Reflect.get(target, propKey, receiver);
//         }
//     })
// } else {
for (let str in httpConfig) {
	let obj = httpConfig[str];
	//分为file接口和ajax请求
	// if (obj.type == 'file') {
	// 	//下载文件
	// 	http[str] = function (o = {}) {
	// 		console.log(
	// 			Object.assign(o, obj, {
	// 				token: storage.session('token'),
	// 				shopId: storage.session('shopId') || ''
	// 			})
	// 		);
	// 		exportFile(
	// 			Object.assign(o, obj, {
	// 				token: storage.session('token'),
	// 				shopId: storage.session('shopId') || ''
	// 			})
	// 		);
	// 	};
	// } else 
	if (obj.type == 'upload') {
		//上传文件
		http[str] = async function(o = {}) {
			let data = null;
			let temp = Object.create(null);
			for (let str in obj) {
				temp[str] = obj[str];
			}
			try {
				data = await uploadfile.crosrouteroMain(
					Object.assign(temp, o, {
						shopId: storage.session('shopId') || ''
					})
				);
			} catch (e) {
				store.commit('setWin', {
					content: e
				});
				return Promise.reject(e);
			}

			return data;
		};
	} else {
		http[str] = getOne(str);
	}
}
http.All = getAll();

let hm = new httpMd5();
// }

function setGlobalData() {
	globalData.token = storage.session('token') || 'token';
	globalData.sdTime = hm.time;
	globalData.sdSig = hm.sig;
	globalData.shopId = storage.session('shopId') || '';
}

function getOne(key, obj = null) {
	obj = obj || httpConfig[key];
	//第一参数是请求的参数
	//第二参数是请求者是否自己提供处理错误的方式
	return async function(dataObj = {}, hasError = false, full = false) {
		// store.commit('setLoad',true);
		setGlobalData();
		//解決出现引用问题
		let o = Object.create(null);
		for (let str in obj) {

			o[str] = obj[str];
		}
		Object.assign(o, dataObj, {
			globalData
		});
		store.dispatch('debugCont', '准备发送请求: ' + obj.url);

		//模拟数据数据劫持
		//eslint-disable-next-line
		if (httpConfig[key].fake && process.env.NODE_ENV === 'development') {
			let Mock = await
			import ( /*webpackChunkName: 'mockjs'*/ 'src/verdor/mock');
			let jsonDate = await
			import ( /*webpackChunkName: 'mock'*/ `src/mock/${key}`);
			let mockData = Mock.mock(jsonDate.default);
			return Promise.resolve(mockData);
		}
		//将资源缓存，需要配合后台一起做
		//              if(model[key]&&process.env.ASSET_PATH){
		//                  return Promise.resolve(model[key]);
		//              }

		return new Promise((resolve, reject) => {
			Ajax(o)
				.then(json => {
					let staus = '';

					if (json.data !== undefined) {
						if (json.time) {
							hm.st = json.time;
							hm.lt = Date.now();
						}

						resolve(full ? json : json.data);
						staus = '成功';
						//                          model[key] = json.data;
					}
					if (json.error) {
						if (json.error.code + '' === '1002') {
							global.router.push('/');
							return false;
						}
						if (json.error.code + '' === '1204') {
							sessionStorage.clear();
							store.commit('setWin', {
								content: '请勿随意更改本地时间，请刷新页面!'
							});
							return false;
						}
						staus = '失败,原因为:' + json.error.message;
						!hasError &&
							store.commit('setWin', {
								content: json.error.message
							});
						hasError && reject({
							status: 200,
							error: json.error
						});
						console.log(
							json.error.message +
							'   **** ajax error: *** fail url in :' +
							obj.url
						);


					}

					store.dispatch('debugCont', '请求结束: ' + json.method + ' 状态为:' + staus);
					// store.commit('setLoad',false);
				})
				.catch(error => {
					hasError && reject({
						status: 500,
						error
					});
					!hasError && store.commit('setWin', {
						content: error.message
					});
					console.log(
						JSON.stringify(error) +
						'  **** ajax error: *** fail url in :' +
						obj.url
					);
					// store.commit('setLoad',false);
				});
		});
	};
}

function getAll() {
	return function(dataObj) {
		let queue = [];
		// globalData.token=storage.session('token') || 'token';
		setGlobalData();
		dataObj.forEach(function(item) {
			let sourceObj = httpConfig[item.httpId];
			if (!sourceObj)
				throw new Error('httpId: ' + item.httpId + ',没有配置,请查看配置');
			Object.assign(sourceObj, {
				globalData
			}, item);
			queue.push(Ajax(sourceObj));
		});

		return new Promise((resolve, reject) => {
			Promise.all(queue)
				.then(data => {
					resolve(data);
				})
				.catch(error => {
					reject(error);
				});
		});
	};
}

export default http;