import {
	s,
	w,
	b,
	p
} from "src/config/host_var";
//   闪店卖手
export default {
	"getCoinsConfig": { // 获取金币配置
		url: w + "Assistantcoinsconfig/getCoinsConfig",
		method: 'get'
	},
	"getlabelList": { //获取用户标签
		url: w + "Assistantusertag/getList",
		method: 'get'
	},
	"addOrEdit": { //标签的添加或者编辑
		url: w + "Assistantusertag/addOrEdit",
		method: 'post'
	},
	"delete": { //删除
		url: w + "Assistantusertag/delete",
		method: 'post'
	},
	"getListlevel": { //级别获取
		url: w + "Assistantuserlevel/getList",
		method: 'get'
	},
	"addOrUpdate": {
		url: w + 'Assistantcoinsconfig/addOrUpdate',
		method: 'get'
	},
	"getUserGroups": {
		url: w + 'assistantusergroup/get',
		method: 'get'
	},
	"addUserGroups": {
		url: w + 'assistantusergroup/add',
		method: 'get'
	},
	"deleUserGroups": {
		url: w + 'assistantusergroup/delete',
		method: 'get'
	},
	"AssaddOrEdit": {
		url: w + 'Assistantuserlevel/addOrEdit',
		method: 'post'
	},
	"deletelevel": {
		url: w + 'Assistantuserlevel/delete',
		method: 'post'
	},
	"editUserGroup": {
		url: w + 'assistantusergroup/edit',
		method: 'get'
	},
	"userGroupDetail": {
		url: w + 'assistantusergroup/detail',
		method: 'get'
	},
	"exportUserGroup": {
		url: w + 'assistantusergroup/export',
		type: 'file'
	},
	"getSpeechList": {
		url: w + 'Assistantverbaltrick/get',
		method: 'get'
	},
	"addBaltrick": {
		url: w + 'Assistantverbaltrick/add',
		method: 'post'
	},
	"editBaltrick": {
		url: w + 'Assistantverbaltrick/edit',
		method: 'post'
	},
	"buyconfiget": { //疯抢配置获取
		url: w + 'Assistantbuyconfig/get',
		method: 'post'
	},
	"openAndClose": { //疯抢配置保存
		url: w + 'Assistantbuyconfig/openAndClose',
		method: 'post'
	},
	"getHistory": { //获取历史
		url: w + 'Assistantbuyhistory/getList',
		method: 'get'
	},
	"getHistorydetail": { //获取历史详情
		url: w + 'Assistantbuyhistory/getGoodsList',
		method: 'get'
	},
	"delVerBaltrick": { //   删除话术配置
		url: w + 'Assistantverbaltrick/delete',
		method: 'get'
	},
	"delMenuGroup": {
		url: w + 'activityconfig/delConditionalMenu',
		method: 'get'
	},
	"getAssistantstaff": { //  工作人员列表
		url: w + 'Assistantstaff/get',
		method: 'get'
	},
	"deleteAssistantstaff": { //  删除工作人员
		url: w + 'Assistantstaff/delete',
		method: 'get'
	},
	"getAssistantfans": { //  获取粉丝列表
		url: w + 'assistantfans/get',
		method: 'get'
	},
	"addAssistantstaff": { //  新建人员
		url: w + 'Assistantstaff/add',
		method: 'get'
	},
	"editAssistantstaff": {
		url: w + 'Assistantstaff/edit',
		method: 'get'
	},
	"exportAssistantfans": { ///   导出粉丝用户数据
		url: w + 'assistantfans/export',
		type: 'file'
	},
	"getHistoryrecord": { //获取历史记录
		url: w + 'Assistantbuyhistory/getRecordList',
		method: 'get'
	},
	"getcommodities": { //获取疯抢商品
		url: w + 'Assistantgoods/getList',
		method: 'get'
	},
	"addordeitshop": { //添加商品
		url: w + 'Assistantgoods/addOrEdit',
		method: 'post'
	},
	"getGoodsStock": { //获取商品库存
		url: w + 'Assistantgoods/getGoodsStock',
		method: 'get'
	},
	"setUserTag": { /// 设置用户标签
		url: w + 'assistantfans/setTag',
		method: 'get'
	},
	"getMemberRecordList": {
		url: w + 'member/getRecordList',
		method: 'get'
	},
	"getGoodsImage": { //获取商品图片
		url: w + 'Assistantgoods/getGoodsImage',
		method: 'get'
	},
	"updateStatus": { //商品上下架
		url: w + 'Assistantgoods/updateStatus',
		method: 'post'
	},
	"setMobileAndRealName": { //   修改粉丝数据
		url: w + 'assistantfans/setMobileAndRealName',
		method: 'get'
	},
	"assistantComment": { //商品上下架
		url: w + 'Assistantcomment/getList',
		method: 'get'
	},
	"assistantCommentdelete": { //商品上下架
		url: w + 'Assistantcomment/delete',
		method: 'get'
	},
	"searchStaff": { //    获取工作人员
		url: w + 'assistantstaff/searchStaff',
		method: 'get'
	},
	"chashmentGetList": { //提现申请列表
		url: w + 'Assistantenchashment/getList',
		method: 'get'
	},
	"chashmentEdit": { //更新提现列表
		url: w + 'Assistantenchashment/edit',
		method: 'post'
	},
	"getTaskList": { //获取任务列表
		url: w + 'Task/getTaskList',
		method: 'get'
	},
	"addTaskConfig": { //新增和修改任务配置规则
		url: w + 'Task/addTaskConfig',
		method: 'post'
	},
	"getTaskConfig": { //获取任务配置信息
		url: w + 'Task/getTaskConfig',
		method: 'get'
	},
	"addTaskSystem": { //新增和修改任务
		url: w + 'Task/addOrUpdateTaskSystem',
		method: 'post'
	},
	"getTaskcoupon": { //新增任务配置信息
		url: w + 'Coupon/getCouponList',
		method: 'get'
	},
	"changeTaskStatus": { //更改任务状态
		url: w + 'Task/changeTaskStatus',
		method: 'post'
	},
	"syncFans": { //一键同步粉丝
		url: w + 'Assistantfans/syncFans',
		method: 'get'
	},
	"getSyncStatus": { //一键同步粉丝状态
		url: w + 'Assistantfans/getSyncStatus',
		method: 'get'
	},
	"shopTaskList": { //获取任务适用门店
		url: w + 'Task/shopTaskList',
		method: 'get'
	},
	"coinsLog": { //获取金币记录
		url: w + 'Assistantstaff/coinsLog',
		method: 'get'
	},
	"getCustomerByStaffId": { //获取客户
		url: w + 'Assistantstaff/getCustomerByStaffId',
		method: 'get'
	},
	"unbinding": { //解除客户
		url: w + 'Assistantstaff/unbinding',
		method: 'get'
	},
	"getFansListByCondition": { //获取粉丝列表
		url: w + 'Assistantstaff/getFansListByCondition',
		method: 'get'
	},
	"batchBinding": { //批量绑定客户
		url: w + 'Assistantstaff/batchBinding',
		method: 'get'
	}
}