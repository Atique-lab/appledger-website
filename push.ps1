Write-Host "--- AppLedger GitHub Repository Push ---" -ForegroundColor Green

git init
git add .
git commit -m "Initial production release of AppLedger website"
git branch -M main
git remote add origin https://github.com/Atique-lab/appledger-website.git
git push -u origin main

Write-Host "✅ Push complete!" -ForegroundColor Green
