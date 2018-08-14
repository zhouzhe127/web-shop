/*
 * @Author: ruokun.ma 
 * @Date: 2018-04-02 09:51:05 
 * @Module: {数据库} 
 */

const DB_NAME = 'sddb';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'localdata';
let db = window.indexedDB;
 class DataBase{

    constructor(){
        this.db = null;
        this.store = null;
        this.createInstance();
    }

    error(e){
        console.log('open db error!');
    }
    success=(e)=>{
        this.db=e.target.result;
    }
    /* 添加数据 形如
        {
            key:"",
            value:1
        } 
    */
    setData(obj){
        return new Promise((resolve,reject)=>{

            if(typeof obj!=='object'||(obj.key==undefined&&obj.value == undefined)){
                throw new Error("添加数据格式错误,需要类似于{key:'',value:1}")
            }

            let store = this.db.transaction(DB_STORE_NAME,'readwrite').objectStore(DB_STORE_NAME),request;

            request = store.put(obj);
            request.onerror = function(){
                // console.error('put添加数据库中已有该数据')
                reject('error')
            };
            request.onsuccess = function(){
                // console.log('put添加数据已存入数据库')
                resolve('success')
            };


        })
    
    }
    /* 删除数据 */
    delete(key){
        var request = this.db.transaction(DB_STORE_NAME, "readwrite")
        .objectStore(DB_STORE_NAME)
        .delete(key);
        request.onsuccess = function(event) {
            // 删除数据成功！
        };
    }
    /* 获取数据 */
    getData(key){

        return new Promise((resolve,reject)=>{

            var objectStore = this.db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);

            objectStore.openCursor().onsuccess = function(event) {
 
                var cursor = event.target.result;
                if (cursor) {
                    
                    if(cursor.key == key){
                        resolve(cursor.value.value);
                    }else{
                        cursor.continue();
                    }
                }
                else {
                    // reject("nodata")
                    resolve(null);
                }

            };
        })
        
    }
    //指定的版本号高于当前被持久化的数据库的版本号或者第一次打开数据库
    upgradeneed(e){
        this.db = e.target.result;

        // 创建一个对象存储空间来持有有关我们客户的信息。
        // 我们将使用 "ssn" 作为我们的 key path 因为它保证是唯一的。
        this.store = this.db.createObjectStore(DB_STORE_NAME, { keyPath: "key" });

        // 创建一个索引来通过 name 搜索客户。
        // 不能有重复
        this.store.createIndex("key", "key", { unique: true });


    }
    

    createInstance(){
        if(db){
            let request= db.open(DB_NAME,DB_VERSION);
            request.addEventListener("error",this.error);
            request.addEventListener("success",this.success);
            request.addEventListener("upgradeneeded",this.upgradeneed);
            request.addEventListener("blocked",this.blocked);
        }
    }

    closeDB(){
        this.db.close();
    }

    blocked(event) {
        // 如果其他标签页已经加载了这个数据库，那么
        // 在我们可以继续处理之前它需要被关闭。
        
    };

 }
 
 Object.defineProperty(DataBase.prototype,"_status",{
     configurable:true,
     get:function(){
         return db?true:false;
     }
 })
 export default DataBase;