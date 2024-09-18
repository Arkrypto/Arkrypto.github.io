module.exports = [

	{
		title: '现代密码学',
		collapsable: true,
		children: [
		    './cip/cipher-outline-stream-cipher',
			'./cip/cipher-block-cipher',
			'./cip/cipher-public-key',
			'./cip/cipher-destribution-manage',
			'./cip/cipher-verify-hash',
			'./cip/cipher-digital-signature',
		]
	},
	
	{
		title: '端到端认证',
		collapsable: true,
		children: [
			'./p2p/p2p-2fa-bank-ukey',
			'./p2p/p2p-2fa-github-totp',
			'./p2p/p2p-websocket',
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
		title: 'RFID 认证',
		collapsable: true,
		children: [
			'./rfid/rfid-tech-app',
			'./rfid/rfid-overview',
		]
	},

	
	
]
