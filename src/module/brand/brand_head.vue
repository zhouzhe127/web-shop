<template>
	<header>
		<section class="head-logo fl">
			<a href="javascript:void(0);" class="logo"> </a>
		</section>
		<section class="uname fr">
			<section class="user-tit">{{userName}}<i></i>
				<a v-on:click="backToList" href="javascript:void(0);" class="uname-list" v-if="show">返回店铺</a>
				<a v-on:click="backLogin" href="javascript:void(0);" class="uname-list" :style="{top:show?'130px':'65px'}">退出登录</a>
			</section>
		</section>
	</header>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				userData: ''
			};
		},
		methods: {
			//退出登录
			backLogin: function() {
				storage.session(null);
				this.$store.commit('setlogoName', '');
				this.changeColor();
				this.$router.push('/');
			},
			backToList: function() {
				this.changeColor();
				this.$router.push('/brandAudit');
				this.$store.commit('setCurrentPage', false);
				this.$store.commit('setlogoName', this.userData.user.name);
			},
			changeColor() {
				document.querySelector('body').style.backgroundColor = 'rgb(247,247,247)';
			}
		},
		mounted: function() {
			this.userData = storage.session('userShop');
			if(this.$store.state.logoName == '') {
				this.$store.commit('setlogoName', this.userData.user.name);
			}

			let a = document.querySelector('.head-logo');
			let i = 0;
			a.addEventListener('click', () => {
				i++;
				if(i % 3 == 0) this.$store.commit('setDebugDis', true);
			});

		},
		computed: {
			show() {
				return this.$store.state.currentPage;
			},
			userName() {
				return this.$store.state.logoName;
			}
		}
	};
</script>
<style type="text/css" scoped>
	header {
		min-width: 800px;
		height: 65px;
		background-color: #fff;
		border-bottom: 1px #eee solid;
	}
	
	header .head-logo {
		overflow: hidden;
		width: 175px;
		height: 65px;
		background: url('../../res/images/logo.png') center center no-repeat
	}
	
	header .head-logo a {
		width: 175px;
		height: 65px
	}
	
	header .uname {
		line-height: 65px;
		height: 65px;
		margin-right: 60px;
		color: #b0b0b0
	}
	
	header .uname .user-tit {
		position: relative;
		height: 65px;
		padding-right: 10px;
		cursor: pointer;
		transition: color .3s ease-out;
		text-align: left
	}
	
	header .uname .user-tit:hover i {
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		-o-transform: rotate(180deg);
		transform: rotate(180deg)
	}
	
	header .uname .user-tit i {
		position: relative;
		top: -2px;
		left: 10px;
		display: inline-block;
		width: 12px;
		height: 7px;
		transition: all .3s ease-out;
		background-image: url('../../res/images/arrow.png');
		background-repeat: no-repeat;
		background-position: center right
	}
	
	header .uname .user-tit .uname-list {
		position: absolute;
		z-index: 100;
		top: 65px;
		right: 0;
		display: none;
		width: 100px;
		background-color: #000
	}
	
	header .uname .user-tit:hover .uname-list {
		display: block
	}
</style>