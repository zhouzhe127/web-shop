import storage from 'src/verdor/storage';

//批次详情默认跳转页
function defaultBatchClick(context,item){
	let obj = {
		path : '/admin/inventoryManagement/supbranchDetail',
		query:{
			id: item.itemId,
			logId: item.id,
			recordName:item.operationType
		}
	};
	context.$router.push(obj);
}
//禁止跳转页
function forbiddenClick(context,item){
	return false;
}

let config = [
		{
			"type": 1,
			"typeName": "盘库",
			"historyDescripe": "",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":forbiddenClick
		},
		{
			"type": 2,
			"typeName": "入库",
			"historyDescripe": "后续版本完成入库单时点击可跳转",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":forbiddenClick
		},
		{
			"type": 3,
			"typeName": "耗损",
			"historyDescripe": "",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":forbiddenClick			
		},
		{
			"type": 4,
			"typeName": "新建物料",
			"historyDescripe": "",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick":forbiddenClick,
			"historyClick":forbiddenClick
		},
		{
			"type": 5,
			"typeName": "BOM单消耗",
			"historyDescripe": "跳转到BOM单消耗详情页面（子页面）",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/bomConsumeDetail';
				obj.query = {mid:item.itemId,logId:item.id};
				context.$router.push(obj);
			}
		},
		{
			"type": 6,
			"typeName": "调出",
			"historyDescripe": "点击进入调度出货单，出货单表格在出货数量后边增加，出货成本总额",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/operation/operationDetail';
				obj.query = {
					logTab:1,
					logType:2,
					id:item.other.dispatchId
				}; 
				context.$router.push(obj);
			}			
		},
		{
			"type": 7,
			"typeName": "调入",
			"historyDescripe": "点击进入调度入货单，入货单表格在耗损后边增加，入货成本总额。（商品跳商品，物料跳物料）",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/operation/operationDetail';
				obj.query = {
					id:item.other.dispatchId,					//调度单id
					intoId:item.other.dispatchInfoId,			//入货单id
					logTab:2,
					logType:2, 
				};
				context.$router.push(obj);
				
			}
		},
		{
			"type": 8,
			"typeName": "领料",
			"historyDescripe": "点击进入该条领料记录",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/pickingList/checkDetails';
				obj.query = {
					id:item.other.receiveLogId
				};
				context.$router.push(obj);
				
			}			
		},
		{
			"type": 9,
			"typeName": "领料回库",
			"historyDescripe": "点击进入该条领料盘库记录。领料盘库中，增加一条剩余数量，消耗数量自动计算",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/pickingList/plateDetails';
				obj.query = {
					id:item.other.logId
				};
				context.$router.push(obj);
			}
		},
		{
			"type": 10,
			"typeName": "修改物料信息",
			"historyDescripe": "跳转到修改物料信息",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/inventoryManagement/materialEdit';
				obj.query = {id:item.itemId};
				context.$router.push(obj);
			}
		},
		{
			"type": 11,
			"typeName": "取消调度物料回库",
			"historyDescripe": "点击进入调度入货单，入货单表格在耗损后边增加，入货成本总额。",
			"batchDescripe": "",
			"canViewHistory": function(item){
				let dispatchId = Number(item.other.dispatchId);
				return Boolean(dispatchId);
			},
			"canViewBatch": true,
			"batchClick": function(context,item){
				let obj = {
					path : '/admin/inventoryManagement/supbranchDetail',
					query:{
						id: item.itemId,
						logId: item.id,
						recordName:item.operationType
					}
				};
				context.$router.push(obj);
			},
			"historyClick":function(context,item){
				let dispatchId = Number(item.other.dispatchId);
				if(!dispatchId){
					return;
				}
				let obj = {};
				obj.path = '/admin/operation/operationDetail';
				obj.query = {
					id:item.other.dispatchId,
					logTab:1,
					logType:2,      
				};
				context.$router.push(obj);				
			}
		},
		{
			"type": 13,
			"typeName": "加工入库",
			"historyDescripe": "点击进入该条加工记录",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/processHistory/detail';
				obj.query = {id:item.other.logId};
				context.$router.push(obj);				
				
			}			
		},
		{
			"type": 14,
			"typeName": "加工消耗",
			"historyDescripe": ".点击进入该条加工记录。成本金额=消耗金额（记录内）",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/processHistory/detail';
				obj.query = {id:item.other.logId};   
				context.$router.push(obj);				
				
			}	
		},
		{
			"type": 15,
			"typeName": "修改物料单位",
			"historyDescripe": "跳转到修改物料",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/inventoryManagement/revampUnit';
				obj.query = {
					id:item.itemId,
					name:item.itemName
				};
				context.$router.push(obj);				
			}	
		},
		{
			"type": 16,
			"typeName": "导入入库",
			"historyDescripe": "导入入库，跳转到导入入库列表",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {},
				other = item.other,
				cdnUrl = '',
				userDate = {},
				temp = {};

				userDate = storage.session('userShop');
				
				cdnUrl = userDate.cdnBaseUrl;

				obj.path = '/admin/wareImport/wareProsperity';
				
				temp = {
					createTime: other.createTime,
					creator: other.createUName,
					createUid: null,
					type: other.type
				};

				if(other.fail){
					temp.failLog = cdnUrl + '/import_storage/'+ other.fail;
				}
				if(other.success){
					temp.successLog = cdnUrl + '/import_storage/'+ other.success;
				}
				
				storage.session('detailNeed',temp);
				context.$router.push(obj);					
			}
		},
		{
			"type": 18,
			"typeName": "删除物料",
			"historyDescripe": "",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":forbiddenClick
		},
		{
			"type": 19,
			"typeName": "批量盘库",
			"historyDescripe": "查看该条相关的盘库记录详情。（单个盘库没有盘库记录，无法跳转所以为暗色）。盘库记录里边的单条数据也要增加成本金额。",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/materialCountDetail';
				obj.query = {id:item.other.logId};
				context.$router.push(obj);				
			}
		}
	];

export default config;