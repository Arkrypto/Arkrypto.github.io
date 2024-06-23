//主管控导航栏

module.exports = [

    {
       	text: 'Home', icon: 'reco-home',
		items: [
			{text: 'Root', icon: 'reco-blog', link: '/'},
			{text: 'Library', icon: 'reco-blog', link: '/docs/lib/'},
			{text: 'Blog', icon: 'reco-blog', link: '/categories/Blog/'},
			{text: 'Github', icon: 'reco-blog', link: 'https://github.com/northboat'},
			
        ]
    },


	{
       	text: '2084 DevOps', icon: 'reco-github',
		items: [
			{text: 'Algorithm', icon: 'reco-bokeyuan', link: '/docs/dev/algo/'},
			{text: 'Java', icon: 'reco-bokeyuan', link: '/docs/dev/java/'},
			{text: 'Operations', icon: 'reco-bokeyuan', link: '/docs/dev/op/'},
			{text: 'Front End', icon: 'reco-bokeyuan', link: '/docs/dev/fe/'},
        ]
    },	
	
    
	
	{
		text: 'NEUQ CS', icon: 'reco-document',
		items: [
			{text: 'Computer Network', icon: 'reco-category', link: '/docs/cs/cn/'},
			{text: 'Data Structure', icon: 'reco-category', link: '/docs/cs/ds/'},			
			{text: 'Computer Organization', icon: 'reco-category', link: '/docs/cs/co/'},
			{text: 'Operating System', icon: 'reco-category', link: '/docs/cs/os/'},
		]
    },

	{
		text: 'XDU CyberSec', icon: 'reco-other',
		items: [
			{text: 'Federated ML', icon: 'reco-eye', link: '/docs/sec/fml/'},
			{text: 'Math', icon: 'reco-eye', link: '/docs/sec/math/'},	
			{text: 'Cryptography', icon: 'reco-eye', link: '/docs/sec/crypto/'},
			{text: 'Penetration', icon: 'reco-eye', link: '/docs/sec/pen/'},
		]
    },

]
