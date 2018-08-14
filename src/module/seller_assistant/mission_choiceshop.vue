<!--
	**任务系统选择门店
	*
	* 
	* *miaochuan.sha
	*
-->
<template>
	<Win :width='740' :height="'auto'" @winEvent='getAppliedWin' :align="'center'">
		<span slot="title">增加任务量</span>
		<div id="tan" slot="content">
			<ul>
				<li v-for="(item,index) in shopList" :key="index">
					<div class="fl shopname">
						{{item.name}}
					</div>
					<div class="fl shopstock">
						任务量
						<input type="text" name="" v-model="item.quota" maxlength="6">
					</div>
				</li>
			</ul>
		</div>
	</Win>
</template>
<script>
let reg = /^\d*[0-9]{1,}\d*$/;
export default {
	props: {
		shopList: Array //店铺列表
	},
	data() {
		return {};
	},
	methods: {
		getAppliedWin: function(res) {
			if (res == 'ok') {
				let count = 0;
				for (let item of this.shopList) {
					if (!this.isEmpty(item.quota)) {
						count++;
					}
					if (!(this.isEmpty(item.quota) || reg.test(item.quota))) {
						this.$store.commit('setWin', {
							content: `${item.name}任务量只能是正整数`,
							winType: 'alert',
							title: '操作提示'
						});
						return false;
					}
				}
				if (count < 1) {
					this.$store.commit('setWin', {
						content: `至少增加一家门店任务量并且只能是正整数`,
						winType: 'alert',
						title: '操作提示'
					});
					return false;
				}
				this.$emit('getAppliedWin', res, this.shopList);
			} else {
				for (let item of this.shopList) {
					item.quota = '';
				}
				this.$emit('getAppliedWin', res);
			}
		},
		isEmpty: function(txt) {
			let value = txt.replace(/(^\s*)|(\s*$)/g, '');
			if (value == '') {
				return true;
			} else {
				return false;
			}
		}
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win')
	},
};
</script>
<style scoped>
#tan {
	padding: 46px 100px 0 100px;
	max-height: 700px;
}

#tan ul {
	width: 100%;
	height: auto;
}

#tan ul li {
	width: 100%;
	height: 40px;
	margin-bottom: 32px;
}

#tan ul li .shopname {
	width: 120px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-right: 100px;
}

#tan ul li .shopstock {
	width: auto;
	height: 40px;
	text-align: center;
	line-height: 40px;
}

#tan ul li .shopstock input {
	width: 118px;
	height: 38px;
	margin-left: 12px;
	text-indent: 10px;
}
</style>