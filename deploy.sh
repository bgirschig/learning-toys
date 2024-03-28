# Config
DEPLOY_DIR=./dist/
TARGET_HOST=u68883171@home415082389.1and1-data.host:projects/
TARGET_PATH=exercices/
SITE_URL=https://projects.bastiengirschig.com/$TARGET_PATH

# script options
set -o errexit
set -o nounset

# Ensure correct directory
cd "$(dirname "$0")"

# build
npm run build
# deploy built files
rsync -avz --delete $DEPLOY_DIR $TARGET_HOST$TARGET_PATH

echo "successfully deployed. Site can now be viewed at: $SITE_URL"