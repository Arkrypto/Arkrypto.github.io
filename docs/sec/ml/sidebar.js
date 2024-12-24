
module.exports = [
	
	{
		title: '人工智能导论',
		collapsable: true,
		children: [
			'./cs188/cs188-search-csp-game',
			'./cs188/cs188-mdp-rl',
			'./cs188/cs188-probabilistic-reasoning',
			'./cs188/cs188-hmm-ml',
		]
	},
	
	{
		title: '机器学习导论',
		collapsable: true,
		children: [
			'./nndl/nndl-note',
			'./nndl/nndl-algo',
		]
	},
	
	
	{
		title: 'Python 基础',
		collapsable: true,
		children: [
			'./py/python-basic',
			'./py/python-flask',
		]
	},
	
	{
		title: '机器学习库/框架',
		collapsable: true,
		children: [
			'./lib/lib-numpy',
			'./lib/lib-pandas',
			'./lib/lib-scipy',
			'./lib/lib-matplotlib',
			{
				title: 'SKLearn',
				collapsable: true,
				children: [
					'./lib/lib-sklearn-classifier',
					'./lib/lib-sklearn-optimize',
				]
			},			
		]
	},
	
]
