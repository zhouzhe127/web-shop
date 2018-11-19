/** * 新建话术组 * *miaochuan.sha */
<template>
	<div id="speech_config">
		<section class="speech_content">
			<div @click="createSpeech('old',item)" v-for="(item,index) in speechList" :key="index" class="content_list">
				<div class="content_header">
					<span>{{item.name}}</span>
					<span>{{index + 1}}</span>
				</div>
				<div class="content_content">
					<span style="background-color:#6ac2e9;" v-if="item.type == '0'">常用</span>
					<span style="background-color:#fdaa00;" v-if="item.type == '1'">路径</span>
				</div>
				<p class="content_foot">
					<span>数量</span>
					<span>{{item.content.length}}</span>
				</p>
			</div>
			<!-- 暂无数据-->
			<div class="nolist" v-if="speechList <= 0">-&nbsp;&nbsp;暂无话术组,请新建&nbsp;&nbsp;-</div>
		</section>
		<transition name="fade">
			<speech-win :speechId="speechId" :speechName="speechName" :speechs="speechs" :type="type" :speechType="speechType" @closeWin="closeWin" v-if="isShowSpeechWin"></speech-win>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				speechList: [],
				isShowSpeechWin: false,
				speechs: [],
				speechName: '', //话术组的名称
				speechId: '', //话术组的id
				speechType: '', // 话术的类型
				type: '' //类型 常用或路径
			};
		},
		methods: {
			async getSpeechList() {
				let res = await http.getSpeechList();
				this.speechList = Object.values(res);
			},
			createSpeech(type, item) {
				this.type = type;
				if (item && item.type == '0') {
					this.type = 'oldnew';
				} else if (item && item.type == '1') {
					this.type = 'oldpath';
				}
				if (this.judgeLength(type) >= 10) {
					if (type == 'new') {
						this.$store.commit('setWin', {
							content: '最多添加10组常用话术',
							winType: 'alert',
							title: '操作提示'
						});
					} else if (type == 'path') {
						this.$store.commit('setWin', {
							content: '最多添加10组路径话术',
							winType: 'alert',
							title: '操作提示'
						});
					}
					return false;
				}
				this.isShowSpeechWin = true;
				if (type == 'new' || type == 'path') {
					this.speechName = '';
					this.speechs = [];
				} else {
					this.speechName = item.name;
					this.speechs = item.content;
					this.speechId = item.id;
					this.speechType = item.type;
				}
			},
			closeWin(str) {
				this.isShowSpeechWin = false;
				if (str == 'success') {
					this.getSpeechList();
				}
			},
			judgeLength: function(type) {
				let count = 0;
				for (let i = 0; i < this.speechList.length; i++) {
					if (type == 'new' && this.speechList[i].type == '0') {
						count++;
					}
					if (type == 'path' && this.speechList[i].type == '1') {
						count++;
					}
				}
				return count;
			},
			setTitle: function() {
				this.$store.commit('setPageTools', [{
					name: '新建话术组',
					className: 'el-btn-blue',
					fn: () => {
						this.createSpeech('new');
					}
				}, {
					name: '新建路径链接',
					className: 'el-btn-yellow',
					fn: () => {
						this.createSpeech('path');
					}
				}]);
			}
		},
		mounted() {
			this.setTitle();
			this.getSpeechList();
		},
		components: {
			'speech-win': () =>
				import ( /* webpackChunkName: 'speech_win' */ './speech_win')
		}
	};
</script>
<style lang="less" scoped>
	#speech_config {
		.speech_content {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;s
			padding-top: 19px;

			.low_model {
				width: 301px;
				height: 201px;
				margin-right: 24px;
				border: 1px solid RGB(179, 179, 179);

				img {
					width: 55px;
					height: 55px;
					margin: 53px 123px 0px;
				}

				p {
					font-size: 20px;
					color: RGB(179, 179, 179);
					text-align: center;
					margin-top: 24px;
				}
			}

			.content_list {
				margin-right: 24px;
				margin-bottom: 25px;
				border-top: 8px solid RGB(40, 168, 224);
				width: 301px;
				height: 202px;
				background: RGB(242, 242, 242);
				padding: 22px;

				.content_header {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;

					span:nth-child(1) {
						color: RGB(51, 51, 51);
						font-size: 26px;
					}

					span:nth-child(2) {
						font-size: 56px;
						color: RGB(40, 168, 224);
					}
				}

				.content_content {
					height: 44px;
					line-height: 44px;

					span {
						display: inline-block;
						width: 51px;
						height: 24px;
						border-radius: 12px;
						line-height: 24px;
						text-align: center;
						color: #fff;
					}
				}

				.content_foot {
					display: flex;
					flex-direction: column;
					align-items: left;

					span {
						font-size: 14px;
						color: RGB(51, 51, 51);
						margin-top: 15px;
					}
				}
			}

			.nolist {
				width: 1436px;
				text-align: center;
				line-height: 70px;
				font-size: 24px;
				color: #E0E0E0;
				border: 1px solid #E0E0E0;
			}
		}
	}
</style>