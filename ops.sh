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
    echo "1.dev"
    echo "2.build"
    echo "3.push"
    echo "4.pull"
    echo -e "\033[34m===================================\033[0m"
}


while true; do
    
	print_menu
    
    read -p "enter the operation number (1-4, or c to exit): " n

    case $n in
        1) 
			echo "Running the Project..."
			npm run dev:win
			;;
        2)
			echo "Building the Project..."
			npm run build:win
			;;
        3) push_function ;;
        4) 
			read -p "确认要从远程拉取更新吗？(y/n) " confirm
			[[ $confirm == [yY] ]] && git pull || echo "已取消"
			;;
		c) echo "Exiting..."; exit 0 ;;
        *) echo "无效输入，请重试"; sleep 1; continue ;;
    esac

    # 操作完成后暂停1秒（可选）
    # sleep 1
done