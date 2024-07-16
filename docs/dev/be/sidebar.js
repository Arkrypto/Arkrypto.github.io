//java的侧边栏
module.exports = [

	{
		title: 'Java 基础',
		collapsable: true,
		children: [
			'./javase/java-se-class',
			'./javase/java-se-collection',
			'./javase/java-se-io'
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
		title: 'Web 后端框架',
		collapsable: true,
		children: [
			'./frame/java-springboot',
			'./frame/python-flask',
		]
	},
	
]
