<template>
	<div id="maincon" ref='maincon'>
		<div id="aside" ref="aside">
			<router-view name="aside"></router-view>
		</div>
		<div id="details" ref="detailsMain">
			<div class="details_header">
				<router-view name="details_header"></router-view>
			</div>
			<div class="details_con" ref="detailsCon" v-iscroll>
				<div ref='fixWidth'>
					<router-view name="details_con"></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import storage from 'src/verdor/storage';
	// var userData = storage.session('userShop');
	export default {
		data() {
			return {
				userData: storage.session('userShop'),
				screenWidth: '',
				fixWidth: ''
			};
		},
		mounted: function () {
			// let usableWidth = this.$refs.detailsCon.clientWidth;
			this.screenWidth = this.$refs.detailsCon.clientWidth;

			let fixWidth = this.fixWidth = this.$refs.fixWidth;
			fixWidth.style.width = this.screenWidth - 15 + 'px';

			window.onresize = () => {
				return (() => {
					if (this.$refs.detailsCon) {
						this.screenWidth = this.$refs.detailsCon.clientWidth;
						fixWidth.style.width = this.screenWidth - 15 + 'px';
					}
				})();
			};
			this.$store.commit('setlogoName', this.userData.currentShop.newName);

		},
		computed: {
			asideWidth: function () {
				return this.$store.state.asideWidth;
			}
		},
		destroyed: function () {
			storage.session('aside', null);
		},
		watch: {
			screenWidth() {
				this.$store.commit('setusableWidth', this.screenWidth);
			},
			asideWidth() {
				this.screenWidth = this.$refs.detailsCon.clientWidth;
				this.fixWidth.style.width = this.screenWidth - 15 + 'px';
				this.$store.commit('setusableWidth', this.screenWidth);
			}
		}
	};
</script>
<style lang="less" scoped>
	#maincon {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		background-color: #ffffff;
		height: 100%;
		position: relative;
		#aside {
			height: auto;
			position: relative;
		}
		#details {
			margin-left: 20px;
			flex: 1;
			display: flex;
			flex-direction: column;

			overflow: hidden;
			padding-right: 10px;

			.details_con {
				flex: 1;

				overflow: hidden;
				padding-right: 12px;

			}
		}
	}
</style>