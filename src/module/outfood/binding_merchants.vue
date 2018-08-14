<template>
    <div id="merchants">
        <!-- 新建疯抢商品 -->
        <div class="set-line">
            <div class="titles">绑定达达商户</div>
            <div class="line"></div>
        </div>
        <!-- 注册商户 -->
        <div class="online-box clearfix">
            <span class="online-sub fl">注册商户</span>
            <a href="javascript:void(0);" class="blue fl register" @click="goRegister">去注册</a>
            <span class="way" @click="viewAcquisition">查看商户Id获取方式</span>
        </div>
        <!-- 商户Id -->
        <div class="online-box clearfix">
            <span class="online-sub fl required">商户Id</span>
            <input type="text" name="" class="inp" placeholder="请输入商户Id" maxlength="30" v-model="merchants" onkeyup="value=value.replace(/[^a-zA-Z\d]/g,'')">
        </div>
        <!-- 保存 -->
        <div class="online-box clearfix">
            <span class="online-sub fl"></span>
            <a href="javascript:void(0);" class="yellow fl" style="width: 200px;" @click='saveConfig'>保存</a>
        </div>
    </div>
</template>
<script>
import http from 'src/manager/http';
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
// import global from 'src/manager/global';
export default {
	data() {
		return {
			merchant: '' //商户Id
		};
	},
	methods: {
		goRegister: function() {
			window.open(
				'http://newopen.imdada.cn/#/merchantRegister?_k=qhjcvl'
			);
		},
		viewAcquisition: function() {
			window.open(
				'http://newopen.imdada.cn/#/page/merchantInfoGuide?_k=b46dt7'
			);
		},
		saveConfig: function() {
			if (this.merchant == '' || this.merchant.length <= 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '商户Id不能为空！'
				});
				return false;
			}
			this.bindSourceId(); //
		},
		async bindSourceId() {
			let data = await http.bindSourceId({
				data: {
					sourceId: this.merchant //商户Id
				}
			});
			if (data == true) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '保存成功！'
				});
				this.getConfig();
			}
		},
		async getConfig() {
			let data = await http.getDadaConfig({
				data: {}
			});
			if (data) {
				this.merchant = data.sourceId; //获取Id
			}
		}
	},
	watch: {},
	computed: {
		merchants: {
			get: function() {
				return this.merchant;
			},
			set: function(newValue) {
				let reg = /[^a-zA-Z\d]/g;
				this.merchant = newValue.replace(reg, '');
			}
		}
	},
	components: {},
	mounted() {
		this.getConfig();
	}
};
</script>
<style type="text/css" scoped>
#merchants .set-line {
	width: 800px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}
#merchants .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}
#merchants .set-line .line {
	display: inline-block;
	width: 650px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}
#merchants .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}
#merchants .online-box .register {
	width: 210px;
	height: 40px;
	line-height: 40px;
	margin-right: 24px;
}
#merchants .online-box .way {
	line-height: 40px;
	font-size: 16px;
	color: #28a8e0;
	text-decoration: underline;
	cursor: pointer;
}
#merchants .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}
#merchants .online-box .inp {
	width: 208px;
	height: 40px;
	text-indent: 10px;
}
#merchants .clearfix::before,
#merchants .clearfix::after {
	display: table;
	content: “”;
}
#merchants .clearfix::after {
	clear: both;
}
</style>