<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				立即注册
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						:value="mobile" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-code ">
					<text class="tit">获取验证码</text>
					<input 
						type="number" 
						:value="code" 
						placeholder="请输入验证码"
						maxlength="11"
						data-key="code"
						@input="inputChange"
					/>
					<view class="code text-right text-white" v-show="stus == true" @click="getcaptcha">{{ text }}</view>
					<view class="code text-right text-white" v-show="stus == false">{{ text }}S重新获取</view>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="password" 
						value="" 
						placeholder="8-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
				<view class="input-item">
					<text class="tit">邀请码</text>
					<input 
						type="number" 
						value="" 
						placeholder="必填"
						placeholder-class="input-empty"
						maxlength="20"
						data-key="idnum"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
				
			</view>
			<button class="confirm-btn" @click="toLogin">注册</button>
			<!-- <view class="forget-section">
				忘记密码?
			</view> -->
		</view>
		<view class="register-section">
			已有账号?
			<text @click="goLogin">马上登录</text>
		</view>
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				logining: false,
				stus: true, //倒计时标识
				sunmax: 60,
				text: '获取验证码',
				code:'',
				idnum:''
			}
		},
		onLoad(){
			// console.log(this.$common.baseUrl)
		},
		methods: {
			...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			// 获取验证码
			getcaptcha(){
				if (/^1[345789]\d{9}$/.test(this.mobile)) {
					this.stus = false;
					this.text = this.sunmax;
					let timeInt = setInterval(() => {
						this.text--;
						if (this.text <= 0) {
							this.stus = true;
							this.text = '获取验证码';
							clearInterval(timeInt);
						}
					}, 1000);
					var obj = {
						mobile: this.mobile
					};
					console.log(obj)
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {
						}
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
			},
			goLogin() {
				uni.navigateTo({
					url: "/pages/public/login"
				})
			},
			// toRegist(){
			// 	this.$api.msg('去注册');
			// },
			toLogin(){
				var obj={
					mobile:this.mobile,
					password:this.password,
					code:this.code,
					idnum:this.idnum
				}
				console.log(obj)
				this.$common.requests('/api/user/register', obj).then(res => {
					this.$api.msg(res.data.msg);
					if(res.data.code == 1){
						// this.$api.msg(res.msg)
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/public/login'
							})
						}, 800)
					}
				 })
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.input-code{
		padding: 0 30upx;
		background:#F7F7F7;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: #000000;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}
	.code{
		width:200rpx;
		height:50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #000000;
		position: relative;
		top:-74rpx;
		left:340rpx;
		border-radius: 20rpx;
	}
	.container{
		padding-top: 75px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #000000;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:#F7F7F7;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: #000000;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 20px;
		margin-top: 70upx;
		background: #000000;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
