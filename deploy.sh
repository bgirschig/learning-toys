# Config
DEPLOY_DIR=./dist/
TARGET_HOST=u68883171@home415082389.1and1-data.host
TARGET_PATH=projects/exercices

# script options
set -o errexit
set -o nounset

# Ensure correct directory
cd "$(dirname "$0")"

# build
npm run build
# deploy built files
rsync -avz --delete $DEPLOY_DIR $TARGET_HOST:$TARGET_PATH