/* eslint-disable */

import storage from 'src/verdor/storage';
//批次详情默认跳转页
function defaultBatchClick(context,item){
	let obj = {
		path : '/admin/goodsBatchTotalLogDetail',
		query:{
			gid: item.itemId,
			logId: item.id
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
			"typeName": "入库",
			"historyDescripe": "后续版本完成入库单时点击可跳转",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":forbiddenClick,
		},
		{
			"type": 2,
			"typeName": "调入",
			"historyDescripe": "进入该条相关的调度记录。调入跳入入货单，调出跳入出货单（商品调跳商品，物料跳物料）。PS：删除调度单不可以查看记录，只能查看批次详情。取消调度单可以查看记录。",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {
					path: '/admin/operation/operationDetail',
				};
				
				obj.query = {
					id:item.other.dispatchId,					//调度单id
					intoId:item.other.dispatchInfoId,			//入货单id
					logTab:2,
					logType:1,
				};
				context.$router.push(obj);
				//1).这条调度单的id
				//2).入货单id
				//3).logTab = 1 (出货单)  2:入货单
				//4).logType = 1 (商品)  2:物料
			}
		},
		{
			"type": 3,
			"typeName": "调出",
			"historyDescripe": "进入该条相关的调度记录。调入跳入入货单，调出跳入出货单（商品调跳商品，物料跳物料）。PS：删除调度单不可以查看记录，只能查看批次详情。取消调度单可以查看记录。",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};

				obj.path = '/admin/operation/operationDetail';
				obj.query = {
					logTab:1,
					logType:1,
					id:item.other.dispatchId
				}; 
				context.$router.push(obj);				
			}
		},
		{
			"type": 4,
			"typeName": "上架(库存)",
			"historyDescripe":"",
			"batchDescripe": "进入批次详情",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick": forbiddenClick
		},
		{
			"type": 5,
			"typeName": "下架到库存(老批次)",
			"historyDescripe":"",
			"batchDescripe": "进入批次详情",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":forbiddenClick
		},
		{
			"type": 6,
			"typeName": "仓库耗损",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":forbiddenClick		
		},
		{
			"type": 7,
			"typeName": "下架到耗损",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":forbiddenClick
		},
		{
			"type": 8,
			"typeName": "售出",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":forbiddenClick			
		},
		{
			"type": 9,
			"typeName": "售出退货",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick": forbiddenClick
		},
		{
			"type": 12,
			"typeName": "下架到库存(新批次)",
			"historyDescripe":"",
			"batchDescripe": "进入下架页面（下架到新建批次，下架到库存）",
			"canViewHistory": false,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":forbiddenClick		
		},
		{
			"type": 13,
			"typeName": "导入入库",
			"historyDescripe":"进入该条信息导入记录详情页面",
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
			"type": 14,
			"typeName": "导入上架",
			"historyDescripe":"进入该条信息导入记录页面,导入入库操作时的一个可选操作",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
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
			"type": 15,
			"typeName": "入库并上架",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":forbiddenClick	
		},
		{
			"type": 16,
			"typeName": "盘点货架",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":forbiddenClick	
		},
		{
			"type": 17,
			"typeName": "取消调度回库",
			"historyDescripe":"进入该条相关的调度记录。调入跳入入货单，调出跳入出货单（商品调跳商品，物料跳物料）。PS：删除调度单不可以查看记录，只能查看批次详情。取消调度单可以查看记录。",
			"batchDescripe": "",
			"canViewHistory": function(item){
				let dispatchId = Number(item.other.dispatchId);
				return Boolean(dispatchId);
			},
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let dispatchId = Number(item.other.dispatchId);
				if(!dispatchId) return;
				let obj = {};
				obj.path = '/admin/operation/operationDetail';
				obj.query = {
					logTab:1,
					logType:1,
					id:item.other.dispatchId
				};  
				context.$router.push(obj);				
			}	
		},
		// {
		// 	"type": 18,
		// 	"typeName": "批量盘库",
		// 	"historyDescripe":"查看该条相关的批量盘库记录。（单个盘库没有盘库记录，无法跳转所以为暗色）",
		// 	"batchDescripe": "",
		// 	"canViewHistory": true,
		// 	"canViewBatch": true,
		// 	"batchClick": defaultBatchClick,
		// 	"historyClick":function(context,item){
		// 		let obj = {};
		// 		obj.path = '/admin/goodsCountDetail';
		// 		obj.query = {id:item.other.logId};

		// 		context.$router.push(obj);				
		// 	}
		// },
		{
			"type": 19,
			"typeName": "上架(货架)",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":forbiddenClick
		},
		{
			"type": 20,
			"typeName": "下架到库存(货架)",
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": false,
			"canViewBatch": false,
			"batchClick": forbiddenClick,
			"historyClick":forbiddenClick
		},
		{
			"type" : 21,
			"typeName": "采购单入货",				
			"historyDescripe":"采购单详情",
			"batchDescripe": "入货批次的变化",
			"canViewHistory": true,
			"canViewBatch": true,
			"historyClick": function(context,item){
				let {purchaseId} = item.other; 
				context.$router.push({
					path:"/admin/purchaseManagement/detail",
					query : {
						id : purchaseId
					}
				});								
			},
			"batchClick":defaultBatchClick
		},
		{
			"type" : 22,
			"typeName": "批盘消耗",				
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/goodsCountDetail';
				obj.query = {id:item.other.logId};

				context.$router.push(obj);				
			}
		},
		{
			"type" : 23,
			"typeName": "批盘盘盈",				
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/goodsCountDetail';
				obj.query = {id:item.other.logId};

				context.$router.push(obj);				
			}
		},
		{
			"type" : 24,
			"typeName": "批盘盘亏",				
			"historyDescripe":"",
			"batchDescripe": "",
			"canViewHistory": true,
			"canViewBatch": true,
			"batchClick": defaultBatchClick,
			"historyClick":function(context,item){
				let obj = {};
				obj.path = '/admin/goodsCountDetail';
				obj.query = {id:item.other.logId};

				context.$router.push(obj);				
			}
		}
	];

export default config;
	