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
				  <view class="title text-white ">{{langtype=='CH'?langch.viptequan:langen.viptequan}}</view>
		</view>
		<view class="QRcode">
			<image :src="urls+list" class="ewm"></image>
		</view>
		<view class="scanit">
		        扫一扫成为VIP
		</view>
		<view class="grandPrix">
			··VIP5大专享特权··
		</view>
		<view class="bottom">
			<view class="bottom_list">
			<view class="privilege_num">
				特权1:
			</view>
			<view class="text">
				当天实时数据不限（普通50条）
			</view>
			</view>
			<view class="bottom_list">
			<view class="privilege_num">
				特权2:
			</view>
			<view class="text">
				打印报告可设计（普通不可设计）
			</view>
			</view>
			<view class="bottom_list">
			<view class="privilege_num">
				特权3:
			</view>
			<view class="text">
				所有数据云储存不清楚（普通1年）
			</view>
			</view>
			<view class="bottom_list">
			<view class="privilege_num">
				特权4:
			</view>
			<view class="text">
				报告更新生成次数不限（普通2次）
			</view>
			</view>
			<view class="bottom_list">
			<view class="privilege_num">
				特权5:
			</view>
			<view class="text">
				可拆分子账户、子账户独立生成报告（普通不可以）
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
					viptequan:'使用说明',
				},
				langen:{
					viptequan:'Instructions',
				},
				langtype:'',
				avatar:uni.getStorageSync('userinfo').avatar,
				username:uni.getStorageSync('userinfo').username,
				list:'',
				urls:this.$common.baseUrl,
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
				this.$common.requests('/api/Other/VIP', obj).then(res => {
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
	.QRcode{
		text-align:center;
		margin-top:80rpx;
	}
	.ewm{
		width:309rpx;
		height:309rpx;
	}
	.scanit{
	    text-align:center;
		width:321rpx;
		margin-top:40rpx;
		background:linear-gradient(to right,#E8CE98,#C5A370);
	    border-radius:32rpx;
		margin-left:218rpx;
		height:60rpx;
		line-height:60rpx;
		font-weight:bold;
		}
	.grandPrix{
		font-weight:bold;
		margin-top:100rpx;
		text-align:center;
		font-size:32rpx;
	}
	.bottom{
		margin-top:80rpx;
	}
	.bottom_list{
		justify-content:flex-start;
		display:flex;
		margin-bottom:35rpx;
		margin-left:20rpx;
	}
	.privilege_num{
		color:#8C754F;
		font-size:28rpx;
	}
	.text{
		font-size:28rpx;
	}
</style>
