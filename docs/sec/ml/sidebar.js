
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
		title: '机器学习库/框架',
		collapsable: true,
		children: [
			'./lib/python-basic',
			'./lib/python-flask',
			'./lib/pylib-numpy',
			'./lib/pylib-pandas',
			'./lib/pylib-scipy',
			'./lib/pylib-matplotlib',
			{
				title: 'SKLearn',
				collapsable: true,
				children: [
					'./lib/sklearn-classifier',
					'./lib/sklearn-optimize',
				]
			},			
		]
	},
	
]
