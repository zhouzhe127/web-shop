<!--
    **来源统计弹窗
    * 
    * 孔伟研
    * *
    * 
-->
<template>
	<win @winEvent="statisticsManagementWin" :align="'center'" :width="500" :height="350" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<div id="sources-window" style="background-color: #F2F2F2;width: 500px;">
				<section v-if="types == 'edit'">
					<div class="name" style="padding-top:20px;padding-left: 20px;">
						<span class="required " style="margin-right: 20px;">来源名称 </span>

						<input type="text" maxlength="16" class="input" style="width: 335px;line-height:40px;" placeholder="输入名称" v-model="sname"
						/>
					</div>
					<div class="code-operation" style="margin: 20px 0;padding-left: 20px;">
						二维码：
						<a href="javascript:void(0);" class="green" style="width: 88px;height:40px;margin-left: 21px;line-height: 40px;" @click="resetSources()">重置</a>
					</div>
					<div class="code-show" style="text-align: left;margin-top: 40px;padding-bottom: 38px;">
						<img :src="simgUrl" alt="" width="150" height="150" style="margin-left:100px;" />
					</div>
				</section>
				<section v-if="types == 'add'">
					<div class="name" style="padding: 80px 0 80px 20px;height:350px">
						<span class="required " style="margin-right: 20px;">来源名称</span>
						<input type="text" maxlength="16" class="input" style="width: 335px;" placeholder="输入名称" v-model="sname"
						/>
					</div>
				</section>
			</div>
		</div>
	</win>
</template>

<script>
	import win from 'src/components/win.vue';
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				simgUrl: '',
				sname: '',
				title: '',
				okStyle: null,
				cancelStyle: null
			};
		},
		components: {
			win,
			subaddBtn: () =>
				import ( /* webpackChunkName:'radio_btn' */ 'src/components/subadd')
		},
		props: {
			detial: Object, //来源详情
			types: String //添加或修改
		},
		mounted() {
			this.sname = this.detial.name;
			this.simgUrl = this.detial.imageUrl;
			// console.log(this.types)
			if (this.types == 'add') {
				this.title = '新建来源信息';
				this.okStyle = {
					content: '保存',
					style: {
						backgroundColor: '#bd823e',
						color: '#fff'
					}
				};
				this.cancelStyle = {
					content: '取消',
					style: {
						backgroundColor: '#a0a0a0',
						color: '#fff'
					}
				};
			} else if (this.types == 'edit') {
				this.title = '修改来源信息';
				this.okStyle = {
					content: '确定',
					style: {
						backgroundColor: '#29ABE2',
						color: '#fff'
					}
				};
				this.cancelStyle = {
					content: '取消',
					style: {
						backgroundColor: '#a0a0a0',
						color: '#fff'
					}
				};
			}
		},
		methods: {
			statisticsManagementWin: function (res) {
				let item = {};
				item.name = this.sname;
				item.imageUrl = this.simgUrl;
				item.types = this.types;
				item.id = this.detial.id;
				this.$emit('statisticsManagementWin', res, item);
			},
			async resetSources() {
				let shopId = storage.session('userShop').currentShop.id;
				this.imgUrl = await http.resetQR({
					data: {
						shopId: shopId,
						id: this.detial.id
					}
				});
			}
		}
	};
</script>