module.exports = {
	title: "Canoe's Yard",
	description: 'one note&blog during my undergraduate period.',
	dest: 'public',
	head: [
		['link', { rel: 'icon', href: '/img/boat.ico' }],
		['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
		// 数学公式样式和js
		['link',{rel:'stylesheet', href:'/css/katex0.15.1.min.css'}],
		['script',{src: '/js/katex0.15.1.min.js'}],
		
		// jquery
		['script',{src: '/js/jquery1.9.1.min.js'}],
		
		// 翻译接口、加密解密接口
		['script',{ src: '/js/api.js' }],
		['script',{ src: '/js/crypto.js' }],
		['script',{ src: '/js/md5.js' }],
		['script',{ src: '/js/clock.js' }],
		
		// 美化按钮、下拉框和输入框
		['link',{rel:'stylesheet', href:'/css/button.css'}],
	],
	theme: 'reco',
	themeConfig: {
		nav: require("./nav.js"),
		sidebar: require("./sidebar.js"),
		// 子侧边栏
		subSidebar: 'auto',
		sidebarDepth: 1,
		type: 'blog',
		logo: '/img/leaf.ico',
		// 搜索设置
		search: true,
		searchMaxSuggestions: 10,
		// 自动形成侧边导航
		// sidebar: 'auto',
		// 最后更新时间
		lastUpdated: 'Last Updated',
		// 作者
		author: 'canoe',
		// 作者头像
		authorAvatar: '/img/boat.ico',
		// 备案号
		//record: 'xxxx',
		// 项目开始时间
		startYear: '2021'
		/**
		* 密钥 (if your blog is private)
		*/

		// keyPage: {
		//   keys: ['your password'],
		//   color: '#42b983',
		//   lineColor: '#42b983'
		// },

		/**
		* valine 设置 (if you need valine comment )
		*/

		// valineConfig: {
		//   appId: '...',// your appId
		//   appKey: '...', // your appKey
		// }
	},
	markdown: {
		lineNumbers: true,
		anchor: { permalink: false },
		toc: {includeLevel: [1,2]},
		extendMarkdown: md => {
			md.use(require('markdown-it-texmath'))
		}
	},
	plugins: [
		[ '@vuepress-reco/vuepress-plugin-bgm-player', {	//npm i @vuepress-reco/vuepress-plugin-bgm-player -D
			"audios": [{
				name: '白羊',
				artist: 'canoe7',
				url: '/song/baiyang.aac',
				cover: '/img/error.jpg'
			},{
				name: '水手',
				artist: 'momo',
				url: '/song/shuishou.m4a',
				cover: '/img/error.jpg'
			}],
			// 是否默认缩小
			"autoShrink": true ,
			// 缩小时缩为哪种模式
			"shrinkMode": 'float',
			// 悬浮方位
			"floatPosition": 'left',
			// 悬浮窗样式
			"floatStyle":{ "bottom": "44px", "z-index": "999999" },
			//"position": { left: '10px', bottom: '0px', 'z-index': "999999" }
		}],
		[ "ribbon-animation", {	//npm install vuepress-plugin-ribbon-animation -D
			size: 90,   // 默认数据
			opacity: 0.3,  //  透明度
			zIndex: -1,   //  层级
			opt: {
				// 色带HSL饱和度
				colorSaturation: "80%",
				// 色带HSL亮度量
				colorBrightness: "60%",
				// 带状颜色不透明度
				colorAlpha: 0.65,
				// 在HSL颜色空间中循环显示颜色的速度有多快
				colorCycleSpeed: 6,
				// 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
				verticalPosition: "center",
				// 到达屏幕另一侧的速度有多快
				horizontalSpeed: 200,
				// 在任何给定时间，屏幕上会保留多少条带
				ribbonCount: 2,
				// 添加笔划以及色带填充颜色
				strokeSize: 0,
				// 通过页面滚动上的因子垂直移动色带
				parallaxAmount: -0.5,
				// 随着时间的推移，为每个功能区添加动画效果
				animateSections: true
			},
			ribbonShow: false, //  点击彩带  true显示  false为不显示
			ribbonAnimationShow: true  // 滑动彩带
		}],
		[ "sakura", {	//npm install vuepress-plugin-sakura -D
			num: 2,  // 默认数量
			show: true, //  是否显示
			zIndex: 99,   // 层级
			img: {
				replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
				httpUrl: '...'     // 绝对路径
			}     
		}],
		[ "vuepress-plugin-cat", ],
	    [ "vuepress-plugin-code-copy", true ],
		/*[ vuepress-plugin-cursor-effects,
			'cursor-effects', {
				size: 2, // 粒子大小
				shape: 'star', // 粒子形状（可选 'star' 和 'circle'）
				zIndex: 999999999,
			},
		],*/
		[ '@vuepress-reco/vuepress-plugin-bulletin-popover', {
			width: '240px', // 默认 260px
			title: '待到山花烂漫时',
			body: [{
				type: 'image',
				src: '/img/hu318.png'
			}],
			footer: [{
				//type: 'title',
				//content: "\"<strong>她在丛中笑</strong>\"",
				//style: 'text-aligin: center;'
				//type: 'button',
				//text: '乐',
				//link: '/Pages'
			}]
		}]
    ]
}  
