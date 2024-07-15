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
		title: '代码审计',
		collapsable: true,
		children: [
			'./lang/lang-php',
			'./lang/lang-c++',
			'./lang/lang-rust',
		]
	},
	
	{
		title: '基础渗透',
		collapsable: true,
		children: [
			'./hack/hack-hacker101',
			'./hack/hack-wechall',
		]
	},		
]
