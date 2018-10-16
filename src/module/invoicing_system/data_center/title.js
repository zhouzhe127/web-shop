/*
    '物料名称,单位选择,期初数量,结存数量,入库量,入库成本总额,入库均价,加工入库数量,加工入库成本总额,加工入库成本均价,'+
    '调入数量,调入成本总额,调入成本均价,调出数量,调出成本总额,调出成本均价,调出分销总额,调出分销均价,调出分销利润,加工消耗,'+
    '加工消耗成本总额,加工消耗成本均价,耗损总量,耗损成本总额,盘亏数量,盘亏总金额,盘盈数量,盘盈总金额,领料数量,领料总金额,'+
    '领料消耗,领料消耗总金额,领料回库,领料回库总金额,领料剩余,领料剩余总金额,BOM单消耗毛料,BOM单消耗毛料成本总额,BOM单消耗净料,BOM单消耗净料成本总额,'+
    'BOM单自然损耗,BOM单自然损耗总额'
    属性说明:
        name:页面展示时的标签名
        title:前端展示的字段名
        attr:与title属性相对应的后台字段名,
        changeNum:true表示切换单位时需要改变单位的字段
        operationType:跳转到总日志需要查询的总日志类型
        description:title属性的一个描述
*/

module.exports = [
// {
//     "id": 0,
//     "name": "物料名称",
//     "attr":"name",
//     "title": "t-0",
//     "changeNum": false
// },
//  {
//     "id": 1,
//     "name": "单位选择",
//     "title": "t-1",
//     "changeNum": false,
// },
 {
    "id": 2,
    "name": "期初数量",
    "title": "t-2",
    "changeNum": true,
    "attr": "startNum",
}, {
    "id": 3,
    "name": "结存数量",
    "title": "t-3",
    "changeNum": true,
    "attr":"endNum",
}, {
    "id": 4,
    "name": "入库量",
    "title": "t-4",  
    "changeNum": true,
    "operationType":2,
    "attr":"MATERIAL_STOCKING_NUM",
}, {
    "id": 5,
    "name": "入库成本总额",
    "title": "t-5",
    "changeNum": false,
    "operationType":2,    
    "attr":"MATERIAL_STOCKING_COST",
}, {
    "id": 6,
    "name": "入库均价",
    "title": "t-6",
    "changeNum": false,
    "description":"入库成本总额/入库量",
    "attr":"MATERIAL_STOCKING_PRICE",
}, {
    "id": 7,
    "name": "加工入库数量",
    "title": "t-7",
    "changeNum": true,
    "operationType":13,    
    "attr":"MATERIAL_MACHINING_PRODUCE_NUM",    
}, {
    "id": 8,
    "name": "加工入库成本总额",
    "title": "t-8",
    "changeNum": false,
    "operationType":13,        
    "attr":"MATERIAL_MACHINING_PRODUCE_COST",        
}, {
    "id": 9,
    "name": "加工入库成本均价",
    "title": "t-9",
    "changeNum": false,
    "description":"加工入库成本总额/加工入库数量" ,
    "attr":"MATERIAL_MACHINING_PRODUCE_PRICE"   
}, {
    "id": 10,
    "name": "调入数量",
    "title": "t-10",
    "changeNum": true,
    "attr":"MATERIAL_TRANSFER_IN_NUM",        
    "operationType":7,    
}, {
    "id": 11,
    "name": "调入成本总额",
    "title": "t-11",
    "changeNum": false,
    "attr":"MATERIAL_TRANSFER_IN_COST",            
    "operationType":7,        
}, {
    "id": 12,
    "name": "调入成本均价",
    "title": "t-12",
    "changeNum": false,
    "description":"调入成本总额/调入数量" ,
    "attr":"MATERIAL_TRANSFER_IN_PRICE"      
}, {
    "id": 13,
    "name": "调出数量",
    "title": "t-13",
    "changeNum": true,
    "operationType":6,    
    "attr":"INVENTORY_MATERIAL_TRANSFER_OUT_NUM",            
    
}, {
    "id": 14,
    "name": "调出成本总额",
    "title": "t-14",
    "changeNum": false,
    "operationType":6,        
    "attr":"INVENTORY_MATERIAL_TRANSFER_OUT_COST",                
}, {
    "id": 15,
    "name": "调出成本均价",
    "title": "t-15",
    "description":"调出成本总额 / 调出数量",
    "changeNum": false,
    "attr":"INVENTORY_MATERIAL_TRANSFER_OUT_PRICE"      
    
}, {
    "id": 16,
    "name": "调出分销总额",
    "title": "t-16",
    "changeNum": false,
    "operationType":6,            
    "attr":"INVENTORY_MATERIAL_TRANSFER_OUT_COST2",        
}, {
    "id": 17,
    "name": "调出分销均价",
    "title": "t-17",
    "description":"调出分销总额 / 调出数量",
    "changeNum": false,
    "attr":"INVENTORY_MATERIAL_TRANSFER_OUT_PRICE2"
}, {
    "id": 18,
    "name": "调出分销利润",
    "title": "t-18",
    "description":"调出分销总额 - 调出成本总额",    
    "changeNum": false,
    "attr":"INVENTORY_MATERIAL_TRANSFER_OUT_PROFIT"
}, {
    "id": 19,
    "name": "加工消耗",
    "title": "t-19",
    "changeNum": true,
    "operationType":14, 
    "attr":"MATERIAL_MACHINING_CONSUME_NUM"       
    
}, {
    "id": 20,
    "name": "加工消耗成本总额",
    "title": "t-20",
    "changeNum": false,
    "operationType":14,            
    "attr":"MATERIAL_MACHINING_CONSUME_COST"       
    
}, {
    "id": 21,
    "name": "加工消耗成本均价",
    "title": "t-21",
    "changeNum": false,
    "description":"加工消耗成本总额/加工消耗",
    "attr":"MATERIAL_MACHINING_CONSUME_PRICE"
}, {
    "id": 22,
    "name": "耗损总量",
    "title": "t-22",
    "changeNum": true,
    "operationType":3,  
    "desctiption":"",
    "attr":"INVENTORY_MATERIAL_LOSS_NUM",    
}, {
    "id": 23,
    "name": "耗损成本总额",
    "title": "t-23",
    "changeNum": false,
    "operationType":3,   
    "attr":"INVENTORY_MATERIAL_LOSS_COST",        
}, {
    "id": 24,
    "name": "盘亏数量",
    "title": "t-24",
    "changeNum": true,
    "operationType":[19,1],  
    "attr":"MATERIAL_CHECK_INVENTORY_LOSSES_NUM",        
}, {
    "id": 25,
    "name": "盘亏总金额",
    "title": "t-25",
    "changeNum": false,
    "operationType":[19,1],  
    "attr":"MATERIAL_CHECK_INVENTORY_LOSSES_COST",            
}, {
    "id": 26,
    "name": "盘盈数量",
    "title": "t-26",
    "changeNum": true,
    "operationType":[19,1],   
    "attr":"MATERIAL_CHECK_INVENTORY_PROFIT_NUM",                
    
}, {
    "id": 27,
    "name": "盘盈总金额",
    "title": "t-27",
    "changeNum": false,
    "operationType":[19,1],    
    "attr":"MATERIAL_CHECK_INVENTORY_PROFIT_COST",                    
    
}, {
    "id": 28,
    "name": "领料数量",
    "title": "t-28",
    "changeNum": true,
    "operationType":8,   
    "attr":"MATERIAL_RECEIVE_NUM"         
}, {
    "id": 29,
    "name": "领料总金额",
    "title": "t-29",
    "changeNum": false,
    "operationType":8,            
    "attr":"MATERIAL_RECEIVE_COST"         
    
}, {
    "id": 30,
    "name": "领料消耗",
    "title": "t-30",
    "changeNum": true,
    "attr":"MATERIAL_RECEIVE_CHECK_CONSUME_NUM"             
}, {
    "id": 31,
    "name": "领料消耗总金额",
    "title": "t-31",
    "changeNum": false,
    "attr":"MATERIAL_RECEIVE_CHECK_CONSUME_COST"                 
}, {
    "id": 32,
    "name": "领料回库",
    "title": "t-32",
    "changeNum": true,
    "operationType":9,            
    "attr":"MATERIAL_RECEIVE_CHECK_RETURN_NUM"                 
}, {
    "id": 33,
    "name": "领料回库总金额",
    "title": "t-33",
    "changeNum": false,
    "operationType":9,            
    "attr":"MATERIAL_RECEIVE_CHECK_RETURN_COST"                 
    
}, {
    "id": 34,
    "name": "领料剩余",
    "title": "t-34",
    "changeNum": true,
    "description":"领料数量 - 领料消耗数量 - 领料回库数量",    
    "attr":"MATERIAL_RECEIVE_REST",                 
}, {
    "id": 35,
    "name": "领料剩余总金额",
    "title": "t-35",
    "changeNum": false,
    "description":"领料总金额 - 领料消耗总金额 - 领料回库总金额",
    "attr":"MATERIAL_RECEIVE_REST_COST",        
}, {
    "id": 36,
    "name": "BOM单消耗毛料",
    "title": "t-36",
    "changeNum": true,
    "operationType":5,   
    "attr":"MATERIAL_BOM_CONSUME_WOOL_NUM",         
    
}, {
    "id": 37,
    "name": "BOM单消耗毛料成本总额",
    "title": "t-37",
    "changeNum": false,
    "operationType":5,            
    "attr":"MATERIAL_BOM_CONSUME_WOOL_COST",         
    
}, {
    "id": 38,
    "name": "BOM单消耗净料",
    "title": "t-38",
    "changeNum": true,
    "operationType":5,            
    "attr":"MATERIAL_BOM_CONSUME_NET_NUM",         
    
}, {
    "id": 39,
    "name": "BOM单消耗净料成本总额",
    "title": "t-39",
    "changeNum": false,
    "operationType":5,            
    "attr":"MATERIAL_BOM_CONSUME_NET_COST",         
    
}, {
    "id": 40,
    "name": "BOM单自然损耗",
    "title": "t-40",
    "changeNum": true,
    "operationType":5,            
    "attr":"MATERIAL_BOM_CONSUME_WASTAGE_NUM",         
    
}, {
    "id": 41,
    "name": "BOM单自然损耗总额",
    "title": "t-41",
    "changeNum": false,
    "operationType":5,            
    "attr":"MATERIAL_BOM_CONSUME_WASTAGE_COST",         
    
},{
    "id": 42,
    "name": "物料编码",
    "title": "t-42",
    "changeNum": false, 
    "attr":"barCode",         
}];