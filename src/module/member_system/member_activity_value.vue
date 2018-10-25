<template>
	<section id="member_avtivity_value">
		<div class="instructions">
			<p> 活跃值使用说明：</p>
			<p> 1.活跃值计算下取整，且为正整数。</p>
			<p> 2.手动调整用户等级，用户活跃值从调整后的等级，0活跃度开始。</p>
		</div>
		<div class='heade-title'>
			基础设置
		</div>
		<div class="Annual-zero">
			<section style='clear: both;'>
				<label class='commodity-name fl'>年度清零</label>
				<div class="pic">
					<!-- <el-radio v-model="clearZero" label="1" border>关闭</el-radio>
					<el-radio v-model="clearZero" label="2" border>开启</el-radio>  -->
					<el-radio-group v-model="clearZeroName">
						<el-radio v-for="(item,index) in clearZeroList" :key="index" :label="item.name" border @change.native="clearZeroPic(item)"></el-radio>
					</el-radio-group>
				</div>
			</section>
		</div>
		<div class="zero-time">
			<section style='clear: both;'>
				<div class='required' style='display:block;float:left;width:70px;line-height: 40px;margin-left:100px; margin-bottom:20px;'>清除时间</div>
				<el-date-picker v-model="expirationTime" type="date" placeholder="选择日期">
				</el-date-picker>
			</section>
		</div>
		<div class="activityBtn">
			<section style='clear: both;'>
				<div class="box" style='width:140px;margin-left:40px;'>降低活跃度规则</div>
				<div class="pic">
					<!-- <el-radio v-model="isReduce" label="1" border>关闭</el-radio>
					<el-radio v-model="isReduce" label="2" border>开启</el-radio>  -->
					<el-radio-group v-model="isReduceName">
						<el-radio v-for="(item,index) in isReduceList" :key="index" :label="item.name" border @change.native="isReducePic(item)"></el-radio>
					</el-radio-group>
				</div>
			</section>
		</div>
		<div class="reduce" style='display:block;float:left;width:100%;line-height:40px;margin-left:140px;margin-bottom:20px;'>
			<span>用户在&nbsp;<el-input v-model="days" placeholder="请输入数字1~99" maxlength="2" style='width:135px'></el-input>&nbsp;
				天之内，没有消费行为。降低&nbsp;<el-input v-model="reduceActive" placeholder="请输入数字1~99" style='width:135px' maxlength="2"></el-input>&nbsp;活跃度</span>
		</div>
		<div class='heade-title' style="clear:both;">
			活跃值设置
		</div>
		<!-- 储值比例 -->
		<div class="storageBtn">
			<div class="box" style='width:100px;margin-left:120px;'>储值比例</div>
			<div class="pic">
				<!-- <el-radio v-model="isStored" label="1" border>关闭</el-radio>
				<el-radio v-model="isStored" label="2" border>开启</el-radio>  -->
				<el-radio-group v-model="isStoredName">
					<el-radio v-for="(item,index) in isStoredList" :key="index" :label="item.name" border @change.native="isStoredPic(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="storageBtn">
			<div class="box" style='width:70px;margin-left:140px;'>比例设置</div>
			<el-input type='text' maxlength='4' v-model='storedAmount' placeholder='请输入实付金额' style="width:130px"></el-input>
			<i>&nbsp;：</i>
			<el-input type='text' maxlength='4' v-model='storeActive' placeholder='请输入活跃值' style="width:130px"></el-input>
		</div>
		<!-- 用户消费 -->
		<div class="useBtn">
			<div class="box" style='width:100px;margin-left:120px;'>用户消费</div>
			<div class="pic">
				<!-- <el-radio v-model="isConsumption" label="1" border>关闭</el-radio>
				<el-radio v-model="isConsumption" label="2" border>开启</el-radio>  -->
				<el-radio-group v-model="isConsumptionName">
					<el-radio v-for="(item,index) in isConsumptionList" :key="index" :label="item.name" border @change.native="isConsumptionPic(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="useBtn">
			<div class="box" style='width:70px;margin-left:140px;'>比例设置</div>
			<el-input type='text' maxlength='4' v-model='consumptionAmount' placeholder='请输入实付金额' style="width:130px"></el-input>
			<i>&nbsp;：</i>
			<el-input type='text' maxlength='4' v-model='consumptionActive' placeholder='请输入活跃值' style="width:130px"></el-input>
		</div>
		<!-- 积分商城 -->
		<div class="integralBtn">
			<div class="box" style='width:100px;margin-left:120px;'>积分商城</div>
			<div class="pic">
				<!-- <el-radio v-model="integralMallActive" label="1" border>关闭</el-radio>
				<el-radio v-model="integralMallActive" label="2" border>开启</el-radio>  -->
				<el-radio-group v-model="integralMallActiveName">
					<el-radio v-for="(item,index) in integralMallActiveList" :key="index" :label="item.name" border @change.native="integralMallActivePic(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>

		<div class="integralBtn">
			<div class="box" style='width:150px;margin-left:140px;'>兑换一次积分商城获得</div>
			<!-- <el-input type='text' maxlength='4' v-model='usercash' placeholder='请输入活跃值' style="width:120px"></el-input>   -->
		</div>
		<!-- 任务系统 -->
		<div class="taskBtn">
			<div class="box" style='width:100px;margin-left:120px;'>任务系统</div>
			<div class="pic">
				<!-- <el-radio v-model="taskActive" label="1" border>关闭</el-radio>
				<el-radio v-model="taskActive" label="2" border>开启</el-radio>  -->
				<el-radio-group v-model="taskActiveName">
					<el-radio v-for="(item,index) in taskActiveList" :key="index" :label="item.name" border @change.native="taskActivePic(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="taskBtn">
			<div class="box" style='width:120px;margin-left:140px;'>完成一次任务获得</div>
			<!-- <el-input type='text' maxlength='4' v-model='usercash' placeholder='请输入活跃值' style="width:120px"></el-input>   -->
		</div>
		<!-- 购买指定商品 -->
		<div class="specifyBtn">
			<div class="box" style='width:130px;margin-left:120px;'>购买指定商品</div>
			<div class="pic">
				<!-- <el-radio v-model="useBtn" label="1" border>关闭</el-radio>
				<el-radio v-model="useBtn" label="2" border>开启</el-radio>  -->
				<el-radio-group v-model="goodsBtnName">
					<el-radio v-for="(item,index) in goodsBtnList" :key="index" :label="item.name" border @change.native="goodsBtnPic(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="specifyBtn">
			<div class="box" style='width:70px;margin-left:140px;'>关联商品</div>
			<el-button type="primary" @click="openGoodsWindow" icon="el-icon-plus">关联商品</el-button>
			共关联商品{{getArrLength('selectGoods')}}份，套餐{{getArrLength('selectPackages')}}份
		</div>
		<div class="specifyBtn">
			<div class="box" style='width:100px;margin-left:140px;'>购买商品获得</div>
			<el-input type='text' maxlength='4' v-model='goodsActive' placeholder='请输入活跃值' style="width:120px"></el-input>
		</div>

		<div class='heade-title'>
			会员说明
		</div>
		<div class="textBtn">
			<div class="box" style='display:block;float:left;width:70px;line-height: 40px;margin:20px 0 20px 120px;'>文字说明</div>
			<el-input type="textarea" placeholder="限制200字" style="width:400px;" :rows="10" v-model="activeDesc">
			</el-input>
		</div>
		<el-button style='display:block;float:left;width:90px;margin:20px 160px;' type="primary">保存</el-button>
		<!-- 关联商品的弹窗 -->
		<goodListWin v-if="goodsWin" @goodListWin="closeGoodWin" :goodsIds="selectGoods" :isGoods="true" :packages="selectPackages"
		 :goInName="'isCoupon'"></goodListWin>
	</section>
