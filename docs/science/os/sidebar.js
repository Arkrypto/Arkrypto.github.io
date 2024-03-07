
module.exports = [
	
	{
		title: '操作系统 - 启航',
		collapsable: true,
		children: [
			'./hang/os-outline',
			{
			    title: 'CPU 管理',
			    collapsable: true,
			    children: [
			    	'./hang/os-thread',
					'./hang/os-scheduling',
					'./hang/os-synchronized',
					'./hang/os-deadlock',
			    ]
			},
			{
			    title: '存储管理',
			    collapsable: true,
			    children: [
			    	'./hang/os-memory',
					'./hang/os-virtual',
			    ]
			},
			'./hang/os-file',			
		]
	},

	{
		title: '汇编设计与编译原理',
		collapsable: true,
		children: [
			'./asm/assembly-basic',
			{
			    title: '汇编语言程序设计',
			    collapsable: true,
			    children: [
					'./asm/assembly-branch',
					'./asm/assembly-loop',
			    ]
			},
			'./asm/compile-principle'
		]
	},
	
]
