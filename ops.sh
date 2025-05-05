#!/bin/bash

function push_function() {
    read -p "enter the commit for this push: " commit
    git add .
    git commit -m "$commit"
    git push
}

function print_menu() {
	# clear  # 清屏使界面更清爽（可选）
    echo -e "\033[34m===================================\033[0m"
	echo -e "\033[32m[The Operations of This Repository]:\033[0m"
	echo "0.exit 0"
    echo "1.npm run dev"
    echo "2.npm run build"
    echo "3.git add→commit→push"
	echo "4.git push"
    echo "5.git pull"
	echo "6.git gc"
    echo -e "\033[34m===================================\033[0m"
}

print_cat(){
	clear
    echo ""
	echo ""
	echo ""
	echo ""
	echo ""
	echo ""
    echo ""
	echo "		            ／\\___________／\\"
	echo "		           /      o   o      \\"
	echo "		         (     =    ᴥ    =     )"
	echo "		        (                       )"
	echo "		       (    (   (       )   )    )"
	echo "		      (____(__)_____(___(__)______)"
	
}

# 函数：显示退出动画
exit_animation() {
    clear  # 清屏

    # 显示大肥猫和消息
    print_cat	
    echo ""
    echo "		            miao wu~ miao wu~"
    sleep 2 # 停留 2 秒

	print_cat
    echo ""
    echo "		            see you next day~"
    sleep 3  # 停留 3 秒
}


while true; do
    
	print_menu
    
    read -p "enter the operation (1-6, or 0 to exit): " n

    case $n in
        1) 
			echo "Running the Project..."
			npm run dev:win
			;;
        2)
			echo "Building the Project..."
			npm run build:win
			;;
        3)
			push_function ;;
		4)
			git push ;;
        5) 
			read -p "确认要从远程拉取更新吗？(y/n) " confirm
			[[ $confirm == [yY] ]] && git pull || echo "已取消"
			;;
		6)
			echo "Cleaning the .git"
			git gc --aggressive --prune=now
			;;
		0)
			exit_animation
			echo ""
			read -p "		        需要大肥猫帮你关机吗(y/n) " confirm
			[[ $confirm == [yY] ]] && shutdown -s -t 10 && echo "将在十秒后关机" && sleep 4 && print_cat || exit 0  # 退出脚本
			;;
        *)
			echo "无效输入，请重试"; sleep 1; continue ;;
    esac

    # 操作完成后暂停1秒（可选）
    # sleep 1
done