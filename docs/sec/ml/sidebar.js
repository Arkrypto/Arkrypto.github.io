module.exports = [

	{
		title: 'Python3',
		collapsable: true,
		children: [
			'./py/python-basic',
		    {
				title: "Python Hundred",
		        collapsable: true,
				children: [
		            './py/python-first',
		            './py/python-second',
			    	'./py/python-third',		
				]
		    },		    
		    './py/python-dev',
		]
	},

	{
		title: '人工智能导论',
		collapsable: true,
		children: [
			'./ai/cs188-search-csp-game',
			'./ai/cs188-mdp-rl',
			'./ai/cs188-probabilistic-reasoning',
			'./ai/cs188-hmm-ml',
		]
	},
	
	{
		title: '机器学习导论',
		collapsable: true,
		children: [
			'./ml/ml-nndl-book',
			'./ml/ml-experiment',
		]
	},
	
	{
		title: '深度学习框架',
		collapsable: true,
		children: [
			'./lib/pytorch-basic',
			{
				title: '数据科学库',
				collapsable: true,
				children: [
					'./lib/pylib-numpy',
					'./lib/pylib-pandas',
					'./lib/pylib-scipy',
					'./lib/pylib-matplotlib',
				]
			},
			{
				title: 'Scikit Learn',
				collapsable: true,
				children: [
					'./lib/sklearn-classifier',
					'./lib/sklearn-optimize',
				]
			},
		]
	},
	

]
