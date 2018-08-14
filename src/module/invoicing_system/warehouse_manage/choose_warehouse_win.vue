<!--选择仓库-->
<!--黄一帆-->
<template>
	<win :align="'center'" :height="500" :width="920" :ok="btnOk" @winEvent="closeSelfWin">
		<span slot="title">{{title}}</span>
		<div id="blong-content" slot="content">
			<template v-if="brandBtn.length">
				<div class="title-line">
					<span>品牌</span>
					<span class="slide-up" @click="showDetail=!showDetail">{{showDetail ? '收起' : '展开'}}</span>
				</div>
				<div class="brand-content select-ban" v-if="showDetail" @click="chooseBrand">
					<span v-for="(item,index) in brandBtn" :class="{'sign-selected':item.selected}" :key="index" :data-index="index">{{item.name}}</span>
				</div>
			</template>
			<template v-if="ownerList.length">
				<div class="title-line">
					<span class="shop">门店</span>
				</div>
				<div class="brand-content">
					<div class="search">
						<input type="text" v-model="search" placeholder="请输入仓库名称" @input="searchShop" @propertychange="searchShop">
						<div class="category btn" @click="searchShop">
							<img src="../../../res/images/search.png" alt="">
						</div>
					</div>
					<div class="shop-list select-ban" @click="chooseShop">
						<span :class="{'sign-selected':item.selected}" v-for="(item,index) in ownerListRes" :key="index" :data-index="index">{{item.name}}</span>
					</div>
				</div>
			</template>
			<div class="bottom-tips">
				<span>已选择：{{selectedObj.name}}</span>
			</div>
		</div>
	</win>
