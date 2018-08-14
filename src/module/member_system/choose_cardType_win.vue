<template>
	<win @winEvent='getWinClickResult' :align="'center'" :width='740' :height="'auto'">
		<span slot='title'>{{title}}</span>
		<div class='cardType' style='padding: 30px;' slot='content'>
			<template v-for='(item,ind) in cradTypeList'>
				<span @click='selectType(ind,item)' :class='{"sign": item.cardId ==  selectCardType.cardId}'>{{item.name}}</span>
			</template>
		</div>
	</win>
</template>
<script>
	export default {
		props: {
			postObj: null
		},
		data() {
			return {
				cradTypeList: null, // 卡类型列表
				index: null, //选中的卡类型下标
				selectCardType: null, // 选中的实体卡类型
				title: '选择卡类型' //弹框标题
			};
		},
		methods: {
			getWinClickResult: function (res) {
				if (res) {
					let throwObj = {
						res: res,
						postIndex: this.index,
						postSelectCardType: this.selectCardType
					};
					this.$emit('toClick', throwObj);
				}
			},
			selectType: function (ind, item) {
				this.index = ind; //点击选中的数组的下标
				this.selectCardType = item; //获取点击选中的卡类型
				if (this.postObj.type == '0') {
					this.postObj.virtualCardNo = ''; //实体卡编号清空
					this.postObj.virtualValidateNoLog = 0;
				} else {
					this.postObj.virtualCardNo = '';
					this.postObj.virtualValidateNoLog = 0;
				}
			}
		},
		mounted() {
			this.cradTypeList = this.postObj.cradTypeList;
			this.index = this.postObj.type == '0' ? this.postObj.virtualCradTypeIndex : this.postObj.entityCradTypeIndex;
			this.selectCardType = this.postObj.type == '0' ? this.postObj.virtualSelectCardType : this.postObj.entitySelectCardType;
			if (this.postObj.type == '0') {
				this.postObj.virtualCradTypeIndex = this.index;
				this.postObj.virtualSelectCardType = this.selectCardType; //获取点击选中的卡类型
			} else {
				this.postObj.entityCradTypeIndex = this.index;
				this.postObj.entitySelectCardType = this.selectCardType; //获取点击选中的卡类型
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
		}
	};
</script>
<style scoped>
	.cardType span {
		display: inline-block;
		color: #333;
		min-width: 100px;
		text-align: center;
		line-height: 38px;
		height: 38px;
		border: 1px solid #D2D2D2;
		margin-right: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.cardType span.sign {
		color: #FF9200;
		border: 1px solid #FF9200;
	}

	.cardType span:hover {
		background-color: #FFFFFF;
	}
</style>