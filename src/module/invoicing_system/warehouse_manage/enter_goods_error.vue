<!--
    **入货组件-匹配失败弹框
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win :align="'center'" @winEvent="winEvent" :type="'alert'" :width="600" :height="'auto'" :ok="{style:{'backgroundColor':'#f8941f'},content:'确定'}">
		<span slot="title">无法匹配</span>
		<div slot="content" id="enter-goods-error">
			<div class="tab">
				<span :class="{active:errorType==1}" @click="errorType=1">商品</span>
				<span :class="{active:errorType==2}" @click="errorType=2">物料</span>
			</div>
			<div class="list" v-if="errorType==1">
				<div class="title">
					<span>序号</span>
					<span>商品名称</span>
					<span>条码</span>
					<span>原因</span>
				</div>
				<ul>
					<li v-for="(item,index) in goodsList" :key="index">
						<span>{{index+1}}</span>
						<span :title="item.itemName">{{item.itemName}}</span>
						<span>{{item.barCode}}</span>
						<span>{{item.reason}}</span>
					</li>
					<li class="empty">- 暂无条目 -</li>
				</ul>
			</div>
			<div class="list material" v-if="errorType==2">
				<div class="title">
					<span>序号</span>
					<span>物料名称</span>
					<span>原因</span>
				</div>
				<ul>
					<li v-for="(item,index) in matList" :key="index">
						<span>{{index+1}}</span>
						<span :title="item.name">{{item.name}}</span>
						<span>{{item.reason}}</span>
					</li>
					<li class="empty">- 暂无条目 -</li>
				</ul>
			</div>
		</div>
	</win>
</template>
<script>

export default {
	data() {
		return {
			errorType:1,//错误类型 1商品 2物料
			goodsList:[],//商品列表
			matList:[],//物料列表
		};
	},
	props: ['errorList'],
	methods: {
		winEvent(str){
			this.$emit('errorEmit', str);
		},
		initData(){
			this.goodsList = this.errorList.goods;
			this.matList = this.errorList.material;
			if(!this.goodsList.length && this.matList.length){
				this.errorType = 2;
			}
		},
	},
	mounted(){
		this.initData();
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win'*/ 'src/components/win'),
	}
};
</script>
<style lang='less' scoped>
	#enter-goods-error{
		padding: 15px;
		.tab{overflow: hidden;
			span{float: left;height: 35px;line-height: 33px;width: 100px;color: #f8941f;border: 1px solid #f8941f;text-align: center;
				cursor: pointer;
				&.active{background: #f8941f;color: #fff;}
			}
		}
		.list{padding-top: 15px;
			span{width: 28.33%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;
				&:first-child{width: 15%;}
			}
			.title{padding: 5px 0;border-bottom: 1px solid #ccc;border-top: 1px solid #ccc;overflow: hidden;
				span{float: left;border-right: 1px solid #ccc;text-align: center;height: 30px;line-height: 30px;
					&:last-child{border-right: 0;}
				}
			}
			ul{overflow: auto;height: 200px;
				li{overflow: hidden;border-bottom: 1px solid #ccc;
					&:last-child{border-bottom: 0;}
					span{float: left;height: 40px;line-height: 40px;text-align: center;}
				}
				.empty{height: 40px;line-height: 40px;text-align: center;color: #999;}
			}
		}
		.material{
			span{width: 28.33%;
				&:first-child{width: 15%;}
				&:nth-child(2){width: 56.67%;}
			}
		}
	}
</style>