<template>
	<win :width="591" :height="350" @winEvent="winEvent">
		<span slot="title">{{title}}</span>
		<div class="user_group_content" slot="content">
			<mul-select :isradio="index == 1?true:false" :styles="{minWidth: '101px',margin: '5px',backgroundColor: 'rgb(236,236,236)'}"
			    :list.sync="list" :selects.sync="result" :name="'name'" :key='"id"'></mul-select>
		</div>
	</win>
</template>

<script>
	export default {
		data() {
			return {
				list: this.showList,
				result: [],
				title: ''
			};
		},
		props: ['showList', 'index'],
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					this.$emit('closeWin', {
						data: this.result
					});
				} else {
					this.$emit('closeWin');
				}
			},
			editUserGroup() {
				if (this.index == 1) { //  设置用户组

				} else { //  设置标签

				}
			}
		},
		mounted() {
			this.index == 1 ? this.title = '设置用户组' : this.title = '设置标签';
		},
		components: {
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select')
		}
	};
</script>

<style lang="less" scoped>
	.user_group_content {
		padding: 50px 65px;
	}
</style>