# Acess key: AKIAXHVYGZ73DXPINQ7G
# Secret key: D8uCLSzM77cxCMubYOQbvbeI0xmFbD9ve2FG5Mm5
# Region name: ap-southeast-1
# Format: NONE (Enter)

# remove "aws configure" if your aws has been configured
# aws configure

path="./dist"

aws s3 cp $path s3://app.diracnlp.com --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursiv

