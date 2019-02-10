# This part will be used to test before merging the code from another branch to master
# STAGING_BRANCH="deploy"

# NODE_ENV="master"
# Determine the environment to deploy to based on which branch this commit is on
# NODE_ENV='staging-test'

PRODUCTION_BRANCH="master"
if [[ $TRAVIS_BRANCH != $PRODUCTION_BRANCH ]]; then
  # Don't want to deploy if it's not master
  echo "Not deploying"
  exit
fi

EB_ENV="master"
echo "Deploying to $EB_ENV"

pip install --user --upgrade awsebcli

# Configure AWS credentials for Elastic Beanstalk
mkdir -p ~/.aws
echo '[profile eb-cli]' > ~/.aws/config
echo "aws_access_key_id = $AWS_ACCESS_KEY_ID" >> ~/.aws/config
echo "aws_secret_access_key = $AWS_SECRET_ACCESS_KEY" >> ~/.aws/config
eb status

# Deploy application to the appropriate ElasticBeanstalk env
eb deploy $EB_ENV -v
rm ~/.aws/config