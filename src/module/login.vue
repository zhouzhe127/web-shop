<template>
	<section id="login">
		<!-- <canvas id="cas"></canvas> -->
		<section class="container">
			<!-- <div class="zhezhao"></div> -->
			<section class="content">
				<section class="forms" style="padding: 0;">
					<label for="" style="position: relative;width:100%;height:20px;">
						<!-- <section class="identity">
							<a style="float: left;" v-on:click="setIdentity(1)" :class="{'active': identity == 1}" href="javascript:void(0);">管理员登录</a>
							<a v-on:click="setIdentity(0)" :class="{'active': identity == 0}" href="javascript:void(0)">普通登录</a>
						</section> -->
					</label>
					<label id="ph" for='name' ref='ph' style="width:100%;height: 47px;">
						<input style="width:375px;color: #333;" placeholder='请输入手机号' id='name' type="text" maxlength="11" autocomplete="off" v-model="phone" />
					</label>
					<label id="pw" for='pass' ref='pw' style="width:100%;height: 47px;">
						<input style="width:375px;color: #333;" placeholder='请输入密码' id='pass' type="password" maxlength="20" @blur="changeType(false)" autocomplete="off" v-model="password" />
					</label>
					<label class="mbottom"><input type="button" value="登录" class="btn" style="width:375px;cursor:pointer;background-color: #E0BB49;" v-on:click="login" /></label>
					<section class="tip" ref='tip' v-if='tipsShow' style="color: #ea3b44;font-size: 16px;">{{tips}}</section>
					<section class="fr form-footer" style="padding-top:5px;text-align: right;font-size: 14px;color: #999;"> 当前版本{{version}}</section>
				</section>
			</section>

		</section>
	</section>
</template>

<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import timer from 'src/verdor/timer';
import httpMd5 from 'src/manager/httpMd5';
import global from 'src/manager/global';

