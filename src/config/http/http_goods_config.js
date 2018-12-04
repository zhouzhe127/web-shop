import {
	s,
	// w,
	b,
	p,
	r
} from 'src/config/host_var';

export default {
	//-------商品配置------------
	//商品管理

	getRetailCategoryList: {
		url: r + 'Category/getList', //获取商品分类----零售
		method: 'get'
	},
	getRetailGoodsList: {
		url: r + 'Spu/getList', //获取商品列表----零售
		method: 'get'
	},
	addSpec: {
		url: r + 'Spec/add', //添加规格----零售
		method: 'post'
	},
	addSpecValue: {
		url: r + 'SpecValue/add', //添加规格值（子）----零售
		method: 'post'
	},
	specGetList: {
		url: r + 'Spec/getList', //获取规格列表----零售
		method: 'post'
	},
	getListBySpecId: {
		url: r + 'SpecValue/getListBySpecId', //获取规格的子规格----零售
		method: 'get'
	},
	createRetailGood: {
		//创建商品----零售
		url: r + 'Spu/add',
		method: 'post'
	},
	getRetailGoodsDetail: {
		//获取商品详情----零售
		url: r + 'Spu/getOne',
		method: 'get'
	},
	retailGoodUpOrDownShelf: { //零售商品上下架----零售
		url: r + 'Spu/upOrDownShelf',
		method: 'post'
	},
	goodRetailEdit: { //编辑商品----零售
		url: r + 'Spu/edit',
		method: 'post'
	},
	'getCategoryList': {
		url: s + 'category/getCategoryList', //获取商品分类
		method: 'get'
	},
	//搜索商品
	getListByCid: {
		url: s + 'goods/getListByCid', //获取商品分类
		method: 'get'
	},
	getGoodsList: {
		url: s + 'goods/getGoodsList', //获取商品
		method: 'get'
	},
	getGoodsDetail: {
		//获取商品详情
		url: s + 'goods/getGoodsDetail',
		method: 'get'
	},
	brandList: {
		//获取品牌列表
		// url:s+'goodsbrand/brandList',       //获取品牌列表
		url: b + 'Invoicing/brandList',
		method: 'get'
	},
	GetGoodsStatus: {
		//获取商品的同步状态
		url: s + 'Synchronous/getBrandGoods',
		method: 'get'
	},
	SynchronousGoods: {
		//同步商品
		url: s + 'Synchronous/SynchronousGoods',
		method: 'post'
	},
	taskInfoGoods: {
		//同步商品--轮询
		url: s + 'Report/taskInfo',
		method: 'get'
	},
	getBrandCategory: {
		//同步商品--轮询
		url: s + 'synchronous/getBrandCategory',
		method: 'get'
	},
	GoodWeighgoodsGetList: {
		//获取类别识别码
		url: s + 'Weighgoods/getList',
		method: 'post'
	},
	createGood: {
		//创建商品
		url: s + 'goods/createGoods',
		method: 'post'
	},
	goodUpOrDownShelf: {
		//商品的上下架
		url: s + 'goods/upOrDownShelf',
		method: 'get'
	},
	goodEdit: {
		//编辑商品
		url: s + 'goods/edit',
		method: 'post'
	},
	downChildGoods: {
		//解除关联商品
		url: s + 'goods/downChildGoods',
		method: 'get'
	},
	exportGoodsList: {
		url: s + 'goods/export', //导出商品列表
		type: 'file'
	},
	importGoods: {
		url: s + 'goods/importNew', //导入商品
		method: 'post',
		type: 'upload'
	},
	GoodsGetBrandGoodsDetail: {
		url: s + 'Goods/getBrandGoodsDetail',
		method: 'get'
	},
	//口味管理
	getAttr: {
		//获取口味列表
		url: s + 'Attr/getAttr',
		method: 'get'
	},
	getOneAttr: {
		//获取某个口味的信息
		url: s + 'Attr/getOneAttr',
		method: 'get'
	},
	createAttr: {
		//创建口味
		url: s + 'Attr/createAttr',
		method: 'post'
	},
	editAttr: {
		//编辑口味
		url: s + 'Attr/editAttr',
		method: 'post'
	},
	synchronousAttr: {
		url: s + 'Synchronous/synchronousAttr', //同步口味
		method: 'get'
	},
	getAttrStatus: {
		url: s + 'Synchronous/getAttrStatus', //获取需要同步的口味
		method: 'get'
	},
	delAttr: {
		url: s + 'Attr/delAttr',
		method: 'get'
	},
	//分类管理
	addCategory: {
		//添加分类
		url: s + 'category/addCategory',
		method: 'post'
	},
	editCategory: {
		//编辑分类
		url: s + 'category/editCategory',
		method: 'post'
	},
	delCategory: {
		//删除分类
		url: s + 'category/delCategory',
		method: 'get'
	},
	GetCategoryStatus: {
		//分类的同步
		url: s + 'Synchronous/GetCategoryStatus',
		method: 'get'
	},
	SynchronousCategory: {
		url: s + 'Synchronous/SynchronousCategory',
		method: 'get'
	},

	addRetailCategory: {
		//添加分类 ————零售
		url: r + 'Category/add',
		method: 'post'
	},
	editRetailCategory: {
		//编辑分类 ————零售
		url: r + 'Category/update',
		method: 'post'
	},
	delRetailCategory: {
		//删除分类 ————零售
		url: r + 'Category/delete',
		method: 'get'
	},

	//套餐管理
	getpackagelist: {
		//获取套餐列表
		url: s + 'package/getpackagelist',
		method: 'get'
	},
	addPackage: {
		//添加套餐
		url: s + 'package/addPackage',
		method: 'post'
	},
	editPackage: {
		//编辑套餐
		url: s + 'package/editPackage',
		method: 'post'
	},
	getPackageById: {
		//获取摸个套餐的详情
		url: s + 'package/getPackageById',
		method: 'get'
	},
	upOrDownShelf: {
		//上下架套餐
		url: s + 'package/upOrDownShelf',
		method: 'get'
	},
	GetPackageStatus: {
		//获取套餐的同步状态
		url: s + 'Synchronous/GetPackageStatus',
		method: 'get'
	},
	newGetBrandPackage: {
		//获取品牌的套餐列表，去掉下架的和多余的字段，同步套餐用
		url: s + 'synchronous/getBrandPackage',
		method: 'get'
	},
	synchronousPackage: {
		//同步套餐、图片价格--区分部分同步
		url: s + 'synchronous/synchronousPackage',
		method: 'post'
	},
	SynchronousPackage: {
		//同步套餐
		url: s + 'Synchronous/SynchronousPackage',
		method: 'get'
	},
	goodGetBrandPackage: {
		url: s + 'package/getBrandPackage',
		method: 'get'
	},
	//库存管理
	InventoryGet: {
		//获取某个商品的库存详情
		url: s + 'Inventory/get',
		method: 'get'
	},
	InventorySet: {
		//库存设置
		url: s + 'Inventory/set',
		method: 'post'
	},
	resetLimitNum: {
		//库存商品限售-重置
		url: s + 'Inventory/resetLimitNum',
		method: 'get'
	},
	InventoryGetlist: {
		url: p + 'Inventory/getlist', //获取库存数量
		method: 'post'
	},
	//多渠道菜单

	ChannelGetOne: {
		//获取某个渠道的信息
		url: s + 'Channel/getOne',
		method: 'post'
	},
	ChannelRemove: {
		//删除菜单配置中的套餐或商品
		url: s + 'Channel/remove',
		method: 'post'
	},

	ChannelEditPerGoods: {
		//编辑人均商品
		url: s + 'Channel/editPerGoods',
		method: 'post'
	},
	//菜单标识
	getMarker: {
		//获取标识
		url: s + 'Marker/getMarker',
		method: 'get'
	},
	getAllMarker: {
		//获取某个标识的等级
		url: s + 'Marker/getAllMarker',
		method: 'get'
	},
	getGoodsMarker: {
		//获取标识相关信息
		url: s + 'Marker/getGoodsMarker',
		method: 'get'
	},
	addMarker: {
		url: s + 'Marker/addMarker', //添加标识
		method: 'post'
	},
	//获取版本号
	ShopGetExtra: {
		url: s + 'Shop/getExtra', //添加标识
		method: 'post'
	},
	//新多渠道菜单
	ChannelGetList: {
		//获取渠道菜单
		url: s + 'Channel/getList',
		method: 'get'
	},
	ChannelEditGoods: {
		//编辑菜单配置
		url: s + 'Channel/editGoods',
		method: 'post'
	},
	ChannelCreate: {
		//开通渠道
		url: s + 'Channel/create',
		method: 'post'
	},
	ChannelEdit: {
		//编辑渠道的开关
		url: s + 'Channel/editStatus',
		method: 'post'
	},
	HotgoodsAdd: {
		//热区商品添加
		url: s + 'Hotgoods/add',
		method: 'post'
	},
	HotgoodsGetList: {
		//获取热区商品列表
		url: s + 'Hotgoods/getList',
		method: 'get'
	},
	HotgoodsUpdate: {
		//编辑热区商品
		url: s + 'Hotgoods/update',
		method: 'post'
	},
	HotgoodsDelete: {
		//删除热区商品
		url: s + 'Hotgoods/delete',
		method: 'get'
	},
	getPricetemplate :{
		// 获取价格模板列表
		url: s + 'Pricetemplate/getList',
		method:'get'
	},
	createPricetemplate :{
		// 创建价格模板
		url: s + 'Pricetemplate/create',
		method:'post'
	},
	editPricetemplate:{
		// 编辑价格模板
		url: s + 'Pricetemplate/edit',
		method:'post'
	},
	clearPricetemplate:{
		// 清空缓存
		url: s + 'Pricetemplate/clear',
		method:'get'
	},
	// 删除模板
	deletePricetemplate :{
		url: s + '/Pricetemplate/delete',
		method:'get'
	},
	moveSortPricetemplate:{
		url: s+ 'Pricetemplate/moveSort',
		method:'get'
	}
};
