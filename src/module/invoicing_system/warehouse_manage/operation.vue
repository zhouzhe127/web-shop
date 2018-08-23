<!--
    **调度管理
    *
    * 黄一帆
    * *
    *
-->
<template>
    <div class="operation">
        <div class="chooseTime">
            <div class="oprationTime">操作时间：</div> 
            <el-date-picker
				v-model="timeDate"
				type="daterange"
				range-separator="-"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				@change="timeChange">
			</el-date-picker>
        </div>
        <div>
            <div class="block-box" >
            	<div class="inline-box" >
	            	<el-select v-model="dynamic" placeholder="请选择调度状态" @change="getStatus" style="width:200px;">
					    <el-option
							v-for="item in allStatus"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="inline-box" >
					<el-input v-model="receiptNumber" placeholder="请输入调度单号" style="width:200px;"></el-input>
				</div>
                <div class="inline-box" >
                	<el-input v-model="createName" placeholder="请输入操作人" style="width:200px;"></el-input>
                </div>
            </div>
            <div class="block-box" >
	            <div class="inline-box" >
	            	<span>出货仓库：</span>
                    <select-store class="inline-box" @emit="getOutId" :sorts="allWarehouse" :tipName="'请选择仓库'" >
                    </select-store>
	            </div>
	            <div class="inline-box">
	            	<span>入货仓库：</span>
                    <select-store class="inline-box" @emit="getIntoId" :sorts="allWarehouse" :tipName="'请选择仓库'" >
                    </select-store>
	            </div>
	            <div class="inline-box">
	                <el-button @click="searchClick" type="success">筛选</el-button>
	                <el-button @click="resetSearch" type="info">重置</el-button>
	            </div>
            </div>
        </div>
        <!--这是用表单组件更改新页面的部分-->
        <tableCom :listHeight="60" :listName="'调度记录'" :introData="dispatchingRecord" :titleData="titleList" :allTotal="count"
        	:listWidth="1200">
            <div slot="con-0" slot-scope="props" @click="dispatchingDetail" class="table-detail" :data-index="props.index">
                <em v-if="props.data.dynamic != 1" class="detail">查看详情</em>
                <em v-if="props.data.dynamic == 2" class="yellow-btn enter"><i></i>入货</em>
                <em v-if="props.data.dynamic == 1" class="yellow-btn confirm-out">确认出货</em>
            </div>
            <div slot="con-5" slot-scope="props">{{timeConversion(props.data.createTime)}}</div>
        </tableCom>
        <el-pagination @current-change="pageClick" @size-change="sizeChange"
			:current-page="page"
			background
			layout="sizes,total,prev, pager, next"
			:page-sizes="[10, 20, 50]"
			:total="count">
		</el-pagination>
    </div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			isShop: '', //单店品牌
			uid: '', //操作人id
			timeDate:[new Date(Date.parse(new Date())-30*3600*24*1000),new Date()],
			startTime: new Date().setHours(0, 0, 0, 0)-30*3600*24*1000, //开始时间
			endTime: new Date().setHours(23, 59, 59, 0), //结束时间
			receiptNumber: '', //单据编号
			createName: '', //操作人
			allStatus: [
				{value:0,label:'全部调度状态'},
				{value:1,label:'未出货'},
				{value:2,label:'待入货'},
				{value:3,label:'调度中'},
				{value:4,label:'已取消'},
				{value:5,label:'已完成'},
				{value:6,label:'已完成(异常)'},
			], //所有状态
			dynamic: 0, //选择状态的id
			OutboundWarehouse: '全部', //出货仓库
			allWarehouse: [], //所有仓库
			allWarehouseId: '', //所有仓库id
			allWarehouseData: [], //仓库接口信息
			outWarehouse: '', //出库仓库id
			intoWarehouse: '', //入库仓库id
			dispatchingRecord: [], //调度记录列表
			page: 1,
			num: 10,
			total: 1,
			count: 0, //仓库总条数
			titleList: [
				{titleName: '操作',titleStyle: {width: 160 + 'px',}},
				{titleName: '调度状态',titleStyle: {width: 150 + 'px',},dataName: 'dispatchingRecordType'},
				{titleName: '调度单号',dataName: 'receiptNumber'},
				{titleName: '出货仓库',dataName: 'outWname'},
				{titleName: '入货仓库',dataName: 'intoWname'},
				{titleName: '操作时间'},
				{titleName: '操作人',dataName: 'createName'},
			],
			outWareIndex: 0,
			intoWareIndex: 0,
			disType: 1, //调度单状态
			requestObj: {}, //缓存请求参数
		};
	},
	components: {
		calendar: () =>
			import( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		selectStore: () =>
			import( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
		selectBtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		pageElement: () =>
			import( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		tableCom: () =>
			import( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
	},
	mounted() {
		this.initBtn();
		this.getSaveRequest();
		let userData = storage.session('userShop');
		this.isShop = userData.currentShop.ischain != '3' ? '0' : '1';
		this.uid = userData.user.id;
		this.getWarehouse();
		this.selectWarehouseOwner();
	},
	methods: {
		initBtn() {
			let arr = [
				{name: '快速调度',className: 'success',type:5,
					fn: () => {
						this.$router.push({
							path: 'warehouseList/outputStore',
							query: this.$route.query
						});
					}
				}
			];
			this.$store.commit('setPageTools', arr);
		},
		searchClick() { //点击筛选
			this.page = 1;
			this.search();
		},
		pageClick(res) {
			this.page = res;
			if(this.allWarehouseData.length) {
				this.search();
			}
		},
		sizeChange(res){
			this.num = res;
			if(this.allWarehouseData.length) {
				this.search();
			}
		},
		getStatus(res) {
			this.dynamic = res;
		},
		getOutId(arr) { //获取出货仓库id
			this.setWareIdEach(arr, 'outWarehouse');
		},
		getIntoId(arr) { //获取出货仓库id
			this.setWareIdEach(arr, 'intoWarehouse');
		},
		setWareIdEach(arr, name) {
			let strArr = [];
			for(let item of arr) {
				if(item.selected == true) {
					strArr.push(item.id);
				}
			}
			this[name] = strArr.join(',');
		},
		//获取仓库
		async getWarehouse() {
			let res = await http.warehouseList({
				data: {}
			});
			this.allWarehouseData = res;
			let arrObj = [],
				arrId = [];
			for(let item of res) {
				let obj = {
					name: item.name,
					id: item.id,
					selected: true,
				};
				arrObj.push(obj);
				arrId.push(item.id);
			}
			this.allWarehouse = arrObj;
			this.allWarehouseId = arrId.toString();
			this.resWareId(); //重置仓库id集合
			this.totalList = res.length;
			this.search();
		},
		resWareId() {
			this.intoWarehouse = this.allWarehouseId;
			this.outWarehouse = this.allWarehouseId;
		},
		timeChange(res){
			this.startTime = new Date(res[0]).setHours(0,0,0,0);
			this.endTime = new Date(res[1]).setHours(23,59,59,0);
		},
		myAlert(content) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: content,
			});
		},
		async search() { //搜索
			if(!this.allWarehouseData.length) {
				this.myAlert('您还没有仓库，请先新建仓库');
				return;
			}
			if(this.startTime > this.endTime) {
				this.myAlert('开始时间不能大于结束时间');
				return;
			}
			if(!this.outWarehouse) {
				this.myAlert('请选择出货仓库');
				return;
			}
			if(!this.intoWarehouse) {
				this.myAlert('请选择入货仓库');
				return;
			}
			this.requestObj = {
				startTime: parseInt(this.startTime / 1000),
				endTime: parseInt(this.endTime / 1000),
				dynamic: this.dynamic,
				receiptNumber: this.receiptNumber,
				createName: this.createName,
				outWarehouse: this.outWarehouse,
				intoWarehouse: this.intoWarehouse,
				page: this.page,
				num: this.num
			};
			let res = await http.getDispatchRecordList({
				data: this.requestObj
			});
			this.dispatchingRecord = res.list;
			for(let item of this.dispatchingRecord) {
				item.dispatchingRecordType = this.allStatus[Number(item.dynamic)].label;
			}
			this.total = res.totalPage;
			this.count = Number(res.count);
		},
		resWareArr() { //重置选择仓库
			let arr = utils.deepCopy(this.allWarehouse);
			for(let item of this.allWarehouse) {
				item.selected = true;
			}
			this.allWarehouse = arr;
		},
		resetSearch() { //重置
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.dynamic = '';
			this.receiptNumber = '';
			this.createName = '';
			this.resWareArr();
			this.resWareId(); //outWareId intoWarehouse
			this.dynamicIndex = 0;
			this.page = 1;
			this.num = 10;
			this.search();
		},
		dispatchingDetail(event) { //调度记录详情-入货-确认出货
			let target = event.target,
				current = event.currentTarget;
			if(target.tagName.toLocaleLowerCase() == 'em') {
				let index = current.getAttribute('data-index');
				let item = this.dispatchingRecord[index];
				let className = target.className;
				this.$route.query.id = item.id;
				if(className.includes('detail') || className.includes('confirm-out')) { //查看详情
					storage.session('operationRequest', this.requestObj);
					this.$route.query.id = item.id;
					this.$router.push({
						path: '/admin/operation/operationDetail',
						query: this.$route.query
					});
				} else if(className.includes('enter')) { //入货
					storage.session('operationRequest', this.requestObj);
					this.$router.push({
						path: '/admin/operation/enterGoods',
						query: this.$route.query
					});
				}
			}
		},
		getSaveRequest() { //获取缓存的请求参数
			let destroy = storage.session('operationRequestDestroy');
			if(destroy) {
				this.requestObj = storage.session('operationRequest');
				for(let i in this.requestObj) {
					if(i == 'startTime' || i == 'endTime') {
						this[i] = this.requestObj[i] * 1000;
					} else {
						this[i] = this.requestObj[i];
					}
				}
				storage.session('operationRequestDestroy', null);
				storage.session('operationRequest', null);
			}
		},
		confirmMethod(id) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '是否确认出货？',
				ok: {
					content: '是',
				},
				cancel: {
					content: '否',
				},
				callback: (res) => {
					if(res == 'ok') {
						this.confirmShipment(id);
					}
				}
			});
		},
		async confirmShipment(id) { //确认出货
			let res = await http.DispatchrecordConfirmShipment({
				data: {
					id: id,
					uid: this.uid,
				}
			});
			if(res) {
				this.search();
			}
		},
		async selectWarehouseOwner() {
			let data = await http.invoicing_getOwners();
			let arr = [];
			if(data) {
				for(let item of data) {
					let obj = {
						selected: true
					};
					if(item.ischain == 3) { //只有品牌
						obj.id = item.brandId + ',0';
						obj.name = item.brandName;
					} else {
						if(item.brandId) { //品牌-单店
							obj.id = item.brandId + ',' + item.shopId;
							obj.name = item.brandName + '-' + item.shopName;
						} else { //只有单店
							obj.id = '0' + ',' + item.shopId;
							obj.name = item.shopName;
						}
					}
					arr.push(obj);
				}
			}
			this.owner = arr;
			let arr2 = [];
			let arr1 = [];
			if(this.owner) {
				this.owner.forEach((item) => {
					arr1.push(item.id);
					this.ownerArr = JSON.stringify(arr1);
					let obj = {
						id: item.id,
						name: item.name,
						selected: true
					};
					arr2.push(obj);
				});
			}
			this.typeNameArr = arr2;
		},
		timeConversion(time) {
			return utils.format(new Date(Number(time * 1000)), 'yyyy-MM-dd hh:mm:ss');
		},
	},
};
</script>