export default {
	data() {
		/* eslint-disable no-undef */
		return {
			version: process.env.VERSION.version,
			phone: '',
			password: '',
			pwtype: false,
			phtype: false,
			identity: 1, // 身份，0 员工         1 老板
			tips: '账号或密码错误',
			tipsShow: false,
		};
	},

	computed: {
		spassword: {
			get: function() {
				if (this.password.length == 0) return '请输入密码';
				let ret = '';
				for (let i = 0; i < this.password.length; i++) {
					ret += '•';
				}
				return ret;
			},
			// set: function(value) {}
		},
		sphone: {
			get: function() {
				return this.phone ? this.phone : '请输入手机号';
			},
			// set: function(value) {}
		}
	},
	methods: {
		//判断是老板或者员工
		// setIdentity: function(i) {
		// 	this.identity = i;
		// },
		changePhType: function(b) {
			this.phtype = b;
		},
		changeType: function(b) {
			this.pwtype = b;
		},
		async login() {
			let nameReg = /^1[\d]{10,10}$/;
			let passwordReg = /^[^\s]{6,20}$/;
			let name = this.phone + '';
			let password = this.password + '';
			if (!nameReg.test(name)) {
				this.tipsShow = true;
				this.tips = '手机号格式错误。';
				return false;
			}

			if (!passwordReg.test(password)) {
				this.tipsShow = true;
				this.tips = '密码格式错误。';
				return false;
			}

			this.tipsShow = false;

			let data = await http.newLogin({
				data: { mobile: name, password: password }
			});
			httpMd5.setKey(data.sdKey);
			storage.session('sdkey', data.sdKey);
			global.uploadUrl = data.uploadUrl = data.uploadUrl + '/';

			data.isBoss = this.identity; //添加登陆者的身份
			storage.session('userShop', data);
			storage.session('token', data.accessToken);
			this.$store.commit('setCurrentPage', false);
			this.$router.push('brandAudit');
		},
		enter: function(event) {
			if (event.keyCode == 13 || event.which == 13) {
				this.changePhType(false);
				this.changeType(false);
				setTimeout(this.login, 200);
			}
		}
	},
	beforeDestroy() {
		timer.clear(this.timer);
		document.removeEventListener('keyup', this.enter);
	},
	mounted: function() {
		document.addEventListener('keyup', this.enter);
		// var os = (function() {
		// 	var UserAgent = navigator.userAgent.toLowerCase();
		// 	console.log(UserAgent);
		// 	return {
		// 		isIpad          : /ipad/.test(UserAgent),
		// 		isIphone        : /iphone os/.test(UserAgent),
		// 		isAndroid       : /android/.test(UserAgent),
		// 		isWindowsCe     : /windows ce/.test(UserAgent),
		// 		isWindowsMobile : /windows mobile/.test(UserAgent),
		// 		isWin2K         : /windows nt 5.0/.test(UserAgent),
		// 		isXP            : /windows nt 5.1/.test(UserAgent),
		// 		isVista         : /windows nt 6.0/.test(UserAgent),
		// 		isWin7          : /windows nt 6.1/.test(UserAgent),
		// 		isWin8          : /windows nt 6.2/.test(UserAgent),
		// 		isWin81         : /windows nt 6.3/.test(UserAgent),
		// 		isMac           : /mac os/.test(UserAgent)
		// 	};
		// }());
		// console.log(os);


		
		// let canvas = document.getElementById('cas');
		// let ctx = canvas.getContext('2d');

		// resize();
		// window.onresize = resize;

		// function resize() {
		// 	canvas.width =
		// 		window.innerWidth ||
		// 		document.documentElement.clientWidth ||
		// 		document.body.clientWidth;
		// 	canvas.height =
		// 		window.innerHeight ||
		// 		document.documentElement.clientHeight ||
		// 		document.body.clientHeight;
		// }

		// // let RAF = (function() {
		// // 	return (
		// // 		window.requestAnimationFrame ||
		// // 		window.webkitRequestAnimationFrame ||
		// // 		window.mozRequestAnimationFrame ||
		// // 		window.oRequestAnimationFrame ||
		// // 		window.msRequestAnimationFrame ||
		// // 		function(callback) {
		// // 			window.setTimeout(callback, 1000 / 60);
		// // 		}
		// // 	);
		// // })();

		// // 鼠标活动时，获取鼠标坐标
		// let warea = { x: null, y: null, max: 20000 };
		// window.onmousemove = function(e) {
		// 	e = e || window.event;

		// 	warea.x = e.clientX;
		// 	warea.y = e.clientY;
		// };
		// window.onmouseout = function() {
		// 	warea.x = null;
		// 	warea.y = null;
		// };

		// // 添加粒子
		// // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
		// let dots = [];
		// let num = parseInt(canvas.width / 18);
		// //              sd.log(num);
		// for (let i = 0; i < num; i++) {
		// 	let x = Math.random() * canvas.width;
		// 	let y = Math.random() * canvas.height;
		// 	let xa = Math.random() * 2 - 1;
		// 	let ya = Math.random() * 2 - 1;

		// 	dots.push({
		// 		x: x,
		// 		y: y,
		// 		xa: xa,
		// 		ya: ya,
		// 		max: 40000 //线的长度
		// 	});
		// }

		// // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
		// setTimeout(() => {
		// 	animate();
		// 	this.timer = timer.add(animate, 1000 / 60, 0);
		// }, 100);

		// // 每一帧循环的逻辑
		// function animate() {
		// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

		// 	ctx.fillStyle = '#262626';
		// 	ctx.fillRect(0, 0, canvas.width, canvas.height);
		// 	// 将鼠标坐标添加进去，产生一个用于比对距离的点数组
		// 	let ndots = [warea].concat(dots);

		// 	dots.forEach(function(dot) {
		// 		// 粒子位移 , 最后一个数越大速度越慢
		// 		dot.x += dot.xa / 2;
		// 		dot.y += dot.ya / 2;

		// 		// 遇到边界将加速度反向
		// 		dot.xa *= dot.x > canvas.width || dot.x < 0 ? -1 : 1;
		// 		dot.ya *= dot.y > canvas.height || dot.y < 0 ? -1 : 1;

		// 		// 绘制点
		// 		ctx.beginPath();
		// 		ctx.arc(dot.x, dot.y, 5, 0, 5 * Math.PI);
		// 		ctx.fillStyle = '#7A6836';
		// 		ctx.fill();
		// 		//          ctx.fillRect(dot.x - 7.5, dot.y - 7.5, 15, 15);
		// 		ctx.stroke();
		// 		ctx.beginPath();
		// 		// 循环比对粒子间的距离
		// 		for (let i = 0; i < ndots.length; i++) {
		// 			let d2 = ndots[i];

		// 			if (dot === d2 || d2.x === null || d2.y === null) continue;

		// 			let xc = dot.x - d2.x;
		// 			let yc = dot.y - d2.y;

		// 			// 两个粒子之间的距离
		// 			let dis = xc * xc + yc * yc;

		// 			// 距离比
		// 			let ratio =0;

		// 			// 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
		// 			if (dis < d2.max) {
		// 				// 如果是鼠标，则让粒子向鼠标的位置移动 , 最后的数越大跟随鼠标越多越快
		// 				if (d2 === warea && dis > d2.max / 2) {
		// 					dot.x -= xc * 0.01;
		// 					dot.y -= yc * 0.01;
		// 				}

		// 				// 计算距离比
		// 				ratio = (d2.max - dis) / d2.max;

		// 				// 画线
		// 				ctx.beginPath();
		// 				ctx.lineWidth = 3 * ratio;
		// 				ctx.strokeStyle =
		// 					'rgba(214,177,71,' + (ratio + 30) + ')';
		// 				ctx.arc(dot.x, dot.y, 10 * ratio, 0, 2 * Math.PI);
		// 				ctx.moveTo(dot.x, dot.y);
		// 				ctx.lineTo(d2.x, d2.y);
		// 				ctx.stroke();
		// 			}
		// 		}

		// 		// 将已经计算过的粒子从数组中删除
		// 		ndots.splice(ndots.indexOf(dot), 1);
		// 	});
		// }
	}
};
</script>