</template>
<script>
    // import http from 'src/manager/http';
    // import storage from 'src/verdor/storage';
    // import utils from 'src/verdor/utils';
    // import global from 'src/manager/global';

    export default {
    	data() {
    		return {
    			clearZeroList: [{
    				'clearZero': '0',
    				'name': '关闭'
    			}, {
    				'clearZero': '1',
    				'name': '开启'
    			}],
    			clearZeroName: '关闭', //年度清零开关
    			expirationTime: '', //重置时间 
    			days: '', //未消费天数
    			reduceActive: '', //降低活跃度
    			storaged: '', //储值比例  
    			isReduceName: '关闭',
    			isReduceList: [{
    				'isReduce': '0',
    				'name': '关闭'
    			}, {
    				'isReduce': '1',
    				'name': '开启'
    			}], //0关闭 1开启(活跃值是否减少)
    			isStoredName: '关闭',
    			isStoredList: [{
    				'isStored': '0',
    				'name': '关闭'
    			}, {
    				'isStored': '1',
    				'name': '开启'
    			}], //0关闭 1开启 默认开启（存储比例）
    			storedAmount: '', //储值金额
    			storeActive: '', //储值增加活跃度
    			isConsumptionName: '关闭',
    			isConsumptionList: [{
    				'isConsumption': '0',
    				'name': '关闭'
    			}, {
    				'isConsumption': '1',
    				'name': '开启'
    			}], //0关闭 1开启（是否消费）
    			consumptionAmount: '', //消费金额
    			consumptionActive: '', //消费增加活跃度
    			integralMallActiveName: '关闭',
    			integralMallActiveList: [{
    				'integralMallActive': '0',
    				'name': '关闭'
    			}, {
    				'integralMallActive': '1',
    				'name': '开启'
    			}], //积分商城兑换商品 0 关闭 大于0 开启 并增加该值的活跃度
    			taskActiveName: '关闭',
    			taskActiveList: [{
    				'taskActive': '0',
    				'name': '关闭'
    			}, {
    				'taskActive': '1',
    				'name': '开启'
    			}], //任务系统 0 关闭 大于0 开启 并增加该值的活跃度
    			gids: [], //1,2,3,4,5 最多关联 5个商品ID 
    			pids: [], //套餐IDS 1,2,3,4,5 与gids 一起最多关联 5个ID
    			goodsActive: '', //购买指定商品增加活跃值
    			goodsBtnName: '关闭',
    			goodsBtnList: [{
    				'goodsBtn': '0',
    				'name': '关闭'
    			}, {
    				'goodsBtn': '1',
    				'name': '开启'
    			}],
    			activeDesc: '', //说明 max 200 min 0
    			selectGoods: [], //选中的商品中的商品
    			selectPackages: [], //选中的套餐
    			goodsWin: false, // 商品弹框
    		};
    	},
    	methods: {
    		clearZeroPic: function (item) {
    			this.clearZero.index = item.clearZero;
    		},
    		isReducePic: function (item) {
    			this.isReduce.index = item.isReduce;
    		},
    		isStoredPic: function (item) {
    			this.isStored.index = item.isStored;
    		},
    		isConsumptionPic: function (item) {
    			this.isConsumption.index = item.isConsumption;
    		},
    		integralMallActivePic: function (item) {
    			this.integralMallActive.index = item.integralMallActive;
    		},
    		taskActivePic: function (item) {
    			this.taskActive.index = item.taskActive;
    		},
    		goodsBtnPic: function (item) {
    			this.goodsBtn.index = item.goodsBtn;
    		},
    		openGoodsWindow() { //打开关联商品的弹窗
    			if (this.selectShops.length == 0 && this.ischain == '3') {
    				this.valiData('请先选择店铺', '提示信息');
    				return false;
    			}
    			this.goodsWin = true;
    		},
    		closeGoodWin(res, item) { //  关闭商品弹框
    			if (res == 'ok') {
    				if (item.goodArr.length + item.packArr.length > 5) {
    					this.valiData('商品和套餐最多一共只能选择5个', '提示信息');
    					return false;
    				}
    				this.selectGoods = item.goodArr;
    				this.selectPackages = item.packArr;
    			}
    			this.goodsWin = false;
    		},
    		getArrLength(type) { //返回数组的长度
    			return this[type].length;
    		},
    		valiData(content, title = '提示信息', winType = 'alert') {
    			this.$store.commit('setWin', {
    				winType: winType,
    				title: title,
    				content: content
    			});
    		},
    		// async setPointConfig() { 
    		// 	let res = await http.setPointConfig({
    		// 		data: {
    		// 			shopId:this.shopId,
    		// 			token:this.token
    		// 		}
    		// 	}); 
    		// 	this.valiData('保存成功', '提示信息');
    		// },
    		// async updateActiveConf() { //获取信息
    		// 	let res = await http.updateActiveConf({
    		// 		data: {}
    		// 	}); 
    		// },
    	},
    	mounted() {
    		//this.updateActiveConf();
    	},
    	components: {
    		goodListWin: () =>
    			import( /* webpackChunkName:'good_list_win' */ 'src/components/good_list_win'),
    	}
    };
