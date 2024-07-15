//java的侧边栏
module.exports = [



	{
		title: 'Java 基础',
		collapsable: true,
		children: [
			'./se/java-se-class',
			'./se/java-se-collection',
			'./se/java-se-io'
		]
	},
	
	{
		title: 'Web 开发',
		collapsable: true,
		children: [
			'./web/java-web-tomcat',
			'./web/java-web-maven',
			'./web/java-web-servlet',
			'./web/java-web-session',
			'./web/java-web-springboot',
			'./web/python-flask',
		]
	},

	
	{
		title: 'Java 并发编程',
		collapsable: true,
		children: [
			'./juc/juc-lock',
			'./juc/juc-pool',
			'./juc/juc-fork',	
			'./juc/juc-single',
		]
	},
	

	
]
