<template>
	<view class="content">
		<view class="head flexs2">
			<view class=" head_title text-white text-center flexs">
				<image @click="back" class="head_img" src="../../static/image/tab_icon_back_ty@2x.png"></image>
				<view class="head_left">
					<image :src="baseUrl+avatar" class="tx"></image>
					<view class="name">{{username}}</view>
				</view>
				<view class="controlpanel" @click='gocontrolpanel'>{{langtype=='CH'?langch.control:langen.control}}</view>
			</view>
			<view class="title">
				<view class="text-white">日曲线报告查询</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>星期{{week}}</view>
				<view>{{year}}/{{month}}</view>
			</view>
		</view>
		<view class='datacontent'>
			<view class="linechartcontent">
				<!-- #ifdef APP-PLUS || H5 -->
				<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
				<!-- #endif -->
				<!-- #ifndef APP-PLUS || H5 -->
				<view>非 APP、H5 环境不支持</view>
				<!-- #endif -->
			</view>
			<view class='echartnumber'>
				<view class='leftbox'>
					<view class='flexs'>L</view>
					<view class='flexs'>R</view>

				</view>
				<view class='centerbox'>
					<view class='Lnumber'>
						<view class='Lnumber_item flexs3'>
							<view>均值</view>
							<view>{{echartdata.l_avg}}</view>
						</view>
						<view class='Lnumber_item flexs3'>
							<view>峰值</view>
							<view>{{echartdata.l_max}}</view>
						</view>
						<view class='Lnumber_item flexs3'>
							<view>谷值</view>
							<view>{{echartdata.l_min}}</view>
						</view>
						<view class='Lnumber_item flexs3'>
							<view>差值</view>
							<view>{{echartdata.l_bo}}</view>
						</view>
					</view>
					<view class='Rnumber'>
						<view class='Rnumber_item flexs3'>
							<view>均值</view>
							<view>{{echartdata.l_avg}}</view>
						</view>
						<view class='Rnumber_item flexs3'>
							<view>峰值</view>
							<view>{{echartdata.l_max}}</view>
						</view>
						<view class='Rnumber_item flexs3'>
							<view>谷值</view>
							<view>{{echartdata.l_min}}</view>
						</view>
						<view class='Rnumber_item flexs3'>
							<view>差值</view>
							<view>{{echartdata.l_bo}}</view>
						</view>
					</view>
				</view>
				<view class='rightbox'>
					<view class='flexs'>差值</view>
					<view class='flexs'>{{echartdata.jicha}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				baseUrl: this.$common.baseUrl,
				langch: {
					chakanbaogao: '查看报告',
					shanchu: '删除',
					shijian: '时间',
					zuijia: '最佳数据',
					youxiao: '有效数据',
					laji: '垃圾数据',
					quantian: '全天数据',
					common: '一般数据',
					control:'控制面板'
				},
				langen: {
					chakanbaogao: 'View report',
					shanchu: 'delete',
					shijian: 'time',
					zuijia: 'optimum',
					youxiao: 'Effective',
					laji: 'garbage',
					quantian: 'All day',
					common: 'common',
					control:'control panel'
				},
				year: new Date().getFullYear(),
				week: ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()],
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
				avatar: uni.getStorageSync('userinfo').avatar,
				username: uni.getStorageSync('userinfo').username,
				langtype: '',
				// 当前选中的时间点
				currentIndex: 0,
				// 接收请求的时间点
				timeArray: [],
				echartdata: {},
				// 接收请求的时间点
				option: {
					title: '',
					grid: [{
						top: 50,
						bottom: 30
					}],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: [{
						// orient:'vertical',
						orient: 'horizontal',
						itemGap: 100,
						data: ['L曲线', 'R曲线']
					}],
					dataZoom: [{
						type: 'inside', //这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
						xAxisIndex: 0, //控制x轴
						start: 0,
						end: 100
					}, ],
					xAxis: [{
							type: 'category',
							// axisLabel:{interval: 0},
							boundaryGap: false,
							gridIndex: 0,
							axisTick: {
								inside: false,
								length: 0,
								lineStyle: {

								}
								// show:false
							},
						},
						// {type:'category',position:'bottom',name:'LA',axisPointer:{type:'none'}},
						// {type:'category',position:'top',name:'LA',boundaryGap:false,offset:30}
					],
					yAxis: [{
						type: 'value',
						gridIndex: 0
					}, ],
					dataset: {
						source: [
							// ["15:26:02", 3, null],
							// ["15:25:59", 3, null],
							// ["15:25:57", 3, null],
							// ["15:25:54", 3, null],
							// ["15:25:47", 3, null],
							// ["15:25:44", 3, null],
							// ["15:24:26", null, 17],
							// ["15:24:22", null, 18],
							// ["15:24:19", null, 13],
							// ["15:23:59", 17, null],
							// ["15:23:47", null, 7],
							// ["15:23:45", null, 7],
							// ["15:23:36", 26, null],
							// ["15:23:34", 22, null]
						]
					},
					series: [{
							type: 'line',
							color: ['#3F7BE9'],
							name: 'L曲线',
							// xAxisIndex:0,
							// yAxisIndex:0,
							connectNulls: true,
							encode: {
								x: 0,
								y: 1
							}
						},

						{
							type: 'line',
							color: ['#E41620'],
							name: 'R曲线',
							// xAxisIndex:0,
							// yAxisIndex:0,
							connectNulls: true,
							encode: {
								x: 0,
								y: 2
							}
						},
					]
				}
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'CH',
				this.getTime()
			this._searchData()
		},
		methods: {
			gocontrolpanel() {
				uni.reLaunch({
					url: '/pages/personalCenter/personalCenter'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 查询选中的当天数据
			_searchData() {
				let obj = {
					time: this.year + '-' + this.month + '-' + this.day
				}
				this.$common.requests('/api/record/jicha_report', obj).then(res => {
					if (res.data.code == 0) {
						uni.showToast({
							mask: true,
							title: res.data.msg,
							duration: 2000
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					} else {

						this.echartdata = res.data.data
						let mysource = res.data.data.lr
						let datalength = res.data.data.lr.length
						console.log(res.data.data.lr, '修改前')
						for (var i = 0; i < datalength; i++) {
							if (mysource[i][1] == 0) {
								mysource[i].splice(1, 1, null)
							}
							if (mysource[i][2] == 0) {
								mysource[i].splice(2, 1, null)
							}
						}
						console.log(mysource, '修改后')
						// 真实数据
						this.option.dataset.source = mysource
					}
				})


			},
			choose_item(index) {
				this.currentIndex = index
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
<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				console.log(document, 5555)
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
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

	.title {
		width: 50%;
		font-size: 40rpx;
		margin-top: 100rpx;
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

	.datacontent {
		/* 减去头部,浮动和浮动本身高度 */
		/* height:calc(100vh - 380rpx) ; */
		height: calc(100vh - 260rpx);
		position: relative;
	}

	/* 折线图样式 */
	.linechartcontent {
		/* height:calc(100vh - 480rpx); */
		height: calc(100vh - 380rpx);
		width: 100%;
	}

	.echarts {
		width: 100%;
		/* height:85%; */
		height: 100%;
		/* border:1rpx solid red; */
	}

	/* 尾部样式 */
	.echartnumber {
		height: 100rpx;
		/* border: 1rpx solid red; */
		width: 100%;
		display: flex;
	}

	.leftbox,
	.rightbox {
		height: 100%;
		width: 10%;
		border: 1rpx solid #A0A0A0;
	}

	.leftbox view,
	.rightbox view {
		height: 50%;
	}

	.centerbox {
		flex-grow: 1;
		border: 1rpx solid #A0A0A0;
	}

	.Lnumber {
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: space-around;
	}

	.Lnumber_item,
	.Rnumber_item {
		width: 25%;
		height: 100%;
	}

	.Rnumber {
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: space-around;
	}

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
