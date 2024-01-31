
module.exports = [

	{
		title: 'Linux',
		collapsable: true,
		children: [
			'./os/linux-experiment',
			'./os/linux-centos',
			'./os/linux-manjaro',
		]
	},

	{
		title: '工具',
		collapsable: true,
		children: [
		    './tool/tool-git',
		]
	},

	{
		title: '中间件',
		collapsable: true,
		children: [		   
			'./mid/middleware-nginx',
		    {
				title: "Docker",
				collapsable: true,
				children: [
					'./mid/middleware-docker-basic',
					'./mid/middleware-docker-advance',			
				]
		    },
		    
			'./mid/middleware-mysql',
			'./mid/middleware-redis',
		    './mid/middleware-rabbitmq',
		]
	},

]