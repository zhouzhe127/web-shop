<template>
	<win :align="'center'" :height="600" :width="980" @winEvent="closeSelfWin" :ok="btnOk" :cancel="btnCancel">
		<span slot="title">同步品牌下所有的分类</span>
		<div id="category_synchronous" slot="content">
			<div class="cList" v-if="category.length>0" v-for="(item,index) in category" :key="index">
				<div class="borderTop"></div>
				<div class="borderBottom"></div>
				<section class="title">
					<div class="cate-hand">
						<span v-if="item.checkStatus ==1" style="color:#FA8E2C;">{{item.name | sliceStr}}</span>
						<span v-else>{{item.name | sliceStr}}</span>
					</div>
				</section>
				<ul class="oUl">
					<template v-for="(ch,chIndex) in item.child">
						<li class="oLi" :key="chIndex">
							<span v-if="ch.checkStatus ==1" style="color:#FA8E2C;">{{ch.name}}</span>
							<span v-else>{{ch.name}}</span>
						</li>
					</template>
				</ul>
			</div>
			<div class="tip-container">
				<img src="../../../res/icon/ia.png" />
				<h3 class="yellow-part">橙色部分为本店没有同步部分, </h3>
				<h3 class="gray-part">灰色部分为本店已和品牌同步部分</h3>
			</div>
		</div>
	</win>
</template>

