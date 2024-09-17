
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
		title: '操作系统 - 王道',
		collapsable: true,
		children: [
			'./wang/os-cpu',
			'./wang/os-memory',
			'./wang/os-file',
		]
	},

	{
		title: '编译原理与汇编程序',
		collapsable: true,
		children: [
			'./comp/assembly-basic',
			{
			    title: '汇编语言程序设计',
			    collapsable: true,
			    children: [
					'./comp/assembly-branch',
					'./comp/assembly-loop',
			    ]
			},
			'./comp/compile-principle'
		]
	},
	
	{
		title: '数据库系统概论',
		collapsable: true,
		children: [
		    './db/database-outline',
		    './db/database-sql',
		    './db/database-design',
		]
	},
	
	
	{
		title: '软件工程',
		collapsable: true,
		children: [
			'./se/software-engineering-basic',
			'./se/software-engineering-experiment',
		]
	},
	
]
