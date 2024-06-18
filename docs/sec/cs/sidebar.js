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
		title: '语言基础',
		collapsable: true,
		children: [
			'./lang/lang-php',
			'./lang/lang-c++',
			'./lang/lang-rust',
		]
	},
	
	{
		title: '复试专业考察',
		collapsable: true,
		children: [
			'./9151/9151-c',
			'./9151/9151-discrete',
			'./9151/9151-os',
		]
	},	
	
	{
		title: '基础攻防',
		collapsable: true,
		children: [
			'./hack/ctf-wechall',
			'./hack/ctf-hacker101',
		]
	},
	
]
