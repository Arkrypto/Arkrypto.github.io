
module.exports = [

	{
		title: '数据结构',
		collapsable: true,
		children: [
			'./wang/data-structure-sequence',
			'./wang/data-structure-stack-queue-array-string',
			'./wang/data-structure-forest-binary-tree',
			'./wang/data-structure-graph',
			'./wang/data-structure-search',
			'./wang/data-structure-sort',
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
		]
	},
	
	{
		title: '深度学习库框架',
		collapsable: true,
		children: [
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
