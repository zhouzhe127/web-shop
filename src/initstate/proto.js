import http from 'src/manager/http';
//在Vue原型上挂载属性
class Proto {
	constructor(Vue) {
		Vue.prototype.$http = http;
	}
}

export default Proto;