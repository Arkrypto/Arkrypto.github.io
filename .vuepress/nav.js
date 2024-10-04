//主管控导航栏
module.exports = [

    { text: '主页', icon: 'reco-home', link: '/' },

	{ text: '博客', icon: 'reco-blog', link: '/categories/Blogs/' },
	
	{ text: '计算机科学与技术', icon: 'reco-document', items: [
		{text: '数据结构', link: '/docs/cs/ds/'},
		{text: '组原', link: '/docs/cs/co/'},
		{text: '计算机网络', link: '/docs/cs/cn/'},
		{text: '操作系统', link: '/docs/cs/os/'},
	]},
	
	{ text: '开发与运维', icon: 'reco-bokeyuan', items: [ 
		{text: '后端开发', link: '/docs/devops/be/'},
		{text: '算法', link: '/docs/devops/algo/'},
		{text: '服务器运维', link: '/docs/devops/ops/'},
		{text: '前端开发', link: '/docs/devops/fe/'},
	]},
	
	{ text: '网络与信息安全', icon: 'reco-eye', items: [
		{text: '密码工程', link: '/docs/sec/crypto/'},
		{text: '数学', link: '/docs/sec/math/'},
		{text: '文学与政治', link: '/docs/sec/lib/'},
		{text: '网络安全', link: '/docs/sec/cs/'},
	]},
	
	
	
	{ text: 'GitHub', icon: 'reco-github', link: 'https://github.com/northboat' },

]
