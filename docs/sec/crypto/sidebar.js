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
		title: '现代密码学',
		collapsable: true,
		children: [
		    './crypto/crypto-outline-stream-cipher',
			'./crypto/crypto-block-cipher',
			'./crypto/crypto-public-key',
			'./crypto/crypto-destribution-manage',
			'./crypto/crypto-verify-hash',
			'./crypto/crypto-digital-signature',
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
	
]
