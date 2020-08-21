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
				  <view class="title text-white ">{{langtype=='CH'?langch.xinwen:langen.xinwen}}</view>
		</view>
		<view class="body">
			<view class="body_list" v-for="(item,index) in list" :key="index" @click="toNext(item.id)">
				<view class="body_left">
					<image :src="urls+item.index_image" class="pic"></image>
				</view>
				<view class="body_right">
					   <view class="article_title">{{item.name}}</view>
					   <view class="text">{{item.content}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				langch:{
					xinwen:'新闻资讯',
				},
				langen:{
					xinwen:'News and information',
				},
				langtype:'',
				list:[],
				urls:this.$common.baseUrl,
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH';
			this.initdata();
		},
		methods: {
			initdata(){
				var obj={
				}
				this.$common.requests('/api/News/getNewsList', obj).then(res => {
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
			toNext(id){
				uni.navigateTo({
				    url: '../newsInformation/newsInformation?id='+id
				});
			}
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
		margin-top:32rpx;
	}
	.body_list{
		display:flex;
		justify-content:space-around;
		width:97%;
		margin-left:30rpx;
			margin-top:64rpx;
	}
	.body_left{
		
	}
	.body_right{
		margin-left:20rpx;
		width:380rpx;
	}
	.pic{
		width:216rpx;
		height:133rpx;
	}
	.article_title{
		font-weight:bold;
		font-size:32rpx;
	}
	.text{
		font-size:24rpx;
		margin-top:32rpx;
	}
</style>
