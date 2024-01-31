
module.exports = [
	
	{
		title: '操作系统',
		collapsable: true,
		children: [
			'./os/os-outline',
			{
			    title: 'CPU 管理',
			    collapsable: true,
			    children: [
			    	'./os/os-thread',
					'./os/os-scheduling',
					'./os/os-synchronized',
					'./os/os-deadlock',
			    ]
			},
			{
			    title: '存储管理',
			    collapsable: true,
			    children: [
			    	'./os/os-memory',
					'./os/os-virtual',
			    ]
			},
			'./os/os-file',			
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
