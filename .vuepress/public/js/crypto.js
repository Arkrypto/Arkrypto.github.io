// node 版本：v14.21.3
// npm 版本：9.6.4


function printRtn(type, rtn){
	if(type == 1){
		document.getElementById("rtn").innerHTML = "加密结果：" + rtn;
	} else {
		document.getElementById('rtn').innerHTML = "解密结果：" + rtn;
	}
	
}

// window.prompt(code[id].innerHTML + "\n\n加密形式：y=ax+b\n\n请键入参数 a 和 b，使用 \'/\' 分隔开");
// window.prompt(code[id].innerHTML + "\n\n解密形式：x=a^{-1}(y-b)\n\n请键入参数 a 和 b，使用 \'/\' 分隔开");
function encrypt(){
	text = document.getElementById("crypto").value;
	var code = document.getElementById('code');
	var id = code.selectedIndex;
	switch(id){
		case 0: 
			printRtn(1, MD5(text));
			break;//凯撒密码
		case 1: 
			printRtn(1, "我是懒狗，还没写");
			break;//凯撒密码
		case 2: 
			printRtn(1, "我是懒狗，还没写");
			break;//维吉尼亚密码
		case 3: 
			printRtn(1, "我是懒狗，还没写");
			break;//线性反馈移位寄存器
		case 4: 
			printRtn(1, "我是懒狗，还没写");
			break;//分组密码
		case 5: 
			printRtn(1, "我是懒狗，还没写");
			break;//扩展欧几里得算法
		case 6: 
			printRtn(1, "我是懒狗，还没写");
			break;//孙子定理
	}
}

function decrypt(){
	// 获取密文
	text = document.getElementById("crypto").value;
	// 密码类型
	var code = document.getElementById('code');
	var id = code.selectedIndex;
	switch(id){
		case 0: 
			printRtn(2, "仅支持MD5加密");
			break;//凯撒密码
		case 1: 
			printRtn(2, "我是懒狗，还没写");
			break;//凯撒密码
		case 2: 
			printRtn(2, "我是懒狗，还没写");
			break;//维吉尼亚密码
		case 3: 
			printRtn(2, "我是懒狗，还没写");
			break;//线性反馈移位寄存器
		case 4: 
			printRtn(2, "我是懒狗，还没写");
			break;//分组密码
		case 5: 
			printRtn(2, "我是懒狗，还没写");
			break;//扩展欧几里得算法
		case 6: 
			printRtn(2, "我是懒狗，还没写");
			break;//孙子定理
	}
}




