<!--
	**单选弹框
	*
	* 孔伟研
	* *
	*
-->
<template>
	<win @winEvent="selectRadioWin" :align="'center'" :width="680" :height="600">
		<!--标题-->
		<span slot="title">{{title}}</span>
		<!--内容-->
		<div slot="content" style="padding:10px">
			<div class="permissions" v-if="list && list.length > 0">
				<el-radio-group v-model="index">
					<el-radio class="labItem" @change="funSelectOne(i)" v-for="(item,i) in list" :key="i" :label="i" border>{{item.name}}</el-radio>
				</el-radio-group>
				<!-- <radioBtn @selOn="funSelectOne"  :list="list" :index="index" :name='name'></radioBtn> -->
			</div>
			<div style="width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;">
				<h3 style="margin-right:20px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择 &nbsp;{{selectNum}}</h3>
			</div>
		</div>
	</win>
</template>
<script>
export default {
	data() {
		return {
			index: -1,
			selectNum: ''
		};
	},
	props: {
		list: Array, //数组
		title: String, //
		name: String, //要显示的字段
		selectIndex: Number //选择后再次进入的下标
	},
	mounted() {
		//选择后再次进入的下标
		if (this.selectIndex > -1) {
			this.index = this.selectIndex;
		}
	},
	methods: {
		selectRadioWin: function(res) {
			if (res == 'ok') {
				if (this.index < 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '请选择一项'
					});
					return false;
				}
				let item = this.list[this.index];
				item.index = this.index;
				this.$emit('selectRadioWin', res, item);
			} else {
				this.$emit('selectRadioWin', res);
			}
		},
		funSelectOne: function(e) {
			this.index = e;
			if (this.index > -1) {
				this.selectNum = this.list[this.index][this.name];
			} else {
				this.selectNum = '';
			}
		}
	},
	watch: {
		list: {
			deep: true,
			handler: function() {
				let list = this.newList;
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					if (list[i].selected == true) {
						arr.push(list[i]);
					}
				}
				this.selectNum = arr.length;
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		radioBtn: () =>
			import(/* webpackChunkName:"radio_btn" */ 'src/components/radio_btn')
	}
};
</script>
<style lang="less" scoped>
.permissions .labItem {
	margin-bottom: 5px;
	margin-left: 0 !important;
	margin-right: 10px;
}
</style>