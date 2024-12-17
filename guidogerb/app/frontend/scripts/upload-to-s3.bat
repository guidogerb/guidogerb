@echo off

REM Set variables
set BUCKET_NAME=guidogerb-website
set BUILD_DIR=..\build
set DISTRIBUTION_ID=E32VPMAV1WVWLZ

set TIMESTAMP=%DATE:~10,4%-%DATE:~4,2%-%DATE:~7,2%-%TIME:~0,2%-%TIME:~3,2%-%TIME:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

aws s3 mb s3://%BUCKET_NAME%/backups/%TIMESTAMP% --region us-east-1
aws s3 mv s3://%BUCKET_NAME% s3://%BUCKET_NAME%/backups/%TIMESTAMP% --recursive --exclude "backups/*"

REM Upload to S3
aws s3 sync %BUILD_DIR% s3://%BUCKET_NAME%

REM Create CloudFront invalidation
aws cloudfront create-invalidation --distribution-id %DISTRIBUTION_ID% --paths "/*"

echo Deployment complete!
pause