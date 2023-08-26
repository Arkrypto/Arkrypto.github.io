function encrypt(){
	text = document.getElementById("crypto").value;
	var code = document.getElementById('code');
	var id = code.selectedIndex;
	switch(id){
		case 0: 
			params = window.prompt(code[id].innerHTML + "\n\n加密形式：y=ax+b\n\n请键入参数 a 和 b，使用 \'/\' 分隔开");
			break;//凯撒密码
		case 1: 
			alert("我是懒狗，还没写");
			break;//维吉尼亚密码
		case 2: 
			alert("我是懒狗，还没写");
			break;//线性反馈移位寄存器
		case 3: 
			alert("我是懒狗，还没写");
			break;//分组密码
		case 4: 
			alert("我是懒狗，还没写");
			break;//扩展欧几里得算法
		case 5: 
			alert("我是懒狗，还没写");
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
			params = window.prompt(code[id].innerHTML + "\n\n解密形式：x=a^{-1}(y-b)\n\n请键入参数 a 和 b，使用 \'/\' 分隔开");
			break;//凯撒密码
		case 1: 
			alert("我是懒狗，还没写");
			break;//维吉尼亚密码
		case 2: 
			alert("我是懒狗，还没写");
			break;//线性反馈移位寄存器
		case 3: 
			alert("我是懒狗，还没写");
			break;//分组密码
		case 4: 
			alert("我是懒狗，还没写");
			break;//扩展欧几里得算法
		case 5: 
			alert("我是懒狗，还没写");
			break;//孙子定理
	}
}


// 百度翻译接口
function translate(mode){
	//http://api.fanyi.baidu.com/api/trans/product/desktop?req=detail
	var appid = '20230812001777955';
	var key = '9OS5pJkvTf9u4f0eCPL4';
	var salt = (new Date).getTime();
	var query = document.getElementById("trans").value;
	// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
	if(mode == 1) {
		var from = 'en';
		var to = 'zh';
	} else {
		var from = 'zh';
		var to = 'en';
	}
	
	var str1 = appid + query + salt +key;
	var sign = MD5(str1);
	$.ajax({
		url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
		type: 'get',
		dataType: 'jsonp',
		data: {
			q: query,
			appid: appid,
			salt: salt,
			from: from,
			to: to,
			sign: sign
		},
		success: function (data) {
			console.log(data)
			document.getElementById("trans").value = data.trans_result == null ? "翻译错误 / Translation Error" : data.trans_result[0].dst;
		}
	});
}

function en_to_zh_translate(){
	translate(1);
}

function zh_to_en_translate(){
	translate(2);
}

// ChatGPT 接口
function chat_gpt() {
	
    const inputText = document.getElementById("chat").value;

    const apiKey = "";
    const model = "gpt-3.5-turbo";

    const requestData = {
        messages: [{ role: "system", content: "You are a user" }, { role: "user", content: inputText }]
    };

    $.ajax({
        type: "POST",
        url: `https://api.openai.com/v1/chat/completions/${model}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        data: JSON.stringify(requestData),
        success: function(response) {
            const responseText = response.choices[0].message.content;
            document.getElementById("feedback").innerText = responseText;
        },
        error: function(error) {
            console.error("Error:", error);
			document.getElementById("feedback").innerText = "Error";
        }
    });
}
