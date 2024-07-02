
module.exports = [

	{
		title: '计算机网络 - 一周目',
		collapsable: true,
		children: [
			'./hang/computer-network-outline',
			'./hang/computer-network-physical-layer',
			'./hang/computer-network-datalink',
			'./hang/computer-network-network-layer',
			'./hang/computer-network-transport',
			'./hang/computer-network-application',
		]
	},

	{
		title: '计算机网络 - 二周目',
		collapsable: true,
		children: [
			'./wang/computer-network-outline-physical',
			{
				title: '数据链路层',
				collapsable: true,
				children: [
					'./wang/computer-network-data-link',
					'./wang/computer-network-lan-wan',
				]
			},
			{
				title: '网络层',
				collapsable: true,
				children: [
					'./wang/computer-network-routing',
					'./wang/computer-network-ipv4',
				]
			},
			'./wang/computer-network-transport-application',
		]
	},
	
	

	
	{
		title: 'TCP/IP Socket in C',
		collapsable: true,
		children: [
			'./socket/socket-tcp',
			'./socket/socket-udp',
		]
	},
	
]
