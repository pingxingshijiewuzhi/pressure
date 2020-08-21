<template>
	<view class="content">
		<view class="head flexs1">
				   <view class=" head_title text-white text-center flexs">
					   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
						<view class="head_left">
							<image  :src="baseUrl+avatar"  class="tx"></image>
							<view class="name">{{username}}</view>
						</view>
				   </view>
				  <view class="title text-white ">{{langtype=='CH'?langch.guanzhu:langen.guanzhu}}</view>
		</view>
		<view class="body">
			<image :src="urls+list" class="code"></image>
			<view class="text">扫码关注我们</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				langch:{
					guanzhu:'关注我们',
				},
				langen:{
					guanzhu:'Instructions',
				},
				langtype:'',
				list:'',
				baseUrl:this.$common.baseUrl,
				urls:this.$common.baseUrl,
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
			}
		},
		onShow() {
			this.initdata();
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
		},
		methods: {
			initdata(){
				var obj={
				}
				this.$common.requests('/api/Other/follow_me', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if(res.data.code==1){
						this.list = res.data.data
					}
				});
			},
			back(){
				 uni.navigateBack({
					delta:1
				 })
			},
		}
	}
</script>

<style>
	.tx{
		border-radius: 50%;
	}
.content{
		height:100vh;
	}
.head{
		height:260rpx;
		width:100%;
		background-color: #3F7BE9;
	}
	.head_title{
		width:30%;
		padding-top:60rpx;
	}
	.head_img{
		width:24rpx;
		height:38rpx;
		margin-bottom: 30rpx;
	}
	.head_left{
		margin-left:30rpx
	}
	.head_left image{
		width:115rpx;
		height:115rpx;
	}
	.title{
		font-size: 40rpx;
		margin-top:60rpx;
		margin-left:80rpx
	}
	.body{
		background-image:url(../../static/image/img_bj_29gzwm@2x.png);
		width:750rpx;
		height:1125rpx;
		background-repeat:no-repeat;
		background-size: cover;
	}
	.code{
		width:148rpx;
		height:148rpx;
		margin-top:492rpx;
		margin-left:295rpx;
	}
	.text{
		margin-top:65rpx;
        width:228rpx;
		margin-left:258rpx;
		text-align:center;
		color:#EDFCF4;
	}
</style>
