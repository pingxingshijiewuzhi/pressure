<template>
	<view class="content flexs">
		<view class="login">
			<view class="title flexs text-bold">登录</view>
			<view class="login_input ">
				<input type="number" placeholder="账号" v-model="account" />
				<input type="password" placeholder="密码" v-model="password" />
			</view>
			<view class=" login_register  flexs4 text-bold" @click="toRegister">去注册</view>
			<view class="flexs">
				<view class="login_btn ">
					<view class="flexs text-white text-bold" @click="gologin">登录</view>
				</view>
			</view>
			<view class=" type flexs3">
				<view class="line"></view>
				<view >快捷登录</view>
				<view class="line"></view>
			</view>
			<view class="login_bottom flexs">
				<image src="../../static/image/icon_wx_0dl@2x.png"></image>
				<image src="../../static/image/icon_qq_0dl@2x.png"></image>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:'',
				password:''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.setWakelock()
			// #endif
		},
		methods: {
				// 设置应用保持唤醒（屏幕常亮）状态
			// #ifdef APP-PLUS
			setWakelock() {
				// console.log('设备常亮吗')
				plus.device.setWakelock(true);
			},
			// #endif
			toRegister(){
				uni.navigateTo({
				    url: '../register/register'
				});
			},
			gologin(){
				var obj={
					account:this.account,
					password:this.password,
				}
				this.$common.requests('/api/user/login', obj).then(res => {
					this.$api.msg(res.data.msg);
					if(res.data.code==1){
						var data = res.data.data.userinfo;
						uni.setStorageSync('uid', data.user_id);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('userinfo', data);
						// 已登录就允许执行实时监听
						uni.setStorageSync('autorealtime', true);
						
						// 不跳转控制面板，修改跳转实时测试
						uni.navigateTo({
							url: '../realtime/realtime'
						})
						// uni.navigateTo({
						// 	url: '../personalCenter/personalCenter'
						// })
					}
				});
			}
		}
	}
</script>

<style>
	.content{
		height: 100vh;
		width:100vw;
		background-image: url(../../static/image/img_bj_0dl@2x.png) ;
	
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center 0;
		position: absolute;
	}
	.login{
		width:85%;
		height:75%;
		background-color:#FFFFFF;
		border-radius: 20rpx;
	}
	.title{
		font-size:36rpx;
		margin-top:60rpx;
	}
	.login_input{
		margin-top:120rpx;
	}
	.content input {
		height: 50upx !important;
		width:530rpx;
		margin: 80rpx 0 0 38rpx;
		text-align: left;
		border-bottom: 1px solid #eaeaea !important;
		font-size: 32upx;
	}
	.uni-input-placeholder{
		left:8rpx;
	}
	.login_register{
		margin-right:40rpx;
		margin-top:30rpx;
		color:#5E79EC;
	}
	.login_btn{
		width:80%;
		height:100rpx;
		border-radius: 50rpx;
		font-size:32rpx;
		margin-top:150rpx;
		background: #D4DEFA;
	}
	.login_btn view{
		line-height: 100rpx;
	}
		
	.type{
		font-size:28rpx;
		margin-top:40rpx;
		color:#3E3E3E;
	}
	.line{
		border-bottom:1px solid #9E9E9E;
		width:25%;
	}
	.login_bottom image{
		width:9%;
		height:70rpx;
		margin:50rpx 70rpx 0 0;
		
	}
	.login_bottom{
		margin-left:70rpx;
	}
</style>
