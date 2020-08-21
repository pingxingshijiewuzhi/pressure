<template>
	<view class="content">
		<view class="head flexs1">
			<view class=" head_title text-white text-center flexs">
				<image class="head_img"></image>
				<view class="head_left">
					<block v-if='avatar'>
						<image :src="baseUrl+avatar" class="tx"></image>
					</block>
					<block v-if='username'>
						<view class="name">{{username}}</view>
					</block>
				</view>
			</view>
			<view class="title text-white ">{{langtype=='CH'?langch.control:langen.control}}</view>
		</view>

		<view class="body flexs">
			<view>
				<view class="body_list" @click="realtime">
					<view class="real_time">{{langtype=='CH'?langch.shishishuju:langen.shishishuju}}</view>
				</view>
				<view class="body_list" @click="queryAnalysis">
					<view class="query_analysis">{{langtype=='CH'?langch.shujuchaxun:langen.shujuchaxun}}</view>
				</view>
				<!-- <view class="body_list"  @click="pdfReport">
					<view class="local_report">{{langtype=='CH'?langch.bendiquxian:langen.bendiquxian}}</view>
				</view> -->
				<!-- <view class="body_list"  @click="measurementTiming">
					<view class="timing">{{langtype=='CH'?langch.celiangdingshi:langen.celiangdingshi}}</view>
				</view> -->
				<view class="body_list" @click="systemSettings">
					<view class="system_settings">{{langtype=='CH'?langch.xitongshezhi:langen.xitongshezhi}}</view>
				</view>
				<view class="body_list" @click="Instructions">
					<view class="instructions">{{langtype=='CH'?langch.shiyongshuoming:langen.shiyongshuoming}}</view>
				</view>
				<view class="body_list" @click="vipArea">
					<view class="vip_area">{{langtype=='CH'?langch.vipzhuanqu:langen.vipzhuanqu}}</view>
				</view>
				<view class="body_list" @click="followUs">
					<view class="follow_us">{{langtype=='CH'?langch.guanzhu:langen.guanzhu}}</view>
				</view>
				<view class="body_list" @click="newsList">
					<view class="news">{{langtype=='CH'?langch.xinwen:langen.xinwen}}</view>
				</view>
				<view class="body_list" @click="gologin">
					<view class="news">{{langtype=='CH'?langch.logout:langen.logout}}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$common.baseUrl,
				avatar: uni.getStorageSync('userinfo').avatar,
				username: uni.getStorageSync('userinfo').username,
				langch: {
					shishishuju: '实时数据',
					shujuchaxun: '数据查询与分析',
					bendiquxian: '静态报告查询',
					celiangdingshi: '测量定时',
					xitongshezhi: '系统设置',
					shiyongshuoming: '使用说明',
					vipzhuanqu: 'VIP专区',
					guanzhu: '关注我们',
					xinwen: '新闻资讯',
					logout:'退出登录',
					control:'控制面板'
				},
				langen: {
					shishishuju: 'real-time data',
					shujuchaxun: 'Data query and analysis',
					bendiquxian: 'static state report query',
					celiangdingshi: 'Timing of measurement',
					xitongshezhi: 'System setup',
					shiyongshuoming: 'Instructions',
					vipzhuanqu: 'VIP zone',
					guanzhu: 'Pay attention to us',
					xinwen: 'News and information',
					logout:'log out',
					control:'control panel'
				},
				langtype: ''
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'CH'
			this.$_myinit()
		},
		methods: {
			realtime() {
				uni.navigateTo({
					url: '../realtime/realtime'
				})
			},
			queryAnalysis() {
				uni.navigateTo({
					url: '../queryAnalysis/queryAnalysis'
				})
			},
			pdfReport() {
				uni.navigateTo({
					url: '../pdfReport/pdfReport'
				})
			},

			// 测量定时删除
			// measurementTiming(){
			// 	uni.navigateTo({
			// 		url:'../measurementTiming/measurementTiming'
			// 	})
			// },
			systemSettings() {
				uni.navigateTo({
					url: '../systemSettings/systemSettings'
				})
			},
			vipArea() {
				uni.navigateTo({
					url: '../vipArea/vipArea'
				})
			},
			followUs() {
				uni.navigateTo({
					url: '../followUs/followUs'
				})
			},
			newsList() {
				uni.navigateTo({
					url: '../newsList/newsList'
				})
			},
			Instructions() {
				uni.navigateTo({
					url: '../Instructions/Instructions'
				})
			},
			// 退出登录
			gologin() {
				uni.removeStorageSync('uid')
				uni.removeStorageSync('token')
				uni.removeStorageSync('userinfo')
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style>
	.tx {
		border-radius: 50%;
	}

	.content {
		height: 100vh;
	}

	.head {
		height: 260rpx;
		width: 100%;
		background-color: #3F7BE9;
	}

	.head_title {
		width: 30%;
		padding-top: 60rpx;
	}

	.head_img {
		width: 24rpx;
		height: 38rpx;
		margin-bottom: 30rpx;
	}

	.head_left {
		margin-left: 30rpx
	}

	.head_left image {
		width: 115rpx;
		height: 115rpx;
	}

	.title {
		font-size: 40rpx;
		margin-top: 60rpx;
		margin-left: 80rpx
	}

	.body {
		margin-top: 40rpx;
	}

	.body_list {
		text-align: center;
		width: 400rpx;
		background-color: #4286EC;
		height: 66rpx;
		line-height: 66rpx;
		margin-top: 24rpx;
		color: #F1FFFF;
		letter-spacing: 4rpx;
	}
</style>
