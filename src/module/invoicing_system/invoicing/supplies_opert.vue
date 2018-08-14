/* * @Author: zhouzhe * @Date: 2018-05-07 17:57:50 */

<template>
	<div style="margin-top:20px">
		<div class="serBox">
			<h1>操作时间：</h1>
			<div class="timer">
				<calendar :only="false" :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
			</div>
			<div class="timer">
				<calendar :only="false" :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
			</div>

			<div style="display:inline-block;margin:0 10px">
				<select-btn :sorts="typeList" :name="allGoods" @selOn="selectList" ref="select"></select-btn>
				<!-- <el-select v-model="type" placeholder="全部操作类型">
					<el-option v-for="item in typeList" :key="item.type" :label="item.typeName" :value="item.type"></el-option>
				</el-select> -->
			</div>
			<div class="setSpeen">
				<input type="text" class="search-input" v-model="createUser" placeholder="请输入操作人">
				<a @click="searchReset" href="javascript:void(0);" class="gray" style="width: 100px;height: 40px;line-height: 40px;margin-right: 8px;">重置</a>
				<a @click="searchList" href="javascript:void(0);" class="blue" style="width: 100px;height: 40px;line-height: 40px;">筛选</a>
			</div>
		</div>
		<section class="listBox" style="width:100%;height:auto;margin-top: 20px;">
			<div class="listTitle">
				<p>操作记录列表
					<span>·</span>共
					<strong>{{numTotle}}</strong>个条目</p>
			</div>
			<div class="homeTitle batchTitle">
				<ul style="width: 100%;float: left;">
					<li>操作</li>
					<li>日期</li>
					<li>操作类型</li>
					<li>操作前数量/重量</li>
					<li>数量/重量变化</li>
					<li>操作后数量/重量</li>
					<li>操作人</li>
				</ul>
			</div>
			<!--列表内容 list-->
			<div class="homeList batchTitle" v-if="dataList.length > 0">
				<ol v-for="(item,index) in dataList" :key="index">
					<li>
						<a href="javascript:void(0);" @click="showDetail(item)" style="color:#5ebee8;">查看详情</a>
					</li>
					<li>{{changTime(item.createTime)||"--"}}</li>
					<li><strong v-for="(u,i) in typeData" :key="i" v-if="u.type==item.type">{{u.typeName}}</strong></li>
					<li v-if="item.createBefore&&Number(item.createBefore)!=0&&item.type!=5&&isDefault">{{comUnit(item.createBefore,isDefault.value,isDefault.name,isMin.name)}}</li>
					<li v-else>--</li>
					<li v-if="item.createChange&&Number(item.createChange)!=0&&item.type!=5&&isDefault">{{comUnit(item.createChange,isDefault.value,isDefault.name,isMin.name)}}</li>
					<li v-else>--</li>
					<li v-if="item.createAfter&&Number(item.createAfter)!=0&&item.type!=5&&isDefault">{{comUnit(item.createAfter,isDefault.value,isDefault.name,isMin.name)}}</li>
					<li v-else>--</li>
					<li>{{item.createUser||"--"}}</li>
				</ol>
			</div>
			<!--列表表尾 标题--请求不到后台数据时不显示-->
			<div v-if="dataList.length == 0" id="emptyData">目前没有显示数据</div>
		</section>
		<div style="margin-top:10px;padding-bottom:30px;">
			<page-btn :total="pageTotal" :isNoJump="false" :isNoPaging='true' :page="page" @pageNum="changePage" ref="pageTurn"></page-btn>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';
	let currentShop = storage.session('userShop').currentShop;
	export default {
		data() {
			return {
				startTime: utils.getTime({
					time: new Date()
				}).start,
				endTime: utils.getTime({
					time: new Date()
				}).end,
				typeList: ['全部操作类型'],
				allGoods: '全部操作类型',
				type: 0,
				dataList: '',
				createTime: '',
				numTotle: 0,
				pageTotal: 1,
				page: 1,
				num: 10,
				createUser: '',
				shopType: currentShop.ischain == 0 ? 0 : 1,
				postInfo: {},
				showDetailsPage: false,
				isDefault: '',
				isMin: '',
				typeData:''
			};
		},
		props: ['mid', 'unit'],
		methods: {
			async init() {
				let data = await http.invoic_getLogList({
					data: {
						startTime: this.startTime / 1000,
						endTime: this.endTime / 1000,
						createUser: this.createUser,
						type: this.type == 0 ? [] : [this.type],
						page: this.page,
						pageSize: 10,
						shopType: this.shopType,
						mid: this.mid
					}
				});
				this.dataList = data.list;
				this.pageTotal = data.allPage;
				this.numTotle = data.pageSize;
				this.isDefault = this.getdefUnit(this.unit, 1);
				this.isMin = this.getdefUnit(this.unit, 0);
				// this.pageTotal = Math.ceil(this.dataList.length / this.num);
			},
			async getType() {
				let data = await http.invoic_getType();
				storage.session('operttypeList',data);
				this.typeData = data;
				for (let i in data) {
					this.typeList.push(data[i].typeName);
				}
			},
			getdefUnit(arr, type) {
				//获取默认单位,最小单位
				let key = type == 1 ? 'isDefault' : 'isMin';
				for (let i in arr) {
					if (arr[i][key] == 1) {
						return arr[i];
					}
				}
			},
			changTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
			},
			startTimeChange(time) {
				this.startTime = utils.getTime({
					time: time
				}).start;
			},
			endTimeChange(time) {
				this.endTime = utils.getTime({
					time: time
				}).end;
			},
			selectList(index) {
				this.type = index;
			},
			searchReset() {
				this.page = 1;
				this.$refs.select.sortName = '全部操作类型';
				this.$refs.select.selected = 0;
				this.type = 0;
				this.createUser = '';
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = utils.getTime({
					time: new Date()
				}).end;
				this.init();
			},
			searchList() {
				this.page = 1;
				this.init();
			},
			changePage: function (currentPage) {
				this.page = currentPage.page;
				this.init();
			},
			showDetail(item) {
				this.postInfo = item;
				let obj = {
					id: this.$route.query.id,
					tid: this.postInfo.id,
					mid: this.postInfo.objId,
					type: this.postInfo.type,
					time:this.postInfo.createTime
				};
				this.$router.push({
					path: '/admin/inventoryManagement/publicDetails',
					query: obj
				});
			},
			//单位换算
			comUnit(...argus) {
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number, value, showName, minName, type] = argus;
				return global.comUnit(number, value, showName, minName, type);
			}
		},
		mounted() {
			this.init();
			this.getType();
		},
		components: {
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		}
	};
