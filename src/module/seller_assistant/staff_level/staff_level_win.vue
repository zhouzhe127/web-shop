<!--
    **人员等级
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='591' :height='326' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<div class="mobilePhone">
				<div class="phoneBox">
					<div class="leftHalf required">
						累计达到
					</div>
					<div class="rightHalf">
						<!-- <section>
							<input type="text" class="cumulative" placeholder="请输入正整数" v-model="goldCoin" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')"
							/>
							<span>金币</span>
						</section> -->
						<el-input class='fl' placeholder="请输入正整数" v-model="goldCoin" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:200px;">
							<template slot="suffix">金币</template>
						</el-input>
						<span class="automatic">自动升级</span>
					</div>
				</div>
				<div class="phoneBox">
					<div class="leftHalf required">
						名称
					</div>
					<div class="rightHalf">
						<!-- <input type="text" class="txt" placeholder="请输入名称" v-model="name" maxlength="20" /> -->
						<el-input v-model="name" maxlength="20" placeholder="请输入名称"></el-input>
					</div>
				</div>
				<div class="phoneBox">
					<div class="leftHalf">
						等级显示
					</div>
					<div class="rightHalf">
						<ul>
							<li v-for="(item,index) in star" :class="item.status ? 'on' : ''" :key="index" @mouseover="selectStars('moveover',index)" @mouseout="selectStars('moveout','')" @click="selectStars('click',index)">
								<a href="javascript:;">{{item.num}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</Win>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	let reg = /^[0-9]*[1-9][0-9]*$/;
	export default {
		data() {
			return {
				title: '',
				okStyle: null,
				cancelStyle: null,
				star: [{
					'num': 1,
					'status': false
				}, {
					'num': 2,
					'status': false
				}, {
					'num': 3,
					'status': false
				}, {
					'num': 4,
					'status': false
				}, {
					'num': 5,
					'status': false
				}], //星星
				iScore: 0,
				iStar: 0,
				name: '', //名称
				goldCoin: '', //金币值
				count: 0
			};
		},
		props: {
			type: String, //状态
			leveldetail: Object //详情
		},
		methods: {
			async getAppliedWin(res) {
				if (res == 'ok') {
					let text = this.jtrim(this.goldCoin);
					if (text == '') { //名称
						this.$store.commit('setWin', {
							content: '请输入金币值',
							winType: 'alert',
							title: '操作提示',
						});
						return false;
					}
					if (!(reg.test(this.goldCoin))) {
						this.$store.commit('setWin', {
							content: '金币值只能是正整数',
							winType: 'alert',
							title: '操作提示',
						});
						return false;
					}
					let test = this.jtrim(this.name);
					if (test == '') { //名称
						this.$store.commit('setWin', {
							content: '请输入人员等级名称',
							winType: 'alert',
							title: '操作提示',
						});
						return false;
					}
					if (this.type == 'view') {
						await this.saveConfig({ levelId: '', name: this.name, star: this.iStar, totalGold: this.goldCoin });
					} else if (this.type == 'edi') {
						await this.saveConfig({ levelId: this.leveldetail.id, name: this.name, star: this.iStar, totalGold: this.goldCoin });
					}
				}
				this.$emit('getAppliedWin', res);
			},
			fnPoint: function(iArg) {
				this.iScore = iArg || this.iStar;
				for (let i = 0; i < this.star.length; i++) {
					this.star[i].status = i < this.iScore ? true : false;
				}
			},
			selectStars: function(type, index) {
				switch (type) {
					case 'moveover':
						this.fnPoint(index + 1);
						break;
					case 'moveout':
						this.fnPoint();
						break;
					case 'click':
						if (index == 0) {
							this.count++;
							if (this.count % 2 == 0) {
								this.iStar = 0;
							} else {
								this.iStar = 1;
							}
						} else {
							this.iStar = index + 1;
						}
						break;
					default:
						break;
				}
			},
			jtrim: function(s) {
				return s.replace(/(^\s*)|(\s*$)/g, ''); //            /(^\s*)|(\s*$)/g    ，其中开头为任意多个空，或者最后为多个空
			},
			async saveConfig({ levelId, name, star, totalGold }) {
				let data = await http.AssaddOrEdit({
					data: {
						levelId: levelId,
						name: name,
						star: star,
						totalGold: totalGold
					}
				});
				return data;
			}

		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win')
		},
		mounted() {
			if (this.type == 'edi') {
				this.name = this.leveldetail.name;
				this.goldCoin = this.leveldetail.totalGold;
				this.iStar = this.leveldetail.star;
				this.fnPoint(this.iStar);
				this.title = '编辑人员';
				this.okStyle = {
					content: '保存',
					style: {
						backgroundColor: '#FF9800',
						color: '#fff'
					}
				};
				this.cancelStyle = {
					content: '取消',
					style: {
						backgroundColor: '#A0A0A0',
						color: '#fff'
					}
				};
			} else if (this.type == 'view') {
				this.title = '新增人员等级';
				this.okStyle = {
					content: '确定',
					style: {
						backgroundColor: '#FF9800',
						color: '#fff'
					}
				};
				this.cancelStyle = {
					content: '取消',
					style: {
						backgroundColor: '#A0A0A0',
						color: '#fff'
					}
				};
			}
		}
	};
</script>
<style scoped>
	.mobilePhone {
		margin: 58px 0 0 66px;
		box-sizing: border-box;
	}

	.mobilePhone .phoneBox {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 28px;
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
		line-height: 40px;
	}

	.mobilePhone .phoneBox .rightHalf section {
		width: 210px;
		height: 38px;
		border: 1px solid #CECDCD;
		margin-right: 16px;
		float: left;
	}

	.mobilePhone .phoneBox .rightHalf .automatic {
		width: auto;
		height: 38px;
		display: inline-block;
		text-align: center;
		line-height: 38px;
		float: left;
	}

	.mobilePhone .phoneBox .rightHalf section .cumulative {
		width: 150px;
		height: 36px;
		border: none;
		float: left;
		outline: none;
		text-indent: 17px;
	}

	.mobilePhone .phoneBox .rightHalf section span {
		display: block;
		float: left;
		width: 58px;
		height: 37px;
		text-align: center;
		line-height: 38px;
		border-left: 1px solid #CECDCD;
	}

	.mobilePhone .phoneBox .rightHalf .txt {
		width: 210px;
		height: 38px;
		border: 1px solid #D2D2D2;
		text-indent: 17px;
		margin-right: 6px;
		outline: none;
	}

	.mobilePhone .phoneBox .rightHalf ul {
		float: left;
		display: inline;
		height: 19px;
		line-height: 19px;
		margin: 10px 10px;
	}

	.mobilePhone .phoneBox .rightHalf ul li {
		float: left;
		width: 24px;
		cursor: pointer;
		text-indent: -9999px;
		background: url(../../../../src/res/icon/star.png) no-repeat;
	}

	.mobilePhone .phoneBox .rightHalf ul li.on {
		background-position: 0 -28px;
	}

	.mobilePhone .instructions {
		width: 383px;
		height: 40px;
		color: #A5A5A5;
		float: left;
	}
</style>