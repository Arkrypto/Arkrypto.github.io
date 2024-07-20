module.exports = [	
	{
		title: '双因素认证',
		collapsable: true,
		children: [
			'./2fa/2fa-bank-ukey-auth',
			'./2fa/2fa-github-totp-auth',
		]
	},
	
	/*{
		title: '端到端认证',
		collapsable: true,
		children: [
			'./p2p/https',
			'./p2p/websocket',
		]
	},
	
	{
		title: 'RFID 认证',
		collapsable: true,
		children: [
			'./rfid/basic', //《RFID原理及应用》
		]
	},*/

	
	{
		title: 'Web 安全',
		collapsable: true,
		children: [
			'./hack/hack-basic',
			'./hack/hack-penetration-testing',
		]
	},		
]
