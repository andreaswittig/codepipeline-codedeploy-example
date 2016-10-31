#!/bin/bash -e
yum update
yum install -y ruby wget
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x ./install
./install auto
service codedeploy-agent start