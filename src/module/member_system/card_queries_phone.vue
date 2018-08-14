<template>
	<win @winEvent="clickResult" :align="'center'" :width="540" :height="202">
		<!--标题-->
		<span slot="title"> {{title}}</span>
		<!--内容-->
		<div slot="content">
			<div class="mobilePhone" id="phone">
				<div class="phoneBox">
					<div class="leftHalf required" v-if="type == 0">
						新手机号
					</div>
					<div class="leftHalf required" v-else>
						手机号
					</div>
					<div class="rightHalf">
						<input type="text" class="txt" v-model="orderNumber" placeholder="请输入手机号码" />
					</div>
				</div>
				<div class="phoneBox" v-if="type == 0">
					<div class="handle-tips">
						<i></i>
					</div>
					<div class="instructions">
						<span>在此处更换手机号后,原有手机号无法登陆该卡。需要在新手机号登录。微信需要重新登录新手机号方可使用该实体卡。</span>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>

<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				title: this.type == 0 ? '更换手机号' : '绑定手机号',
				orderNumber: '' //手机号码
			};
		},
		props: {
			detaiList: Object,
			type: ''
		},
		methods: {
			async changePhone(backRes) {
				console.log(this.detaiList);
				let res = await http.changeMemberMobile({
					data: {
						memberCardId: this.detaiList.id, //卡的id
						mobile: this.orderNumber //手机号
					}
				});
				if (res) {
					this.$emit('throwWinResult', backRes); //抛出一个事件给父组件
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '修改成功！'
					});
					//                   srVue.getList();
					//                   setTimeout(function(){
					//                       for(let i = 0;i < srVue.list.length;i++){
					//                           if(phoneVue.detaiList.id == srVue.list[i].id){
					//                               srVue.detaiList = srVue.list[i];
					//                           }
					//                       }
					//                   },2000)
				}
			},
			clickResult(res) {
				if (res == 'ok') {
					let re = /^1\d{10}$/;
					if (this.orderNumber.trim() == '') {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '请填写手机号码'
						});
						return false;
					}
					if (!re.test(this.orderNumber)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '手机号码格式错误'
						});
						return false;
					}
					this.changePhone(res); //修改手机号
				} else {
					this.$emit('throwWinResult', res); //抛出一个事件给父组件
				}
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
		}

	};
</script>

<style type="text/css" scoped>
	.mobilePhone {
		margin: 50px 0 0 66px;
		box-sizing: border-box;
	}

	.mobilePhone .phoneBox {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 15px;
	}

	.mobilePhone .phoneBox .leftHalf {
		width: 80px;
		height: 40px;
		text-align: right;
		line-height: 40px;
		float: left;
		margin-right: 12px;
	}

	.mobilePhone .phoneBox .rightHalf {
		width: 300px;
		height: auto;
		float: left;
	}

	.mobilePhone .phoneBox .rightHalf .txt {
		width: 217px;
		height: 38px;
		border: 1px solid #D2D2D2;
		text-indent: 17px;
		margin-right: 6px;
		outline: none;
	}

	.mobilePhone .handle-tips {
		width: 20px;
		height: 20px;
		background: url("../../res/images/handle-tips.png") right center no-repeat;
		color: #999999;
		float: left;
		margin-right: 10px;
	}

	.mobilePhone .instructions {
		width: 383px;
		height: 40px;
		color: #A5A5A5;
		float: left;
	}
</style>