<script>
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				shopId: null,
				brandId: null,
				isBrand: null,
				category: [],
				btnOk: {
					content: '确定同步',
					style: 'background-color:#f8941f'
				},
				btnCancel: {
					content: '暂不同步',
					style: 'background-color:#918686'
				}
			};
		},
		methods: {

			closeSelfWin(res) {
				if (res == 'ok') {
					this.SynchronousCategory().then((result) => {
						if (result) {
							this.$emit('throwSynchronousWin', 'change');
						}
					});
				} else {
					this.$emit('throwSynchronousWin', 'close');
				}
			},
			async getCategoryStatus() {
				let res = await http.GetCategoryStatus({
					data: {
						shopId: this.shopId,
						brandId: this.brandId
					}
				});
				return res;
			},
			async SynchronousCategory() {
				let res = await http.SynchronousCategory({
					data: {
						shopId: this.shopId,
						brandId: this.brandId
					}
				});
				return res;
			},
			initData() {
				let userData = storage.session('userShop');
				this.shopId = userData.currentShop.id;
				this.brandId = userData.currentShop.brandId;
				this.isBrand = (userData.currentShop.ischain == 1 || userData.currentShop.ischain == 2) ? false : true; //判断是否是品牌                
			},
		},
		mounted() {
			this.initData();
			this.getCategoryStatus().then((res) => {
				this.category = res;
			});
		},
		components: {
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win'),
		},
		filters: {
			sliceStr(val) {
				if (!val) return '';
				val = val + '';
				if (val.length < 11) {
					return val;
				} else {
					return val.slice(0, 10) + '...';
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	#category_synchronous {
		padding: 10px 30px;
		padding-bottom: 60px;
		.cList {
			width: 100%;
			border: 1px solid #cdcdcd;
			border-left: 120px solid #F8F8F8;
			position: relative;
			margin-top: 20px;
			.title {
				width: 120px;
				color: #323232;
				text-align: center;
				position: absolute;
				top: 50%;
				left: -120px;
				line-height: 100%;
				font-size: 18px;
				transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-webkit-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				padding: 5px 10px;
				z-index: 5;

			}
			.oUl {
				width: 100%;
				min-height: 60px;
				padding: 10px 20px;
				overflow: hidden;
				border-left: 1px solid #cdcdcd;
			}
			.oLi {
				height: 40px;
				min-width: 80px;
				line-height: 40px;
				float: left;
				text-align: center;
				padding: 0 10px;
				color: #555555;
				cursor: pointer;
				.addinput {
					width: 165px;
					height: 34px;
					float: left;
					border: 1px solid #cdcdcd;
					margin-top: 15px;
					display: none;
				}
				.oDiv {
					width: 34px;
					height: 32px;
					border-left: 1px solid #cdcdcd;
					float: right;
				}


			}

		}
		.openoperation {
			display: none;
		}
		.title:hover .openoperation {
			display: block;
		}
		.oLi:hover .openoperation {
			display: block;
		}
		.addclassification {
			width: 210px;
			height: 45px;
			background-color: #29A7E1;
			margin-top: 30px;
			cursor: pointer;
			img {
				width: 22px;
				height: 22px;
				margin-top: 9px;
				margin-left: 34px;
				float: left;
			}
			h3 {
				width: 120px;
				height: 45px;
				line-height: 45px;
				color: #fff;
				text-align: center;
				float: left;
			}

		}
		.borderTop {
			width: 122px;
			height: 100%;
			border-left: 1px solid #cdcdcd;
			position: absolute;
			top: -1px;
			left: -120px;
			border-top: 1px solid #cdcdcd;
		}
		.borderBottom {
			width: 122px;
			height: 100%;
			border-left: 1px solid #cdcdcd;
			position: absolute;
			bottom: -1px;
			left: -120px;
			border-bottom: 1px solid #cdcdcd;
		}
		.cate-hand {
			width: 100%;
			height: 60px;
			margin-top: 40px;
			cursor: pointer;
		}
		.tip-container {
			width: 920px;
			height: 50px;
			position: fixed;
			bottom: 50px;
			background-color: #fff;
			z-index: 5;
			border-top: 2px dashed #D9D9D9;
			img {
				width: 20px;
				height: 20px;
				float: left;
				margin: 13px 4px;
			}
			.yellow-part {
				height: 50px;
				line-height: 50px;
				color: orange;
				float: left;
			}
			.gray-part {
				height: 50px;
				line-height: 50px;
				color: gray;
				float: left;
				margin-left: 10px;
			}
		}

	}

	/*
    #category_synchronous .cList{width:100%;border:1px solid #cdcdcd;border-left: 120px solid #F8F8F8;position: relative;margin-top:20px;}
    #category_synchronous .cList .title{width:120px;color:#323232;text-align:center;
        position: absolute;top: 50%;left: -120px;line-height: 100%;font-size: 18px;transform: translateY(-50%);-ms-transform: translateY(-50%);
        -moz-transform: translateY(-50%);-webkit-transform: translateY(-50%);-o-transform: translateY(-50%);padding: 5px 10px;z-index: 5;
        
    }
    #category_synchronous .cList .oUl{width:100%;min-height: 60px;padding:10px 20px;overflow: hidden;border-left: 1px solid #cdcdcd;}
    #category_synchronous .cList .oLi{
        height:40px;min-width:80px;line-height: 40px;float: left;text-align: center;
        padding:0 10px;color:#555555;cursor: pointer;
    }
    #category_synchronous .oLi .addinput{width:165px;height:34px;float: left;border:1px solid #cdcdcd;margin-top:15px;display: none;}
    #category_synchronous .oLi .oDiv{width:34px;height:32px;border-left: 1px solid #cdcdcd;float: right;}
    #category_synchronous .openoperation{display: none;}
    #category_synchronous .title:hover .openoperation{display: block;}
    #category_synchronous .oLi:hover .openoperation{display: block;}
    #category_synchronous .addclassification{width:210px;height:45px;background-color: #29A7E1;margin-top:30px;cursor: pointer;}
    #category_synchronous .addclassification img{width:22px;height:22px;margin-top:9px;margin-left: 34px;float: left;}
    #category_synchronous .addclassification h3{width:120px;height: 45px;line-height:45px;color:#fff;text-align: center;float: left;}
    #category_synchronous .borderTop{width:122px;height:100%;border-left: 1px solid #cdcdcd;position: absolute;top:-1px;left:-120px;border-top:1px solid #cdcdcd;}
    #category_synchronous .borderBottom{width:122px;height:100%;border-left: 1px solid #cdcdcd;position: absolute;bottom:-1px;left:-120px;border-bottom:1px solid #cdcdcd;}
     */
</style>