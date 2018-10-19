<!--
    **模版切换
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="switching">
		<!-- 点单模版切换 -->
		<div class="set-line">
			<div class="titles">点单模版切换</div>
			<div class="line"></div>
		</div>
		<!-- 在线点单模版选择 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">在线点单模版选择</span>
			<span class="freeFix" style="margin-right: 14px;" v-for="(item,index) in integralList" :key="index" v-bind:class="{'presentActive':integralOn == index }" @click="chooseIntegral('1',index)">{{item.name}}</span>
            <!-- <el-radio-group v-model="integralName" class="fl"  style="margin-right: 14px;">
				<el-radio v-for="(item,index) in integralList" :key="index" :label="item.name" border @change.native="chooseIntegral('1',index)"></el-radio>
			</el-radio-group> -->
        </div>
		<!-- 自助点单模版选择 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">自助点单模版选择</span>
			<span class="freeFix" style="margin-right: 14px;" v-for="(item,index) in integralList" :key="index" v-bind:class="{'presentActive':integralOff == index }" @click="chooseIntegral('2',index)">{{item.name}}</span>
             <!-- <el-radio-group v-model="integralName" class="fl"  style="margin-right: 14px;">
				<el-radio v-for="(item,index) in integralList" :key="index" :label="item.name" border @change.native="chooseIntegral('2',index)"></el-radio>
			</el-radio-group> -->
        </div>
		<!-- 模版展示 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">模版展示</span>
			<div class="rightHalf fl">
				<section>
					<div class="img img1"></div>
					<div class="name">横版风格</div>
				</section>
				<section>
					<div class="img img2"></div>
					<div class="name">竖版风格</div>
				</section>
			</div>
		</div>
		<!-- 保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<!-- <a href="javascript:void(0);" class="yellow fl" style="width: 200px;" @click="saveConfig()">保存</a> -->
		    <el-button type="primary" class="yellow fl" @click="saveConfig()" style="width: 200px;">保存</el-button> 
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			integralName: '横版风格',
			integralList: [
				{
					name: '横版风格'
				},
				{
					name: '竖版风格'
				}
			],
			integralOn: 0, //横版风格
			integralOff: 0, //竖版风格
		};
	},
	methods: {
		chooseIntegral: function (type, index) {
			if (type == '1') {
				this.integralOn = index;
			} else if (type == '2') {
				this.integralOff = index;
			}
		},
		async saveConfig() {
			let data = await http.updateConfig({
				data: {
					type: 1,
					onlineStyle: this.integralOn + 1, //横版风格
					selfhelpStyle: this.integralOff + 1 //竖版风格
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '保存成功',
				});
				this.getWechatConfig();
			}
		},
		async getWechatConfig() {
			let data = await http.getWechatConfig();
			if (data) {
				if (data.onlineStyle) {
					this.integralOn = data.onlineStyle - 1; //在线模版
				}
				if (data.selfhelpStyle) {
					this.integralOff = data.selfhelpStyle - 1; //自助模版
				}
			}
		}
	},
	components: {
		'singleSelect': () =>
			import( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
	},
	mounted() {
		this.getWechatConfig();
	}
};
</script>
<style type="text/css" scoped>
#switching {
	width: 100%;
	height: auto;
}

#switching .set-line {
	width: 100%;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#switching .set-line .titles {
	min-width: 10%;
	/*兼容IE*/
	float: left;
	margin-left: 12px;
	font-size: 16px;
	text-align: left;
}

#switching .set-line .line {
	display: inline-block;
	width: 70%;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#switching .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#switching .online-box section {
	margin-right: 50px;
	float: left;
}

#switching .online-box .img {
	width: 256px;
	height: 456px;
	border: 1px solid #ccc;
}

#switching .online-box .img1 {
	background: url('./../../res/images/page-2.png') no-repeat center;
}

#switching .online-box .img2 {
	background: url('./../../res/images/page-1.png') no-repeat center;
}

#switching .online-box .name {
	width: 256px;
	height: 50px;
	text-align: center;
	line-height: 50px;
	font-size: 16px;
	color: #919191;
}

#switching .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#switching .online-box .freeFix {
	width: 100px;
	height: 40px;
	border: 1px #D2D2D2 solid;
	display: inline-block;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	float: left;
}

#switching .online-box .presentActive {
	border: 1px #FF9200 solid;
	background: #FFEDD1;
	color: #FF9200;
}
</style>