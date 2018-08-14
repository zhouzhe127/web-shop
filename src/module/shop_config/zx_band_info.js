/**
 * 中信银行入驻表格
 * 微信一级，二级类目
 * 
 */

let data = {
	person: [{
		id: '01',
		name: '生活/咨询服务',
		list: [{
			id: 143,
			name: '咨询/法律咨询/金融咨询等'
		}, {
			id: 157,
			name: '职业社交/婚介/交友'
		}, {
			id: 299,
			name: '婚庆/摄影'
		}, {
			id: 306,
			name: '装饰/设计'
		}, {
			id: 320,
			name: '家政/维修服务'
		}, {
			id: 321,
			name: '广告/会展/活动策划'
		}]
	},
	{
		id: '02',
		name: '生活/家居',
		list: [{
			id: 116,
			name: '户外/运动/健身器材/安防'
		}, {
			id: 123,
			name: '计生用品'
		}, {
			id: 129,
			name: '母婴用品/儿童玩具'
		}, {
			id: 293,
			name: '家装建材/家居家纺'
		}, {
			id: 294,
			name: '美妆/护肤'
		}, {
			id: 295,
			name: '鲜花/盆栽/室内装饰品'
		}, {
			id: 296,
			name: '交通工具/配件/改装'
		}, {
			id: 297,
			name: '服饰/箱包/饰品'
		}, {
			id: 298,
			name: '钟表/眼镜'
		}, {
			id: 305,
			name: '宠物/宠物食品/饲料'
		}, {
			id: 319,
			name: '数码家电/办公设备'
		}, {
			id: 323,
			name: '书籍/音像/文具/乐器'
		}]
	},
	{
		id: '10',
		name: '苗木/绿化',
		list: [{
			id: 324,
			name: '苗木种植/园林绿化'
		}]
	},
	{
		id: '11',
		name: '娱乐/健身服务',
		list: [{
			id: 148,
			name: '美容/健身类会所'
		}, {
			id: 149,
			name: '游艺厅/KTV/网吧'
		}, {
			id: 300,
			name: '俱乐部/休闲会所'
		}]
	},
	{
		id: '12',
		name: '餐饮/食品',
		list: [{
			id: 153,
			name: '餐饮'
		}, {
			id: 292,
			name: '食品'
		}]
	},
	{
		id: '14',
		name: '通信',
		list: [{
			id: 155,
			name: '话费通讯'
		}]
	},
	{
		id: '23',
		name: '教育/培训',
		list: [{
			id: 147,
			name: '教育/培训/考试缴费/学费'
		}]
	},
	{
		id: '24',
		name: '医疗',
		list: [{
			id: 230,
			name: '私立/民营医院/诊所'
		}, {
			id: 322,
			name: '保健器械/医疗器械/非处方药品'
		}]
	},
	{
		id: '27',
		name: '网络虚拟服务',
		list: [{
			id: 302,
			name: '软件/建站/技术开发'
		}, {
			id: 303,
			name: '网络推广/网络广告'
		}, {
			id: 304,
			name: '游戏'
		}]
	},
	{
		id: '29',
		name: '金融',
		list: [{
			id: 242,
			name: '财经资讯'
		}]
	},
	{
		id: '38',
		name: '线下零售',
		list: [{
			id: 209,
			name: '便利店'
		}, {
			id: 210,
			name: '其他综合零售'
		}]
	},
	{
		id: '51',
		name: '票务/旅游',
		list: [{
			id: 301,
			name: '旅馆/酒店/度假区'
		}, {
			id: 307,
			name: '娱乐票务'
		}, {
			id: 308,
			name: '交通票务'
		}]
	},
	{
		id: '53',
		name: '生活缴费',
		list: [{
			id: 309,
			name: '生活缴费'
		}]
	},
	{
		id: '34',
		name: '其他',
		list: [{
			id: 158,
			name: '其他行业'
		}]
	}],
	company: [{
		id: '01',
		name: '生活/咨询服务',
		list: [{
			id: 273,
			name: '婚庆/摄影'
		}, {
			id: 289,
			name: '装饰/设计'
		}, {
			id: 311,
			name: '家政/维修服务'
		}, {
			id: 312,
			name: '广告/会展/活动策划'
		}, {
			id: 42,
			name: '咨询/法律咨询/金融咨询等'
		}, {
			id: 93,
			name: '人才中介机构/招聘/猎头'
		}, {
			id: 94,
			name: '职业社交/婚介/交友'
		}, {
			id: 95,
			name: '网上生活服务平台'
		}]
	},
	{
		id: '02',
		name: '生活/家居',
		list: [{
			id: 13,
			name: '计生用品'
		}, {
			id: 19,
			name: '母婴用品/儿童玩具'
		}, {
			id: 266,
			name: '家装建材/家居家纺'
		}, {
			id: 267,
			name: '美妆/护肤'
		}, {
			id: 268,
			name: '鲜花/盆栽/室内装饰品'
		}, {
			id: 269,
			name: '交通工具/配件/改装'
		}, {
			id: 271,
			name: '服饰/箱包/饰品'
		}, {
			id: 272,
			name: '钟表/眼镜'
		}, {
			id: 284,
			name: '宠物/宠物食品/饲料'
		}, {
			id: 310,
			name: '数码家电/办公设备'
		}, {
			id: 315,
			name: '书籍/音像/文具/乐器'
		}, {
			id: 6,
			name: '户外/运动/健身器材/安防'
		}, {
			id: 9,
			name: '黄金珠宝/钻石/玉石'
		}]
	},
	{
		id: '03',
		name: '交通运输服务类',
		list: [{
			id: 259,
			name: '加油'
		}, {
			id: 70,
			name: '物流/快递公司'
		}, {
			id: 75,
			name: '港口经营港口理货'
		}, {
			id: 77,
			name: '租车'
		}]
	},
	{
		id: '10',
		name: '苗木/绿化',
		list: [{
			id: 317,
			name: '苗木种植/园林绿化'
		}, {
			id: 40,
			name: '化肥/农用药剂等'
		}]
	},
	{
		id: '11',
		name: '娱乐/健身服务',
		list: [{
			id: 280,
			name: '俱乐部/休闲会所'
		}, {
			id: 54,
			name: '美容/健身类会所'
		}, {
			id: 56,
			name: '游艺厅/KTV/网吧'
		}]
	},
	{
		id: '12',
		name: '餐饮/食品',
		list: [{
			id: 270,
			name: '食品'
		}, {
			id: 90,
			name: '餐饮'
		}]
	},
	{
		id: '13',
		name: '房地产',
		list: [{
			id: 316,
			name: '房地产'
		}]
	},
	{
		id: '14',
		name: '通信',
		list: [{
			id: 80,
			name: '电信运营商'
		}, {
			id: 81,
			name: '宽带收费'
		}, {
			id: 92,
			name: '话费通讯'
		}]
	},
	{
		id: '23',
		name: '教育/培训',
		list: [{
			id: 52,
			name: '教育/培训/考试缴费/学费'
		}, {
			id: 53,
			name: '私立院校'
		}]
	},
	{
		id: '24',
		name: '医疗',
		list: [{
			id: 282,
			name: '保健信息咨询平台'
		}, {
			id: 314,
			name: '保健器械/医疗器械/非处方药品'
		}, {
			id: 66,
			name: '私立/民营医院/诊所'
		}, {
			id: 67,
			name: '挂号平台'
		}]
	},
	{
		id: '27',
		name: '网络虚拟服务',
		list: [{
			id: 104,
			name: '门户/资讯/论坛'
		}, {
			id: 276,
			name: '在线图书/视频/音乐'
		}, {
			id: 277,
			name: '软件/建站/技术开发'
		}, {
			id: 278,
			name: '网络推广/网络广告'
		}, {
			id: 279,
			name: '游戏'
		}]
	},
	{
		id: '29',
		name: '金融',
		list: [{
			id: 112,
			name: '众筹'
		}, {
			id: 318,
			name: '保险业务'
		}, {
			id: 96,
			name: '财经资讯'
		}, {
			id: 97,
			name: '股票软件类'
		}]
	},
	{
		id: '37',
		name: '公益',
		list: [{
			id: 103,
			name: '公益'
		}]
	},
	{
		id: '38',
		name: '线下零售',
		list: [{
			id: 204,
			name: '超市'
		}, {
			id: 205,
			name: '便利店'
		}, {
			id: 206,
			name: '自动贩卖机'
		}, {
			id: 207,
			name: '百货'
		}, {
			id: 208,
			name: '其他综合零售'
		}]
	},
	{
		id: '39',
		name: '电商/团购',
		list: [{
			id: 2,
			name: '团购'
		}, {
			id: 203,
			name: '线上商超'
		}, {
			id: 3,
			name: '海淘'
		}]
	},
	{
		id: '51',
		name: '票务/旅游',
		list: [{
			id: 23,
			name: '旅行社'
		}, {
			id: 24,
			name: '旅游服务平台'
		}, {
			id: 274,
			name: '机票/机票代理'
		}, {
			id: 275,
			name: '旅馆/酒店/度假区'
		}, {
			id: 281,
			name: '娱乐票务'
		}, {
			id: 283,
			name: '交通票务'
		}, {
			id: 313,
			name: '景区/宗教'
		}]
	},
	{
		id: '52',
		name: '收藏/拍卖',
		list: [{
			id: 285,
			name: '文物经营/文物复制品销售'
		}, {
			id: 31,
			name: '非文物类收藏品'
		}, {
			id: 325,
			name: '拍卖/典当'
		}]
	},
	{
		id: '53',
		name: '生活缴费',
		list: [{
			id: 287,
			name: '停车缴费'
		}, {
			id: 288,
			name: '城市交通/高速收费'
		}, {
			id: 57,
			name: '水电煤缴费/交通罚款等生活缴费'
		}, {
			id: 58,
			name: '有线电视缴费'
		}, {
			id: 60,
			name: '物业管理费'
		}, {
			id: 62,
			name: '其他生活缴费'
		}]
	},
	{
		id: '34',
		name: '其他',
		list: [{
			id: 111,
			name: '其他行业'
		}]
	}],
	gov: [{
		id: '23',
		name: '教育/培训',
		list: [{
			id: 164,
			name: '公立院校'
		}]
	},
	{
		id: '24',
		name: '医疗',
		list: [{
			id: 176,
			name: '公立医院'
		}, {
			id: 177,
			name: '挂号平台'
		}]
	},
	{
		id: '05',
		name: '其他生活缴费',
		list: [{
			id: 165,
			name: '水电煤缴费/交通罚款等生活缴费'
		}, {
			id: 167,
			name: '事业单位'
		}, {
			id: 170,
			name: '物业管理费'
		}, {
			id: 290,
			name: '停车缴费'
		}, {
			id: 291,
			name: '城市交通/高速收费'
		}, {
			id: 172,
			name: '其他生活缴费'
		}]
	}],
};
export default data;