<style lang='less' scoped>
.operation{
    .oprationTime{width: 80px;height:100%;line-height:40px;font-size:15px;float: left}
    .chooseTime{width: 100%;margin-top: 20px;
        .box{display: inline-block;vertical-align: middle;}
        &:after{content: '';clear: both;zoom: 1;display: block;}
    }
    .block-box{display: inline-block;padding-top: 20px;
        .input{ width: 174px;height: 40px;padding: 0 10px;border: 1px solid #B3B3B3;
            &:focus{outline: none;}
        }
    }
    .inline-box{display: inline-block;margin-right: 10px;
        span{vertical-align: middle;}
        ul{width: 100%;max-height: 200px;margin: 0;position: absolute;
            top: 43px;left: 0;z-index: 10;background: #fff;overflow-y: auto;border-bottom: 1px solid #ccc;
            li{text-align: center;height: 40px;border: 1px #b3b3b3 solid;border-top: 0;background: #fff;cursor: pointer;
                &:hover{background: #F0F0F0;}
            }
        }
        .overdian {
            overflow:hidden;display:block;white-space:nowrap;text-overflow:ellipsis;
        }
        .showTop {height: 40px;width: 150px;display: block;float: left;text-align: center;border-right: 1px #B3B3B3 solid;}
    }
    .search-icon{
        float: left;
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin-right:15px;
        background: url(../../../res/images/search.png)#29A7E1 center center no-repeat;
    }
    .table-detail{color:#29abe2;cursor:pointer;vertical-align: middle;
        em{display: inline-block;height: 59px;line-height: 59px;padding: 0 15px;position: relative;
            i{height: 16px;width: 1px;border-left:1px solid #ccc;display: block;
                position: absolute;left: 0;top: 22px;
            }
        }
        .yellow-btn{color: #ffa627;}
    }
    .buttonBox{width: 90px;height: 40px;line-height: 40px;}
}
</style>
