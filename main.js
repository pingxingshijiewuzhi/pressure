import Vue from 'vue'
import App from './App'
import common from '@/common/common.js'
import closeBLEConnection from '@/common/closeBLEConnection.js'
// import echarts from '@/common/echarts.min.js'
// import cuCustom from './colorui/components/cu-custom.vue'
// Vue.component('cu-custom',cuCustom)

const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const _myinit = function() {
	this.$common.requests('/api/user/getUserInfo').then(res => {
		if (res.data.code == 1) {
			uni.setStorageSync('userinfo', res.data.data);
			console.log(uni.getStorageSync('userinfo'))
			this.avatar = uni.getStorageSync('userinfo').avatar
			this.username = uni.getStorageSync('userinfo').username
		} else {
			this.$api.msg(res.data.msg);
		}
	})

}
Vue.prototype.$_myinit = _myinit;
Vue.config.productionTip = false
Vue.prototype.$common = common;
Vue.prototype.$closeBLEConnection = closeBLEConnection;
Vue.prototype.$api = {
	msg
};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// if (uni.getStorageSync('token')) {
// 	uni.reLaunch({
// 		url: '/pages/personalCenter/personalCenter'
// 	})
// } else {
// 	uni.reLaunch({
// 		url: '/pages/login/login'
// 	})
// }
