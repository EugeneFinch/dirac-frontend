# Acess key: AKIAXHVYGZ73JKMBN3HK
# Secret key: 0ednYuBUAosJ804cz1W2mz2llDPnJ54q8jc+6BT+
# Region name: ap-southeast-1
# Format: NONE (Enter)

# remove "aws configure" if your aws has been configured
# aws configure
#!/bin/sh

path="./dist"
bucket="app-dev.diracnlp.com"
if [ $1 = 'prod' ]
then
  bucket="app.diracnlp.com"
fi
echo $bucket

aws s3 cp $path s3://$bucket --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive 