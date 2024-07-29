//主管控导航栏

module.exports = [

    { text: '主页', icon: 'reco-home', link: '/' },

	{ text: '博客', icon: 'reco-blog', link: '/categories/blog/' },
	
	{ text: '计算机科学与技术', icon: 'reco-document', items: [
		{text: '计算机网络', link: '/docs/cs/cn/'},
		{text: '数据结构', link: '/docs/cs/ds/'},			
		{text: '计算机组成原理', link: '/docs/cs/co/'},
		{text: '操作系统', link: '/docs/cs/os/'},
	]},
	
	{ text: '开发与运维', icon: 'reco-bokeyuan', items: [ 
		{text: '后端开发', link: '/docs/dev/be/'},
		{text: '算法', link: '/docs/dev/algo/'},
		{text: '服务器运维', link: '/docs/dev/op/'},
		{text: '前端开发', link: '/docs/dev/fe/'},
	]},
	
	{ text: '网络与信息安全', icon: 'reco-eye', items: [
		{text: '信息', link: '/docs/sec/lib/'},
		{text: '网络工程', link: '/docs/sec/ce/'},
		{text: '数学', link: '/docs/sec/math/'},
		{text: '密码应用', link: '/docs/sec/crypto/'},
	]},
	
	
	
	{ text: 'GitHub', icon: 'reco-github', link: 'https://github.com/northboat' },

]
