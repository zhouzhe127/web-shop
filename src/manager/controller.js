/*
 * @Author: ruokun.ma 
 * @Date: 2018-04-03 15:09:32 
 * @Module: {控制器} 
 * 获取数据的地方(目前作为取有有数据版本号的)
 */

import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import DataBase from 'src/verdor/database';


let db = new DataBase();
//在内部中临时存储数据
let store = {};

class Controller {

	static async getData({
		key
	}) {

		//从内存中先读取
		let data = store[key] || storage.session(key);

		if (!data) {
			data = await http[key]();
		}


	}

	//检查版本
	// static async checkVersion() {

	// }

	static setData(key, value) {
		store[key] = value;
		storage.session(key, value);

		db.setData({
			key,
			value
		});
	}

}


export default Controller;