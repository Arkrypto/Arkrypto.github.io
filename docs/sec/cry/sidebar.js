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
			'./imp/imp-2fa-bank-ukey',
			'./imp/imp-2fa-github-totp',
			'./imp/imp-websocket-auth',
		]
	},
	
	{
		title: '可搜索加密',
		collapsable: true,
		children: [
			'./se/se-bm25',
			'./se/se-spwse',
			'./se/se-bp',
			'./se/se-ipfe',
		]
	},
	
	{
		title: '轻量加密',
		collapsable: true,
		children: [
			'./light/rfid-auth-survey',
			'./light/p2p-light-auth',
			'./light/post-quantum-signature',
		]
	},

	
	
]
