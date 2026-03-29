@echo off
setlocal enabledelayedexpansion

REM Set MongoDB URI value
set "MONGODB_URI=mongodb+srv://Yomesh%%20Mehra:pagalhaikya@cluster0.mongodb.net/bloghub?retryWrites=true&w=majority"

REM Add environment variable to Vercel
cd c:\projectit2
(
  echo n
  echo !MONGODB_URI!
  echo production
) | vercel env add MONGODB_URI

echo Environment variable added. Initiating redeployment...