</script>
<style lang="less"> 
	.commodity-name {
		width: 100px;
		height: 40px;
		line-height: 40px;
	}

	.instructions {
		margin: 30px 0 20px 60px;
		font-size: 16px;

		p {
			line-height: 24px;
		}
	}

	.heade-title {
		height: 45px;
		line-height: 45px;
		font-size: 16px;
		text-indent: 10px;
		position: relative;
	}

	.Annual-zero {
		margin-left: 80px;
		font-size: 14px;
		display: inline-block;
		margin-bottom: 20px;
	}

	.pic {
		display: inline-block;
		margin-left: -30px;
	}

	.box {
		display: block;
		float: left;
		line-height: 40px;
		margin-bottom: 20px;
	}

	.activityBtn {
		margin-bottom: 20px;
	}

	.reduce {
		margin-bottom: 20px;
	}

	.storageBtn,
	.useBtn,
	.integralBtn,
	.taskBtn,
	.specifyBtn {
		margin-bottom: 20px;
		margin-left: -30px;

	}

	.picName {
		display: inline-block;
		background: pink;

		input {
			width: 110px;
			height: 42px;
			line-height: 25px;
			padding: 5px;
			margin: 0;
		}
	}

	.textBtn {
		margin-left: -30px;
	}
</style> 