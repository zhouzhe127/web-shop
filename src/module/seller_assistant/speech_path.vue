/** * 新建话术组 * *miaochuan.sha */
<template>
	<Win :width='740' :height='700' @winEvent='getAppliedWin' :align="'center'">
		<span slot="title">选择功能</span>
		<div id="tan" slot="content" v-cloak>
			<mul-select :styles="{backgroundColor: 'rgb(236,236,236)',marginRight:'8px',marginBottom:'8px'}" :list="menuList" :selects="menuType"
			    :name="'name'" :keys="'type'" :isradio="true"></mul-select>
		</div>
	</Win>
</template>
<script>

	export default {
		data() {
			return {
				menuType: [],
				chooseMenu: ''
			};
		},
		props: {
			speechList: Array,
			detail: '', //详情
			menuList: Array //菜单列表
		},
		methods: {
			getAppliedWin: function (res) {
				if (res == 'ok') {
					if (this.menuType.length <= '0') {
						this.$store.commit('setWin', {
							content: '请选择功能',
							winType: 'alert',
							title: '操作提示'
						});
						return false;
					}
					for (let it of this.menuList) {
						if (this.menuType[0] == it.type) {
							this.chooseMenu = it;
						}
					}
					for (let int of this.speechList) {
						if (this.chooseMenu.type == int.type) {
							this.$store.commit('setWin', {
								content: '请勿添加重复的功能',
								winType: 'alert',
								title: '操作提示'
							});
							return false;
						}
					}
					if (this.detail != '') {
						for (let i = 0; i < this.speechList.length; i++) {
							if (this.speechList[i].type == this.detail.type) {
								this.speechList.splice(i, 1, this.chooseMenu);
							}
						}
					} else {
						this.speechList.push(this.chooseMenu);
					}
				}
				this.$emit('getAppliedWin', res, this.speechList);
			}
		},
		computed: {

		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'Win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /* webpackChunkName: 'mul_select' */ 'src/components/mul_select'),
		},
		mounted() {
			if (this.detail != '') {
				this.menuType.push(this.detail.type);
			}
		}
	};
</script>
<style scoped>
	#tan {
		padding: 20px;
	}
</style>