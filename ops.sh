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
	echo "4.push again"
    echo "5.pull"
    echo -e "\033[34m===================================\033[0m"
}

# 函数：显示退出动画
exit_animation() {
    clear  # 清屏

    # 大肥猫的图案
    cat_art=(
        "      /\\_____/\\  "
        "     /  o   o  \\ "
        "    ( ==  ^  == )"
        "     )         ( "
        "    (           )"
        "   ( (  )   (  ) )"
        "  (__(__)___(__)__)"
    )

    # 显示大肥猫和消息
    for i in {1..2}; do
        clear
        echo ""
        for line in "${cat_art[@]}"; do
            echo "$line"
        done
        echo ""
        echo "    miao~miao~miao"
        sleep 2 # 停留 2 秒

        clear
        echo ""
        for line in "${cat_art[@]}"; do
            echo "$line"
        done
        echo ""
        echo "  see you next time!"
        sleep 2  # 停留 2 秒
    done

    sleep 1  # 最后停留1秒
    exit 0  # 退出脚本
}


while true; do
    
	print_menu
    
    read -p "enter the operation (1-4, or 0 to exit): " n

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
		0)
			exit_animation ;;
        *)
			echo "无效输入，请重试"; sleep 1; continue ;;
    esac

    # 操作完成后暂停1秒（可选）
    # sleep 1
done