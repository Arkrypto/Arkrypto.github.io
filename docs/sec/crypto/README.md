<div class="select">
  <select id="code">
    <option>MD5加密</option>
    <option>Base64编/解码</option>
    <option>凯撒密码</option>
    <option>维吉尼亚密码</option>
    <option>线性反馈移位寄存器 LFSR</option>
    <option>分组密码-数据加密标准 DES</option>
    <option>扩展欧几里得计算</option>
  </select>
</div><br>
<div>
    <input type="text" placeholder="性感密码，在线加密" id="crypto">
</div><br>
<div display="inline">
    <button class="blue button" onclick="encrypt()">加密</button>
    <button class="red button" onclick="decrypt()">解密</button>
</div>
<h4 id="rtn"></h4>

