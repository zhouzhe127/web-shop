/* eslint-disable */
const fs = require('fs');
let data = fs.readFileSync('./routes.js', 'utf-8');
let reg = /(const)([\w\W]+?)>([\w\W]+?)\)/g;
let res = reg.exec(data);
let impArr = [];
let namestr = [];
var Login = 'Login';
var con = 'con';
var details_con = 'details_con';
while (res != null) {
	let obj = {};
	let st = res[0].split(' ');
	global[st[1]] = st[1];
	let firreg = /(src).+\w/;
	firreg.exec(res[0]);
	let firstr = firreg.exec(res[0])[0];
	let firarr = firreg.exec(res[0])[0].split('/');
	// console.log(firarr);
	Object.assign(obj, {
		name: st[1],
		string: res[0],
		firstr: firstr,
		firName: firarr[2],
		lastfirName: firarr[firarr.length - 1],
		cont: 0
	})
	impArr.push(obj);
	res = reg.exec(data);
}
if (!fs.existsSync('routes')) {
	fs.mkdirSync('routes');
}
// let arrreg = /(export([\w\W]*))([\w\W]*)\]/;
let arrreg = /\[([\w\W]*)\]/;
let rtarr = arrreg.exec(data);
rtarr = eval(rtarr[0]);

// let setchild = function (item) {
//     let childarr = [];
//     for (let c1 of item.children) {
//         for (let cf1 of impArr) {
//             let com = c1.components.details_con;
//             if (com == cf1.name) {
//                 if (c1.children) {
//                     c1.children = setchild(c1);
//                 }
//                 delete c1.components
//                 c1.url = `${cf1.firstr}`;
//                 childarr.push(c1);
//                 break;
//             }
//         }
//     }
//     return childarr;
// }
let config = {};
let senFlie = function(item) {
	if (item.children) {
		let child = [];
		item.children.forEach(element => {
			child.push(senFlie(element));
		});
		item.children = child;
	}
	if (item.components && item.components.details_con != 'details_con') {
		let fir = getFile(item.components.details_con);
		item.url = `${fir.firstr}`;
	}
	delete item.components;
	return item;
}
let getFile = function(name, type) {
	let need = '';
	for (let fir of impArr) {
		if (name == fir.name) {
			need = fir;
			if (fir.cont >= 1 && type) {
				fir.lastfirName += 's';
			}
			fir.cont++;
			break;
		}
	}
	return need
}
for (let item of rtarr[3].children[0].children) {
	let fir = '';
	item = setfuncton(item);
	if (item.components && item.components.details_con != 'details_con') {
		fir = getFile(item.components.details_con, true);
	} else {
		for (let v of item.children) {
			if (v.components && v.components.details_con != 'details_con') {
				fir = getFile(v.components.details_con, true);
				break;
			}
		}
	}
	if (!fs.existsSync(`./routes/${fir.firName}`)) { //获取模块列表对象
		fs.mkdirSync(`./routes/${fir.firName}`);
	}
	if (!config[fir.firName]) {
		config[fir.firName] = {};
	}
	config[fir.firName][fir.lastfirName] = fir.lastfirName;
	let writestr = `/* eslint-disable */\nmodule.exports=${JSON.stringify(senFlie(item))}`;
	writestr = writestr.replace(/\$"|"\$|\\r|\\n/g, ''); //去除分号
	fs.writeFileSync(`./routes/${fir.firName}/${fir.lastfirName}.js`, writestr);
}

function setfuncton(item) { //处理对象中的函数
	for (let i in item) {
		if (typeof item[i] == "object") {
			item[i] = setfuncton(item[i]);
		} else if (typeof item[i] == "function") {
			item[i] = `$${item[i]}$`
		}
	}
	return item
}
let newconfig = {};
let type = 1;
let cofStr = '/* eslint-disable */\n'
for (let key in config) {
	let last = 1;
	let tem = '';
	let temobj = {};
	// newconfig[key] = {};
	for (let s in config[key]) {
		temobj[`${type<10?0:''}${type}${last}`] = key + '/' + config[key][s];
		last++;
	}
	tem = `const ${key} = ${JSON.stringify(temobj)};\n`;
	cofStr += tem
	type++;
}
let addexp = `let config = {useId: [], //需要用到的路由id
                    configs: {} //需要插入的路由模块
                };
                Object.assign(config.configs,${Object.keys(config).join(',')});
                module.exports = config;
/*
 *现在路由主要由以下文件构成
 *|routes|----->文件夹。包含所需要的路由json文件和route_id_config路由配置文件
 *       |route_id_config.js：中id-'0923'的命名规则09为模块的顺序23为路由内部的顺序
 *|route_template.js为路由的模板文件generate_routes.js以此为模板生成路径为src/config/route_template.js。
 *|generate_routes.js最后生成的路由文件路径为src/config/generate_routes.js       
 *|generate_route_config.js生成路由的入口文件路径为Attachment/generate_route_config.js
 **/`
cofStr += addexp;
fs.writeFileSync('./routes/route_id_config.js', cofStr);
// console.log(newconfig);