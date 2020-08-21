<template>
	<view> 
		<view class="mobile">
			    <input class="uni-input" type="number" placeholder="输入手机号" v-model="mobile" />
		</view>
		<view class="codelist">
				<input class="uni-input"  type="number"  placeholder="输入验证码" v-model="captcha"  />
				<view class="getcode" v-show="stus == true" @click="getcode()">{{text}}</view>
				<view class="text-gray" v-show="stus == false">{{ text }}S重新获取</view>
		</view>
		<view class="mobile">
			    <input class="uni-input" type="text" placeholder="输入用户昵称"  v-model="username" />
		</view>
		<view class="mobile">
			    <input class="uni-input" type="password" placeholder="输入密码" v-model="password" />
		</view>
		<view class="mobile">
			    <input class="uni-input" type="password" placeholder="再次输入密码" v-model="second_pwd"  />
		</view>
		<view class="bottom">
		       <view class="gonext" @click="gosub()">
			        注册
		       </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				password:'',
				second_pwd:'',
				mobile:'',
				captcha:'',
				stus: true, //倒计时标识
				sunmax: 60,
				text: '获取验证码',
			}
		},
		onLoad(){
			
		},
		methods: {
			getcode() {
				if (/^1[345789]\d{9}$/.test(this.mobile)) {
					this.stus = false;
					this.text = this.sunmax;
					let timeInt = setInterval(() => {
						this.text--;
						if (this.text <= 0) {
							this.stus = true;
							this.text = '获取验证码';
							clearInterval(timeInt);
						}
					}, 1000);
					var obj = {
						mobile: this.mobile
					}
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						this.$api.msg(res.data.msg);
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
			},
			gosub(){
				var obj={
					username:this.username,
					password:this.password,
					second_pwd:this.second_pwd,
					mobile:this.mobile,
					captcha:this.captcha,
				}
				this.$common.requests('/api/user/register', obj).then(res => {
					this.$api.msg(res.data.msg);
					if(res.data.code==1){
						uni.navigateTo({
							url: '../login/login'
						})
					}
					//跳转下载链接
					
				});
			}
		}
	}
</script>

<style>
.mobile{
	margin-top:54rpx;
	margin-left:50rpx;
	width:80%;
}
.codelist{
	margin-top:64rpx;
	margin-left:50rpx;
	width:80%;
	display:flex;
	justify-content:space-between;
	line-height:44rpx;
	
}
.getcode{
	font-size:24rpx;
	color:#202020;

}
.bottom{
	text-align:center;
	display:flex;
	justify-content:center;
	margin-top:124rpx;
}
.gonext{
	width:525rpx;
	background-color: #4286EC;
	border-radius:42rpx;
	height:98rpx;
	line-height:98rpx;
	color:#F2FFFF;
}
</style>
