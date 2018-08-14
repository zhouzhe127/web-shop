<!--
    **出货单
    *
    * 褚子龙
    * *
    *
-->
<template>
    <div id="output-shipper">
		<template v-if="!printShow">
			<div class="head">出货单</div>
			<div class="detail">
				<div class="list">
					<div class="shipper-num">出货单号：{{details.receiptNumber}}</div>
					<div>操作人：{{details.createName}}</div>
				</div>
				<div class="list">
					<div class="shipper-num">出货原因：{{details.cause}}</div>
					<div>备注：{{details.remark}}</div>
				</div>
				<div class="list">
					<div class="shipper-num">出货仓库：{{details.outWname}}</div>
				</div>
				<div class="list">
					<div class="shipper-num">入货仓库：{{details.intoWname}}</div>
				</div>
			</div>
			<!-- 调度详情-列表 -->
			<detail-list
			@emit="getDetailObj" 
			:detail="detailObj"
			:type="1"
			></detail-list>
			
		</template>
		<output-print 
		v-if="printShow" 
		@emit="getEmit" 
		:detail="details" 
		:goods="goodsDetails" 
		:material="materialDetails" 
		:isOpen="showCom"
		></output-print>
	</div>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				selectType: 0, //0商品  1物料
				showCom: false, //是否展示详细内容
				comObj: {},
				details: {}, //详情信息
				goodsDetails: [], //商品详情
				materialDetails: [], //物料详情
				materialUnit: [], //物料单位
				allUnit: [], //所有单位名称
				unitName: '', //单位选择默认单位
				conversion: '', //转化进率
				smallUnit: '', //最小单位
				listIndex: 0, //操作的列表index
				sleIndex: 0, //操作的单位index
				printShow: false, //打印预览
				detailSend: '',
				goodsSend: '',
				materialSend: '',
				detailObj: {}, //详情列表对象
				isBrand:0,//0单店 1品牌
				matTypeHash:{
					0:'成品',
					1:'半成品',
					2:'普通物料',
				},
			};
		},
		mounted() {
			this.initBtn();
			
			let userData = storage.session('userShop');
			this.details = storage.session('outStoreDetails');
			this.isBrand = userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌
			this.details.isBrand = this.isBrand;
			this.goodsDetails = this.setGoodsList(this.details.itemDetail.goodsDetail);
			this.materialDetails = this.setMaterialList(this.details.itemDetail.materialDetail);
			let obj = {
				goods: this.goodsDetails,
				material: this.materialDetails,
			};
			this.detailObj = obj;
			if(!this.goodsDetails.length && this.materialDetails.length) { //只有物料
				this.selectType = 1;
			}

		},
		components: {
			selectBtn: () =>
				import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			outputPrint: () =>
				import( /*webpackChunkName: 'output_shipper_print'*/ './output_shipper_print'),
			detailList: () =>
				import( /*webpackChunkName: 'operation_detail_list'*/ './operation_detail_list'),
		},
		methods: {
			initBtn() {
				let arr = [
					{name: '确认',className: ['fd-yellow'],
						fn: () => {
							delete this.$route.query.id;
							this.$router.push({
								path: '/admin/operation',
								query: this.$route.query
							});
						}
					},
					{name: '打印',className: ['wearhouse all'],
						fn: () => {
							this.printShow = !this.printShow;
							this.$store.commit('setPageTools', []);
						}
					},
				];
				this.$store.commit('setPageTools', arr);
			},
			getDetailObj(obj) {
				this.showCom = obj.showCom; //打印的时候 是否展示详细内容
			},
			getEmit() { //获取打印传值
				this.printShow = false;
				this.initBtn();
			},
			setGoodsList(arr) { //出货-设置商品列表-方便打印
				let goodList = utils.deepCopy(arr);
				for(let i in goodList) {
					let item = goodList[i];
					item.serialNumCus = Number(i) + 1; //序号
					item.typeNameCus = item.type == 0 ? '普通商品' : '称重商品'; //商品类型
					item.outGoodsNumCus = item.num + item.unit; //重量/数量
					for(let n in item.batchInfo) {
						let detail = item.batchInfo[n];
						detail.serialNumCus = '批次 ' + (Number(n) + 1); //序号
						detail.timeCus = this.timeConversion(detail.productionTime); //出货时间
						detail.priceAndName = detail.purchasePrice + '元/' + item.unit; //进价
						detail.outGoodsNumCus = detail.num + item.unit; //重量/数量
					}
				}
				return goodList;
			},
			setMaterialList(arr) { //出货-设置物料列表-方便打印
				let materialList = utils.deepCopy(arr);
				for(let i in materialList) {
					let item = materialList[i];
					let cateArr = [];
					for(let cate of item.cateData) {
						cateArr.push(cate.name);
					}
					item.serialNumCus = Number(i) + 1; //序号
					item.cateCus = cateArr.join(','); //物料分类
					item.outMatNumCus = this.setUnit(item.unitData, item.num, item.selectUnitName); //重量 数量
					item.matType = this.matTypeHash[item.type];
					for(let n in item.batchInfo) {
						let detail = item.batchInfo[n];
						detail.serialNumCus = '批次 ' + (Number(n) + 1); //序号
						detail.timeCus = this.timeConversion(detail.productionTime); //出货时间
						detail.priceAndName = detail.purchasePrice + '元/' + this.getUnitName(item.unitData,detail.purchaseUnit); //进价
						detail.outMatNumCus = this.setUnit(item.unitData, detail.num, item.selectUnitName); //重量/数量
						if(this.isBrand) detail.distributionStr = detail.distributionPrice +'元/'+ this.getUnitName(item.unitData,detail.distributionUnit);//分销价
					}
				}
				return materialList;
			},
			getUnitName(unit,id){//获取单位名称
				for(let item of unit){
					if(item.muId==id){
						return item.name;
					}
				}
			},
			setUnit(unit, num, name) { //换算成出货单位
				let res = 0;
				for(let item of unit) {
					if(item.name == name) {
						res = Number(num) / Number(item.value) + name;
					}
				}
				return res;
			},
			listClick(index) { //列表点击事件 用于获取操作的列表index
				this.listIndex = index;
			},
			openInfo() { //详细-简洁
				this.showCom = !this.showCom;
			},
			timeConversion(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd');
			},
			unitCon(item, key) {
				let min = '';
				for(let unit of item.unitData) {
					if(unit.isMin == 1) {
						min = unit.name;
					}
				}
				return global.comUnit(
					item.num,
					item.unitData[key].value,
					item.unitData[key].name,
					min
				);
			},
			unitDetail(item, key, num) {
				let min = '';
				for(let unit of item.unitData) {
					if(unit.isMin == 1) {
						min = unit.name;
					}
				}
				return global.comUnit(
					num,
					item.unitData[key].value,
					item.unitData[key].name,
					min
				);
			}
		}
	};
