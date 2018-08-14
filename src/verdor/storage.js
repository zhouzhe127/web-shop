
    import utils from "./utils";
    import DataBase from "./database";

    let db = new DataBase();
    let dbVal = db._status;

    var storage = {
        /**
         * @description 操作对应的localStorage和sessionStorage
         * @function webStorageHandle
         * @param {Storage}  storage 需要操作的Storage对象
         * @param {String}  key 需要操作的key
         * @param {String}  value 需要设置的value
         * @memberof storage
         * @returns [Object] 返回获取的数据
         */
        webStorageHandle:function(storage, key, value,count) {
            if(key !== null) {
                if(key === undefined) return null;
                if(utils.type(key)!='string') {
                    key = key.toString();
                }
                if(value !== undefined && value !== null) {
                    if (utils.type(value) == 'boolean') {
                        value = '1:' + (value ? '1' : '0');
                    } else if (utils.type(value) == 'number') {
                        value = '2:' + value;
                    } else if (utils.type(value) == 'string') {
                        value = '3:' + value;
                    } else if (utils.type(value) == 'array') {
                        value = '4:' + JSON.stringify({
                            data: value
                        });
                    } else if (utils.type(value) == 'object') {
                        value = '5:' + JSON.stringify(value);
                    } else {
                        throw new Error(key + '存储格式不支持' + value);
                    }
                    storage.setItem(key, value);
                } else {
                    if(value === null) {
                        storage.removeItem(key);
                    } else {
                        var fstr = storage.getItem(key);
                        if(fstr == null) {
                            return null;
                        }
                        var reg = /^[\d]+\:/;
                        if(reg.test(fstr)) {
                            var ix = fstr.indexOf(':');
                            var vstr = fstr.substring(ix + 1);
                            var vtype = fstr.substring(0, ix);
                            switch(vtype) {
                                case '1':
                                    return vstr === '1';
                                case '2':
                                    return Number(vstr);
                                case '3':
                                    return vstr;
                                case '4':
                                    return(JSON.parse(vstr)).data;
                                case '5':
                                    return JSON.parse(vstr);
                                case '6':
                                    return '';
                            }
                        }
                        return fstr;
                    }
                }
            } else {
                storage.clear();
            }
            return null;
        },
        /**
         * @description 轻量级本地数据存储（持久化，域名范围访问限制，大小限制5M）请不要直接使用window.localStorage因为他可能不可用，另外他value只能是String
         *
         * @function localData
         * @param {string} key key
         * @param {boolean|number|string|Array|Json|XML} value value
         * @memberof storage
         * @return {*}
         */
        async localData(key, value) {
            // if(window.localStorage) {
            //     let str = this.webStorageHandle(window.localStorage, key, value,count);
            //     return str;
            // }
            if(dbVal){
                //删除
                if(value === null){
                    await db.delete(key);
                }else if(key!=undefined&&value!=undefined){
                    //写入
                    await db.setData({key,value});
                }
                else{
                    //获取
                    let data = await db.getData(key);
                    return data;
                }
            }else{
                let str = this.webStorageHandle(window.localStorage, key, value,count);
                return Promise.resolve(str);
            }
        },
        arr:[],
        //统计本地存储的长度
        countNum:function(key, value){
            value  = value+'';
  
            let content = this.localData('content',undefined,false);
            
            
            //localData 已到达预定值
            if(content&&(content.l+value.length)>2.5*1024*1024){
                let frist = content.stack.shift();
                let l = JSON.stringify(this.localData(frist)).length;
                this.localData(frist,null);
                this.localData('content',{l:content.l-l,stack:content.stack},false)
            }
            if(!content){
                let obj = {
                    stack:[],
                    l:0
                }
                this.localData('content',obj,false)
            }else{
                let {l,stack} = content;
                let old = window.localStorage.getItem(key);
                if(old){
                    l -= old.length;
                }
                this.localData('content',{l,stack},false)
            }
  
            setTimeout(()=>{
                
                
                let {l,stack} = this.localData('content',undefined,false);
                
                l += value.length;
                stack.indexOf(key)<0&&stack.push(key);
                this.localData('content',{l,stack},false)
                
                this.arr.pop();
            },this.arr.length*1000)
        },
        /**
         * @description 回话数据存储（访问时间段内持久，域名范围访问限制，大小限制5M）请不要直接使用window.sessionStorage因为他可能不可用，另外他value只能是String
         *
         * @function session
         * @param {string} key key
         * @param {boolean|number|string|Array|Json|XML} value value
         * @return {*}
         * @memberof storage
         */
        session:function(key, value) {
            if(window.sessionStorage) {
                return this.webStorageHandle(window.sessionStorage, key, value);
            }
        }
    };

    export default storage;