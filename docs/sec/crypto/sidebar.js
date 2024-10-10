module.exports = [

	{
		title: '现代密码学',
		collapsable: true,
		children: [
		    './basic/crypto-outline-stream-cipher',
			'./basic/crypto-block-cipher',
			'./basic/crypto-public-key',
			'./basic/crypto-destribution-manage',
			'./basic/crypto-verify-hash',
			'./basic/crypto-digital-signature',
		]
	},
	
	{
		title: '密码应用',
		collapsable: true,
		children: [
			'./app/app-2fa-bank-ukey',
			'./app/app-2fa-github-totp',
			'./app/app-websocket-auth',
		]
	},
	
	{
		title: '可搜索加密',
		collapsable: true,
		children: [
			'./se/se-best-matching-25',
			'./se/se-bilinear-pairing',
		]
	},
	
	{
		title: 'RFID/双向认证',
		collapsable: true,
		children: [
			{
				title: '综述',
				collapsable: true,
				children: [
					'./auth/survey-rfid-auth',
				]
			},
		]
	},

	
	
]
