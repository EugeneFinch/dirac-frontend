# Acess key: AKIAXHVYGZ73JKMBN3HK
# Secret key: 0ednYuBUAosJ804cz1W2mz2llDPnJ54q8jc+6BT+
# Region name: ap-southeast-1
# Format: NONE (Enter)

# remove "aws configure" if your aws has been configured
# aws configure

path="./dist"

aws s3 cp $path s3://app.diracnlp.com --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursiv

