<template>
	<div id="tools">
		<section class="fr export" style="width: auto;">
			<template v-for='(v,i) in btns'>
				<template v-if="!v.type">
					<a :key='i+keyRan' href="javascript:;" @click='v.fn' :class='v.className' :style='v.styles'>{{v.name}}</a>
				</template>
				<template v-if="v.type == 1">
					<form id="form_import_good" :key="i+keyRan" enctype="multipart/form-data" :class='v.className' class="import-form">
						<input type="file" @change='v.fn' accept=".xls,.xlsx" :name="v.inputName" :style='v.styles' :class='v.className' class="import-input" onclick="this.value = ''" />
						<a href="javascript:;" class="import-btn" :class='v.className' :style='v.styles'>{{v.name}}</a>
					</form>
				</template>
				<template v-if="v.type == 2">
					<a :key='i+keyRan' @click='v.fn' href="javascript:;" :class='v.className' :style='v.styles'>
						<img src="../../res/images/add.png" alt="">
						<span>{{v.name}}</span>
					</a>
				</template>
				<template v-if="v.type == 3">
					<div :key='i+keyRan' class="search-div">
						<input type="text" v-model="v.name" placeholder="请输入名称/简码" maxlength="20" @keyup='v.fn(v.name)' :style='v.styles' />
						<a @click='v.fn' href="javascript:void(0);">
							<img src="../../res/images/search.png" alt="">
						</a>
					</div>
				</template>
				<template v-if="v.type == 4">
					<el-button @click="v.fn" :icon="v.icon" :type="v.className" :key="i+keyRan">{{v.name}}</el-button>
				</template>
				<template v-if="v.type == 5">
					<el-button @click="v.fn" :icon="v.icon" :type="v.className" :key="i+keyRan" plain>{{v.name}}</el-button>
				</template>
				<template v-if="v.type == 6">
					<form id="form_import_good" :key="i+keyRan" class = 'elfire' enctype="multipart/form-data">
						<input id="fireinput" type="file" @change='v.fn' accept=".xls,.xlsx" :name="v.inputName" :style='v.styles' :class='v.className' class="import-input" onclick="this.value = ''" />
						<!-- <a href="javascript:;" class="import-btn" :class='v.className' :style='v.styles'>{{v.name}}</a> -->
						<label for="fireinput"></label>
						<el-button class = 'elbtn' :type="v.className" :key="i+keyRan">{{v.name}}
						</el-button>
					</form>
				</template>
			</template>
		</section>
	</div>
</template>
<script type="text/javascript">
//新的方式  this.$store.commit('setPageTools',[{name: '按钮名称',className:['myClass'],fn:callBack},...])

class Btn {
	/**
	 * @param {String} name //按钮显示的文字
	 * @param {String|Array} className // 按钮的类名 你的类名请不要叫 0 false
	 * @param {Function} fn // 回调函数
	 * @param {Number} type // 用于特殊dom,需要自己加结构
	 * @param {Number} style // 样式
	 *  @param {String} icon // icon样式
	 */
	constructor(...args) {
		/* eslint-disable */
		if (args.length === 1 && typeof args[0] == 'object') {
			var { name, className, fn, type, style, inputName,icon } = Object.assign({ style: {}, name: '', className: ['blue', 'btn'], fn: () => {}, type: 0,icon:''}, args[0])
		} else {
			var [name = "", className = "blue", fn = () => {}, type = 0, style = {}, inputName,icon=''] = [...args];
		}
		this.name = name;
		this.className = className;
		this.fn = fn;
		this.type = type;
		this.styles = style;
		this.icon = icon;
		this.inputName = inputName || "file";
		/* eslint-enable */
	}
}

