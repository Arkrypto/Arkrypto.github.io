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
			'./nndl/nndl-experiment',
		]
	},
	
	{
		title: '深度学习库 & 框架',
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
