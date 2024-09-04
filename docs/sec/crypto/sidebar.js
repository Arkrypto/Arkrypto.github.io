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
		title: '双因素认证',
		collapsable: true,
		children: [
			'./2fa/2fa-bank-ukey-auth',
			'./2fa/2fa-github-totp-auth',
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
	
	/*
	{
		title: '端到端加密',
		collapsable: true,
		children: [
			//'./p2p/https',
			//'./p2p/websocket',
		]
	},
	{
		title: 'RFID 认证',
		collapsable: true,
		children: [
			'./rfid/basic', //《RFID原理及应用》
		]
	},*/

	
	
]