export default {
	data() {
		return {
			oldBtn: {
				leadIn: new Btn('导入', 'import-form', '', 1, {}, 'goods'),
				leadOut: new Btn('导出', 'export-btn'),
				addGood: new Btn('添加', 'pick'),
				filter: new Btn('筛选'),
				createScheme: new Btn('创建方案'),
				back: new Btn('返回'),
				sync: new Btn('同步', 'sync-btn'),
				allWearhouse: new Btn('查看全部', ['wearhouse all']),
				outWearhouse: new Btn('快速出库', ['wearhouse out']),
				createWearhouse: new Btn('新建仓库', ['wearhouse create']),
				bomCreate: new Btn('新建BOM单', ['wearhouse bom-create']),
				handleWearhouse: new Btn('操作列表', ['wearhouse', 'handle']),
				openBrandPosition: new Btn('添加品牌职位', ['wearhouse', 'handle']),
				openShopPosition: new Btn('添加门店职位', ['wearhouse', 'handle']),
				adduserLabel: new Btn('新增用户标签', 'userLabel'),
				createAplan: new Btn('创建推送', 'userLabel'),
				putaway: new Btn('上架', ['wearhouse', 'handle']),
				lossaway: new Btn('下架', ['wearhouse', 'create']),
				addStaff: new Btn('新建员工', ['addStaff', 'export-btn'], '', 2),
				batchOperation: new Btn('批量操作', ['addStaff', 'export-btn']),
				adduserLevel: new Btn('新增人员等级', ['userLabel']),
				addnewgoods: new Btn('新增疯抢商品', ['userLabel']),
				completeBatchOperation: new Btn('完成操作', ['addStaff', 'export-btn']),
				openCode: new Btn('验证商品劵码', ['btn', 'firstBtn']),
				setTemplateType: new Btn('模板设置', ['setTemp', 'firstBtn']),
				addIntegral: new Btn('添加积分商品', ['btn', 'firstBtn']),
				addNewType: new Btn('新建', ['userLabel']),
				createSpeech: new Btn('新建话术组', ['technique']),
				newPath: new Btn('新建路径链接', ['technique']),
				addPublic: new Btn('一键同步微信公众号粉丝', ['public_number_btn']),
				setGroup: new Btn('设置用户组', ['user_btn']),
				exportUser: new Btn('导出用户', ['export_btn']),
				pushNewGroup: new Btn('新增用户组', ['userLabel']),
				addworker: new Btn('新建人员', ['userLabel']),
				newCardType: new Btn('新建卡类型', ['userLabel']),
				getToOut: new Btn('导出', 'export-btn'),
				addMenu: new Btn('新建分组菜单', ['userLabel']),
			}
		};
	},
	computed: {
		keyRan() {
			return Math.random();
		},
		btns() {
			let btns = [];
			let source = this.$store.state.pageTools;
			if (source instanceof Array) {
				btns = source.map((item) => {
					return new Btn(item);
				});
			} else if (source instanceof Object) { // 老的方式兼容
				for (let i in source) {
					if (i in this.oldBtn) {
						this.oldBtn[i].fn = source[i];
						btns.push(this.oldBtn[i]);
					}
				}
			}
			return btns; // this.$store.state.pageTools
		}
	},
	mounted() {
		if (Object.keys(this.oldBtn).length > 42) throw new Error(
			'请使用this.$store.commit("setPageTools",[{name: "按钮名称",style:{},fn:callBack}]) 的形式添加按钮');
	},
};
</script>
<style lang="less" scoped>
@sdSkyBlue: #22aae0;
@sdDeepBlue: #28a8e0;
@sdOrange: #ff9800;
.whb(@width, @height, @border: none) {
	width: @width;
	height: @height;
	border: @border;
	line-height: @height;
	text-align: center;
}

;
a {
	height: 40px;
	line-height: 40px;
	width: 90px;
	float: left;
	margin-left: 5px;
}

