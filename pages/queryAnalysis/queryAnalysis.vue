<template>
	<view class="content">
		<view class="head flexs2">
			<view class=" head_title text-white text-center flexs">
				<image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<image class="head_img" src=""></image>
				<view class="head_left">
					<image :src="baseUrl+avatar" class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
				<view class="controlpanel" @click='gocontrolpanel'>{{langtype=='CH'?langch.control:langen.control}}</view>
			</view>
			<view class="title">
				<view class=" text-white" >{{langtype=='CH'?langch.datasearch:langen.datasearch}}</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>{{langtype=='CH'? '星期'+ week : weekarray}}</view>
				<view>{{year}}/{{month}}</view>
			</view>
		</view>
		<!-- 一进来就显示日期选择 -->
		<image src="../../static/image/icon_xl_20jtbgcx-yqxbg@2x.png" class="xl" ></image>
		<gpp-date-picker  @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate"
		 @openshow='openshow'>
			<!-- :defaultValue="pickerDate" -->
			{{pickerDate}}
		</gpp-date-picker>
		
		<!-- 去掉月数据查询 -->
		<!-- :defaultValue="pickerMonth" -->
		<!-- <image src="../../static/image/icon_xl_20jtbgcx-yqxbg@2x.png" class="xl_copy" ></image>
		<gpp-date-picker-copy v-if='monthpickerstatus' @onConfirm="onConfirmMonth" :startDate="startMonth"
		 :endDate="endMonth">
			{{pickerMonth}}
		</gpp-date-picker-copy> -->
		<view class="button">
			<view class="search" @click='searchData'>
				{{langtype=='CH'?langch.search:langen.search}}
			</view>
			<!-- <view class="search" @click='searchMonth'>
				查询月数据
			</view> -->
		</view>
	</view>
</template>
<script>
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	import gppDatePickerCopy from '../../components/gpp-datePicker1/gpp-datePicker1.vue'

	export default {
		components: {
			gppDatePicker,
			gppDatePickerCopy
		},
		data() {
			return {
				langch: {
					control:'控制面板',
					datasearch:'日数据查询',
					search:'查询日数据'
				},
				langen: {
					control:'control panel',
					datasearch:'daily data query',
					search:'query daily data'
				},
				monthpickerstatus: true,
				baseUrl: this.$common.baseUrl,

				startDate: "2018-05-02",
				endDate: "2032-09-20",
				// 初始化赋值默认日期
				pickerDate: '',

				startMonth: "2018-05",
				endMonth: "2032-09",
				// 初始化赋值默认月份,不传参数时默认
				pickerMonth: '',

				// 请求有效数据,最佳数据,垃圾数据区分
				type: '',

				
				
				year: '',
				week: '',
				weekarray:'',
				month: '',
				day: '',
				avatar: uni.getStorageSync('userinfo').avatar,
				username: uni.getStorageSync('userinfo').username,
				langtype: ''
			}
		},
		created() {
			this.pickerDate = this.year + '-' + this.month + '-' + this.day
			this.pickerMonth = this.year + '-' + this.month
		},
		onLoad() {
			this.langtype = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'CH'
			this.getTime()
		},
		methods: {
			// 监听第一个时间选择器单击,隐藏第二个时间选择器
			openshow() {
				this.monthpickerstatus = false
			},
			onCancel(e) {
				this.monthpickerstatus = true
			},
			onConfirm(e) {
				this.pickerDate = e.dateValue;
				this.monthpickerstatus = true
			},
			onConfirmMonth(e) {
				this.pickerMonth = e.dateValue;
			},
			gocontrolpanel() {
				uni.reLaunch({
					url: '/pages/personalCenter/personalCenter'
				})
			},
			back() {
				uni.navigateBack({
					delta:1
				})
			},

			// 查询选中的月份
			// searchMonth() {
			// 	uni.navigateTo({
			// 		url: '../monthdata/monthdata?pickerMonth=' + this.pickerMonth
			// 	})
			// },
			// 查询选中的当天数据
			searchData() {
				uni.navigateTo({
					url:'../queryAnalysisdata/queryAnalysisdata?time='+this.pickerDate
				})
			},
			getTime: function() {
				var aData = new Date();
				this.year = aData.getFullYear();
				this.month = aData.getMonth() + 1;
				let weeks = ['日', '一', '二', '三', '四', '五', '六']
				let weekEnglish  = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
				this.week = weeks[aData.getDay()]
				this.weekarray = weekEnglish[aData.getDay()]
				this.day = aData.getDate();
			}
		}


	}
</script>

<style>
	/* 头像样式 */
	.tx {
		border-radius: 50%;
	}

	.content {
		height: 100vh;
		position: relative;
	}

	.head {
		height: 260rpx;
		width: 100%;
		background-color: #3F7BE9;
	}

	.head_title {
		width: 30%;
		padding-top: 60rpx;
		position: relative;
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
		width: 120rpx;
		height: 120rpx;
	}


	.right {
		width: 20%;
		letter-spacing: 4rpx;
		margin-top: 40rpx;
	}

	.day {
		font-size: 64rpx
	}

	.xl {
		width: 27rpx;
		height: 19rpx;
		position: absolute;
		margin-left: 600rpx;
		margin-top: 360rpx;
	}

	.xl_copy {
		width: 27rpx;
		height: 19rpx;
		position: absolute;
		margin-left: 600rpx;
		margin-top: 159rpx;
	}

	.title {
		width: 35%;
		font-size: 34rpx;
		margin-top: 100rpx;
	}

	.right {
		width: 20%;
		letter-spacing: 4rpx;
	}

	.day {
		font-size: 64rpx
	}

	.times {
		margin: 20rpx 0;
		font-size: 28rpx !important;
		letter-spacing: 8rpx;
	}

	.times_img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}


	/* 按钮浮动 */
	.button {
		position: absolute;
		text-align: center;
		display: flex;
		justify-content: center;
		bottom: 50rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.search {
		width: 200rpx;
		margin: 0 10rpx;
		background-color: #4286EC;
		border-radius: 42rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #F2FFFF;
	}

	.uni-loadmore {
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50rpx;
		line-height: 50rpx;
	}

	/* 控制面板样式 */
	.controlpanel {
		width: 180rpx;
		text-align: center;
		font-size: 28rpx;
		background-color: red;
		border-radius: 42rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #F2FFFF;
		position: absolute;
		top: 60rpx;
		right: -180rpx;
	}
</style>
