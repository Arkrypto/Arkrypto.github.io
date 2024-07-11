
module.exports = [

	{
		title: '计算机组成原理',
		collapsable: true,
		children: [
			'./hang/co-outline',
			'./hang/co-bus',
			'./hang/co-memory',
			'./hang/co-io',
			'./hang/co-num',	
			'./hang/co-instruction',
			'./hang/co-cpu',
		]
	},

	{
		title: '电子技术基础',
		collapsable: true,
		children: [
			'./circuit/circuit-door',
			'./circuit/circuit-combine',
			'./circuit/circuit-trigger',
			'./circuit/circuit-time',		
		]
	},
	
	{
		title: '体系结构与接口',
		collapsable: true,
		children: [
			'./arch/architecture-basic',
			{
				title: "计算机接口实验",
				collapsable: true,
				children: [
					'./arch/interface-interrupt',
					'./arch/interface-timer',
					'./arch/interface-io',
					'./arch/interface-adc',
				]
			},
		]
	},

	
	

	
]