</script>
<style lang="less" scoped>
	@media only screen and (max-width:1360px) {
		.setSpeen {
			margin-top: 10px;
			display: block !important;
		}
	}

	.setSpeen {
		display: inline-block;
	}

	.homeTitle {
		background: #e6e6e6;
		overflow: hidden;
		line-height: 50px;
	}

	.homeList {
		line-height: 50px;
		color: #7F7F7F;
	}

	.homeList ol {
		overflow: hidden;
		border-bottom: 1px solid #f2f2f2;
		&:last-child {
			border-bottom: none;
		}
	}

	.homeList ol li {
		overflow: hidden;
		float: left;
		width: 8%;
		height: 50px;
		text-align: center;
		font-size: 12px;
	}

	.homeTitle ul li {
		overflow: hidden;
		float: left;
		width: 8%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 12px;
	}

	li {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.batchTitle ol li,
	.batchTitle ul li {
		width: 14%;
	}


	.infoDetail {
		display: inline-block;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		text-align: center;
	}

	.tebBox {
		display: inline-block;
		border: 1px orange solid;
		color: orange;
		cursor: pointer;
		li {
			display: inline-block;
			padding: 10px 30px;
		}
		.active {
			background-color: orange;
			color: #ffffff;
		}
	}

	.listBox {
		border: 1px #ccc solid;
		.listTitle {
			padding: 15px 20px;
			p {
				span {
					display: inline-block;
					padding: 0 10px;
					font-size: 30px;
					line-height: 0px;
					position: relative;
					top: 5px;
				}
				strong {
					color: red;
				}
			}
		}
	}

	.serBox {
		h1 {
			display: inline-block;
			line-height: 42px;
		}
		.timer {
			display: inline-block;
			width: 200px;
			margin-left: 10px;
		}
		.search-input {
			height: 40px;
			color: #a5a5a5;
			font-size: 14px;
			line-height: 40px;
			text-indent: 15px;
			padding: 0;
			outline: none;
			margin-right: 15px;
		}
	}

	#emptyData {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		line-height: 50px;
		color: orange;
	}
</style>