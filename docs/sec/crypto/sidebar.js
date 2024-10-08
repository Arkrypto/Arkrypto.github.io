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
		title: '可搜索加密',
		collapsable: true,
		children: [
			'./se/se-best-matching-25',
			'./se/se-bilinear-pairing',
		]
	},
	
	{
		title: '认证',
		collapsable: true,
		children: [
			{
				title: '认证综述',
				collapsable: true,
				children: [
					'./auth/auth-rfid',
				]
			},
			
			{
				title: '多因素认证',
				collapsable: true,
				children: [
					'./auth/2fa-bank-ukey',
					'./auth/2fa-github-totp',
					'./auth/2fa-websocket-auth',
				]
			},
		]
	},

	
	
]
