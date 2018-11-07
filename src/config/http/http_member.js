import {
	s,
	w,
	p
} from 'src/config/host_var';
export default {
	//---------------------实体卡激活--------------------------------------
	'entitycardGetCardList': {
		url: w + 'Entitycard/getCardList', //获取卡类型列表
		method: 'get'
	},
	'activateEntityCard': {
		url: w + 'Entitycard/activateEntityCard', //激活卡
		method: 'post'
	},
	'entitycardOpenCard': {
		url: w + 'Entitycard/openCard', //获取卡编号
		method: 'post'
	},
	'getAutoCardNumber': {
		url: w + 'Entitycard/getAutoCardNumber', //获取卡编号
		method: 'get'
	},
	'openCardInfoInput': {
		url: w + 'Entitycard/openCardInfoInput', //录入卡信息
		method: 'post'
	},
	'getCardPassword': {
		url: p + 'Member/getCardPassword', //后台获取密钥
		method: 'get'
	},
	'activityGetList': {
		url: w + 'Activitystatistics/getList', //获取活动列表
	},
	'getActivityMould': {
		url: w + 'Activityconfig/getActivityMould', //获取活动类型列表
	},
	//---------------------来源统计--------------------------------------
	'getCountList': {
		url: w + 'Activityfans/getCountList', // 来源统计列表
		method: 'get'
	},
	// 'getCountList': {
	// 	url: w + 'Activityfans/getCountList', // 修改来源信息
	// 	method: 'get'
	// },
	'resetQR': {
		url: w + 'Activityfans/resetQR', // 重置二维码
		method: 'get'
	},
	'addStaticId': {
		url: w + 'Activityfans/addStaticId', // 添加来源
		method: 'post'
	},
	'editStaticId': {
		url: w + 'Activityfans/editStaticId', // 修改来源
		method: 'post'
	},
	'delStaticId': {
		url: w + 'Activityfans/delStaticId', // 修改来源
		method: 'get'
	},
	'getAllSourceList': {
		url: w + 'Activityfans/getAllSourceList', //来源统计导出
		type: 'file'
	},
	'getValidateConfig': {
		url: w + 'validateconfig/getValidateConfig', //获取会员基本配置
		method: 'get'
	},
	'addOrUpdateValidate': {
		url: w + 'validateconfig/addOrUpdateValidate', //保存会员基本配置
		method: 'get'
	},
	'getShopMemberList': {
		url: w + 'Member/getShopMemberList',
		method: 'get'
	},
	'numberGetShopList': {
		url: w + 'Member/getShopList' // 店铺列表
	},
	'memberGetList': {
		url: w + 'Memberlevel/getList' // 获取所有会员等级
	},
	'searchShopMemberList': {
		url: w + 'member/getShopMemberList' //// 查询会员列表
	},
	'memberExport': {
		url: w + 'Member/export', //导出会员列表
		type: 'file'
	},
	'addRechargeRecord': {
		url: p + 'Member/addRechargeRecord', //会员充值
		method: 'post'
	},
	'getMemberDetail': {
		url: w + 'Member/getMemberDetail' //获取会员详情
	},
	'getRecordList': {
		url: w + 'Member/getRecordList' //获取消费记录
	},
	'unbindWeiXin': {
		url: w + 'Member/unbindWeiXin', //解绑微信
		method: 'post'
	},
	'compelUpdatePointAndBalance': {
		url: w + 'Member/compelUpdatePointAndBalance', //设置
		method: 'post'
	},
	'getMemberlevel': { //  获取会员配置信息
		method: 'get'
	},
	'getFilterNum': {
		url: w + 'Membermessage/getFilterNum', //  查找会员
		method: 'post'
	},
	'getMemberTag': {
		url: w + 'MemberTag/getTag' // 获取会员列表
	},
	'changeTagStatus': {
		url: w + 'Membertag/changeTagStatus', // 修改会员标签
		method: 'post'
	},
	'getMemberlevelDetail': {
		url: w + 'Memberlevel/getDetail' // 获取会员等级详情
	},
	'addMemberlevel': {
		url: w + 'Memberlevel/addLevel', // 添加会员等级配置
		method: 'post'
	},
	'editMemberlevel': {
		url: w + 'Memberlevel/editLevel', // 编辑会员等级配置
		method: 'post'
	},
	'delMemberlevel': {
		url: w + 'Memberlevel/delLevel', //  删除会员等级配置
	},
	'getCardConsumeList': {
		url: w + 'MemberConsume/getCardConsumeList', // 实体卡查询——交易查询
		method: 'get'
	},
	'exportCardConsumeList': {
		url: w + 'MemberConsume/getCardConsumeList', // 实体卡查询——交易查询
		type: 'file'
	},
	'memberCardGetCardList': {
		url: w + 'MemberCard/getCardList', // 实体卡查询——卡查询
		method: 'get'
	},
	'cardtypeGetList': {
		url: w + 'Cardtype/getList', // 实体卡查询——卡类型
		method: 'get'
	},
	'getCardRecordList': {
		url: w + 'MemberConsume/getCardRecordList', // 实体卡查询——更改记录
		method: 'get'
	},
	'getCardCouponList': {
		url: w + 'MemberCard/getCardCouponList', // 实体卡查询——优惠券的卡包
		method: 'get'
	},
	'changeAmountAndPoint': {
		url: w + 'MemberCard/changeAmountAndPoint', // 实体卡查询——批量修改金额
		method: 'post'
	},
	'changeMemberMobile': {
		url: w + 'MemberCard/changeMemberMobile', // 实体卡查询——修改手机号码
		method: 'post'
	},
	'memberCardExportCardList': {
		url: w + 'MemberCard/exportCardList', //卡查询导出
		type: 'file'
	},
	'getAppliedEntityCardList': {
		url: w + 'Entitycard/getAppliedEntityCardList', // 实体卡应用
		method: 'get'
	},
	'updateActivate': {
		url: w + 'Card/updateActivate', // 实体卡是否允许激活
		method: 'get'
	},
	'getCardList': {
		url: w + 'card/getList', // 获取制卡列表
		method: 'get'
	},
	'getCardTypeList': {
		url: w + 'cardType/getList', // 获取卡类型列表
		method: 'get'
	},
	'updateStatusCard': {
		url: w + 'card/updateStatus', // 启用或关闭
		method: 'get'
	},
	'checkShopIds': {
		url: w + 'card/checkShopIds', // 获取卡类型在那些店铺下面治过卡  
		method: 'get'
	},
	'getCardDetail': {
		url: w + 'card/getDetail', // 获取卡类型详情
		method: 'get'
	},
	'newAddCard': {
		url: w + 'card/add', // 新增制卡
		method: 'post'
	},
	// 'getCardTypeList': { //  获取卡类型列表
	// 	url: w + 'cardType/getList',
	// 	method: 'get'
	// },
	'getListFilter': { // 过滤卡类型
		url: w + 'cardType/getListFilter',
		method: 'get'
	},
	'deleteCardType': { //  删除卡类型
		url: w + 'cardType/delete',
		method: 'get'
	},
	'editCardDetail': { //  编辑卡类型
		method: 'post'
	},
	'getCouponCondition': {
		url: s + 'coupon/getCouponCondition',
		method: 'post'
	},
	'getMembermessageList': {
		url: w + 'Membermessage/getList' // 获取会员信息列表
	},
	'getShopBrand': {
		url: s + 'brand/getShop', //  获取店铺列表
		method: 'post'
	},
	'addMembermessage': {
		url: w + 'Membermessage/add', //  会员推送消息
		method: 'post'
	},
	'getPointConfig': {
		url: w + 'Activityconfig/getPointConfig', // 获取积分配置
		method: 'post'
	},
	'setPointConfig': {
		url: w + 'Activityconfig/setPointConfig', // 设置积分配置
		method: 'post'
	},
	// 'getMemberTag': {
	// 	url: w + 'MemberTag/getTag' // 获取会员列表
	// },
	'changeMemberTag': { //  编辑会员标签
		method: 'post'
	},
	'importCardSample': {
		url: w + 'MemberCard/importCardSample', //实体卡会员样例表格下载
		type: 'file',
		method: 'get'
	},
	'getImportCardList': {
		url: w + 'MemberCard/getImportCardList', // 获取历史导入记录
		method: 'get'
	},
	'getImportCardExcel': {
		url: w + 'Membercard/getImportCardExcel', //实体卡会员下载成功的表格和失败的表格
		method: 'get'
	},
	'importCard': {
		url: w + 'Membercard/importCard', //实体卡会员表格上传
		type: 'upload',
		method: 'post'
	},
	'syncCard': {
		url: w + 'Card/syncCard', //同步卡乐星
		method: 'post'
	},
	'updateCard': {
		url: w + 'Card/update', //同步卡乐星
		method: 'post'
	},
	'getImportCardExcels': {
		url: w + 'Membercard/getImportCardExcel', //实体卡会员下载成功的表格和失败的表格
		type: 'file',
		method: 'get'
	},
	'changeCardOfShop': {
		url: w + 'Card/changeCardOfShop', //修改卡属门店
		method: 'post'
	},
	'memberRemainAndAccounted': {
		url: w + 'member/memberRemainAndAccounted', //总计和性别占比
		method: 'get'
	},
	'getConsumeAndGrowth': {
		url: w + 'member/getConsumeAndGrowth', //昨日今日增长消费
		method: 'get'
	},
	'getConsumeOrGrowthTrend': {
		url: w + 'member/getConsumeOrGrowthTrend', //消费增长趋势
		method: 'get'
	},
	'newMemberexport': {
		url: w + 'Member/export', //会员管理导出会员
		type: 'file'
	},
	'changeMember': {
		url: w + 'Member/changeMember', //修改会员信息
		method: 'post'
	},
	'changeCard': {
		url: w + 'Membercard/changeCard', //修改实体卡会员信息
		method: 'post'
	},
	'getCradByCardId': {
		url: w + 'Membercard/getCradByCardId', //根据卡id来获取卡的信息
		method: 'post'
	},
	'getCradByCardNumber': {
		url: w + 'Membercard/getCradByCardNumber', //根据卡hao来获取卡的信息
		method: 'post'
	},
	'exportFailCard': {
		url: w + 'MemberCard/exportFailCard', //余额调失败人数下载
		type: 'file',
		method: 'post'
	},
	'updateActiveConf': {
		url: w + 'Shopcommon/updateActiveConf', //活跃值配置
		method: 'post'
	},
	'getActiveConf': {
		url: w + 'Shopcommon/getActiveConf', //获取活跃值配置
		method: 'post'
	},
};