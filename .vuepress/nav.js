//主管控导航栏

module.exports = [

    {
       	text: 'Home',
		items: [
			{text: 'Root', link: '/'},
			{text: 'Library', link: '/docs/lib/'},
			{text: 'Blog', link: '/categories/Blog/'},
			{text: 'Github', link: 'https://github.com/northboat'},
			
        ]
    },
	
	{
       	text: '2084 DevOps',
		items: [
			{text: 'Algorithm', link: '/docs/dev/algo/'},
			{text: 'Java', link: '/docs/dev/java/'},
			{text: 'Operations', link: '/docs/dev/op/'},
			{text: 'Front End', link: '/docs/dev/fe/'},
        ]
    },	
	
    
	
	{
		text: 'NEU CS',
		items: [
			{text: 'Computer Network', link: '/docs/cs/cn/'},
			{text: 'Data Structure', link: '/docs/cs/ds/'},			
			{text: 'Computer Organization', link: '/docs/cs/co/'},
			{text: 'Operating System', link: '/docs/cs/os/'},
		]
    },

	{
		text: 'XDU Cyber Sec',
		items: [
			{text: 'Cryptography', link: '/docs/sec/crypto/'},
			{text: 'Math', link: '/docs/sec/math/'},	
			{text: 'Federated ML', link: '/docs/sec/fml/'},
			{text: 'Penetration', link: '/docs/sec/pen/'},
		]
    },

]
