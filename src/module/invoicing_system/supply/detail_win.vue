<template>
	<div>
		<win @winEvent="getData" :align="'right'" :width="580" :height="700">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<section class="titleTop">
					<div class="titleLine">
						<i></i>
						<h3>详情</h3>
						<div class="dian" v-for="i in 22" :key="i"></div>
					</div>
				</section>
				<section>
					<div class="cList">
						<div class="titleTop">
							<h3 class="showBefore">供应商名称:</h3>
							<div class="shopAfter">{{detials.name}}</div>
						</div>
						<div class="titleTop">
							<h3 class="showBefore">开户银行:</h3>
							<div class="shopAfter">{{detials.bank}}</div>
						</div>
						<div class="titleTop">
							<h3 class="showBefore">银行账号:</h3>
							<div class="shopAfter">{{detials.bankAccount}}</div>
						</div>
						<div class="titleTop">
							<h3 class="showBefore">税号:</h3>
							<div class="shopAfter">{{detials.tax}}</div>
						</div>
						<div class="titleTop">
							<h3 class="showBefore">税率:</h3>
							<div class="shopAfter">{{detials.taxRate}}</div>
						</div>
					</div>
				</section>
				<section class="titleTop">
					<div class="titleLine">
						<i></i>
						<h3>基本信息</h3>
						<div class="dian" v-for="i in 22" :key="i"></div>
					</div>
				</section>
				<section class="titleTop">
					<div class="cList" v-for="(item,index) in user" :key="index" style="margin-bottom: 20px;">
						<div class="titleTop">
							<h3 class="showBefore">联系人:</h3>
							<div class="shopAfter">{{item.name}}</div>
						</div>
						<div class="titleTop">
							<h3 class="showBefore">联系方式:</h3>
							<div class="shopAfter">{{item.phone}}</div>
						</div>
						<div class="titleTop">
							<h3 class="showBefore">联系地址:</h3>
							<div class="shopAfter">{{item.address}}</div>
						</div>
					</div>
				</section>
			</div>
		</win>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				title: '查看详情',
				detials: {}, //详情
				user: '', //对接人详情
			};
		},
		props: [
			'detailId', //详情id
			'shopId'
		],
		mounted() {
			this.getDetail();
		},
		methods: {
			getData(res) {
				this.$emit('getWin', res);
			},
			//获取详情
			async getDetail() {
				let res = await http.suppelierById({
					data: {
						id: this.detailId
					}
				});
				this.detials = res;
				this.user = res.people.people;
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		},
	};
</script>

<style lang="less" scoped>
	#tan {
		.titleTop {
			width: 100%;
			height: auto;
			.titleLine {
				width: 100%;
				height: 40px;
				margin: 10px;
				line-height: 40px;
				position: relative;
				i {
					width: 2px;
					height: 28px;
					position: absolute;
					top: 6px;
					left: 0;
					background-color: #28A8E0;
				}
				h3 {
					width: 73px;
					height: 40px;
					margin-left: 10px;
					float: left;
				}
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #E1E1E1;
				margin: 20px 5px;
				float: left;
			}
		}
		.cList {
			font-size: 16px;
			overflow: hidden;
			width: 550px;
			margin-left: 30px;
			.showBefore {
				font-size: 16px;
				width: 120px;
				height: 40px;
				line-height: 40px;
				float: left;
				text-align: right;
				color: #333;
				margin-right: 15px;
			}
			.shopAfter {
				font-size: 16px;
				width: 370px;
				height: 40px;
				line-height: 40px;
				float: left;
				text-align: left;
				color: #333;
				margin-right: 10px;
			}
		}

	}
</style>