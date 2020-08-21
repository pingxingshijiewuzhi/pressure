export default {
	closeBLEConnection(deviceId,index,isLink){
		uni.closeBLEConnection({
		  deviceId:deviceId,
		  success:res=> {
			isLink.splice(index,1,4)
		    console.log(res)
		  }
		})
	}
}