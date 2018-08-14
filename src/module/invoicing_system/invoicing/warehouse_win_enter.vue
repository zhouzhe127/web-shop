

<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'" :ok="btnOK" :cancel="btnCancel">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props">
			<div id="house">
				<div class="sousuo">
					<input type="text" placeholder="输入仓库名称/区域" v-model="searchText" />
					<el-button type="success" @click="chooseText">筛选</el-button>
  					<el-button type="info" @click="clearText">重置</el-button>
				</div>
				<div>
					<section>
						<template v-for="(item,i) in searchList">
							<span class="sel" v-bind:class="{'on':homeSel == i}" @click="changeHome(i,item)" :key="i">{{item.name}}</span>
						</template>
					</section>
					<div class="dian"></div>
					<section class="comList area-box">
						<mul-select @selOn="wareChange" :styles="{backgroundColor: '#F1F1F1',minWidth:'100px',padding: '0 15px',borderRadius:'3px',marginRight: '8px'}"
						    :list="selectHomes" :name="keyName" :isradio="true" :selects="selWare" :keys="'id'"></mul-select>
					</section>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				btnOK:{
					content:'确定',
					style:'background-color:#ff9800'
				},
				btnCancel:{
					content:'取消',
					style:'background-color:#a0a0a0'
				},
				width: 800,
				height: 400,
				searchText: '',
				homeList: [],
				homeSel: -1, //选中的仓库位置
				selectHomes: [],
				selWare: [],
				chooseWare: '',
				searchList: [],
				homeItem: '',
				keyName: 'areaName',
				theShopId: '',
			};
		},
		props: {
			title:{
				type:String,
				default:'选择仓库-区域'
			},
			wid:{
				type:String,
				default:''
			},
			areaId:{
				type:String,
				default:''
			},
			shopId:{
				type:String,
				default:'0'
			},
			isBrand:{
				type:Boolean,
				default: false,
			},
		},
		methods: {
			async init() {
				let data = await http.warehouseList({
					data: {
						shopId: this.shopId,
					}
				});
				this.homeList = data;
				if (this.isBrand) {
					this.homeList = this.filtrate('brandId', this.shopId);
				} else {
					this.homeList = this.filtrate('shopId', this.shopId);
				}
				this.$nextTick(() => {
					if (this.wid) {
						for (let i in this.homeList) {
							if (this.homeList[i].id == this.wid) {
								this.homeSel = i;
								this.homeItem = this.homeList[i];
								this.selectHomes = this.homeList[i].area;
							}
						}
					}
					if (this.areaId) {
						this.selWare = [this.areaId];
					}
				});
				this.searchList = utils.deepCopy(this.homeList);
				this.renewal();
			},
			filtrate(idName, sid) {
				let arr = [];
				if (idName == 'brandId') {
					for (let item of this.homeList) {
						if (item[idName] == sid && item.owner.split(',')[1] == 0) {
							arr.push(item);
						}
					}
				} else if (idName == 'shopId') {
					for (let item of this.homeList) {
						if (item[idName] == sid) {
							arr.push(item);
						}
					}
				}
				return arr;
			},
			renewal() {
				if (this.searchList[0]) {
					this.selectHomes = this.searchList[0].area;
				} else {
					this.selectHomes = [];
				}
			},
			winEvent(str) {
				if (str == 'ok') {
					if(!this.homeItem.id){
						this.$message({message: '请选择仓库!',type: 'error'});
						return;
					}
					if (!this.selWare.length) {
						this.$message({message: '请选择区域!',type: 'error'});
						return;
					}
					let obj = {
						wid: this.homeItem.id,
						warehouse: this.homeItem.name,
						areaId: this.chooseWare.id,
						wArea: this.chooseWare.areaName,
					};
					this.$emit('wareEvent', str, obj);
				} else {
					this.$emit('wareEvent', str);
				}

				this.searchText = '';
			},
			clearText() {
				this.searchText = '';
				if (this.wid) {
					for (let i in this.homeList) {
						if (this.homeList[i].id == this.wid) {
							this.homeSel = i;
							this.homeItem = this.homeList[i];
							this.selectHomes = this.homeList[i].area;
						}
					}
				}else{
					this.homeSel = -1;
					this.selectHomes = [];
				}
				if (this.areaId) {
					this.selWare = [this.areaId];
				}else{
					this.selWare = [];
				}
			},
			chooseText() {
				let fristIndex = [];
				if (this.searchText && this.searchText != '') {
					this.searchList = [];
					for (let item of utils.deepCopy(this.homeList)) {
						let fristList = [];
						let sec = false;
						if (item.name.indexOf(this.searchText) > -1) {
							fristIndex.push(item);
							sec = true;
						} else if (item.area && !sec) {
							for (let child of item.area) {
								if (child[this.keyName].indexOf(this.searchText) > -1) {
									sec = true;
									fristIndex.push(item);
									fristList.push(child);
								}
							}
						}
						if (sec) {
							if (fristList.length > 0) item.area = fristList;
							this.searchList.push(item);
						}
					}
					this.renewal();
				}
			},
			changeHome(index, item) {
				this.homeSel = index;
				this.homeItem = item;
				this.selectHomes = item.area;
				this.selWare = [];
			},
			wareChange(arr) {
				this.selWare = arr;
				this.chooseWare = this.selectHomes[arr[0]];
				for (let item of this.selectHomes) {
					if (item.id == arr[0]) {
						this.chooseWare = item;
					}
				}
			},
		},
		mounted() {
			this.init();
		},
		components: {
			mulSelect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')

		}
	};
</script>
<style lang="less" scoped>
	#house {
		padding: 20px;
		section{width: 100%;}
		.sousuo {
			input {
				width: 180px;
				height: 40px;
				display: inline-block;
				margin-bottom: 20px;
				padding: 0 10px;
				margin-right: 20px;
				border-radius: 4px
			}
			.res {
				width: 100px;
				height: 40px;
				border: 1px solid #cccccc;
				text-align: center;
				line-height: 40px;
				margin-left: 30px;
				font-size: 15px;
				color: #cccccc;
				float: left;
				cursor: pointer;
			}
			.choose {
				width: 100px;
				height: 40px;
				background: #00bfff;
				text-align: center;
				line-height: 40px;
				margin-left: 10px;
				font-size: 15px;
				color: #fff;
				float: left;
				cursor: pointer;
			}
		}
		.sel {
			display: inline-block;
			height: 40px;
			padding: 0 20px;
			min-width: 100px;
			font-size: 16px;
			background: #f2f2f2;
			border-radius: 3px;
			text-align: center;
			line-height: 40px;
			cursor: pointer;
			margin-right: 10px;
			margin-bottom: 10px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.on {
			background: #28a8e0;
			color: #fff;
		}
		.dian {
			height: 1px;
			border-top: 1px dashed #E1E1E1;
			margin: 30px 5px;
			width: 100%;
		}
	}
</style>