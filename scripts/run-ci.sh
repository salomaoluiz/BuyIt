if [ -z $PR_ID ]; then echo "Insira um ID de PR"; exit; fi

BRANCH_NAME=pull$PR_ID

git branch -D $BRANCH_NAME
git fetch origin pull/$PR_ID/head:$BRANCH_NAME
git checkout $BRANCH_NAME

yarn
yarn test
npx sonar-scanner\
     -Dsonar.login=$SONAR_TOKEN\
     -Dsonar.host.url=https://sonarcloud.io\
     -Dsonar.branch.name=$BRANCH_NAME