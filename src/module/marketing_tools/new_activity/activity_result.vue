<template>
	<Win :width='597' :height='333' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">筛选结果</span>
		<div id="tan" slot="content" v-cloak>
			<p>共关联出</p>
			<h1>{{member}}位</h1>
			<p>会员</p>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';
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
				content: '继续筛选',
				style: {
					backgroundColor: '#b3b3b3',
					color: '#fff'
				}
			},
			member: '' //会员人数
		};
	},
	props: {
		chooseData: Object // 筛选条件
	},
	methods: {
		getAppliedWin: function(res) {
			if (res == 'ok') {
				this.$emit('getAppliedWin', res, this.member);
			} else {
				this.$emit('getAppliedWin', res);
			}
		},
		async chooseMember() {
			let data = await http.chooseMember({
				data: {
					chooseData: this.chooseData
				}
			});
			this.member = data;
		}
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
	},
	mounted() {
		this.chooseMember();
	}
};
</script>
<style scoped>
#tan {
	padding-top: 112px;
}

#tan h1 {
	/* font-weight: bold; */
	font-size: 40px;
	text-align: center;
	color: #333333;
	margin-bottom: 48px;
}

#tan p {
	text-align: center;
	margin-bottom: 48px;
}
</style>