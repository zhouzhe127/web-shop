import global from "src/manager/global";


let host = global.host;

try {
    //php环境中
    host = httpDomain.host;
} catch (e) {}

export let s = host.shop;
export let w = host.wx;
export let b = host.bc;
export let p = host.pos;


