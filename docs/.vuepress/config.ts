/**
 * 提示：如您想使用JS版本的配置文件可参考：https://github.com/xugaoyi/vuepress-theme-vdoing/tree/a2f03e993dd2f2a3afdc57cf72adfc6f1b6b0c32/docs/.vuepress
 */
import { resolve } from 'path'
import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
import dayjs from 'dayjs'
import htmlModules from './config/htmlModules' // 自定义插入的html块

const DOMAIN_NAME = 'northboat.github.io' // 域名 (不带https)
const WEB_SITE = `https://northboat.github.io` // 网址

export default defineConfig4CustomTheme<VdoingThemeConfig>({
  // theme: 'vdoing', // 使用npm主题包
  theme: resolve(__dirname, '../../vdoing'), // 使用本地主题包

  locales: {
    '/': {
      lang: 'zh-CN',
      title: "北船",
      description: '我的知识库',
    }
  },
  // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）

  // 主题配置
  themeConfig: {
  
	// 私密文章配置
	privatePage: {
		openPrivate: true, // 开启私密文章验证，默认开启（true），如果不开启（false），则下面配置都失效
		username: "northboat", // 管理员用户名
		password: "011026", // 管理员密码
		expire: "1d", // 登录过期时间：1d 代表 1 天，1h 代表 1 小时，仅支持这两个单位，不加单位代表秒。过期后访问私密文章重新输入用户名和密码。默认一天
		loginPath: "/northboat/login/", // 引用登录组件的 md 文章的 permalink（必须），无默认值
		loginKey: "vdoing_manager", // 存储用户名信息的 key，默认是 vdoing_manager。系统通过该 key 验证是否登录、是否过期
		loginSession: false, // 开启是否在网页关闭或刷新后，清除登录状态，这样再次访问网页，需要重新登录，默认为 false（不开启）
		firstLogin: 0, // 第一次进入网站需要验证。用于封锁整个网站，默认为 0（不开启），1 和 2 都代表开启，区别：1 代表虽然进入网站成功，但是网站内的私密文章仍需要单独验证，2 代表进入网站成功，网站内的私密文章不需要单独验证，也就是网站内的私密文章和普通文章一样可以访问
		firstLoginKey: "vdoing_first_login", // 存储用户名信息的 key，firstLogin 开启后该配置生效，默认为 vdoing_first_login，系统通过该 key 验证是否登录、是否过期
		// 私密文章多组用户名密码
		// loginInfo: {
		//   "/private/test1/": [
		//     { username: "vdoing", password: "123456" },
		//   ],
		//   "vdoing_first_login" :[  // 对应 firstLoginKey 的值
		//     { username: "vdoing", password: "123456" },
		//   ]
		// }
	},

  
	bodyBgImg: // 你的图片路径(必须位于 public 下)，可以是 URL
	[	
		// "/img/bg.png",
		"/img/timebomb.png",
		// "/img/titan.jpg",
	],
	bodyBgImgOpacity: 1, // body 背景图透明度，选值 0 ~ 1.0, 默认0.5
	indexImg: {
		navColor: 2,    // 导航栏左侧名字、中间搜索框、右侧字体的颜色，1 是黑色，2 是白色。默认是 1
		switchNavColor: true,    // 页面移出大图片的位置后，navColor 是否变换，如由白色变黑色，黑色变白色。默认是 false
		// 因为本主题的默认背景色偏向白色，如果 navColor 是 2，建议需要开启(true)，否则白背景 + 白字体 = 看不见
		bgTimeColor: true,     // 是否开启图片的背景色随一天的不同时间而变化，并且开启时间窗口提示，默认是 false。时间分为四种：白天（原图）、黄昏（偏黄）、晚上（偏黑）、深夜（偏深黑）
		// bgTimeColorArray: ['transparent', 'rgba(255, 148, 48, .2)', 'rgba(0, 0, 0, .3)', 'rgba(0, 0, 0, .5)'],   // 第一个是白天的颜色（默认原图），第二个是黄昏的颜色，第三个是晚上的颜色，第四个是深夜的颜色。bgTimeColor 为 true 生效。提示：如果不想要这个效果，但是又想要时间窗口提示效果，则改为 ['transparent', 'transparent', 'transparent', 'transparent']
		bgTimeColorArray: ['transparent', 'transparent', 'transparent', 'transparent'],
		descFade: true,   // 是否开启图片中间描述的淡入效果，默认为 false
		desc: // 多个描述，如果填写则覆盖 config.js 的 description，不填写默认读取 config.js 的 description，descFade 为 true 生效
		[
			"大海航行靠舵手，万物生长靠太阳",
			"孩儿立志出乡关，学不成名誓不还",
			"问苍茫大地，谁主沉浮？",
			"唤起工农千百万，用心干，不周山下红旗乱！",
			"今日长缨在手, 何时缚住苍龙?",
			"雄关漫道真如铁，而今迈步从头越",
			"数风流人物，还看今朝",
			"萧瑟秋风今又是，换了人间",
			"为有牺牲多壮志，敢叫日月换新天",
			"待到山花烂漫时，她在丛中笑",
			"今日欢呼孙大圣，只缘妖雾又重来",
			"人民胜利今何在，满路新贵满目衰",
		],
		descFontSize: '1.4rem',   // desc 的字体大小，默认 1.4rem。提示：原主题是 1.1rem
		descFadeInTime: 200,  // 描述的淡入效果持续时间，descFade 为 true 生效，默认 200 毫秒
		descFadeOutTime: 100,  // 描述的淡出效果持续时间，descFade 为 true 生效，默认 100 毫秒
		descNextTime: 800,  // 当存在多个 desc 时，一个 desc 展示完后或准备开始时，多少秒后出现下一个 desc，默认 800 毫秒
		bubble: false,    // 是否开启图片的气泡效果，默认为 false
		bubblePosition: 0,  // 气泡效果的位置，范围：0-100，不同数值代表不同的起始位置，0是整个图片，50是半张图（一半的下方）。bubble 为 true 生效。默认是 0
		bubbleNum: 200,   // 气泡的个数，bubble 为 true 生效，默认 200 个
	},

    // 导航配置
    nav: [
      { text: '首页', link: '/' },
	  { text: '计算机科学与技术', link: '/cs/' },
	  { text: '开发与运维', link: '/dev/' },
	  { text: '网络与信息安全', link: '/sec/' },
      {
        text: '更多',
        items: [
           { text: '收藏', link: '/pages/study/' },
		   { text: 'Band', link: '/pages/song/' },
		   { text: '关于', link: '/pages/about/' },
        ],
      },
      { text: '归档', link: '/archives/', },
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/logo.png', // 导航栏logo
    repo: 'northboat', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: 'docs', // 编辑的文件夹
    // docsBranch: 'master', // 编辑的文件所在分支，默认master。 注意：如果你的分支是main则修改为main
    editLinks: false, // 启用编辑
    editLinkText: '编辑',

    //*** 以下是Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//

    category: false, // 是否打开分类功能，默认true
    tag: false, // 是否打开标签功能，默认true
    archive: true, // 是否打开归档功能，默认true
    // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

    // pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

    // bodyBgImg: [
    //   'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
    //   'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
    //   'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    // ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时隔bodyBgImgInterval切换一张。
    // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~1.0, 默认0.5
    // bodyBgImgInterval: 15, // body多张背景图时的切换间隔, 默认15，单位s
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],
    // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // updateBar: { // 最近更新栏
    //   showToArticle: true, // 显示到文章页底部，默认true
    //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    // },
    // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
    // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
    // pageButton: false, // 是否显示快捷翻页按钮，默认true

    // 默认外观模式（用户未在页面手动修改过模式时才生效，否则以用户设置的模式为准），可选：'auto' | 'light' | 'dark' | 'read'，默认'auto'。
    // defaultMode: 'auto',

    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: 'structuring',

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
		name: 'northboat', // 必需
		link: 'https://github.com/northboat', // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
		avatar: '/img/avatar.gif',
		name: 'northboat',
		slogan: '我学密码',
    },

    // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
    social: {
		// iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
		icons: [
		{
			iconClass: 'icon-youjian',
			title: '发邮件',
			link: 'mailto:northboat@163.com',
		},
		{
			iconClass: 'icon-github',
			title: 'GitHub',
			link: 'https://github.com/northboat',
		},
		{
			iconClass: 'icon-erji',
			title: '听音乐',
			link: 'https://music.163.com/#/my/m/music/playlist?id=5123040741',
        },],
    },

    // 页脚信息
    footer: {
		createYear: 2021, // 博客创建年份
		copyrightInfo:
			'Northboat | <a href="https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/LICENSE" target="_blank">MIT License</a>', // 博客版权信息、备案信息等，支持a标签或换行标签</br>
    },

    // 扩展自动生成frontmatter（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
    extendFrontmatter: {
		author: {
			name: 'northboat',
			link: 'https://github.com/northboat',
		}
    },

    // 自定义hmtl(广告)模块
    // htmlModules
  },

  // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }], //favicons，资源放在public文件夹
	['link', { rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_3129839_xft6cqs5gc.css' }], // 阿里在线图标
    ['noscript', {}, '<meta http-equiv="refresh" content="0; url=https://www.youngkbt.cn/noscript/"><style>.theme-vdoing-content { display:none }'],
	['meta', { name: 'keywords', content: 'Blog, northboat, DevOps, Computer Science, Crypt, Cyber Security' }],
    ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
  ],


  // 插件配置
  plugins: <UserPlugins>[
	[
		'@vuepress-reco/vuepress-plugin-bgm-player', {	//npm i @vuepress-reco/vuepress-plugin-bgm-player -D
			"audios": [
			{
				name: '妖风过海',
				artist: '刘森',
				url: '/song/妖风过海.mp3',
				cover: '/img/error.jpg'
			},
			{
				name: '失忆蝴蝶',
				artist: '陈奕迅',
				url: '/song/失忆蝴蝶.mp3',
				cover: '/img/error.jpg'
			},
			{
				name: 'Love and Mangoes',
				artist: '刘水秀',
				url: '/song/Love and Mangoes.m4a',
				cover: '/img/error.jpg'
			},
			{
				name: '白羊',
				artist: '北船',
				url: '/song/白羊.mp3',
				cover: '/img/error.jpg'
			},],
			// 默认播放
			//"autoplay": true,
			// 是否默认缩小
			"autoShrink": true,
			// 缩小时缩为哪种模式
			"shrinkMode": 'float', // mini/float
			// 悬浮方位
			"floatPosition": 'left',
			// 悬浮窗样式
			"floatStyle":{ "bottom": "10px", "z-index": "999999" },
	}],
  
    [
		"sitemap", // 网站地图
		{
			hostname: WEB_SITE,
		},
    ],
	
    // 可以添加第三方搜索链接的搜索框（继承原官方搜索框的配置参数）
    [
		'thirdparty-search',
		{
			thirdparty: [
			{
				title: '在MDN中搜索',
				frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
				behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
			},
			{
				title: '在Runoob中搜索',
				frontUrl: 'https://www.runoob.com/?s=',
			},
			{
				title: '在Vue API中搜索',
				frontUrl: 'https://cn.vuejs.org/v2/api/#',
			},
			{
				title: '在Bing中搜索',
				frontUrl: 'https://cn.bing.com/search?q=',
			},
			/*{
				title: '通过百度搜索本站的',
				frontUrl: `https://www.baidu.com/s?wd=site%3A${DOMAIN_NAME}%20`,
			},*/
			],
		}
    ],

    [
		'one-click-copy', // 代码块复制按钮
		{
			copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
			copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
			duration: 1000, // prompt message display time.
			showInMobile: false, // whether to display on the mobile side, default: false.
		},
    ],
	
    [
		'vuepress-plugin-zooming', // 放大图片
		{
			selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
			options: {
				bgColor: 'rgba(0,0,0,0.6)',
			},
		},
    ],
	
    [
		'@vuepress/last-updated', // "上次更新"时间格式
		{
			transformer: (timestamp, lang) => {
				return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
			},
		},
    ],
  ],

  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
	externalLinks: { target: '_blank', rel: 'nofollow noopener noreferrer' },
	plugins: [
      'markdown-it-mathjax3'
    ],
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [
    '.vuepress/config.ts',
    '.vuepress/config/htmlModules.ts',
  ]
})
