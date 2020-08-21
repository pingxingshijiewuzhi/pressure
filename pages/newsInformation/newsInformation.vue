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
		<view class="top">
			<image :src="urls+list.index_image" class="pic"></image>
		</view>
		    <view class="method">
			    {{list.name}}
			</view>
	            	<view class="date">
			            发布时间:{{list.createtime}}
		            </view>
			<view class="artical">
				<rich-text :nodes="list.content"></rich-text>
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
				id:'',
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
			}
		},
		onLoad(option){
			this.id = option.id;
			this.initdata();
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang')?uni.getStorageSync('lang'):'CH';
			
		},
		
		methods: {
			initdata(){
				var obj={
					news_id:this.id
				}
				this.$common.requests('/api/News/getNewsDetail', obj).then(res => {
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
	.top{
		margin-top:20rpx;
		text-align:center;
	}
	.pic{
		width:712rpx;
		height:303rpx;
	}
	.method{
		margin-top:28rpx;
		font-size:36rpx;
		font-weight:bold;
		text-align:center;
		}
		.date{
		color:#888888;
		text-align:center;
		margin-top:25rpx;
		}
		.artical{
		margin-top:38rpx;
		text-align:justify;
		width:94%;
		margin-left:20rpx;
		}
</style>
