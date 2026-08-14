@echo off
chcp 65001 >nul
rem index.html を file:// で直接開くと、type="module" スクリプトが
rem ブラウザのCORS制限でブロックされ、Alpine.jsが初期化されずページが
rem 表示されない（page-wrapper の opacity:0 が解除されない）。
rem このスクリプトはこのフォルダをローカルHTTPサーバーで公開し、
rem http:// 経由で正しく表示できるようにする。

cd /d "%~dp0"
start "matsuo-komuten-mirror server" cmd /c "python -m http.server 8080"
timeout /t 1 /nobreak >nul
start "" "http://localhost:8080/index.html"

echo.
echo ローカルサーバーを起動しました: http://localhost:8080/index.html
echo 別ウィンドウでサーバーが起動しています。閲覧が終わったらそのウィンドウを閉じてください。
echo このウィンドウは閉じて問題ありません。
pause