#tools {
	padding-top: 10px;
	overflow: hidden; // 搜索按钮
	.search-div {
		.whb(180px, 40px);
		display: inline-block;
		input {
			padding-left: 10px;
			.whb(129px, 40px, 1px solid #ccc);
			text-align: left;
			outline: none;
			vertical-align: top;
		}
		a {
			background-color: @sdSkyBlue;
			display: inline-block;
			.whb(50px, 40px);
			img {
				vertical-align: middle;
			}
		}
	}
	.elfire{
		display: inline-block;
		position: relative;
		input{
			display:none;
		}
		label{
			width:100%;
			height:100%;
			cursor: pointer;
			position:absolute;
		}
	}
	.import-form {
		width: 76px;
		background-color: @sdSkyBlue;
		float: left;
		position: relative;
		margin-left: 5px;
		transition: background-color 0.7s;
		cursor: pointer;
		.import-btn {
			width: 76px;
			display: inline-block;
			height: 40px;
			line-height: 40px;
			cursor: pointer;
		}
		&:hover {
			background-color: @sdDeepBlue;
		}
		.import-input {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			width: 76px;
			height: 40px;
			display: inline-block;
			cursor: pointer;
		}
	}
	.export-btn {
		width: 76px;
		background-color: @sdSkyBlue;
		transition: background-color 0.7s;
		float: left;
		margin: 0 3px;
		margin-left: 12px;
		cursor: pointer;
		&:hover {
			background-color: @sdDeepBlue;
		}
	}
	.addStaff {
		width: 130px;
		img {
			vertical-align: middle;
			margin-right: 5px;
		}
	}
	.refresh {
		background: url(../../res/images/shuaxin.png) no-repeat;
		background-size: 20px 20px;
		background-position: 20px center;
		width: 100px;
		text-align: center;
		border: 1px solid #28a8e0;
		color: #28a8e0;
		text-indent: 15px;
	}
	.sync-btn {
		background-color: @sdOrange;
		width: 88px;
		float: right;
		transition: background-color 0.7s;
		&:hover {
			background-color: @sdOrange;
		}
	}
	.btn-ok-cancel {
		width: 200px;
		height: 50px;
		float: right;
	}
	.btn-cancel,
	.btn-ok {
		width: 200px;
		height: 50px;
		float: right;
		margin-left: 10px;
	}
	/*仓库列表*/
	.wearhouse {
		width: 100px;
		height: 40px;
		line-height: 38px;
		text-align: center;
	}
	.wearhouse.all {
		/*查看全部*/
		color: @sdOrange;
		border: 1px solid @sdOrange;
	}
	.wearhouse.out {
		/*快速出库*/
		color: @sdDeepBlue;
		border: 1px solid @sdDeepBlue;
	}
	.wearhouse.create {
		/*新建仓库*/
		color: @sdDeepBlue;
		border: 1px @sdDeepBlue solid;
	}
	.wearhouse.handle {
		/*操作列表*/
		color: #fff;
		background: @sdDeepBlue;
	}
	.wearhouse.bom-create {
		/*新建bom单*/
		background: @sdDeepBlue;
		color: #fff;
	}
	.recheck {
		color: red;
		.whb(100px, 40px, 1px solid red);
	}
	.userLabel {
		width: 121px;
		height: 40px;
		text-align: center;
		background: @sdDeepBlue;
		color: #fff;
	}
	.technique {
		width: 210px;
		text-align: center;
		background: @sdDeepBlue;
		color: #fff;
		margin-right: 19px;
	}
	.public_number_btn {
		width: 209px;
		height: 40px;
		border: 1px solid RGB(255, 152, 0);
		color: RGB(255, 152, 0);
		background: #fff;
		margin-right: 19px;
	}
	.user_btn {
		width: 117px;
		height: 40px;
		border: 1px solid RGB(255, 152, 0);
		color: #fff;
		background: RGB(255, 152, 0);
		margin-right: 19px;
	}
	.export_btn {
		width: 113px;
		height: 40px;
		background: #fff;
		border: 1px solid RGB(40, 168, 224);
		color: RGB(40, 168, 224);
		margin-right: 19px;
	}
	.firstBtn {
		background-color: @sdOrange;
		color: #fff;
		display: inline-block;
		text-align: center;
		width: 125px;
		cursor: pointer;
	}
	.setTemp {
		background-color: @sdDeepBlue;
	}
	.pick {
		width: 100px;
		text-align: center;
		border: 1px solid @sdDeepBlue;
		color: @sdDeepBlue;
		background: #fff;
	}
	.huiC {
		width: 100px;
		text-align: center;
		border: 1px solid #B3B3B3;
		color: #B3B3B3;
		background: #fff;
	}
	.activity {
		display: block;
		color: #c7c75a;
		height: 40px;
		width: 150px;
		text-align: center;
		border: 1px solid #c7c75a;
	}
	.abrogate {
		background-color: #D2D2D2;
		color: #fff;
		display: inline-block;
		text-align: center;
		line-height: 40px;
		width: 125px;
		height: 40px;
		cursor: pointer;
	}
	.pickCheck {
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		background: #28A8E0;
		color: #fff;
		border: 1px solid #28A8E0;
	}
	/*打印按钮*/
	.printer-btn {
		.whb(100px, 40px, 1px solid #ffa627);
		background-color: #ffa627;
	}
	.back {
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #B3B3B3;
		border: 1px solid #B3B3B3;
	}
	.float {
		float: left;
		margin-right: 10px;
	}
	.refoin {
		width: 100px;
	}
	.headSet {
		width: 90px;
		vertical-align: middle;
	}
	.fd-btn {
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.fd-blue {
		.fd-btn;
		background: #29abe2;
		&:hover {
			background: #2a80b9;
		}
	}
	.fd-yellow {
		.fd-btn;
		background: #ff9800;
		&:hover {
			background: #bd823e;
		}
	}
	.fd-white {
		.fd-btn;
		border: solid 1px #b3b3b3;
		background: #fff;
		color: #b3b3b3;
	}
}

.btn {
	width: 80px;
	cursor: pointer;
}

.border {
	border: 1px solid #D2D2D2;
	width: 80px;
	color: #D2D2D2;
}
</style>