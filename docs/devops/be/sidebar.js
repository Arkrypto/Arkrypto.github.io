//java的侧边栏
module.exports = [

	{
		title: 'Java 基础',
		collapsable: true,
		children: [
			'./basic/java-se-class',
			'./basic/java-se-collection',
			'./basic/java-se-io'
		]
	},
	
	{
		title: 'Java Web 基础',
		collapsable: true,
		children: [
			'./web/java-web-tomcat',
			'./web/java-web-maven',
			'./web/java-web-servlet',
			'./web/java-web-session',
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
	
	{
		title: '分布式开发',
		collapsable: true,
		children: [
			'./api/api-python-flask',
			'./api/api-java-spring-basic',
			'./api/api-java-spring-advance',
			'./api/api-distributed-system',
		]
	},
	
]
