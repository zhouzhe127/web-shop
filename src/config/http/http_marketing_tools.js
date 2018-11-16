import {
	s,
	w,
	b,
	f
} from 'src/config/host_var';

export default {
	'getCouponList': { //  获取优惠券列表
		url: w + 'coupon/getCouponListData',
		method: 'get'
	},
	'deleteCoupon': { // 删除优惠券
		url: w + 'coupon/deleteCoupon',
		method: 'get'
	},
	'getCouponById': { // 修改优惠券
		url: w + 'Coupon/getCouponDetail',
		method: 'get'
	},
	'editCoupon': { //  编辑优惠券
		url: w + 'Coupon/editCoupon',
		method: 'post'
	},
	'getLossList': { //  获取货品信息
		url: b + 'goodsinventory/lossList',
		method: 'post'
	},
	'getCauseList': { //  下架列表
		url: b + 'wearcause/causeList',
		method: 'post'
	},
	'getBatchByGid': { //  获取下架商品详情
		url: b + 'goodsinventory/getBatchByGid',
		method: 'post'
	},
	'getGoodsInventory': {
		url: b + 'goodsinventory/down',
		method: 'post'
	},
	'Activitymaterial': {
		url: w + 'Activitymaterial/getList', // 素材列表
		method: 'get'
	},
	'Shelves': {
		url: w + 'Activitymaterial/shelves', // 素材启用禁用
		method: 'post'
	},
	'delsMaterial': {
		url: w + 'Activitymaterial/del', // 删除素材
		method: 'post'
	},
	'getDetail': {
		url: w + 'Activitymaterial/getDetail' // 获取详情
	},
	'getActivityGoodsList': {
		url: w + 'ActivityGoods/getGoodsList' //积分商品列表
	},
	'ActivityShelves': {
		url: w + 'ActivityGoods/shelves', //积分商品上下架
		method: 'post'
	},
	'ActivityDel': {
		url: w + 'ActivityGoods/del', //积分商品删除
		method: 'post'
	},
	'updateConfig': {
		url: w + 'Activityconfig/updateConfig', //积分商城更改模板
		method: 'post'
	},
	'getListByShopId': {
		url: w + 'ActivityExchange/getListByShopId', //获取积分商城
		method: 'get'
	},
	'changeExport': {
		url: w + 'activityexchange/export', //兑换管理导出
		type: 'file'
	},
	'verifyCode': {
		url: w + 'Activityexchange/verifyCode', //验证商品券码
		method: 'post'
	},
	'ActivityGoodsedit': {
		url: w + 'ActivityGoods/edit', //修改商品
		method: 'post'
	},
	'ActivityGoodsadd': {
		url: w + 'ActivityGoods/add', //添加商品
		method: 'post'
	},
	'ActivityEdit': {
		url: w + 'ActivityMaterial/edit', // 修改编辑素材
		method: 'post'
	},
	'ActivityAdd': {
		url: w + 'ActivityMaterial/add', // 添加素材
		method: 'post'
	},
	'getPartnerList': {
		url: w + 'Partner/getPartnerList', // 合作品牌列表
		method: 'post'
	},
	'getPartnerById': {
		url: w + 'Partner/getPartnerById', // 获取品牌详情
		method: 'post'
	},
	'downloadPack': {
		url: w + 'Orderconfig/downloadPack', //保存会员基本配置
		type: 'file'
	},
	'getOrderconfig': {
		url: w + 'Orderconfig/getConfig', //保存会员基本配置
		method: 'get'
	},
	'saveOrderconfig': {
		url: w + 'Orderconfig/updateConfig', //保存会员基本配置
		method: 'post'
	},
	'getReserveConfig': {
		url: w + 'Reserveconfig/getReserveConfig', //获取预约管理数据
		method: 'get'
	},
	'updateReserveConfig': {
		url: w + 'Reserveconfig/updateReserveConfig', //修改预约管理
		method: 'post'
	},
	'editPartner': {
		url: w + 'Partner/editPartner', // 修改品牌详情
		method: 'post'
	},
	'addPartner': {
		url: w + 'Partner/addPartner', // 添加合作品牌
		method: 'post'
	},
	'delPartner': {
		url: w + 'Partner/delPartner', // 删除合作品牌
		method: 'post'
	},
	'getCouponStatisticsData': {
		url: w + 'couponstatistics/getCouponStatisticsData' // 获取优惠券数据
	},
	'getOneCoupon': {
		url: w + 'Couponstatistics/getOneCoupon' // 获取核销量
	},
	'getPointConf': {
		url: w + 'Integral/getPointConf', //积分抵现配置
		method: 'post'
	},
	'updatePointConf': {
		url: w + 'Integral/updatePointConf', //保存
		method: 'post'
	},
	'couGetShopList': {
		url: s + 'coupon/getShopList',
	},
	'getActivityList': {
		url: s + 'Activity/getActivityList'
	},
	'releaseActivity': {
		url: s + 'activity/releaseActivity' //发布活动
	},
	'closeActivity': {
		url: w + 'activityconfig/closeActivity' //关闭活动
	},
	'upActivity': {
		url: s + 'activity/upActivity' //上架活动
	},
	'downActivity': {
		url: s + 'activity/downActivity' //下架活动
	},
	'deleteActivity': {
		url: w + 'Activityconfig/deleteActivity' //删除活动
	},
	'addActivity': {
		url: s + 'Activity/addActivity', //保存发布活动
		method: 'post'
	},
	'editActivity': {
		url: s + 'Activity/editActivity', //保存发布活动
		method: 'post'
	},
	'getGetCouponCondition': {
		url: s + 'coupon/getCouponCondition', //获取所有优惠券
	},
	'getAllCouponLists': {
		url: w + 'coupon/getCouponCondition', //获取所有的优惠券 可以传参数form=2 找砍价活动的优惠券
	},
	'getMemberNum': {
		url: w + 'member/getMemberNum', //获取筛选会员数量
		method: 'post'
	},
	'getActivityDetail': {
		url: s + 'activity/getActivityDetail' //获取详情
	},
	'getStaffList': {
		url: w + 'Activitystaff/getStaffList' // 获取管理员列表
	},
	'delStaff': {
		url: w + 'Activitystaff/delStaff', // 删除管理员
		method: 'post'
	},
	'getSelfHelpConfig': {
		url: w + 'SelfHelpConfig/getSelfHelpConfig'
	},
	'updateSelfHelpConfig': {
		url: w + 'SelfHelpConfig/updateSelfHelpConfig',
		method: 'post'
	},
	'downloadQrCode': {
		url: w + 'SelfHelpConfig/downloadQrCode',
		type: 'file'
	},
	'getHomePageConfig': {
		url: w + 'weixin/getHomePageConfig'
	},
	'updateHomePageConfig': {
		url: w + 'weixin/updateHomePageConfig',
		method: 'post'
	},
	'getHomeConfig': {
		url: w + 'weixin/getHomeConfig'
	},
	'getAllCategory': { // 获取所有店铺
		url: s + 'category/getAllCategory',
		method: 'get'
	},
	'getAllGoods': { // 获取所有商品
		url: s + 'goods/getAllGoods',
		method: 'get'
	},
	'getAllPackage': { // 获取套餐
		url: s + 'package/getAllPackage',
		method: 'get'
	},
	'addCoupon': {
		url: w + 'Coupon/addCoupon',
		method: 'post'
	},
	'exportCouponStatics': {
		url: w + 'couponstatistics/export', // 导出优惠券
		type: 'file'
	},
	'getListDep': {
		url: w + 'Depositplan/getListByCondition', //获取方案列表
		method: 'post'
	},
	'getDetailDep': {
		url: w + 'depositPlan/getDetail' //编辑修改储值方案
	},
	'delDep': {
		url: w + 'depositPlan/del' //删除储值方案
	},
	'depositPlan': {
		method: 'post' //增加或者编辑方案
	},
	// 'bigUpload': {
	//     url: s + 'image/uploadImage', //详情图片上传
	//     type: 'upload'
	// },
	'fileUpload': {
		url: s + 'image/uploadImage', //缩略图片上传
		type: 'upload'
	},
	'addCommentConfig': {
		url: w + 'Commentconfig/addCommentConfig', //支付评价配置
		method: 'post'
	},
	'getPayCommentConf': {
		url: w + 'Commentconfig/getPayCommentConf', //支付评价配置
		method: 'get'
	},
	'getCommentList': {
		url: w + 'Commentstatistics/getCommentList', //支付评价获取
		method: 'get'
	},
	'getStatisticsDatas': {
		url: w + 'Commentstatistics/getStatisticsData', //支付评
		method: 'get'
	},
	'getTaskStatus': {
		url: w + 'Commentstatistics/getTaskStatus', //支付评
		method: 'get'
	},
	'getFinalData': {
		url: w + 'Commentstatistics/getFinalData', //获取最终的结果
		method: 'get'
	},
	'addScanPayConfig': {
		url: w + 'Scanpayconfig/addScanPayConfig', //扫码支付规则
		method: 'post'
	},
	'getScanPayInfo': {
		url: w + 'Scanpayconfig/getScanPayInfo', //扫码支付规则
		method: 'get'
	},
	'getAllCodeList': {
		url: w + 'Scanpayconfig/getAllCodeList', //扫码支付规则
		method: 'get'
	},
	'updateShortUrl': {
		url: w + 'Scanpayconfig/updateShortUrl', //更新短址
		method: 'get'
	},
	'addMemberStoreConfig': {
		url: w + 'Commentconfig/addMemberStoreConfig', //会员储值配置新增
		method: 'post'
	},
	'getMemberStoreConf': {
		url: w + 'Commentconfig/getMemberStoreConf', //会员储值配置获取
		method: 'get'
	},
	'getGoodsStocks': {
		url: w + 'Activitygoods/getGoodsStock', //获取积分商品的门店库存
		method: 'get'
	},
	'fissionActivity': {
		url: w + 'Activityconfig/addActivity', //裂变活动
		method: 'post'
	},
	'getActivityDetails': {
		url: w + 'Activityconfig/getActivityDetail', //获取活动的详情
		method: 'get'
	},
	'editActivitys': {
		url: w + 'Activityconfig/editActivity', //编辑活动
		method: 'post'
	},
	'chooseMember': {
		url: w + 'Activityconfig/chooseMember', //活动筛选
		method: 'get'
	},
	'releaseOrDownActivity': {
		url: w + 'Activityconfig/releaseOrDownActivity', //活动上架下架
		method: 'get'
	},
	'syncCoupon': {
		url: w + 'Coupon/syncCoupon', //优惠券同步
		method: 'get'
	},
	'newgetActivityList': {
		url: w + 'activityconfig/getActivityList', //获取活动列表
		method: 'get'
	},
	'newgetActivityDetail': {
		url: w + 'activityconfig/getActivityDetail', //获取活动列表详情
		method: 'get'
	},
	'deleteStaffScanPay': {
		url: w + 'Scanpayconfig/deleteStaffScanPay', //刪除員工支付碼
		method: 'post'
	},
	'addStaffScanPay': {
		url: w + 'Scanpayconfig/addStaffScanPay', //新增員工支付碼
		method: 'post'
	},
	'getSubscribeFansCount': {
		url: w + 'Activityfans/getSubscribeFansCount', //获取活动粉丝
		method: 'get'
	},
	/* ↓ 砍价活动(粮票集) ↓
	-------------------*/
	'activityCreateActivity': {
		url: f + 'Api/Activity/createActivity', //新建砍价活动
		method: 'post'
	},
	'activityEditActivity': {
		url: f + 'Api/Activity/editActivity', // 修改砍价活动
		method: 'post'
	},
	'activityAddGoods': {
		url: f + 'Api/Activity/addGoods', //添加活动商品
		method: 'post'
	},
	'activityEditGoods': {
		url: f + 'Api/Activity/editGoods', // 编辑活动商品
		method: 'post'
	},
	'activityPushGoods': {
		url: f + 'Api/Activity/pushGoods', // 上架活动商品
		method: 'post'
	},
	'activityRevokePushGoods': {
		url: f + 'Api/Activity/revokePushGoods', // 下架活动商品
		method: 'post'
	},
	'statisticGetActivity': {
		url: f + 'Api/Statistic/getActivity', // 获取砍价活动列表
		method: 'get'
	},
	'activityGetActivityDetail': {
		url: f + 'Api/activity/getActivityDetail', // 获取 活动统计明细
		method: 'get'
	},
	'statisticGetActivityGoods': {
		url: f + 'Api/Statistic/getActivityGoods', // 获取砍价活动明细
		method: 'get'
	},
	'getMiniProQR': {
		url: f + 'Api/Weixin/getMiniProQR', // 获取砍价活动明细
		type: 'file',
		// method: 'get'
	},
	/* ↑ 砍价活动(粮票集) ↑
	-------------------*/
};