</script>
<style scoped lang='less'>
	#output-shipper {
		position: relative;
		overflow: auto;
		.color-size {
			color: #333;
			font-size: 16px;
		}
		.head {
			padding-left: 15px;
			height: 30px;
			border-left: 2px solid #28a8e0;
			font-size: 16px;
			line-height: 30px;
			color: #333;
			&:after {
				content: '';
				display: inline-block;
				width: 535px;
				margin-left: 25px;
				border: 1px dashed #ccc;
				position: relative;
				top: -5px;
			}
		}
		.detail {
			padding-left: 45px;
			padding-top: 25px;
			.list {
				font-size: 16px;
				color: #333;
				div {
					margin-bottom: 15px;
					line-height: 1.5;
					display: inline-block;
					.color-size;
					width: 400px;
					padding-right: 20px;
				}
			}
		}
		.chooseBtn {
			margin-top: 10px;
			width: 240px;
			height: 34px;
			cursor: pointer;
			li {
				width: 50%;
				height: 100%;
				text-align: center;
				line-height: 34px;
				color: #fe8d01;
				border: 1px solid #fe8d01;
				float: left;
			}
			.select {
				background: #fe8d01;
				color: #ffffff;
			}
		}
		.table {
			border: 1px solid #ccc;
			width: 100%;
			margin-top: 10px;
			.scroll-box {
				overflow: auto;
			}
			.table-head {
				padding-left: 20px;
				height: 46px;
				line-height: 46px;
				em {
					color: #fe8d01;
					display: inline-block;
					padding: 0 3px;
				}
				.color-size;
				.detail-toggle {
					color: #28a8e0;
					margin-left: 20px;
					font-size: 16px;
					text-decoration: underline #28a8e0;
					cursor: pointer;
				}
				.circle {
					display: inline-block;
					width: 4px;
					height: 4px;
					border: 1px solid #333;
					border-radius: 50%;
					margin: 0 15px;
					background-color: #333;
					vertical-align: middle;
					margin-top: -4px;
				}
			}
			.table-li {
				float: left;
				list-style: none;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.table-title {
				min-width: 1200px;
				height: 40px;
				background-color: #f2f2f2;
				line-height: 40px;
				overflow: hidden;
				li {
					height: 40px;
					.table-li;
					.color-size;
					width: 22.5%;
					&:first-child {
						width: 10%;
					}
				}
			}
			.table-body {
				min-width: 1200px;
				.table-item {
					border-bottom: 2px solid #f7f7f7;
					&:last-child {
						border-bottom: 0;
					}
				}
				.one-item {
					overflow: hidden;
				}
				li {
					.table-li;
					height: 70px;
					line-height: 70px;
					color: #666;
					font-size: 14px;
					width: 22.5%;
					&:first-child {
						width: 10%;
					}
				}
				.small-table {
					.small-head,
					.small-body {
						overflow: hidden;
						height: 30px;
						padding-left: 5%;
						span {
							color: #999;
							font-size: 16px;
							float: left;
							height: 30px;
							line-height: 30px;
							width: 15%;
							text-align: center;
							&:first-child {
								width: 10%;
							}
						}
					}
					.small-body span {
						font-size: 14px;
						height: 30px;
						line-height: 30px;
					}
				}
			}
		}
	}
</style>