</template>
<script>
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			title: '添加仓库',
			btnOk: {
				style: 'background-color:#ff9800',
				content: '确定'
			},
			btnCancel: {},
			showDetail: true, //是否显示品牌
			pCom: {}, //传递给组件的数据
			search: '', //搜索的店铺名称
			isBrand: 0, //是否品牌
			selectedObj: '', //选中的id 名称

			allList: [],
			owner: '',
			ownerIsBrand: false, //仓库所属-是否只有品牌
			brandList: [], //只有品牌-选择品牌筛选
			brandBtn: [], //店铺选择按钮
			ownerList: [], //品牌和店铺-待筛选
			ownerListRes: [], //品牌和店铺-搜索筛选-最终筛选     
			type: '', //组件类型
		};
	},
	props: {
		pObj: null,
		/*
		    {
		        allList:[], //[{id:1,name:'品牌仓库',ischain:1},{id:1,name:'单店仓库',ischain:0},]
		        title:'', //标题
		        owner:{},//已选中的仓库，将抛出去的对象赋值给它
		    }
		*/
	},
	watch: {
		'pObj': 'initData'
	},
	mounted() {
		this.initData();
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win'*/ 'src/components/win'),
		selectStore: () =>
			import( /*webpackChunkName:'select_store'*/ 'src/components/select_store'),
	},
	methods: {
		closeSelfWin(res) {
			if(res == 'ok') {
				this.$emit('throwWin', res, this.selectedObj);

			} else {
				this.$emit('throwWin', res);
			}
		},
		//搜索店铺
		searchShop() {
			let arr = [];
			for(let item of this.ownerList) {
				if(this.search == '') {
					arr = this.ownerList;
				} else if(item.name.includes(this.search)) {
					arr.push(item);
				}
			}
			this.ownerListRes = arr;
		},
		chooseBrand(event) { //选择品牌
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'span') {
				let index = target.getAttribute('data-index');
				this.selectedObj = this.brandBtn[index];
				this.brandBtn = this.setBtnClass(this.brandBtn, this.brandBtn[index].id); //设置选中样式
				this.ownerListRes = this.setBtnClass(this.ownerListRes, null); //清空店铺-按钮样式
				this.ownerList = this.setBtnClass(this.ownerList, null);
			}
		},
		chooseShop(event) { //选择单店
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'span') {
				let index = target.getAttribute('data-index');
				this.selectedObj = this.ownerListRes[index];
				this.ownerListRes = this.setBtnClass(this.ownerListRes, this.ownerListRes[index].id);
				this.ownerList = this.setBtnClass(this.ownerList, this.ownerListRes[index].id);
				this.brandBtn = this.setBtnClass(this.brandBtn, null); //清空品牌-按钮样式
			}
		},
		setBtnClass(arr, id) {
			let tempArr = utils.deepCopy(arr);
			for(let item of tempArr) {
				if(item.id == id) {
					item.selected = true;
				} else {
					item.selected = false;
				}
			}
			return tempArr;
		},
		//----------初始化
		initData() {
			for(let key in this.pObj) {
				this[key] = this.pObj[key];
			}
			//解析数据-分配到品牌列表 所属列表
			let brandArr = [],
				shopArr = [];
			//解析传入的数据
			for(let item of this.allList) {
				if(item.ischain == 1) { //品牌仓库
					item.selected = false;
					brandArr.push(item);
				} else { //单店仓库
					item.selected = false;
					shopArr.push(item);
				}
			}
			this.ownerList = shopArr;
			this.brandBtn = brandArr; //品牌列表-选中品牌
			//设置默认选中
			this.setDefault();
			this.ownerListRes = utils.deepCopy(this.ownerList);
		},
		setDefault() {
			if(!this.owner) return;
			let index = 0;
			let obj = this.owner;
			let objId = this.owner.id;
			if(obj.ischain == 1) { //选中的是品牌仓库
				for(let i in this.brandBtn) {
					let item = this.brandBtn;
					if(objId == item.id) {
						item.selected = true;
						index = i;
					} else {
						item.selected = false;
					}
				}
				this.selectedObj = this.brandBtn[index];
			} else if(obj.ischain == 0) { //单店仓库
				for(let i in this.ownerList) {
					let item = this.ownerList[i];
					if(objId == item.id) {
						item.selected = true;
						index = i;
					} else {
						item.selected = false;
					}
				}
				this.selectedObj = this.ownerList[index];
			}
		},
	},
};
</script>
<style lang='less' scoped>
	#blong-content {
		padding-top: 30px;
		padding-left: 40px;
		padding-bottom: 50px;
		background-color: #f7f7f7;
		min-height: 500px;
		.title-line {
			margin-bottom: 15px;
			border-left: 2px solid #20a7dc;
			height: 22px;
			line-height: 22px;
			&>span {
				font-size: 16px;
				margin-left: 13px;
				color: #333333;
			}
			.slide-up {
				color: #20a7dc;
				display: inline-block;
				width: 748px;
				cursor: pointer;
				&:after {
					content: "";
					display: block;
					border-bottom: 2px dashed #ddd;
					position: relative;
					top: -11px;
					left: 40px;
					width: 708px;
				}
			}
			.shop {
				color: #333;
				display: inline-block;
				width: 748px;
				&:after {
					content: "";
					display: block;
					border-bottom: 2px dashed #ddd;
					position: relative;
					top: -11px;
					left: 40px;
					width: 763px;
				}
			}
		}
		.brand-content {
			&:after {
				zoom: 1;
				display: block;
				clear: both;
				content: '';
			}
			margin-left:15px;
			padding-bottom:5px;
			width:798px;
			.shop-list {
				margin-top: 20px;
				overflow: hidden;
			}
			span {
				padding: 0 15px;
				height: 40px;
				line-height: 38px;
				float: left;
				font-size: 14px;
				border: 1px solid #bbb;
				margin-right: 10px;
				color: #333333;
				background-color: #fff;
				margin-bottom: 10px;
				min-height: 40px;
				cursor: pointer;
			}
			.sign-selected {
				color: #ff9800;
				border: 1px solid #ff9800;
			}
			.search {
				width: 210px;
				height: 40px;
				margin-right: 15px;
				display: inline-block;
				vertical-align: middle;
				input {
					border: 1px solid #bbb;
					height: 40px;
					line-height: 40px;
					width: 168px;
					outline: none;
					background-color: #fff;
					padding: 0 10px;
					float: left;
				}
				.category {
					float: right;
					width: 40px;
					height: 40px;
					background: #fff;
					i {
						height: 10px;
						width: 10px;
						position: absolute;
						margin-top: 15px;
						margin-left: 13px;
						border-top: 10px solid #b3b3b3;
						border-left: 5px solid transparent;
						border-right: 5px solid transparent;
						box-sizing: border-box;
					}
					img {
						width: 25px;
						;
						height: 25px;
						margin-top: 8px;
						margin-left: 8px;
					}
				}
				.btn {
					background: #20a7dc;
					cursor: pointer;
					float: left;
				}
				.brand-list {
					width: 600px;
					height: 213px;
					background-color: #3e3e3e;
					position: absolute;
					z-index: 10;
					padding: 25px 20px;
					box-sizing: border-box;
					margin-top: 10px;
					display: none;
					.triangle {
						width: 0;
						line-height: 0;
						position: absolute;
						top: -26px;
						left: 177px;
						border: 13px solid transparent;
						border-bottom: 13px solid #3e3e3e;
					}
					.brand {
						border: 1px solid #ccc;
						span {
							padding: 0 30px;
							height: 40px;
							border: 1px solid #fff;
							background-color: #3e3e3e;
							color: #fff;
							font-size: 14px;
							line-height: 40px;
							margin-bottom: 10px;
							margin-right: 5px;
						}
						.sign-selected {
							color: #ff9800;
							border: 1px solid #ff9800;
						}
					}
				}
			}
		}
		.bottom-tips {
			background: #fff;
			color: #ff9800;
			font-size: 14px;
			position: absolute;
			left: 0;
			bottom: 0;
			margin-bottom: 50px;
			text-align: right;
			width: 100%;
			height: 35px;
			padding: 10px 0;
			padding-right: 15px;
		}
	}
</style>