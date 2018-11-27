<!--
    **过期提醒配置
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="reminder">
		<!-- 优惠券过期提醒 -->
		<div class="set-line">
			<div class="titles">优惠券过期提醒</div>
			<div class="line"></div>
		</div>
		<!-- 过期提醒 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">过期提醒</span>
			<div class="rightHalf">
				<el-switch v-model="overdueStatus" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 推送日期 -->
		<div class="online-box clearfix" v-if="overdueStatus">
			<span class="online-sub fl required">推送日期</span>
			<div class="rightHalf">
				<span class="thetext">提前</span>
				<!-- <el-input class="fl" style="width:auto;margin-right:10px;" v-model="pushdateNum" maxlength="3" placeholder="请输入推送日期" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input> -->
				<el-select v-model="pushdateNum" placeholder="请选择" @change="selpushdate" style="color:#c0c4cc;width: 179px;">
					<el-option v-for="item in pushdateList" :key="item.name" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
				<span style="margin-left:10px;">天,发起过期提醒推送</span>
			</div>
		</div>
		<!-- 推送时间 -->
		<div class="online-box clearfix" v-if="overdueStatus">
			<span class="online-sub fl required">推送时间</span>
			<div class="rightHalf">
				<span style="margin-right:10px;">每日</span>
				<el-select v-model="pushNum" placeholder="请选择" @change="selpushtime" style="color:#c0c4cc;width: 179px;">
					<el-option v-for="item in pushtimeList" :key="item.name" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
				<span style="margin-left:10px;">时,发起过期提醒推送</span>
			</div>
		</div>
		<!-- 保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<el-button type="primary" style="width:190px;" @click="saveConfig">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
export default {
	data() {
		return {
			overdueStatus: false, //优惠券过期提醒状态
			pushdateNum: '1', //推送日期
			pushdateList: [{ //推送日期
				name: '1'
			}, {
				name: '2'
			}, {
				name: '3'
			}, {
				name: '4'
			}, {
				name: '5'
			}, {
				name: '6'
			}, {
				name: '7'
			}],
			pushtimeList: [{ //推送时间
				name: '8',
			}, {
				name: '9'
			}, {
				name: '10'
			}, {
				name: '14'
			}, {
				name: '15'
			}, {
				name: '16'
			}, {
				name: '17'
			}, {
				name: '18'
			}, {
				name: '21'
			}, {
				name: '22'
			}, {
				name: '23'
			}],
			pushNum: '8', //推送时间选中的 也是传给后台的			
		};
	},
	methods: {
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		setTitle: function() { //设置标题
			this.$store.commit('setPageTools', [{
				name: '返回',
				fn: () => {
					this.returnStore();
				},
				className: 'el-btn-blue'
			}]);
		},
		returnStore: function() { //返回
			this.$router.push('/admin/addCoupon');
		},
		selpushtime: function(val) { //推送时间
			this.pushNum = val;
		},
		selpushdate: function(val) { //推送日期
			this.pushdateNum = val;
		},
		saveConfig: function() { //保存配置
			this.couponRemind();
		},
		// checkForm: function() {
		// 	if (this.overdueStatus && (this.pushdateNum > 31 || this.pushdateNum < 1)) {
		// 		this.valiData('请填写推送日期1～31');
		// 		return false;
		// 	}
		// 	return true;
		// },
		async couponRemind() {
			// if (!this.checkForm()) return;
			let advanceTime = 0;
			if (this.overdueStatus) {
				advanceTime = this.pushdateNum + ',' + this.pushNum;
			}
			let res = await http.couponRemind({
				data: {
					advanceTime: advanceTime //提前推送时间
				}
			})
			if (res) {
				this.valiData('保存成功');
				this.returnStore();
			}
		},
		async getPointConfig() { //获取配置
			let res = await http.getPointConfig({});
			if (res) {
				let list = res.list;
				if (list.advanceTime != '0') {
					this.overdueStatus = true;
					let newadvanceTime = list.advanceTime.split(',');
					this.pushdateNum = newadvanceTime[0];
					this.pushNum = newadvanceTime[1];
				}
			}
		}
	},
	mounted() {
		this.getPointConfig(); //获取过期提醒配置
		this.setTitle(); //设置标题
	}
};
</script>
<style type="text/css" scoped>
#reminder {
	max-width: 1400px;
	height: auto;
}

#reminder .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#reminder .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 150px;
	font-size: 16px;
	text-align: left;
}

#reminder .set-line .line {
	display: inline-block;
	width: 800px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#reminder .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#reminder .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#reminder .online-box .rightHalf {
	max-width: 900px;
	min-height: 40px;
	float: left;
	line-height: 40px;
}

#reminder .online-box .rightHalf .thetext {
	line-height: 40px;
	margin-right: 10px;
}
</style>