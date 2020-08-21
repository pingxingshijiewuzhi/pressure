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
				<view class=" text-white">数据折线图</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<!-- <view>星期{{week}}</view> -->
				<view>{{year}}/{{month}}</view>
			</view>
		</view>
		<view class='datacontent'>
			<view class="middle flexs3 text-center text-bold">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="changetitle(0)">{{langtype=='CH'?langch.updown:langen.updown}}</view>
				<!-- <view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="changetitle(1)">{{langtype=='CH'?langch.leftright:langen.leftright}}</view> -->
				<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="changetitle(2)">{{langtype=='CH'?langch.repetition:langen.repetition}}</view>
			</view>
			<view class="linechartcontent">
				<!-- #ifdef APP-PLUS || H5 -->
				<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
				<!-- #endif -->
				<!-- #ifndef APP-PLUS || H5 -->
				<view>非 APP、H5 环境不支持</view>
				<!-- #endif -->
				<view class='echartnumber'>
					<view class='echarttitle'>
						<view class="echarttitleLeft">L</view>
						<view>R</view>
					</view>
					<view class='echartcontent'>
						<view class='leftbox'>
							<view class='leftrightbox_item_one flexs3'>
								<view>均值</view>
								<view>{{echartdata.l_avg}}</view>
							</view>
							<view class='leftrightbox_item_one  flexs3'>
								<view>峰值</view>
								<view>{{echartdata.l_max}}</view>
							</view>
							<view class='leftrightbox_item_two flexs3'>
								<view>谷值</view>
								<view>{{echartdata.l_min}}</view>
							</view>
							<view class='leftrightbox_item_two flexs3'>
								<view>差值</view>
								<view>{{echartdata.l_bo}}</view>
							</view>
						</view>
						<view class='rightbox'>
							<view class='leftrightbox_item_one flexs3'>
								<view>均值</view>
								<view>{{echartdata.r_avg}}</view>
							</view>
							<view class='leftrightbox_item_b flexs3'>
								<view>峰值</view>
								<view>{{echartdata.r_max}}</view>
							</view>
							<view class='leftrightbox_item_two flexs3'>
								<view>谷值</view>
								<view>{{echartdata.r_min}}</view>
							</view>
							<view class='leftrightbox_item flexs3'>
								<view>差值</view>
								<view>{{echartdata.r_bo}}</view>
							</view>
						</view>
					</view>
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
				startDate: "2018-05-02",
				endDate: "2022-09-20",
				pickerDate: '2019-09-20',

				Inv: 2,
				langch: {
					updown: '上下排列',
					leftright: '左右排列',
					repetition: '重叠排列',
					shijian: '时间',
					control:'控制面板'
				},
				langen: {
					updown: 'updown',
					leftright: 'leftright',
					repetition: 'repetition',
					shijian: 'time',
					control:'control panel'
				},
				year: '',
				month: '',
				day: '',
				avatar: uni.getStorageSync('userinfo').avatar,
				username: uni.getStorageSync('userinfo').username,
				langtype: '',
				// 选中的id
				checkedid: '',
				// 查询的日期
				mypickerDate: '',
				// ecahr峰值谷值接收数据
				echartdata: {},
				Ldata: [],
				Rdata: [],
				option: {
					title: {
						// text: 'ECharts 入门示例'
					},
					grid: [{
						top: 50,
						bottom: 50
					}],
					dataZoom: [{
							type: 'inside', //这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
							xAxisIndex: 0, //控制x轴
							start: 0,
							end: 100
						},
						// 不要第二个轴伸缩
						// {
						// 	type: 'inside', //这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
						// 	xAxisIndex: 1, //控制x轴
						// 	start: 0,
						// 	end: 100
						// },
					],
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
					xAxis: [{
							type: 'category',
							// axisLabel:{interval: 0},
							boundaryGap: false,
							gridIndex: 0,
							name: 'X轴',
							// data: [8, 9, 10,11,12,13, 14, 15, 16]
						},
						// 不要第二个轴显示
						// {
						// 	type: 'category',
						// 	// axisLabel:{interval: 0},
						// 	boundaryGap: false,
						// 	gridIndex: 0,
						// 	name: 'R轴',
						// 	// data: [11, 12, 13, 14]
						// }
					],
					yAxis: [{
						type: 'value',
						gridIndex: 0
					}, ],
					dataset: {
						source: [
							// ["衬衫",'',15],
							// ["羊毛衫",20,''],
							// ["雪纺衫",25,''],
							// ["裤子",'',15],
							// ["高跟鞋",'',23],
							// ["袜子",'',32],
							// ["是的",25,''],
							// ["sgd",'',39],
						]
					},
					// [8,7,11,10],
					// [9,8,12,9],
					// [10,20,13,10],
					// [14,11,14,11],
					// [15,16],
					// [16,17]
					series: [{
							type: 'line',
							color: ['#3F7BE9'],
							name: 'L曲线',
							// xAxisIndex: 0,
							// yAxisIndex: 0,
							// data: [[8,7], [9,8],[10,20],[14,11], [15,16], [16,17]],
							connectNulls:true,
							     
							encode:{x:0,y:1}
						},
						{
							type: 'line',
							color: ['#E41620'],
							name: 'R曲线',
							// xAxisIndex: 0,
							// yAxisIndex: 0,
							// data: [[11,10], [12,9], [13,10], [14,11]],
							connectNulls:true,
							encode:{x:0,y:2}
						},
					]
				}
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'CH'
		},
		onLoad(option) {
			this.checkedid = option.checkedid
			this.mypickerDate = option.pickerDate
			let time = this.mypickerDate.split('-')
			this.year = time[0]
			this.month = time[1]
			this.day = time[2]
			this.searchData()
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				uni.navigateTo({
					url: '../queryAnalysis/queryAnalysis'
				})
				return true
			}
			if (e.from == 'navigateBack') {
				uni.navigateTo({
					url: '../queryAnalysis/queryAnalysis'
				})
				return true
			}
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
			searchData() {
				let obj = {
					ids: this.checkedid,
					time: this.mypickerDate
				}
				this.$common.requests('/api/record/jicha_report', obj).then(res => {
					// this.option.dataset.source = res.data.data.lr
					console.log(res.data.data.lr,987654321)
					let sourcelength = res.data.data.lr.length
					var linshidata = res.data.data.lr
					// 把返回值为0的变成null
					for(var i =0 ; i<sourcelength; i++){
						console.log(linshidata[i],5555)
						if(linshidata[i][1] == 0){
							linshidata[i][1] = null
						}
						if(linshidata[i][2] == 0){
							linshidata[i][2] = null
						}
					}
					// 拿到转换后数据
					// console.log(linshidata,123456789)
					this.option.dataset.source = linshidata
					this.echartdata = res.data.data
					if (res.data.data.lr) {
						// this.option.dataset.source = res.data.data.lr
						let linshi = res.data.data.lr
						let Ldatalinshi = []
						for (var i = 0; i < linshi.length; i++) {
							if (linshi[i][2] == 0) {
								Ldatalinshi.push(linshi[i])
							}
						}
						// 每次再次请求this.Ldata置空
						this.Ldata = []
						var Llengths = Ldatalinshi.length
						for (var i = 0; i < Llengths; i++) {
							this.Ldata.push(Ldatalinshi[i].slice(0, 2))
						}
						// 拿到L数据数组
						// console.log(this.Ldata, 'LLL')
						// 取出X轴数据
						// 取出Y轴数据
						let LXaxisArray = []
						let LYaxisArray = []
						for (let n = 0; n < this.Ldata.length; n++) {
							LXaxisArray.push(this.Ldata[n][0])
							LYaxisArray.push(this.Ldata[n][1])
						}
						// console.log(LXaxisArray)
						// console.log(LYaxisArray)
						// this.option.xAxis[0].data = LXaxisArray
						// this.option.series[0].data = LYaxisArray

						let Rdatalinshi = []
						for (var i = 0; i < linshi.length; i++) {
							if (linshi[i][1] == 0) {
								Rdatalinshi.push(linshi[i])
							}
						}
						console.log(res.data.data.lr)
						var Rlengths = Rdatalinshi.length
						// console.log(Rdatalinshi)
						// 每次再次请求this.Rdata置空
						this.Rdata = []
						for (var i = 0; i < Rlengths; i++) {
							console.log(Rdatalinshi[i].splice(1, 1))
							this.Rdata.push(Rdatalinshi[i])
						}
						// console.log(this.Rdata, 'RRR')
						// 取出X轴数据
						// 取出Y轴数据
						let RXaxisArray = []
						let RYaxisArray = []
						for (let m = 0; m < this.Rdata.length; m++) {
							RXaxisArray.push(this.Rdata[m][0])
							RYaxisArray.push(this.Rdata[m][1])
						}
						// console.log(RXaxisArray)
						// console.log(RYaxisArray)
						// this.option.xAxis[1].data = RXaxisArray
						// this.option.series[1].data = RYaxisArray
					} else {
						console.log('no data')
					}
				})
			},
			// 获取选中id对应的数据
			getlinechart() {

			},
			// 切换标题
			changetitle(index) {
				this.Inv = index
				if (index == 0) {
					uni.navigateTo({
						url: '../linechart/linechart?checkedid=' + this.checkedid + '&pickerDate=' + this.mypickerDate
					})
				}
				// if (index == 1) {
				// 	uni.navigateTo({
				// 		url: '../leftright/leftright?checkedid=' + this.checkedid + '&pickerDate=' + this.mypickerDate
				// 	})
				// }
			},


			onViewClick(options) {
				console.log(options)
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
		margin-left: 30rpx;
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

	.datacontent {
		/* 减去头部*/
		height: calc(100vh - 260rpx);
		position: relative;
	}

	.nodata {
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	/* 有数据显示 */
	.middle {
		width: 92%;
		margin-top: 30rpx;
		margin-left: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-top: 1px solid #D9D9D9;
		border-right: 1px solid #D9D9D9;
		font-size: 32rpx
	}

	.inv-h {
		background-color: #FFFFFF;
		color: #333333;
	}

	.inv-h-se {
		background-color: #3F7BE9;
		color: #FFFFFF;
	}

	.middle view {
		/* width: 33%; */
			width: 50%;
			border-right: none;
			border:1rpx solid #D9D9D9;
		/* 	border-bottom: 1px solid #D9D9D9;
			border-left: 1px solid #D9D9D9; */
	}

	.title {
		width: 40%;
		font-size: 40rpx;
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

	.bigbox {
		margin-left: 30rpx;
		height: 52%
	}

	.big_title {
		width: 96%;
		height: 60rpx;
		line-height: 60rpx;
		background: #DBE8FB;
		margin-top: 30rpx;
		color: #3F7BE9;

	}

	.biglist {
		width: 96%;
		height: 98%;
		border: 1px solid #F0F0F0;
		border-bottom: none;
		font-size: 28rpx;
		line-height: 46rpx;
		letter-spacing: 1rpx;
		overflow-x: hidden;
		overflow-y: scroll;
		z-index: 9;
	}

	.titlename {
		width: 100%;
	}

	.list1 {
		width: 50%;
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #e5e5e5
	}

	.list2 {
		width: 50%;
		height: 70rpx;
		line-height: 70rpx;
		border-right: none;
		border-bottom: 1px solid #F0F0F0;
		border-left: 1px solid #F0F0F0;
	}

	.bottom {
		width: 100%;
		margin-top: 150rpx;
	}

	.submit {
		width: 200rpx;
		background-color: #BFBFBF;
		border-radius: 42rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #F2FFFF;
	}

	.emplysubmit {
		height: 80rpx;
		width: 200rpx;
	}

	/* 折线图样式 */
	.linechartcontent {
		height: calc(100vh - 320rpx);
		width: 100%;
	}

	.echarts {
		width: 100%;
		height: 70%;
	}

	.echartnumber {
		height: 20%;
		border: 1rpx solid #000000;
		width: 84%;
		margin: 0 8%;
	}
	.echarttitle{
		width:100%;
		height:33%;
		background-color: #717070;
		color:#FFFFFF;
		display: flex;
		border-bottom: 1rpx solid red;
	}
	.echarttitle view{
		width:50%;
		height:100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
	}
	.echarttitleLeft{
		border-right: 1rpx solid red;
	}
	.echartcontent{
		display: flex;
		height:66%;
		width:100%;
	}
	.leftbox , .rightbox{
		height: 100%;
		width: 50%;
		display: flex;
		flex-wrap: wrap;
	}
	.leftrightbox_item_one{
		width: 50%;
		height: 50%;
		border-bottom: 1rpx solid red;
		border-right: 1rpx solid red;
	}
	.leftrightbox_item{
		width: 50%;
		height: 50%;
	}
	.leftrightbox_item_b{
		width: 50%;
		height: 50%;
		border-bottom: 1rpx solid red;
	}
	.leftrightbox_item_two{
		width: 50%;
		height: 50%;
		border-right: 1rpx solid red;
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
