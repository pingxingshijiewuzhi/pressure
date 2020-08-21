<template>
	<view class="content">
		<view class="head flexs2">
			<view class=" head_title text-white text-center flexs">
			   <image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image  :src="baseUrl+avatar"  class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
			</view>
			<view class="title">
				<view class=" text-white">PDF报告查询</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>星期{{week}}</view>
				<view>{{year}}/{{month}}</view>
			</view>		
		</view>
		<view class="box flexs3">
			<view @click="dailyReport">
				<image class="box_img" src="../../static/image/icon_wjj_16jtbgcx@2x.png"></image>
				<view class="box_type">日曲线报告</view>
			</view>
			<view @click="monthlyReport">
				<image class="box_img" src="../../static/image/icon_wjj_16jtbgcx@2x.png"></image>
				<view class="box_type">月曲线报告</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				baseUrl:this.$common.baseUrl,
				hour: new Date().getHours(),
				min: new Date().getMinutes(),
				sec: new Date().getSeconds(),
				year: new Date().getFullYear(),
				week: ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()],
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
			}
		},
		onShow(){
			this.getTime()
		},
		methods:{
			dailyReport(){
				uni.navigateTo({
					url:'../dailyReport/dailyReport'
				})
			},
			monthlyReport(){
					uni.navigateTo({
						url:'../monthPort/monthPort'
					})
			},
			back(){
				 uni.navigateBack({
					delta:1
				 })
			},
			getTime: function() {
				setInterval(() => {
					var aData = new Date();
					this.min = aData.getMinutes();
					this.hour = aData.getHours();
					// sec: new Date().getSeconds(),
					this.sec = aData.getSeconds();
					this.year = aData.getFullYear();
					this.month = aData.getMonth() + 1;
					let weeks = ['日', '一', '二', '三', '四', '五', '六']
					this.week = weeks[aData.getDay()]
					this.day = aData.getDate();
					this.min = aData.getMinutes();
				}, 1000)
			}
		}
	}
</script>

<style>
	/* 头像样式 */
	.tx{
		border-radius: 50%;
	}
	.content{
		height: 100vh;
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
		width:120rpx;
		height:120rpx;
	}
	.title{
		width:35%;
		font-size: 40rpx;
		margin-top:60rpx;
	}
	.right{
		width:20%;
		letter-spacing: 4rpx;
	}
	.day{
		font-size:64rpx
	}
	.box{
		width:60%;
		margin:120rpx auto;
		flex-wrap: wrap;
	}
	.box_img{
		width:150rpx;
		height:150rpx;
	}
	.box_type{
		margin:40rpx 0;
		font-size:32rpx;
	}
</style>
