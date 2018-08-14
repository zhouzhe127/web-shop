/* * @Author: zhouzhe * @Date: 2018-05-07 17:57:26 */

<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props">
			<div id="house">
				<div class="sousuo">
					<input type="text" :placeholder="`输入${areName[wareType]}名称/区域`" v-model="searchText" />
					<div class="res" @click="clearText">重置</div>
					<div class="choose" @click="chooseText">筛选</div>
				</div>
				<div>
					<section class="fl" style="width: 100%;padding:10px 80px;">
						<template v-for="(item,i) in searchList">
							<span class="sel" v-bind:class="{'on':homeSel == i}" @click="changeHome(i,item,item.id)" :key="i">{{item.name}}</span>
						</template>
					</section>
					<div class="dian" v-for="i in 45" :key="i"></div>
					<section class="comList" v-if="selectHomes&&selectHomes.length>0" style="width: 100%;padding:10px 80px;">
						<mul-select @selOn="wareChange" :styles="{backgroundColor: '#F1F1F1',width:'180px',borderRadius:'3px',marginRight: '8px'}"
						    :list="selectHomes" :name="keyName" :isradio="true" :selects="selWare" :keys="'id'"></mul-select>
					</section>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				width: 980,
				height: 400,
				searchText: '',
				homeList: [],
				homeSel: 0, //选中的仓库位置
				homeId: '',
				selectHomes: '',
				selWare: [],
				chooseWare: '',
				searchList: [],
				homeItem: '',
				keyName: this.wareType == 1 ? 'name' : 'areaName',
				areName: ['仓库', '货架'],
				ischain: storage.session('userShop').currentShop.ischain,
				shopId: storage.session('shopId'),
				brandId: storage.session('userShop').currentShop.brandId
			};
		},
		props: ['title', 'wareType', 'goodsWid', 'goodsareaId'],
		methods: {
			async init() {
				let name = this.wareType == 1 ? 'getShelvesList' : 'warehouseList';
				let data = await http[name]();
				this.homeList = data;
				if (!this.wareType) {
					if (this.ischain != 3) {
						this.homeList = this.filtrate('shopId', this.shopId);
					} else {
						this.homeList = this.filtrate('shopId', 0);
					}
				}
				if (this.goodsWid) {
					for (let item of this.homeList) {
						if (item.id == this.goodsWid) {
							this.homeList = [item];
						}
					}
				}
				this.searchList = utils.deepCopy(this.homeList);
				this.renewal();   
			},
			filtrate(idName, sid) {
				let arr = [];
				for (let item of this.homeList) {
					if (Number(item[idName]) === Number(sid)) {
						arr.push(item);
					}
				}
				return arr;
			},
			renewal() {
				if (this.searchList[0]) {
					this.selectHomes = this.searchList[0].area;
					this.homeId = this.searchList[0].id;
				} else {
					this.selectHomes = [];
				}

			},
			winEvent(str) {
				this.$emit('wareEvent', str);
				this.searchText = '';
			},
			clearText() {
				this.searchText = '';
				this.homeSel = 0;
				this.searchList = utils.deepCopy(this.homeList);
				this.renewal();
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
			changeHome(index, item, id) {
				this.homeSel = index;
				this.homeId = id;
				this.homeItem = item;
				this.selectHomes = item.area;
				this.chooseWare = '';
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
			}
		},
		mounted: function () {
			this.shopId = storage.session('itemId');
			if (this.goodsareaId) {
				this.selWare.push(this.goodsareaId);
			}
			this.init();
		},
		watch: {
			goodsareaId() {
				this.selWare.push(this.goodsareaId);
			}
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
		.sousuo {
			input {
				width: 180px;
				height: 40px;
				float: left;
				margin-left: 80px;
				margin-bottom: 20px;
				padding-left: 15px;
				&::-webkit-input-placeholder {
					padding-left: 5px;
				}
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
			width: 180px;
			height: 40px;
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
		.selectbtns span {
			display: inline-block;
			width: 180px;
			height: 40px;
			line-height: 40px;
			margin-right: 9px;
			margin-bottom: 10px;
			border-radius: 3px;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			background-color: #f2f2f2;
		}
		.dian {
			width: 10px;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			margin: 20px 5px;
			float: left;
		}
		.selectbtns {
			width: 100%;
		}

	}

	.selectbtns span {
		width: 180px;
		height: 40px;
	}
</style>