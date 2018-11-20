import {
	s,
	w,
	b,
	p
} from 'src/config/host_var';
console.log(w);
console.log(b);
console.log(p);
//-----------       店铺配置     -------------------
export default {
	//  员工管理
	'getEmployeeList': {
		url: s + 'shop/getStaffList', //获取员工列表
		method: 'get'
	},
	'addShopUser': {
		url: s + 'User/addShopUser', //门店--添加员工
		method: 'post'
	},
	'editShopUser': {
		url: s + 'User/editShopUser', //门店--编辑员工
		method: 'post'
	},
	'editShopUsers': {
		url: s + 'User/editShopUsers', //门店--编辑员工
		method: 'post'
	},
	'getUserList': {
		url: s + 'User/getList', //获取员工列表,2018-3权限重构
		method: 'get'
	},
	'userAddBrandUser': {
		url: s + 'User/addBrandUser', //新增品牌员工,2018-3权限重构
		method: 'post'
	},
	'userEditBrandUser': {
		url: s + 'User/editBrandUser', //编辑品牌员工,2018-3权限重构
		method: 'post'
	},
	'userDel': {
		url: s + 'User/del', //删除员工,2018-3权限重构
		method: 'get'
	},
	'userEditBrandUsers': {
		url: s + 'User/editBrandUsers', //批量编辑员工,2018-3权限重构
		method: 'post'
	},
	'getUserRoleList': {
		url: s + 'role/getUserRoleList', //获取品牌下品牌和门店职位,2018-3权限重构
		method: 'post'
	},
	'userCheckExist': {
		url: s + 'User/checkExist', //判断手机号是否存在,2018-3权限重构
		method: 'post'
	},
	'getJobList': {
		url: s + 'job/getList', //获取职位列表 --过期2018-03
		method: 'post'
	},
	'getEmployeeInfo': {
		url: s + 'staff/get', //获取员工信息
		method: 'get'
	},
	'checkExist': {
		url: s + 'staff/checkExist', //验证电话号码
		method: 'post'
	},
	'addEmployee': {
		url: s + 'shop/addStaff', //添加员工 --过期2018-03
		method: 'post'
	},
	'updateEmployee': {
		url: s + 'shop/updateStaff', //修改员工信息 --过期2018-03
		method: 'post'
	},
	'delEmployee': {
		url: s + 'shop/removeStaff', //删除员工 --过期2018-03
		method: 'post'
	},
	//区域管理
	'getArea': {
		url: s + 'Area/getArea', //获取区域列表
		method: 'get'
	},
	'getOneAreaInfo': {
		url: s + 'Area/getOneArea', //获取区域信息
		method: 'get'
	},
	'createArea': {
		url: s + 'Area/createArea', //创建
		method: 'post'
	},
	'editArea': {
		url: s + 'Area/editArea', //编辑
		method: 'post'
	},
	'deleteArea': {
		url: s + 'Area/delArea', //删除
		method: 'get'
	},
	//职位管理
	'getJobInfoList': {
		url: s + 'job/getList', //获取职位列表
		method: 'get'
	},
	'getJobInfo': {
		url: s + 'job/get', //获取职位信息
		method: 'get'
	},
	'newGetJobInfoList': {
		url: s + 'role/getList', //新的获取职位列表，重构的
		method: 'get'
	},
	'newGetJobInfo': {
		url: s + 'role/get', //新的获取职位信息，重构的
		method: 'get'
	},
	'newEditJob': {
		url: s + 'role/editPosition', //新的编辑职位，重构的
		method: 'post'
	},
	'newAddJob': {
		url: s + 'role/addPosition', //新的添加职位，重构的
		method: 'post'
	},
	'newGetPermissionsList': {
		url: s + 'role/permissions', //新的获取职位权限列表，重构的
		method: 'post'
	},
	'newDeleteJob': {
		url: s + 'role/delPosition', //新的删除职位，重构的
		method: 'get'
	},
	'addJob': {
		url: s + 'job/add', //添加职位
		method: 'post'
	},
	'editJob': {
		url: s + 'job/edit', //编辑职位
		method: 'post'
	},
	'deleteJob': {
		url: s + 'job/del', //删除职位
		method: 'get'
	},
	'getPermissionsList': {
		url: s + 'job/permissions', //获取职位权限列表
		method: 'get'
	},
	//桌台管理
	'getTableList': {
		url: s + 'Table/getTable', //获取桌台列表
		method: 'get'
	},
	'getTableInfo': {
		url: s + 'Table/getOneTable', //获取桌台列表
		method: 'get'
	},
	'createTable': {
		url: s + 'Table/createTable', //创建桌台
		method: 'post'
	},
	'editTable': {
		url: s + 'Table/editTable', //编辑桌台
		method: 'post'
	},
	'deleteTable': {
		url: s + 'Table/delTable', //删除桌台
		method: 'get'
	},
	//服务费管理
	'getServiceCharge': {
		url: s + 'shop/getServiceCharge', //获取服务费接口
		method: 'get'
	},
	'setServiceCharge': {
		url: s + 'shop/setServiceCharge', //设置服务费接口
		method: 'post'
	},
	//退菜原因
	'getReasonList': {
		url: s + 'Reason/getReasonList', //获得退菜列表
		method: 'get'
	},
	'deleteReason': {
		url: s + 'Reason/deleteReason', //删除
		method: 'get'
	},
	'getReasonBy': {
		url: s + 'Reason/getReasonById', //获取退菜原因详情
		method: 'get'
	},
	'addReason': {
		url: s + 'Reason/addReason', //增加退菜原因
		method: 'post'
	},
	'editReason': {
		url: s + 'Reason/editReason', //编辑退菜原因
		method: 'post'
	},
	//取整设置
	'getPriceRule': {
		url: s + 'shop/getPriceRule', //获取取整设置的信息
		method: 'post'
	},
	'setPriceRule': {
		url: s + 'shop/setPriceRule', //获取取整设置的信息
		method: 'post'
	},
	//快销模式管理
	'getFastSelling': {
		url: s + 'shop/getFastSelling',
		method: 'post'
	},
	'editFastSelling': {
		url: s + 'shop/editFastSelling',
		method: 'post'
	},
	'getTableCardList': { //获取文字桌牌号列表
		url: s + 'Tablecard/getTablecardList',
		method: 'post'
	},
	'delTableCard': { //删除文字桌牌号
		url: s + 'Tablecard/delTablecard',
		method: 'post'
	},
	'addTablecard': { //添加文字桌牌号
		url: s + 'Tablecard/addTablecard',
		method: 'post'
	},
	'editTablecard': { //编辑文字桌牌号
		url: s + 'Tablecard/editTablecard',
		method: 'post'
	},
	//市别设置
	'getTimeSetList': {
		url: s + 'Timeinterval/getList',
		method: 'post'
	},
	'timeintervalCreate': {
		url: s + 'Timeinterval/create',
		method: 'post'
	},
	'timeintervalEdit': {
		url: s + 'Timeinterval/edit', //编辑
		method: 'post'
	},
	//  ------------店铺配置------------------

	//商家编号
	'getAccessToken': {
		url: s + 'shop/getAccessToken', //设置服务费接口
		method: 'post'
	},
	'getChangeShifts': {
		url: s + 'shop/getChangeShifts', //交接班班次信息
		method: 'GET'
	},
	//重置商家编号
	'resetAccessToken': {
		url: s + 'shop/resetAccessToken', //设置服务费接口
		method: 'get'
	},
	'getPrintErrorList': {
		url: s + 'printerror/getPrintErrorList', //获取打印机错误列表
		method: 'get'
	},
	'getPrintList': {
		url: s + 'printcolumn/getPrintcolumnList', //获取打印机队列列表
		method: 'get'
	},
	'clearPrintcolumn': {
		url: s + 'printcolumn/clearPrintcolumn', //清空打印机队列列表
		method: 'get'
	},
	'getPrinterrorByEid': {
		url: s + 'printerror/getPrinterrorByEid', //补打打印机错误
		method: 'get'
	},
	'getPrinterList': {
		url: s + 'printer/getPrinterList', //获取打印机列表
		method: 'get'
	},
	'getPrintDetial': {
		url: s + 'printer/getPrinterById', //获取打印机详情
		method: 'get'
	},
	'printerTestPage': {
		url: s + 'printer/printerTestPage', //测试打印
		method: 'get'
	},
	'addPrint': {
		url: s + 'printer/addPrinter', //添加打印机
		method: 'post'
	},
	'editPrinter': {
		url: s + 'printer/editPrinter', //修改打印机
		method: 'post'
	},
	'deletePrinter': {
		url: s + 'printer/deletePrinter', //删除打印机
		method: 'get'
	},
	'getTerminalDetial': {
		url: s + 'Printterminal/getOne', //获取打印机终端详情
		method: 'get'
	},
	'addTerminal': {
		url: s + 'Printterminal/create', //添加打印机终端
		method: 'post'
	},
	'getTerminalList': {
		url: s + 'Printterminal/getList', //获取打印机终端列表
		method: 'get'
	},
	'editTerminal': {
		url: s + 'Printterminal/edit', //修改打印机终端
		method: 'post'
	},
	'deleteTerminal': {
		url: s + 'Printterminal/delete', //删除打印机终端
		method: 'get'
	},
	'setMainTerminal': {
		url: s + 'Printterminal/setMainTerminal', //设置打印机主终端
		method: 'post'
	},
	'getPrintsetList': {
		url: s + 'printset/getPrintsetList', //获取打印机配置列表
		method: 'get'
	},
	'getPrintsetById': {
		url: s + 'printset/getPrintsetById', //获取打印机配置详情
		method: 'get'
	},
	'getOrderNames': {
		url: s + 'printset/getOrderNames', //获取打印机配置请求单据类型列表
		method: 'get'
	},
	'addPrintset': {
		url: s + 'printset/addPrintset', //添加打印机配置接口
		method: 'post'
	},
	'editPrintset': {
		url: s + 'printset/editPrintset', //修改打印机配置
		method: 'post'
	},
	'deletePrintset': {
		url: s + 'printset/deletePrintset', //删除打印机配置
		method: 'get'
	},
	'selSlideShow': {
		url: s + 'Slideshow/selSlideShow', //请求，轮播图列表
		method: 'get'
	},
	'getElecMenu': {
		url: s + 'Slideshow/getElecMenu', //电子菜单管理请求列表
		method: 'get'
	},
	'addSlideShow': {
		url: s + 'Slideshow/addSlideShow', //添加轮播图
		method: 'post'
	},
	'updateSlideShow': {
		url: s + 'Slideshow/updateSlideShow', //修改轮播图
		method: 'post'
	},
	'delSlideShow': {
		url: s + 'Slideshow/delSlideShow', //删除轮播图
		method: 'post'
	},
	'eleDelSlideShow': {
		url: s + 'Slideshow/delElecMenuSlideShow', //电子菜单管理删除图片
		method: 'post'
	},
	'baseGet': {
		url: s + 'shop/get', //获取店铺基本信息
		method: 'get'
	},
	'baseUpdate': {
		url: s + 'shop/update', //修改店铺基本信息
		method: 'post'
	},
	'getPaymentList': {
		url: s + 'Payment/getPaymentList', //获取支付方式列表
		method: 'get'
	},
	'updatePaymentStatus': {
		url: s + 'payment/updatePaymentStatus', //开启或关闭支付方式
		method: 'post'
	},
	'getPaymentById': {
		url: s + 'payment/getPaymentById', //支付方式其他支付详情
		method: 'get'
	},
	'getWeixinAlipay': {
		url: s + 'payment/getPayConfig', //支付方式微信支付宝中信详情
		method: 'get'
	},
	'addPayment': {
		url: s + 'Payment/addPayment', //添加支付方式
		method: 'post'
	},
	'editPayConfig': {
		url: s + 'Payment/editPayConfig', //添加-修改微信阿里支付方式
		method: 'post'
	},
	'editPayment': {
		url: s + 'Payment/editPayment', //修改支付方式
		method: 'post'
	},
	'applyZxMerId': {
		url: s + 'Payment/applyZxMerId', //添加-修改中信支付方式
		method: 'post'
	},
	'SlideshowUpdate': {
		url: s + 'Slideshow/update', //电子菜单管理保存
		method: 'post'
	},
	//品牌职位
	'RoleGetList': {
		url: s + 'Role/getList',
		method: 'get'
	},
	'roleGet': {
		url: s + 'Role/get', //查看
		method: 'get'
	},
	'roleAddPosition': {
		url: s + 'role/addPosition', //添加
		method: 'post'
	},
	'RoleEditPosition': {
		url: s + 'Role/editPosition', //修改
		method: 'post'
	},
	'deletePosition': {
		url: s + 'Role/delPosition', //删除
		method: 'get'
	},
	//起售配置
	'goodsleastGetList': {
		url: s + 'Goodsleast/getList', //获取列表
		method: 'get'
	},
	'GoodsleastAdd': {
		url: s + 'Goodsleast/add', //添加
		method: 'post'
	},
	'GoodsleastEdit': {
		url: s + 'Goodsleast/edit', //编辑
		method: 'post'
	},
	'GoodsleastDelete': {
		url: s + 'Goodsleast/delete', //删除
		method: 'post'
	},
	//后厨配置
	'KitchenGetList': {
		url: s + 'Kitchen/getList', //后厨配置列表
		method: 'get'
	},
	'KitchenAdd': {
		url: s + 'Kitchen/add', //添加
		method: 'post'
	},
	'KitchenUpdate': {
		url: s + 'Kitchen/update', //修改
		method: 'post'
	},
	'KitchenDelete': {
		url: s + 'Kitchen/delete', //删除
		method: 'get'
	},
	'getIsKitchen': {
		url: s + 'shop/getIsKitchen', //获取开关
		method: 'get'
	},
	'editIsKitchen': {
		url: s + 'shop/editIsKitchen', //修改开关
		method: 'post'
	},
	'getBillList': {
		url: s + 'Bill/getList', //获取挂账账户列表
		method: 'get'
	},
	'createBill': {
		url: s + 'Bill/create', //添加挂账账户
		method: 'post'
	},
	'editBill': {
		url: s + 'Bill/edit', //修改挂账账户
		method: 'post'
	},
	'getOneBill': {
		url: s + 'Bill/getOne', //挂账账户订单列表
		method: 'get'
	},
	'getOneDetail': {
		url: s + 'Bill/getOneDetail', //获取挂账账户详情
		method: 'get'
	},
	'changeBillStatus': {
		url: s + 'Bill/changeBillStatus', //挂账账户启用，关闭
		method: 'post'
	},
	'deleteBill': {
		url: s + 'Bill/delete', //挂账账户启用，关闭
		method: 'get'
	},
	'billAppoint': {
		url: s + 'Bill/billAppoint', //挂账账户启用，关闭
		method: 'post'
	},
	'settleBill': {
		url: s + 'Bill/settle', //挂账账户启用，关闭
		method: 'post'
	},
	'getNoticeList': {
		url: s + 'Notice/getList', //获取通知列表
		method: 'get'
	},
	'addNotice': {
		url: s + 'Notice/create', //添加通知
		method: 'post'
	},
	'getNoticeOne': {
		url: s + 'Notice/getOne', //添加通知
		method: 'get'
	},
	'editNoticeOne': {
		url: s + 'Notice/edit', //修改通知
		method: 'post'
	},
	'delNoticeOne': {
		url: s + 'Notice/delete', //删除通知
		method: 'get'
	},
	'deletePayment': {
		url: s + 'payment/deletePayment', //删除支付方式
		method: 'get'
	},
	'getChargeQuery': {
		url: s + 'Charge/query', //支付状态查询
		method: 'get'
	},
	'getChargeInfo': {
		url: s + 'Charge/getInfo', //获取激活&续费信息
		method: 'get'
	}
};
