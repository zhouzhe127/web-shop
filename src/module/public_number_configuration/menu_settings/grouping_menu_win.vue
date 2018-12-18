<!-- 新建分组菜单的弹窗 -->
<template>
	<Win :width='597' :height='400' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">新建分组菜单</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 关联用户组 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">关联用户组</span>
				<div class="rightHalf">
					<!-- <mul-select :styles="{border: '4px solid RGB(210,210,210)',margin: '9px 10px 0 0'}" :list="menuselName" :selects="selects" :name="'name'" :keys="'id'" :isradio="true"></mul-select> -->
					<el-radio-group v-model="validName" class="fl">
						<el-radio v-for="(item,index) in menuselName" :key="index" :label="item.name" border @change.native="clicktheRadio(item)" style="margin-bottom: 10px;"></el-radio>
					</el-radio-group>
				</div>
			</div>
		</div>
	</Win>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			okStyle: {
				content: '确认',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			},
			cancelStyle: {
				content: '取消',
				style: {
					backgroundColor: '#b3b3b3',
					color: '#fff'
				}
			},
			selectId: '', //选中的放在这里面
			validName: ''
		};
	},
	props: {
		menuselName: Array, //菜单
	},
	methods: {
		valiData: function(content, title, winType) { //提示框格式化
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		getAppliedWin: function(res) {
			if (res == 'ok') {
				if (this.selectId === '') {
					this.valiData('请选择关联用户组');
					return false;
				}
				this.$emit('getGroupingResult', res, this.selectId);
			} else {
				this.$emit('getGroupingResult', res);
			}
		},
		clicktheRadio: function(item) { //新建分组菜单选中的id
			this.selectId = item.id;
		},
	},
	components: {
		Win: () =>
			import( /* webpackChunkName:'win' */ 'src/components/win'),
		'mulSelect': () =>
			import( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
	}
};
</script>
<style scoped>
#tan {
	width: 100%;
	height: 100%;
	padding: 20px;
}

#tan .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#tan .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 100px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#tan .online-box .rightHalf {
	width: 400px;
	height: auto;
	float: left;
}
</style>