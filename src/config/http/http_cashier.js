/* eslint-disable */
import {
	s,
	w,
	b,
	p
} from "src/config/host_var";

export default {
	//------------收银报表----------
	reportGetlist: {
		url: s + 'Reportset/getSetList', //获取报表配置列表
		method: 'get'
	},
	reportSetupdate: {
		url: s + 'reportset/setUpdate', //编辑报表配置
		method: 'post'
	},
	reportDeleteSet: {
		url: s + 'reportset/deleteSet', //删除报表配置
		method: 'post'
	},
	getShopList: {
		url: s + 'Brandconfig/getShopList', //获取品牌店铺下的门店
		method: 'get'
	},
	getReportHead: {
		url: s + 'reportset/getConfig', //获取表头
		method: 'post'
	},
	orderReportAnalysis: {
		url: s + 'report/orderReportAnalysis', //收银分析查询
		method: 'get'
	},
	taskInfo: {
		url: s + 'Report/taskInfo', //轮询获取数据
		method: 'get'
	},
	getAnalysis: {
		url: s + 'Report/getAnalysis', //轮询结束获取数据
		method: 'get'
	},
	classifiedReport: {
		url: s + 'report/classifiedReport', //分类报表查询
		method: 'get'
	},
	getShopList: {
		url: s + 'Brandconfig/getShopList', //获取品牌店铺下的门店
		method: 'get'
	},
	getReportHead: {
		url: s + 'reportset/getConfig', //获取表头
		method: 'post'
	},
	// orderReportAnalysis: {
	// 	url: s + 'report/orderReportAnalysis', //收银分析查询
	// 	method: 'get'
	// },
	getAnalysis: {
		url: s + 'Report/getAnalysis', //轮询结束获取数据
		method: 'get'
	},
	exportAnalysisReport: {
		url: s + 'Report/exportAnalysisReport', //收银分析导出
		type: 'file',
		method: 'post'
	},
	classifiedReport: {
		url: s + 'report/classifiedReport', //分类报表查询
		method: 'get'
	},
	exportClassifiedReport: {
		url: s + 'Report/exportClassifiedReport', //分类报表导出
		type: 'file',
		method: 'post'
	},
	getCategoryData: {
		url: s + 'Report/getCategoryData', //轮询结束获取数据  一级分类
		method: 'get'
	},
	exportRetailCategory: {
		url: s + 'Report/exportRetailCategory', //分类报表零售导出
		type: 'file',
		method: 'post'
	},
	getShopGoodsList: {
		url: s + 'Goods/getShopGoodsList', //品牌获取单店菜品数据（用于只有品牌权限查看其下适用门店）
		method: 'get'
	},
	getShopPackageList: {
		url: s + 'Package/getShopPackageList', //品牌获取单店套餐（用于只有品牌权限查看其下适用门店）
		method: 'get'
	},
	getShopCategoryList: {
		url: s + 'Category/getShopCategoryList', //品牌获取单店套餐（用于只有品牌权限查看其下适用门店）
		method: 'get'
	}
};