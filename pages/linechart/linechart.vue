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
				<view class=" text-white">{{langtype=='CH'?langch.linechart:langen.linechart}}</view>
			</view>
			<view class="right text-white">
				<view class="day text-bold">{{day}}</view>
				<view>{{langtype=='CH'? '星期'+ week : weekarray}}</view>
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
					<view class='topbox'>
						<view class='topbox_item flexs3 topbottomboxtitle'>
							L
						</view>
						<view class='topbox_item flexs3'>
							<view class='topbottomboxitem_left'>均值</view>
							<view class='topbottomboxitem_right'>{{echartdata.l_avg}}</view>
						</view>
						<view class='topbox_item flexs3'>
							<view class='topbottomboxitem_left'>峰值</view>
							<view class='topbottomboxitem_right'>{{echartdata.l_max}}</view>
						</view>
						<view class='topbox_item flexs3'>
							<view class='topbottomboxitem_left'>谷值</view>
							<view class='topbottomboxitem_right'>{{echartdata.l_min}}</view>
						</view>
						<view class='topbox_item flexs3'>
							<view class='topbottomboxitem_left'>差值</view>
							<view class='topbottomboxitem_right'>{{echartdata.l_bo}}</view>
						</view>
					</view>

					<view class='bottombox'>
						<view class='topbox_item flexs3 topbottomboxtitle'>
							R
						</view>
						<view class='bottombox_item flexs3'>
							<view class='topbottomboxitem_left'>均值</view>
							<view class='topbottomboxitem_right'>{{echartdata.r_avg}}</view>
						</view>
						<view class='bottombox_item flexs3'>
							<view class='topbottomboxitem_left'>峰值</view>
							<view class='topbottomboxitem_right'>{{echartdata.r_max}}</view>
						</view>
						<view class='bottombox_item flexs3'>
							<view class='topbottomboxitem_left'>谷值</view>
							<view class='topbottomboxitem_right'>{{echartdata.r_min}}</view>
						</view>
						<view class='bottombox_item flexs3'>
							<view class='topbottomboxitem_left'>差值</view>
							<view class='topbottomboxitem_right'>{{echartdata.r_bo}}</view>
						</view>
					</view>

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
				Inv: 0,
				langch: {
					updown: '上下排列',
					leftright: '左右排列',
					repetition: '重叠排列',
					shijian: '时间',
					control:'控制面板',
					linechart:'数据折线图'
				},
				langen: {
					updown: 'updown',
					leftright: 'leftright',
					repetition: 'repetition',
					shijian: 'time',
					control:'control panel',
					linechart:'data linechart'
				},
				year: '',
				month: '',
				day: '',
				weekarray:'',
				week:'',
				langtype: '',
				avatar: uni.getStorageSync('userinfo').avatar,
				username: uni.getStorageSync('userinfo').username,
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
							bottom: '58%'
						},
						{
							top: '58%',
							bottom: 50
						}
					],
					dataZoom: [{
							type: 'inside', //这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
							xAxisIndex: 0, //控制x轴
							start: 0,
							end: 100
						},
						{
							type: 'inside', //这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
							xAxisIndex: 1, //控制x轴
							start: 0,
							end: 100
						},
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
					// toolbox: {
					// 	feature: {
					// 		dataView: {show: true, readOnly: false},
					// 		restore: {show: true},
					// 		saveAsImage: {show: true}
					// 	}
					// },
					legend: [{
						// orient:'vertical',
						orient: 'horizontal',
						itemGap: 100,
						data: ['L曲线', 'R曲线']
					}],
					xAxis: [
						// {type:'category',axisLabel:{interval: 0},position:'top', axisLine: {onZero: false},gridIndex:0},
						{
							type: 'category',
							// axisLabel:{interval: 0},
							boundaryGap: false,
							axisLine: {
								onZero: false
							},
							axisTick: {
								alignWithLabel: true
							},
							gridIndex: 0,
							// data:[1,31,3,13,23,3]
						},
						{
							type: 'category',
							gridIndex: 1,
							boundaryGap: false,
							// axisLabel:{interval: 0},
							// data:[2,22,22,20,3,5,10]
						}
					],
					yAxis: [{
							type: 'value',
							gridIndex: 0
						},
						{
							type: 'value',
							gridIndex: 1
						}
					],
					dataset: {
						source: [
							// [8,7,11,10],
							// [9,8,12,9],
							// [10,20,13,10],
							// [14,11,14,11],
							// [15,16],
							// [16,17]
						]
					},
					series: [{
							type: 'line',
							color: ['#3F7BE9'],
							name: 'L曲线',
							xAxisIndex: 0,
							yAxisIndex: 0,
							// encode:{x:2,y:3}
						},
						{
							type: 'line',
							color: ['#E41620'],
							name: 'R曲线',
							xAxisIndex: 1,
							yAxisIndex: 1,
							// encode:{x:0,y:1}
						},
					]
				}
			}
		},
		onShow() {
			this.langtype = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'CH'
			this.getTime()
			this.searchData()
		},
		onLoad(option) {
			this.Inv = option.Inv
			this.checkedid = option.checkedid
			this.mypickerDate = option.pickerDate
			let time = this.mypickerDate.split('-')
			this.year = time[0]
			this.month = time[1]
			this.day = time[2]
		},

		methods: {
			gocontrolpanel() {
				uni.reLaunch({
					url: '/pages/personalCenter/personalCenter'
				})
			},
			back() {
				// #ifdef APP-PLUS
				console.log(55)
				let pages = getCurrentPages();
				let noePages = pages[pages.length - 1]
				let prevPage = pages[pages.length - 2]
				prevPage.$vm.Inv = this.Inv
				 // #endif
				uni.navigateBack({
					delta: 1
				})
			},
			// 查询选中的当天数据
			searchData() {
				var that = this
				let obj = {
					ids: this.checkedid,
					time: this.mypickerDate
				}
				console.log(obj,'查询所选天的数据')
				this.$common.requests('/api/record/jicha_report', obj).then(res => {
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
						console.log(this.Ldata, 'LLL')

						let Rdatalinshi = []
						for (var i = 0; i < linshi.length; i++) {
							if (linshi[i][1] == 0) {
								Rdatalinshi.push(linshi[i])
							}
						}
						console.log(res.data.data.lr)
						var Rlengths = Rdatalinshi.length
						console.log(Rdatalinshi)
						// 每次再次请求this.Rdata置空
						this.Rdata = []
						for (var i = 0; i < Rlengths; i++) {
							console.log(Rdatalinshi[i].splice(1, 1))
							this.Rdata.push(Rdatalinshi[i])
						}
						console.log(this.Rdata, 'RRR')
						var RdatatArray = []
						for (let i in this.Rdata) {
							RdatatArray.push(this.Rdata[i])
						}
						var LdataArray = []
						for (let i in this.Ldata) {
							LdataArray.push(this.Ldata[i])
						}
						// console.log(RdatatArray.length,'R数据长度')
						// console.log(LdataArray.length,'l数据长度')

						let maxlength = RdatatArray.length > LdataArray.length ? RdatatArray.length : LdataArray.length
						let minlength = RdatatArray.length > LdataArray.length ? LdataArray.length : RdatatArray.length
						console.log(maxlength, '两者最大长度')
						console.log(minlength, '两者最小长度')
						var bossArrary = []
						// L数据选中多的情况下
						if (RdatatArray.length < maxlength) {
							// 如果R数据为空
							if(minlength == 0){
								
							}else{
								for (var i = 0; i < minlength; i++) {
									let arr = []
									arr.push(LdataArray[i][0])
									arr.push(LdataArray[i][1])
									arr.push(RdatatArray[i][0])
									arr.push(RdatatArray[i][1])
									bossArrary.push(arr)
								}
							}
							// 添加长度多的数据到第一列和第二列
							// let chazhi =  maxlength - RdatatArray.length
							for (var j = minlength; j < maxlength; j++) {
								bossArrary.push([LdataArray[j][0], LdataArray[j][1],null,null])
							}
							// console.log(bossArrary,9999999)
							that.option.series[0].encode = {
								x: 0,
								y: 1
							}
							that.option.series[1].encode = {
								x: 2,
								y: 3
							}
						} else {
							// 如果L数据为空
							if(minlength == 0){
								
							}else{
								for (var i = 0; i < minlength; i++) {
									let arr = []
									arr.push(RdatatArray[i][0])
									arr.push(RdatatArray[i][1])
									arr.push(LdataArray[i][0])
									arr.push(LdataArray[i][1])
									bossArrary.push(arr)
								}
							}
							let chazhi = maxlength - LdataArray.length
							for (var j = minlength; j < maxlength; j++) {
								bossArrary.push([RdatatArray[j][0], RdatatArray[j][1],null,null])
							}
							// console.log(bossArrary,99999)
							that.option.series[0].encode = {
								x: 2,
								y: 3
							}
							that.option.series[1].encode = {
								x: 0,
								y: 1
							}
						}
						// if(RdatatArray.length < maxlength){
						// 	// 添加不足位数数据
						// 	let chazhi =  maxlength - RdatatArray.length
						// 	for(var i = 0; i<chazhi; i++){
						// 		RdatatArray.push(['',''])
						// 	}
						// }else{
						// 	let chazhi =  maxlength - LdataArray.length
						// 	for(var i = 0; i<chazhi; i++){
						// 		LdataArray.push(['',''])
						// 	}
						// 	console.log(LdataArray)
						// }
						// var bossArrary  = []
						// for(var i= 0 ; i< maxlength; i++){
						// 	let arr = []
						// 	arr.push(LdataArray[i][0])
						// 	arr.push(LdataArray[i][1])
						// 	arr.push(RdatatArray[i][0])
						// 	arr.push(RdatatArray[i][1])
						// 	bossArrary.push(arr)
						// }
						// console.log(bossArrary)
						this.option.dataset.source = bossArrary
					} else {
						console.log('no data')
					}
					this.echartdata = res.data.data
				})
			},
			// 切换标题
			changetitle(index) {
				this.Inv = index
				// if (index == 1) {
				// 	uni.navigateTo({
				// 		url: '../leftright/leftright?checkedid=' + this.checkedid + '&pickerDate=' + this.mypickerDate
				// 	})
				// }
				if (index == 2) {
					uni.navigateTo({
						url: '../overlap/overlap?checkedid=' + this.checkedid + '&pickerDate=' + this.mypickerDate
					})
				}
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
			},
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
				ownerInstance.callMethod('onViewClick')
			},
			// queryXY(param){
			//                 //seriesIndex：系列序号，dataIndex：数值序列，seriesName：legend名称，name：X轴值，data和value都代表Y轴值
			//                 var seriesIndex = param.seriesIndex;
			//                 var dataIndex = param.dataIndex;
			//                 var seriesName = param.seriesName;
			//                 var name = param.name;
			//                 var data = param.data;
			//                 var value = param.value;
			//                 console.dir(param);
			//                 var str = "seriesIndex:"+seriesIndex+"****"+"dataIndex:"+dataIndex+"****"+"seriesName:"+seriesName+"****"+
			//                          "name:"+name+"****"+"data:"+data+"****"+"value:"+value;
			//                 alert(str);
			// }
			// line.on(config.EVENT.CLICK,this.queryXY); 
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
		font-size: 36rpx;
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
		/* border:1rpx solid red; */
		display: flex;
		/* flex-direction: column; */
		/* align-items: center; */
		/* justify-content: center; */
	}

	.echarts {
		/* margin-top: 100px; */
		width: 80%;
		height: 100%;
		/* height: 600px; */
	}

	.echartnumber {
		width: 19%;
		height: 100%;
		/* padding:100rpx 0; */
		position: relative;

	}
	.topbox {
		position: absolute;
		top: 100rpx;
		bottom: 58%;
		width: 100%;
		border:1rpx solid #000000;
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		/* flex-grow: 1; */
		/* flex-shrink: 1; */
		/* border:1rpx solid red; */
	}
	.topbottomboxtitle{
		background-color: #717070;
		color:#FFFFFF;
	}
	.topbox_item {
		height: 20%;
		width: 100%;
	}
	.topbottomboxitem_left{
		display: flex;
		justify-content: center;
		align-items: center;
		height:100%;
		width: 50%;
		border-top:1rpx solid red;
		border-right:1rpx solid red;
	}
	.topbottomboxitem_right{
		display: flex;
		justify-content: center;
		align-items: center;
		height:100%;
		width: 50%;
		border-top:1rpx solid red;
	}

	.bottombox {
		width: 100%;
		position: absolute;
		top: 58%;
		bottom: 10%;
		border:1rpx solid #000000;
	}

	.bottombox_item {
		height: 20%;
		width: 100%;
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
