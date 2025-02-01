#!/bin/bash

function push_function() {
    read -p "enter the commit for this push: " commit
    git add .
    git commit -m "$commit"
    git push
}

echo "========================================"
echo "[The Operations of This Dir]:"
echo "1.dev"
echo "2.build"
echo "3.push"
echo "4.pull"

read -p "enter the operation number: " n

if [ "$n" = "1" ]; then
    npm run dev:win
elif [ "$n" = "2" ]; then
    npm run build:win
elif [ "$n" = "3" ]; then
    push_function
elif [ "$n" = "4" ]; then
    git pull
fi

read -p "Press enter to continue..."