
module.exports = [

	{
		title: '计算机网络',
		collapsable: true,
		children: [
			'./cn/computer-network-outline-physical',
			{
				title: '数据链路层',
				collapsable: true,
				children: [
					'./cn/computer-network-data-link',
					'./cn/computer-network-lan-wan',
				]
			},
			{
				title: '网络层',
				collapsable: true,
				children: [
					'./cn/computer-network-routing',
					'./cn/computer-network-ipv4',
				]
			},
			'./cn/computer-network-transport-application',
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
