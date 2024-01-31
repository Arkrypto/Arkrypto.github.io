set /p commit=please enter the commit for this push: 

npm run build

git add .
git commit -m "%commit%"
git push


pause