<template>
	<section style="text-align:left;width: 100%;" id="jifen">
		<div class="integra-content">
			<div class="heade-title">
				任务规则
			</div>
			<div class="topR">
				<section class="fl" style="clear: both;">
					<label class="commodity-name fl">人均每日领取任务上限</label>
					<on-off @statusChange="(val)=> getStatus('dailyLimit', val)" :status="dailyLimit"></on-off>
					<section class="num">
						<div v-show="dailyLimit">
							<input type="text" maxlength="2" class="input-style" v-model.trim="dailyLimit_input" onkeyup="value=value.replace(/[^\d{1,5}\\d{0,2}$]/g,'')"
							/>
							<span class="num_span">次</span>
						</div>
						<detailsDes :left="16" :width="280" :height="50" :type="'right'" :title="'每个用户在自然日可领取任务的最大上限'" class="icon_align"></detailsDes>
					</section>
				</section>
				<section class="fl" style="clear: both;">
					<label class="commodity-name fl">人均每次领取任务上限</label>
					<on-off @statusChange="(val)=> getStatus('perLimit', val)" :status="perLimit"></on-off>
					<section class="num">
						<div v-show="perLimit">
							<input type="text" maxlength="2" class="input-style" v-model.trim="perLimit_input" onkeyup="value=value.replace(/[^\d{1,5}\\d{0,2}$]/g,'')"
							/>
							<span class="num_span">次</span>
						</div>
						<detailsDes :left="16" :width="250" :height="50" :type="'right'" :title="'每个用户在进行中的任务上限'" class="icon_align"></detailsDes>
					</section>
				</section>
				<section class="fl" style="clear: both;">
					<label class="commodity-name fl">人均店铺每日领取任务上限</label>
					<on-off @statusChange="(val)=> getStatus('shopLimit', val)" :status="shopLimit"></on-off>
					<section class="num">
						<div v-show="shopLimit">
							<input type="text" maxlength="2" class="input-style" v-model.trim="shopLimit_input" onkeyup="value=value.replace(/[^\d{1,5}\\d{0,2}$]/g,'')"
							/>
							<span class="num_span">次</span>
						</div>
						<detailsDes :left="16" :width="300" :height="50" :type="'right'" :title="'每个用户在同一个店铺领取任务上限'" class="icon_align"></detailsDes>
					</section>
				</section>

			</div>

		</div>
		<a href="javascript:void(0);" v-on:click="keepOn" class='yellow' style="width:250px;margin-left:192px;">保存</a>
	</section>
</template>

<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				dailyLimit: false,
				perLimit: false,
				shopLimit: false,
				dailyLimit_input: 1,
				perLimit_input: 1,
				shopLimit_input: 1
			};
		},
		methods: {
			getStatus(type, val) {
				this[type] = val ? (this[type + '_input'] = 1) : (this[type + '_input'] = 0);
			},
			checkStatus() {
				let arr = ['dailyLimit', 'perLimit', 'shopLimit'];
				let tips = ['人均每日领取任务上限', '人均每次领取任务上限', '人均店铺每日领取任务上限'];

				for (let i = 0; i < arr.length; i++) {
					let item = arr[i];
					if (this[item] && this[item + '_input'] == 0) {
						return tips[i] + '次数必须要1~99';
					}
				}

			},
			async addTaskConfig() {

				let str = this.checkStatus();
				if (str) {
					this.$store.commit('setWin', {
						content: str || '配置失败'
					});
					return;
				}

				let data = await http.addTaskConfig({
					data: {
						dailyLimit: this.dailyLimit_input,
						perLimit: this.perLimit_input,
						shopLimit: this.shopLimit_input
					}
				});

				if (data) {
					this.$store.commit('setWin', {
						content: '配置成功',
						title: '操作提示',
					});
				}

			},
			async getTaskConfig() {
				let data = await http.getTaskConfig({
					data: {}
				});
				if (data == null || data == '') {
					return;
				}
				this.dailyLimit = this.dailyLimit_input = Number(data.dailyLimit);
				this.perLimit = this.perLimit_input = Number(data.perLimit);
				this.shopLimit = this.shopLimit_input = Number(data.shopLimit);
				if(Number(data.dailyLimit)>0){
					this.dailyLimit = true;
				}else if(Number(data.dailyLimit) == 0){
					this.dailyLimit = false;
				}
				if(Number(data.perLimit)>0){
					this.perLimit = true;
				}else if(Number(data.perLimit)==0){
					this.perLimit = false;					
				}
				if(Number(data.shopLimit)>0){
					this.shopLimit = true;
				}else if(Number(data.shopLimit)==0){
					this.shopLimit = false;
				}
			},
			keepOn() {
				this.addTaskConfig();
			}
		},
		mounted() {
			this.getTaskConfig();

		},
		components: {
			'on-off': () =>
				import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
			'detailsDes': () =>
				import ( /*webpackChunkName: 'details_des'*/ 'src/components/details_des')
		}
	};
</script>

<style type="text/css" scoped>
	.commodity-name {
		height: 40px;
		line-height: 40px;
		width: 180px;
		text-align: right;
		margin-right: 10px;
	}

	.topR {
		height: 350px;
	}

	.picName input,
	.expiration-time input {
		width: 100px;
		height: 42px;
		line-height: 25px;
		padding: 5px;
		margin: 0;
	}

	.time-exp {
		width: 100px;
		height: 40px;
		line-height: 40px;
		float: left;
	}

	.topR .mesking {
		width: 100px;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}

	.check-span {
		float: left;
	}

	.integralBox {
		height: 200px;
		width: 100%;
		overflow: hidden;
	}

	.integralSet {
		height: 120px;
		width: 100%;
	}

	.integrabox {
		height: 45px;
		line-height: 45px;
		width: 100%;
		margin-bottom: 15px;
	}

	.integrabox span {
		display: block;
		height: 45px;
		width: 120px;
		text-align: center;
		color: #333;
	}

	.integrabox input {
		padding: 0;
		padding-left: 10px;
		height: 45px;
		width: 140px;
		outline: none;
		box-sizing: border-box;
		color: #9d9d9d;
		margin: 0 20px;
	}

	.integrabox p {
		float: left;
		color: #9d9d9d;
		height: 45px;
		width: calc(100% - 300px);
	}

	@media only screen and (max-width: 1366px) {
		.integrabox p {
			line-height: 22.5px;
		}
	}

	.integra-content {
		margin-bottom: 30px;
		/*overflow: hidden;*/
	}

	.integra-content .heade-title {
		height: 45px;
		line-height: 45px;
		font-size: 16px;
		text-indent: 10px;
		position: relative;
	}

	.integra-content .heade-title:after {
		content: '';
		position: absolute;
		left: 0;
		top: 12px;
		width: 3px;
		height: 25px;
		background-color: #00A1E9;
	}

	.num {
		width: 100%;
		clear: both;
		padding-top: 12px;
		float: left;
		margin-left: 190px;
		position: relative;
		padding-bottom: 20px;
	}

	.input-style {
		border: 0;
		outline: none;
		padding: 0;
		height: 43px;
		padding-left: 10px;
		cursor: pointer;
		color: #796868;
		border: 1px solid #ccc;
		float: left;
		width: 88px;
	}

	.num_span {
		height: 43px;
		border: 1px solid #ccc;
		display: inline-block;
		padding: 0;
		/* float: left; */
		width: 43px;
		line-height: 43px;
		text-align: center;
		border-left: none;
	}

	.icon_align {
		position: absolute;
		left: 122px;
		top: -44px;
	}

	.yellow {
		width: 76px;
		background-color: #22aae0;
		-webkit-transition: background-color 0.7s;
		transition: background-color 0.7s;
		float: left;
		margin: 0 3px;
		cursor: pointer;
	}
</style>