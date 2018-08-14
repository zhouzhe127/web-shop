<template>
	<win :width="599" :height="452" :ok="{content: isEdit?'保存':'修改'}" @winEvent="winEvent" :type="'alert'">
		<span slot="title">详细信息</span>
		<div class="details_content" slot="content">
			<ul>
				<li class="username">用户：{{details.name || '--'}}</li>
				<li class="referee">推荐人：{{details.recommendedName || '--'}}</li>
				<li v-if="!isEdit" class="real_name">真实姓名：{{details.realName || '--'}}</li>
				<li v-if="isEdit" class="real_name">真实姓名：
					<input maxlength="20" type="text" v-model.trim="name">
				</li>
				<li v-if="!isEdit" class="mobile_phone">手机号：{{details.mobile || '--'}}</li>
				<li v-if="isEdit" class="mobile_phone">手机号：
					<input maxlength="11" v-model.trim="phone" type="text" onkeyup="value=value.replace(/[^\d]/g,'')">
				</li>
				<li class="current_inter">当前积分：{{details.points || '--'}}</li>
				<li class="belong_group">所在分组：{{details.groupName || '--'}}</li>
				<li class="belong_group">标签：{{details.tagsStr || '--'}}</li>
			</ul>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
export default {
	data() {
		return {
			details: '',
			phone: '',
			name: '',
			isEdit: false,
			iNd: 1
		};
	},
	props: ['detailInfo'],
	watch: {
		isEdit(val) {
			if (val) {
				console.log(val);
			}
		}
	},
	methods: {
		winEvent(str) {
			if (str == 'ok') {
				this.isEdit = true;
				++this.iNd;
				if (this.isEdit && this.iNd > 2) {
					this.editFansInfo();
				}
			} else {
				this.$emit('closeWin');
			}
		},
		async editFansInfo() {
			if (!global.checkData(
				{
					name: {
						cond: `$$.trim()!=''`,
						pro: '请输入姓名'
					},
					phone: {
						cond: '/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(16[0-9]))\\d{8}$/g.test($$)',
						pro: '请输入正确的手机号'
					}
				}, 
				this)) {
				return false;
			}
			await http.setMobileAndRealName({
				data: {
					id: this.details.id,
					name: this.name,
					mobile: this.phone
				}
			});
			this.$store.commit('setWin', {
				content: '修改成功',
				title: '操作提示',
				winType: 'alert'
			});
			this.$emit('closeWin', {
				name: this.name,
				mobile: this.phone
			});
		}
	},
	mounted() {
		this.details = utils.deepCopy(this.detailInfo);
		this.details.points = Number(this.details.memberId) > 0 ? this.details.memberPoint :this.details.point;
		this.phone = this.details.mobile;
		this.name = this.details.realName;
	},
	components: {
		'win': () =>
			import ( /* webpackChunkName: 'win' */ 'src/components/win'),
	}
};
</script>

<style lang="less" scoped>
	.details_content {
		padding: 52px 56px;
		ul {
			li {
				margin-bottom: 42px;
				color: RGB(51, 51, 51);
				font-size: 16px;
				input {
					width: 216px;
					height: 41px;
					padding: 0 17px;
				}
			}
			.belong_group {
				line-height: 22px;
			}
			.real_name {
				input {
					margin-left: 25px;
				}
			}
			.mobile_phone {
				input {
					margin-left: 41px;
				}
			}
		}
	}
</style>