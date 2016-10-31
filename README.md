# Example of a Continuous Deliver pipeline with CodePipeline and CodeDeploy

Creating a simple Continuous Delivery pipeline allowing you to push changes from your GitHub repository to your EC2 Instances.

## Services

The following AWS services are used to create a Continuous Delivery pipeline.

* CodePipeline
* CodeDeploy
* CloudFormation
* EC2
* S3
* IAM

## Setup

Use the `./setup.sh` script to create a Continuous Delivery pipeline.

Note: The script will create a CloudFormation stack which launches an EC2 instance into the default VPC of your default region. 

The script will ask you for:
* GitHub repository
* GitHub owner (username of individual or organisation)
* GitHub [OAuth Token with access to Repo](https://github.com/settings/tokens).