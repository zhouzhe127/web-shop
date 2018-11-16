import storage from '../verdor/storage';
import Timer from '../verdor/timer';
import utils from '../verdor/utils';
import { store } from './store';

let global = {
	checkLogin() {
		let userData = storage.session('token');
		if (userData) {
			return true;
		}
		return false;
	},
	cdnUrl: '',
	uploadUrl: '',
	isPhpEnv: false, //是否是php环境
	router: null,
	/**
	 * @description 判断对应数据是否符合条件
	 * @function checkData
	 * @param {Object} obj 需要判断的对象
	 *  key = >{  需要判断的变量名
	 *   cond:"$$<1",需要满足的条件,$代表需要判断的对象
	 *   reg:/。。/需要满足的正则,此属性不能与cond同时出现，如果需要满足正则又需要满足条件，建议都写到满足条件中去
	 *   pro:"*****",//不满足条件时给的提示
	 * }
	 * @param {Context} context 上下文环境
	 * 
	 * 注意事项：
	 * 1.如果没有给出条件和正则,则判断该变量的值是否不等于该变量类型的原始值
		1):var a = 10,条件:a!=0;
		2)var b = "asd",条件:b!=""
	   2.如果在对应的上下文环境中没有找到对应的数据,比如说局部变量变量
		此时应使用value键,把真实的值附上去
		1)  export default{
				data:function(){
					return {b:1} 
				},
				motheds:{
					check(){
						let a = 10;
						global.checkData({a:{cond:"$$>1",pro:"ssssss",value:a}},this) =====>注意:此时在对象环境变量上找不到this.a,可以在value上赋值
					}
				}
			}
	 */
	//注:cond条件与reg条件存在其中一个即可
	checkData(obj, context) {
		for (let key in obj) {
			let value =
				context[key] != undefined ? context[key] : obj[key].value;
			value = value ? value : '';
			let pro = obj[key].pro || '信息不符合要求';
			let cond = obj[key].cond;
			let reg = obj[key].reg;
			let fn = obj[key].fn;
			let type = utils.type(value);
			if (type === 'string') {
				value = value.trim();
			}

			if (cond && reg) throw new Error('reg与cond条件不能同时存在!');
			if (fn) {
				if (!fn.call(context, value)) {
					store.commit('setWin', {
						title: '提示信息:',
						content: pro
					});
					return false;
				}
			} else if (cond) {
				let fun = new Function(
					'value',
					'if(' +
						cond.replace(/\$\$/g, 'value') +
						'){return true;}return false;'
				);
				if (!fun.call(context, value)) {
					store.commit('setWin', {
						title: '提示信息:',
						content: pro
					});
					return false;
				}
			} else if (reg) {
				//没有cond条件,有正则条件,并且校验结果为空时
				if (!reg.test(value)) {
					store.commit('setWin', {
						title: '提示信息:',
						content: pro
					});
					return false;
				}
			} else {
				//没有判断条件,正则时执行
				if (
					(type === 'string' && value === '') ||
					(type === 'boolean' && value === false) ||
					(type === 'number' && value === 0)
				) {
					store.commit('setWin', {
						title: '提示信息:',
						content: obj[key] || '信息不符合要求'
					});
					return false;
				}
			}
		}

		return true;
	},
	//插入style样式的id
	id: 0,
	//管理id的对象
	idManager: {},
	//将加载css中的使用的资源路径替换，并且插进style
	replaceCssIntoStylePro(str) {
		let hash = this.getHash(str.length > 30 ? str.slice(0, 30) : str);

		//如果是php环境，则将内部的资源路径替换
		if (this.isPhpEnv) {
			str = str.replace('needReplace/static/', this.cdnUrl);
		}

		if (!this.idManager[hash]) {
			let styleTag = document.createElement('style');
			styleTag.innerText = str;
			// styleTag.setAttribute("data-id",this.id++);
			document.head.appendChild(styleTag);
			this.idManager[hash] = hash;
		}
		// return new Promise((resolve,reject)=>{
		//     import(/* webpackChunkName:name*/"src/res/css/test.css").then((data)=>{
		//         console.log(data);
		//         resolve(data);
		//     },(error)=>{
		//         reject(error);
		//         console.log(error);
		//     })

		// require.ensure([url], function(){
		//     let dataStr = require(url);
		//     console.log(dataStr);
		// }, name); // 第三个参数设置打包名称

		// })
	},

	hasBaiduMap: null,
	getBaiduMapApi() {
		if (this.hasBaiduMap) return Promise.resolve();
		return new Promise((resolve, reject) => {
			let s = document.createElement('script', true);
			let proto = window.location.protocol; //判断协议

			s.src = `${proto}//webapi.amap.com/maps?v=1.4.6&key=f4fd8c2aaa26c58a12eae5b301cf1c1c&plugin=AMap.PolyEditor,AMap.CircleEditor`;

			document.head.appendChild(s);

			let d = document.createElement('div');
			d.id = 'allmap';
			document.body.appendChild(d);
			window.HOST_TYPE = proto == 'https:' ? '1' : '0'; //开启https请求

			this.str = Timer.add(
				() => {
					try {
						let temp = AMap; // eslint-disable-line
						Timer.clear(this.str);
						this.isHasMap = true;
						resolve();
					} catch (e) {} // eslint-disable-line
				},
				20,
				0,
				true
			);

			s.onload = () => {}; // eslint-disable-line
			s.onerror = () => {
				reject();
			};
		});
	},

	//以后是弹框使用的两个依赖
	win_id: 0,
	win_num: 0,

	// 本地时的请求接口地址
	// host: {
	// 	shop: 'http://v5.ishandian.com.cn/shop/',
	// 	bc: 'http://bc.api.ishandian.com.cn/Api/',
	// 	wx: 'http://zishi.ishandian.com.cn/api/',
	// 	pos: 'http://v5.ishandian.com.cn/pos/',
	// 	fs: 'http://fs.ishandian.com.cn/api/'
	// },
	// qa
	host: {
		shop: 'http://v5.qa.ishandian.com.cn/shop/',
		bc: 'http://bc.api.qa.ishandian.com.cn/api/',
		wx: 'http://wx.qa.ishandian.com.cn/api/',
		pos: 'http://v5.qa.ishandian.com.cn/pos/',
		fs: 'http://fs.qa.ishandian.com.cn/'
	},
	// pre
	// "host" : {"shop":"http://v5pre.ishandian.net/shop/","pos":"http://v5pre.ishandian.net/pos/","bc":"http://bc.api.pre.ishandian.net/api/","wx":"http://wxpre.ishandian.net/api/","fs": "http://fspre.liangpiaoji.com/api/"},
	// "host" : {"shop":"http://v5.ishandian.net/shop/","pos":"http://v5pre.ishandian.net/pos/","bc":"http://bc.api.ishandian.net/api/","wx":"http://wx.ishandian.net/api/","fs": "http://fs.liangpiaoji.com/api/"},

	groupFansList: {
		isOwer: false,
		data: [],
		groupId: ''
	}, //   用户组对应粉丝数据
	//存储上传文件的回调
	uploadFn: null,
	timeConst: {
		// 时间戳常量
		ONEDAY: 24 * 60 * 60 * 1000, //一天
		ONEWEEK: 7 * 24 * 60 * 60 * 1000, //一周
		ONEMONTH: 30 * 24 * 60 * 60 * 1000, //一个月
		THREEMONTHS: 90 * 24 * 60 * 60 * 1000 // 3个月
	},
	//进销存单位换算
	/* eslint-disable */
	comUnit(number, value, showName, minName, type) {
		//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
		//不传type则返回拼接好的字符串，传type则返回纯数字对象
		let showNum = ''; //展示的数据
		let obj = {};
		if (showName == minName) {
			if (type) {
				obj = { oNull: '', tNull: number == 0.0 ? '' : number };
				return obj;
			} else {
				showNum = number + minName;
				return showNum;
			}
		}
		let integer = parseInt(number / value) + ''; //整数
		let fltint = (number % value).toFixed(3) + ''; //小数
		if (integer == 0) {
			if (type) {
				obj = { oNull: '', tNull: fltint == 0.0 ? '' : fltint };
				return obj;
			} else {
				showNum = fltint + minName;
				return showNum;
			}
		} else if (parseInt(fltint * 1000) == 0) {
			if (type) {
				obj = { oNull: integer == 0.0 ? '' : integer, tNull: '' };
				return obj;
			} else {
				showNum = integer + showName;
				return showNum;
			}
		} else {
			if (type) {
				obj = { oNull: integer, tNull: fltint };
				return obj;
			} else {
				if (Number(fltint) < 0) {
					showNum =
						integer + showName + '+' + '(' + fltint + minName + ')';
				} else {
					showNum = integer + showName + '+' + fltint + minName;
				}
				return showNum;
			}
		}
	}
	/* eslint-able */
};

export default global;
