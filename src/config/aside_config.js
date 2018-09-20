let need = {
	setIcon: {
		概况: -172,
		商品配置: -218,
		店铺配置: -266,
		统计管理: -105,
		营销工具: -21,
		公众号配置: -291,
		会员系统: -63,
		进销存系统: 0,
		外卖: -150,
		收银报表: -84,
		品牌配置: -266,
		闪店卖手: -320,
		发票管理: -196
	},
	routerMap: {
		areaManager: {
			name: 'areaManager'
		}, //"区域管理",
		attrManager: {
			name: 'attrManager'
		}, //"口味管理",
		categoryManager: {
			name: 'categoryManager'
		}, //"分类管理",
		goodsManager: {
			name: 'goodsManager'
		}, //"商品管理",
		inventoryManager: {
			name: 'inventoryManager'
		}, //"库存管理",
		getBomList: {
			name: 'bomList'
		}, //"bom单管理",
		goodsLibrary: {
			name: 'goodsCountHistory'
		}, //商品盘库
		materielLibrary: {
			name: 'materialCountHistory'
		}, //物料盘库
		jobsManager: {
			name: 'jobsManager'
		}, //"职位管理",
		positionConfig: {
			name: 'positionConfig'
		}, //"职位配置",
		staffConfig: {
			name: 'staffConfig'
		}, //"品牌员工",
		setting: {
			name: 'setting'
		}, //"品牌基本配置",
		paymentMethod: {
			name: 'paymentMethod'
		}, //"品牌支付配置",
		delOrder: {
			name: 'delOrder'
		}, //"废单统计",
		returnGoods: {
			name: 'returnGoods'
		}, //"退品统计",
		handover: {
			name: 'handover'
		}, //"交接班",
		OrderBillList: {
			name: 'OrderBillList'
		}, //"挂账统计",
		packageManager: {
			name: 'packageManager'
		}, //"套餐管理",
		Payment: {
			name: 'Payment'
		}, //"支付方式",
		printerManager: {
			name: 'printerManager'
		}, //"打印机管理",
		printerError: {
			name: 'printerError'
		}, //"打印机错误",
		printerConfig: {
			name: 'printerConfig'
		}, //"打印机配置",
		returnReason: {
			name: 'returnReason'
		}, //"退菜原因",
		reverseReason: {
			name: 'reverseReason'
		}, //"反结账原因",
		reservationManager: {
			name: 'reservationManager'
		}, //"预定统计",
		shopNumber: {
			name: 'shopNumber'
		}, //"商家编号",
		serviceChargeManager: {
			name: 'serviceChargeManager'
		}, //"服务费管理",
		staffManager: {
			name: 'staffManager'
		}, //"员工管理",
		openTime: {
			name: 'openTime'
		}, //"基本信息",
		orderStatistics: {
			name: 'orderStatistics'
		}, //"订单统计",
		tableManager: {
			name: 'tableManager'
		}, //"桌台管理",
		changePriceRecord: {
			name: 'changePriceRecord'
		}, //"改价记录",
		entityCardStatistics: {
			name: 'entityCardStatistics'
		}, //"实体卡统计",
		getCouponList: {
			name: 'getCouponList'
		}, //"优惠劵管理",
		addCoupon: {
			name: 'addCoupon'
		}, //"添加优惠劵",
		printQueue: {
			name: 'printQueue'
		}, //"打印队列",
		PriceRule: {
			name: 'PriceRule'
		}, //"取整设置",
		fastSelling: {
			name: 'fastSelling'
		}, //"快销模式管理",
		categoryStatistics: {
			name: 'categoryStatistics'
		}, //"分类统计",
		getItemList: {
			name: 'singleStatistics'
		}, //"单品统计",
		EleMenuManage: {
			name: 'EleMenuManage'
		}, //"电子菜单管理",
		activity: {
			name: 'activity'
		}, //"活动",
		inventoryManagement: {
			name: 'inventoryManagement'
		}, //"库存管理",
		lossList: {
			name: 'lossList'
		}, //"下架管理",
		supplierManagement: {
			name: 'supplierManagement'
		}, //"供应商管理",
		inventoryConfig: {
			name: 'supplierConfigure'
		}, //"进销存配置",
		shelfManagement: {
			name: 'shelfManagement'
		}, //"货架管理",
		shelfReason: {
			name: 'shelfReason'
		}, //"下架原因配置",
		brandList: {
			name: 'brandList'
		}, //"商品品牌管理",
		activityStatistics: {
			name: 'activityStatistics'
		}, //"活动统计",
		zhongxin: {
			name: 'zhongxin'
		}, //"中信银行对账单",
		banner: {
			name: 'banner'
		}, //"轮播图配置",
		authorization: {
			name: 'authorization'
		}, //"",//"",
		printSet: {
			name: 'printSet'
		}, //"打印机配置",
		shelveRule: {
			name: 'shelveRule'
		}, //"销售规则",
		weighGoodsList: {
			name: 'weighGoodsList'
		}, //"称重商品配置",
		freeGoods: {
			name: 'freeGoods'
		}, //"赠品统计",
		multiChannelMenu: {
			name: 'multiChannelMenu'
		}, //"多渠道菜单",
		getGoodsInvenStatList: {
			name: 'singleStockstatics'
		}, //"单品库存统计",
		marker: {
			name: 'marker'
		}, //"电子菜单标识",
		Customstatistics: {
			name: 'Customstatistics'
		}, //"自定义商品统计",
		Couponstatistics: {
			name: 'Couponstatistics'
		}, //"优惠券统计",
		businessStatistics: {
			name: 'businessStatistics'
		}, //"营业统计",
		warehouseList: {
			name: 'warehouseList'
		}, //"仓库列表",
		getDispatchRecordList: {
			name: 'operation'
		}, //"调度管理",
		activateEntityCard: {
			name: 'activateEntityCard'
		}, //"实体卡激活",
		MemberCard: {
			name: 'MemberCard'
		}, //"实体会员导入",
		square: {
			name: 'square'
		}, //"自助模式",
		integralRule: {
			name: 'integralRule'
		}, //"会员配置",
		menuSetting: {
			name: 'menuSetting'
		}, //"菜单设置",
		boundPublicNumber: {
			name: 'boundPublicNumber'
		}, //"绑定公众号",
		adminConfig: {
			name: 'adminConfig'
		}, //"管理员配置",
		templateSetting: {
			name: 'templateSetting'
		}, //"模版设置",
		point: {
			name: 'point'
		}, //"积分抵现配置",
		memberRecharge: {
			name: 'memberRecharge'
		}, //"会员充值统计",
		memberLevelManagement: {
			name: 'memberLevelManagement'
		}, //"会员等级管理",
		cooperation: {
			name: 'cooperation'
		}, //"合作伙伴",
		appointment: {
			name: 'appointment'
		}, //"预约管理",
		weixinConfiguration: {
			name: 'weixinConfiguration'
		}, //"微信首页配置",
		integralMall: {
			name: 'integralMall'
		}, //"积分商城",
		promotionMaterial: {
			name: 'promotionMaterial'
		}, //"推广素材",
		statisticsManagement: {
			name: 'statisticsManagement'
		}, //"来源统计",
		memberStoredValueScheme: {
			name: 'memberStoredValueScheme'
		}, //"会员储值方案",
		getCardList: {
			name: 'getCardList'
		}, //"卡查询",
		getCardConsumeList: {
			name: 'getCardConsumeList'
		}, //"交易查询",
		cardTypeList: {
			name: 'cardTypeList'
		}, //"卡类型",
		addCardType: {
			name: 'addCardType'
		}, //"制卡",
		cardTypeApp: {
			name: 'cardTypeApp'
		}, //"实体卡应用",
		NoBrand: {
			name: 'NoBrand'
		}, //"会员基本配置",
		configCourse: {
			name: 'configCourse'
		}, //"配置教程",
		Assistantusertag: {
			name: 'Assistantusertag'
		}, //"用户标签",
		Assistantuserlevel: {
			name: 'Assistantuserlevel'
		}, //"人员级别",
		AssistantcoinsConfig: {
			name: 'AssistantcoinsConfig'
		}, //"金币配置",
		Assistantusergroup: {
			name: 'Assistantusergroup'
		}, //"用户分组",
		Assistantfans: {
			name: 'Assistantfans'
		}, //"粉丝列表",
		Assistantstaff: {
			name: 'Assistantstaff'
		}, //"工作人员",
		Assistantverbaltrick: {
			name: 'Assistantverbaltrick'
		}, //"话术配置",
		Assistantgood: {
			name: 'Assistantgood'
		}, //"疯抢商品",
		Assistantbuyconfig: {
			name: 'Assistantbuyconfig'
		}, //"疯抢配置",
		Assistanthistory: {
			name: 'Assistanthistory'
		}, //"疯抢历史",
		cashierAnslysis: {
			name: 'cashierAnslysis'
		}, //"收银分析",
		ReportCategory: {
			name: 'ReportCategory'
		}, //"分类报表",
		cashierConfig: {
			name: 'cashierConfig'
		}, //"报表配置",
		citySettings: {
			name: 'citySettings'
		}, //"市别设置",
		pushLanguageSettings: {
			name: 'pushLanguageSettings'
		}, //推送语设置
		appletBinding: {
			name: 'appletBinding'
		}, //小程序绑定
		memberLabel: {
			name: 'memberLabel'
		}, //会员标签
		memberSend: {
			name: 'memberSend'
		}, //会员推送信息
		onlineOrderConfig: {
			name: 'onlineOrderConfig'
		}, //在线点单配置
		memberManagement: {
			name: 'memberManagement'
		}, //会员管理
		Assistantenchashment: {
			name: 'Assistantenchashment'
		}, //提现申请
		assistantComment: {
			name: 'assistantComment'
		}, //用户点评
		pickingList: {
			name: 'pickingList'
		}, //领料列表
		companyConfig: {
			name: 'materialUnitCreate'
		}, //物料单位配置
		materiel: {
			name: 'materialCategory'
		},
		CommentConfig: {
			name: 'CommentConfig'
		}, //支付评价配置
		taskRules: {
			name: 'taskRules'
		}, //任务规则
		Task: {
			name: 'Task'
		}, //任务系统
		Commentstatics: {
			name: 'Commentstatics'
		}, //用户评价系统
		inventoryExport: {
			name: 'wareImport'
		}, //入库导入
		Scanpayconfig: {
			name: 'Scanpayconfig'
		}, //扫码支付
		Startandsell: {
			name: 'Startandsell'
		}, //商品起售配置
		hangUpAccount: {
			name: 'hangUpAccount'
		}, //挂账账户管理
		notice: {
			name: 'notice'
		}, //店铺通知
		Scanpaystatics: {
			name: 'Scanpaystatics'
		}, //扫码支付统计
		Reversestatics: {
			name: 'reverseStatics'
		}, //反结账统计
		getAuditList: {
			name: 'conclusionList'
		}, //调度审核
		schedulingApplication: {
			name: 'schedulingApplication'
		}, //调度申请
		Assign: {
			name: 'brandAssign'
		}, //进销存-品牌指派
		Dada: {
			name: 'Dada'
		}, //创建达达
		DadaConfig: {
			name: 'DadaConfig'
		}, //达达配送
		MemberValueConfig: {
			name: 'MemberValueConfig'
		}, //会员储值配置
		kitchen: {
			name: 'kitchen'
		}, //后厨模式配置
		orderTemplateSwitch: {
			name: 'orderTemplateSwitch'
		}, //点单模版切换
		MemberAnalysis: {
			name: 'MemberAnalysis'
		}, //会员分析
		seller: {
			name: 'seller'
		}, //销方管理
		client: {
			name: 'client'
		}, //发票点管理
		storeOverview: {
			name: 'storeOverview'
		}, //概况
		zxsh: {
			name: 'zxsh'
		}, //中信上海对账单
		WorkingBOM: {
			name: 'processbomList'
		}, //加工BOM单
		materialWorking: {
			name: 'processHistory'
		},
		balanceAdjustRecord: {
			//余额调整记录
			name: 'balanceAdjustRecord'
		},
		storeArea: {
			//区域门店
			name: 'storeArea'
		},
		getDispatchLogList: {
			//批量日志
			name: 'batchLog'
		},
		getGoodsLogList: {
			//总日志列表
			name: 'totalLog'
		},
		customPackageStatistics: {
			//自定义套餐
			name: 'customPackageStatistics'
		}
	}
};
export default need;
