@echo off
setlocal

echo Building Vue project...
cd my-lists-app
call npm run build

echo Back to root directory...
cd ..

echo Removing old dist folder if it exists...
if exist backend\dist (
    rmdir /s /q backend\dist
)

echo Creating empty backend/dist folder...
mkdir backend\dist

echo Copying new build to backend/dist...
xcopy /s /e /y my-lists-app\dist\* backend\dist\

echo Build copied successfully.
pause