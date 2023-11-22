%放在上一级目录下执行，不得不吐槽一句这个反人类的反斜%


xcopy /s /e /i /y VuePress-Reco-1.x\public canoe95.github.io
rd /s /q VuePress-Reco-1.x\public


cd canoe95.github.io
call push

pause