<style lang="less" scoped>
#login {
	background-color: #262626;
	// position: relative;
	width: 100%;
	color: red;
	height: 100%;
	background-image: url(../res/images/bg.png);
	background-size: 100%;
	.mbottom {
		margin-bottom: 0 !important;
	}
	canvas {
		position: absolute;
		top: 0;
	}
	section.container {
		position: absolute;
		height: 100%;
		width: 825px;
		margin: 0 auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		.content {
			padding-left: 240px;
			margin: auto auto;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			bottom: 0;
			right: 0;
			width: 616px;
			height: 302px;
			background: url(../res/images/loginbg.png) no-repeat;
			background-position: 20px 35px;
			input:-webkit-autofill,
			textarea:-webkit-autofill,
			select:-webkit-autofill {
				background-color: white;
				background-image: none;
				color: rgb(0, 0, 0);
			}

			.tip {
				line-height: 30px;
				position: absolute;
				bottom: 20px;
				left: 240px;
				overflow: hidden;
				width: 180px;
				height: 30px;
				text-indent: 30px;
				color: #ea5514;
				background: url('../res/images/tip.png') 0 no-repeat;
			}
		}
		.identity {
			width: 100%;
		}
		.identity a {
			color: #999999;
			text-align: center;
			line-height: 40px;
			float: left;
			height: 40px;
			width: 50%;
			font-size: 16px;
			border-bottom: 2px #999999 solid;
			display: block;
			&.active {
				color: #dfbc48;
				border-bottom: 2px #dfbc48 solid;
			}
		}
	}
}
#login .zhezhao {
	width: 825px;
	height: 100%;
	position: absolute;
	z-index: 1;
	top: 0;
	// left: 45%;margin-left: -395px;
	background-image: -webkit-gradient(
		linear,
		100% 0,
		0 0,
		from(rgba(38, 38, 38, 0.1)),
		color-stop(0.5, #262626),
		to(rgba(38, 38, 38, 0.1))
	);
	background-image: -webkit-linear-gradient(
		to right,
		rgba(38, 38, 38, 0.1),
		#262626,
		rgba(38, 38, 38, 0.1)
	);
	background-image: -moz-linear-gradient(
		to right,
		rgba(38, 38, 38, 0.1),
		#262626,
		rgba(38, 38, 38, 0.1)
	);
	background-image: -o-linear-gradient(
		to right,
		rgba(38, 38, 38, 0.1),
		#262626,
		rgba(38, 38, 38, 0.1)
	);
	background-image: linear-gradient(
		to right,
		rgba(38, 38, 38, 0.1),
		#262626,
		rgba(38, 38, 38, 0.1)
	);
	margin: 0 auto;
}
</style>
