import global from 'src/manager/global';

let host = global.host;
/* eslint-disable */
try {
	//php环境中
	host = httpDomain.host; 
} catch (e) {}
/* eslint-able */
export let s = host.shop;
export let w = host.wx;
export let b = host.bc;
export let p = host.pos;
export let f = host.fs;
export let r = host.store;
