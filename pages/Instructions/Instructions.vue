<template>
	<view class="content">
		<view class="head flexs1">
				   <view class=" head_title text-white text-center flexs">
					   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
						<view class="head_left">
							<image  :src="baseUrl+avatar"   class="tx"></image>
							<view class="name">{{username}}</view>
						</view>
				   </view>
				  <view class="title text-white ">{{langtype=='CH'?langch.shiyong:langen.shiyong}}</view>
		</view>
		<view class="header">标题</view>
		<view class="top">
			<image src="../../static/image/img_tp_30xwzx@2x.png" class="pic"></image>
			<view class="artical">
				在今天的室内装饰中，健康问题越来越受到消费者的关注。很多人已经了解了室内污染的危害，也希望改善生活环境，但往往他们付出了很多努力但却达
				不到预期的效果。这主要是由于对治理方法缺乏了解。	1.民间法.目前，有许多类型的土方受人们欢迎。有几种方法和几种类型，如茶，盐，醋，菠萝
				和其他可用于控制污染的材料。但在客观分析中，这些方法与早期的流行巫医相似。跳起来跳舞并阅读诅咒可以“治愈所有疾病”。偶尔，它可以治愈几个，
				但我担心更多的是只有心理作用。
			</view>
			<image src="../../static/image/img_tp_30xwzx@2x.png" class="pic"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				langch:{
					shiyong:'使用说明',
				},
				langen:{
					shiyong:'Instructions',
				},
				langtype:'',
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH'
		},
		methods: {
			back(){
				 uni.navigateBack({
					delta:1
				 })
			},
		}
	}
</script>

<style>
	/* 头像样式 */
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
	.header{
		font-weight:bold;
		text-align:center;
		font-size:36rpx;
		margin-top:30rpx;
	}
	.top{
		margin-top:28rpx;
		text-align:center;
	}
	.pic{
		width:712rpx;
		height:303rpx;
	}
	.artical{
	margin-top:38rpx;
	text-align:justify;
	width:94%;
	margin-left:20rpx;
	}
</style>
