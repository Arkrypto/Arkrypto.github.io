module.exports = [

	{
		title: '数论',
		collapsable: true,
		children: [
			'./number/number-modular-arithmetic',
			'./number/number-arithmetic-equation',
			'./number/number-logarithm-ellipse',
		]
	},

	{
		title: '离散数学',
		collapsable: true,
		children: [
			'./discrete/discrete-mathematical-logic ',
			'./discrete/discrete-set-theory',
			'./discrete/discrete-algebraic-system',
			'./discrete/discrete-graph-theory',
		]
	},
	
	{
		title: '操作系统',
		collapsable: true,
		children: [
			'./os/os-cpu',
			'./os/os-memory',
			'./os/os-file',
		]
	},
	
	
	{
		title: '网络安全',
		collapsable: true,
		children: [
			'./hack/hack-sec-basic',
			{
				title: '语言基础',
				collapsable: true,
				children: [
					'./hack/lang-php',
					'./hack/lang-c++',
					'./hack/lang-rust',
				]
			},
			'./hack/hack-pen-testing',
		]
	},	
]
