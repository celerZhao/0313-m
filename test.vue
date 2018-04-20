<template lang="html">
</template>

<script>
export default {
  created() {

  // 活动主页
  api.activeHome().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
  // 油价趋势
  api.oilTrend({
    token: '4545',
    city: '深圳市',
    oil_id: '1'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
  // 油价数据填充
  api.oilTrendReady().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  // 检查加油站状态
  api.getGasStation({
    station_bn: 201604011558222,
    oilers_id: 1
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })


  // 验证油枪信息
  api.checkOilGun({
    station_bn: 201604250952487,
    gun: 2
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  // 或得加油站基本信息
  api.getBaseOil({
    Station_bn: 201705191943388,
    total_amount: 123456.36
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  // 获取加油卡信息
  api.getAddOilCart({
    permonth_amount: 60,
    discountrate: 9.0,
    confirm_month: 2,
    ver: '2.7.3'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  // 小票状态
  api.getRefuelCard1().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
  //发票充值
  api.invoice().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  // 取消订单
  api.cancelOrder({
    'order_id': '170504134315916'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })


  //支付成功分享链接
  api.successShare({
    'order_id': '170109094863927'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //充值加油卡选择现金卷
  api.selectCash({
    'permonth_amount': '500.00',
    'discountrate': '9.5',
    'confirm_month': 12,
    'card_type': 'amount_auto_refuel',
    'cpns_id': 1
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //兑付详情
  api.cashingDetails({
    'card_id': 1947610
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
  //获取油箱抵扣信息
  api.getGoilInformation({
     type_bn:'fixed_litre_exper',
     total_amount:'1200.0',
     discount_money:'200.0',
     discountrate:'9.0',
     amount:'200.0',
     ver:'5.2.1'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //文件上传
  api.fileUpload().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //发送邮件验证码
  api.sendCode({
    type: 'reset',
    uname:'weixf@bwoil.com'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //设置交易密码
  api.setJyPassword({ //token
    'transaction_pass':'123456',
     devInfo:'an'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //忘记交易密码第一步:验证手机号码
  api.forgetJyPasswordOne({
    account:13066960656
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //忘记交易密码第2步:验证身份证号码与银行卡号信息
  api.forgetJyPasswordTwo({
    'identity_no':'450921199302152612',
    'bank_account':'546236541835642'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

  //检测交易密码是否正确
  api.checkTransationPass({
    'transaction_pass':'123456'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
  //发送短信验证码
  api.sendDxCode({
    uname:'18269876543',
    type:'change-pay-password',
    ver: '5.2.1'
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
  //个人信息
  api.PersonalInformation().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

 //个人油箱信息，加油卡购买获取油箱抵扣
  api.personEmailInformation({
    'type_bn':'type_bn'
  }).then(response => {
    console.log(response);
    // 设置token
    this.set();

  }).catch(error => {
    console.log(error);
  })
  //新增车主认证状态返回的接口
  api.carOwnerState().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
    api.productList({
  		token: 'bwoil-token',
  		region_nam: '深圳市',
  		user_identify_id: '12'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//商品详情
  	api.productDetail({
  		key: '171128140858062',
  		token: 'bwoil-token',
  		productId: '22',
  		user_identify_id: '12'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获取推荐有奖信息
  	api.getRecomPrizeInfo({
  		memberId: '222'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获取佣金明细
  	api.getCommisDetail({
  		start_time: '2016-09-11 18:00:00',
  		end_time: '2017-09-10 12:11:11',
  		page: '1'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获取推荐规则
  	api.getRecomRule({
  		ver: '34',
  		key: '345234534'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获取油箱抵扣信息
  	api.getTankDedInfo().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//我的订单列表
  	api.myOrderList({
  		order_id: '171128140858062'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//易安保险数据接口
  	api.yianInsurance({
  		productId: '25002',
  		num: '1'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获取最小金额(add)
  	api.getMinMoney().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获取常见问题URL(add)
  	api.getNormalUrl().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})



  	//获赠油箱接口
  	api.receiveTankLink().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获赠油箱新接口
  	api.receiveTankNewLink().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//油箱收支明细
  	api.tankPayDetail({
  		page: '1',
  		limit: '10'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//我的交易列表
  	api.myTradeList({
  		page: '1',
  		limit: '10',
  		ver: '3.2.5'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//新我的交易列表
  	api.myTradeListNew({
  		page: '1',
  		limit: '10',
  		ver: '3.2.5'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//储油卡操作记录
  	api.tankOperReco({
  		order_bn: '151221084976843'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//加油卡列表
  	api.refuCardList().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//批量兑付列表
  	api.betchHonour({
  		page: '1'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//储油记录详情
  	api.tankCardRecoDetail({
  		card_id: '1944023'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//新增获取批量兑付总金额接口
  	api.betchHonourNewTotal({
  		type_litre: 'litre'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//储油卡兑付计划
  	api.tankCardPlan({
  		order_bn: '180207164902112',
  		card_id: '4770974'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//储油卡兑付计划
  	api.getHonourRule({
  		product_id: '25002',
  		cash: '12000',
  		cashperiods: '1'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//登录
  	 api.userLogin({
  		account: '15900000000',
  		password: 'a123456',
  		devinfo: 'v1.0.01'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	api.userLogin({
  		account: '15900000000',
  		password: 'a123456',
  		devinfo: 'v1.0.01'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	api.userLogin({
  		account: '15900000000',
  		password: 'a123456',
  		devinfo: 'v1.0.01'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//忘记密码
  	api.forgetPwd({
  		account: '15900000000',
  		password: 'a123456',
  		devinfo: 'v1.0.01'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//用户注册检测手机号
  	api.userCheckMobile({
  		uname  : '13049587575',
  		country_code: '86'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//密保问题列表
  	api.setQuestionList().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//设置密保问题
  	api.setSaveQuestion().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//重置登录密码
  	api.reLoginPwd({
  		old_passwd: 'a123456',
  		passwd: 'a123456',
  		passwd_re: 'a123456'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//重置密码第二步
  	api.reLoginPwdSec({
  		member_id: '203977',
  		vcode: '100086',
  		mobile: '13049857575',
  		answers: '吃饭',
  		num: '2',
  		question: '你喜欢什么',
  		inttt: '2'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//重置密码第三步
  	api.reLoginPwdSec({
  		account: '15900000000',
  		login_password: 'a123456',
  		psw_confirm: 'a123456'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//单独验证密保问题接口
  	api.checkSetQuestion({
  		question: '玩哪',
  		num: '2',
  		answers: '深圳'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//用户设置头像
  	api.userSetAvatar({
  		userSetAvatar: '2',
  		time: '1495878453',
  		file: 'F:/Picture/Mustang/Mustang.jpg'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//我的积分
  	api.myIntegralMsg().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//用户消息列表
  	api.userNoteList({
  		ver: '5.2.1'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//清空消息
  	api.clearNote({
  		comment_id: '10086',
  		type: '1'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//消息详情
  	api.noteDetail({
  		comment_id: '10086',
  		type: '1'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//提现记录
  	api.presentRecord().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//获取加油卡接口
  	api.getTankCardNo().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//中石油中石化加油卡更新绑定卡
  	api.updateOilCardNo({
  		card_no: '5168768465447'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//中石油中石化加油卡更新绑定卡
  	api.updateOilCardNo({
  		card_no: '5168768465447'
  	}).then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  	//新增安全险保单界面接口
  	api.accountInsuranceNew().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})
  	api.accountInsuranceNew().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})
  	api.accountInsuranceNew().then(response => {
  		console.log(response);
  	}).then(error => {
  		console.log(error);
  	})

  }
}
</script>
<style lang="css">
</style>
