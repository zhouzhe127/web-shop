/* 
    加密http请求使用
*/
import MD5 from 'src/verdor/md5';
import storage from 'src/verdor/storage';

let md5 = new MD5();

class httpMd5{
    constructor(){
        this._st = 0;//服务器返回数据的时间
        this._lt = 0;//服务器数据返回时的本地时间
        this._time = 0;
    }
    set lt(val){
        this._lt = parseInt(val/1000);
    }
    set st(val){
        this._st = val;
    }
    static setKey(val){
        this._key = val;
    }
    get time(){
        this._time = (parseInt(Date.now() / 1000) - this._lt) + this._st;
        return this._time;
    }
    get sig(){
        let token = storage.session('token');
        return md5.hex_md5(httpMd5._key + this._time + token )
    }
}
httpMd5._key = storage.session('sdkey');
export default httpMd5;
