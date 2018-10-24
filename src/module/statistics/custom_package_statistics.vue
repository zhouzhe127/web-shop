<!--
		**自定义套餐统计
		*
		* 胡江
		* *
		*
-->
<template>
	<section id="c_pack">
		<div class="top">
			<section class="timeS">
				<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="startTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
				</el-date-picker>
				<span style="width: 25px;line-height: 40px;text-align: center;">-</span>
				<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="endTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
				</el-date-picker>
			</section>
			<el-input v-model="packName" placeholder="请输入自定义套餐名称" style="width: 200px;float: left;margin-left: 10px"></el-input>
			<section class="isOpenTime">
				<div v-on:click="selectBusinessHours" :class="['sel',{'active':isOpenTime}]"></div>
				<span style="">按营业时间</span>
			</section>
			<div class="block-div">
				<el-button v-on:click="init()" type="primary">搜索</el-button>
				<el-button v-on:click="reset()" type="info">重置</el-button>
			</div>
		</div>
		<div class="clear"></div>
		<div class="list" ref="content">
			<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="sunList" border>
				<el-table-column show-overflow-tooltip min-width="80" align="center" prop="day" label="天数"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="80" align="center" prop="sumNum" label="销量"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="sumMoney" label="营业额"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="freeNum" label="赠品数量"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="freePrice" label="赠品金额"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="freeProportion" label="赠品金额占比"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="discountPrice" label="商品优惠金额"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="discountProportion" label="商品优惠金额占比"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="商品实收金额"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="priceProportion" label="商品实收金额占比"></el-table-column>
			</el-table>
		</div>
		<div class="list">
			<el-table :data="showList" stripe :header-cell-style="{'background-color':'#f5f7fa'}" border @selection-change="handleSelectionChange" @expand-change="tableC">
				<el-table-column type="selection" :width="55" fixed align="center"></el-table-column>
				<el-table-column type="expand" :width="60" fixed align="center">
					<template slot-scope="props">
						<el-form label-position="center" class="inline_table_hu">
							<template v-for="item in  props.row.goods">
								<el-form-item :label="item.name">
									<span :style="{width:((contentWidth-327)/9-1)+'px'}">{{item.sumNum}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.sumMoney}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.freeNum}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.freePrice}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.freeProportion}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.discountPrice}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.discountProportion}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.price}}</span>
									<span :style="{width:((contentWidth-327)/9-3)+'px'}">{{item.priceProportion}}</span>
								</el-form-item>
							</template>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="套餐名称" prop="name" show-overflow-tooltip :width="200" align="center"></el-table-column>
				<el-table-column label="销量" prop="sumNum" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="营业额" prop="sumMoney" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="赠品数量" prop="freeNum" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="赠品金额" prop="freePrice" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="赠品金额占比" prop="freeProportion" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="商品优惠金额" prop="discountPrice" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="商品优惠金额占比" prop="discountProportion" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="商品实收金额" prop="price" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
				<el-table-column label="商品实收金额占比" prop="priceProportion" show-overflow-tooltip :width="(contentWidth-315)/9" align="center"></el-table-column>
			</el-table>
		</div>
	</section>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(0, 0, 0, 0), //日期组件的结束时间
			packName: '', //套餐名称
			isOpenTime: true, //是否按营业时间

			sunList: [],
			detailedList: [],
			showList: [],

			selList: [], //导出选择的数组

			contentWidth: '',
			timer: null
		};
	},
	created() {
		let arr = [
			{
				name: '导出',
				className: 'pickCheck',
				fn: () => {
					this.exportData();
				}
			}
		];
		this.$store.commit('setPageTools', arr);
		this.$nextTick(() => {
			this.contentWidth = this.$refs.content.clientWidth;
		});
		this.timer = window.setInterval(() => {
			if (
				this.$refs.content.clientWidth > 1120 &&
				this.contentWidth != this.$refs.content.clientWidth
			) {
				this.contentWidth = this.$refs.content.clientWidth;
			}
		}, 100);
		this.init();
	},
	destroyed() {
		window.clearInterval(this.timer);
		this.$store.commit('setPageTools', []);
	},
	methods: {
		//搜索
		async init() {
			let timer = 30 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询一个月时间'
				});
				return false;
			}
			if (this.startTime > this.endTime) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '开始时间不能大于结束时间'
				});
				return false;
			}
			let res = await http.customPackageStatistics({
				data: {
					startTime: this.startTime / 1000,
					endTime: this.endTime / 1000 + 24 * 60 * 60 - 1,
					isOpenTime: Number(this.isOpenTime)
				}
			});
			this.sunList = [];
			this.sunList.push(res.total);
			for (let j = 0; j < res.list.length; j++) {
				res.list[j].open = false;
			}
			this.detailedList = res.list;
			if (this.packName == '') {
				this.showList = this.detailedList;
			} else {
				this.showList = this.detailedList.filter(v => {
					return v.name.includes(this.packName);
				});
			}
		},
		selectBusinessHours() {
			this.isOpenTime = !this.isOpenTime;
		},
		//重置
		reset() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(0, 0, 0, 0);
			this.packName = '';
			this.isOpenTime = true;
			this.init();
		},
		//导出
		async exportData() {
			if (this.selList.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请选择自定义套餐！'
				});
				return false;
			}
			let multipleSelection = [];
			multipleSelection = this.selList.map(v => {
				let arr = {};
				arr.id = v.id;
				arr.click = Number(v.open);
				return arr;
			});
			await http.exportCustomPackageStatistics({
				data: {
					startTime: this.startTime / 1000,
					endTime: this.endTime / 1000 + 24 * 60 * 60 - 1,
					isOpenTime: Number(this.isOpenTime),
					packageList: multipleSelection
				}
			});
		},
		tableC(item) {
			for (let i = 0; i < this.showList.length; i++) {
				if (this.showList[i].id == item.id) {
					this.showList[i].open = !this.showList[i].open;
				}
			}
		},
		//全选
		handleSelectionChange(val) {
			this.selList = val;
		}
	}
};
</script>
<style>
.inline_table_hu .el-form-item__label {
	width: 200px;
	text-align: center;
	padding: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
<style lang="less" scoped>
#c_pack {
	.timeS {
		float: left;
	}
	.isOpenTime {
		line-height: 40px;
		margin-right: 10px;
		float: left;
		.sel {
			width: 20px;
			height: 20px;
			cursor: pointer;
			border: 1px solid #e1bb4a;
			margin: 10px 10px;
			float: left;
		}
		span {
			font-size: 16px;
			color: #909399;
		}
		.active {
			background: url(../../res/icon/selected.png) center center no-repeat,
				#e1bb4a;
		}
	}
	.block-div {
		float: left;
		margin: 0 10px;
	}
	.clear {
		height: 20px;
		clear: both;
	}
	.list {
		margin-bottom: 20px;
		.inline_table_hu {
			font-size: 0;
		}
		.inline_table_hu label {
			width: 200px;
			text-align: center;
			color: #99a9bf;
		}
		.inline_table_hu .el-form-item {
			margin-left: 65px;
			margin-right: 0;
			margin-bottom: 0;
			width: 100%;
			span {
				/*width: 100px;*/
				text-align: center;
				display: inline-block;
			}
		}
	}
}
</style>