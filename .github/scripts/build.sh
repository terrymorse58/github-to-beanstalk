#!/usr/bin/env bash
# Perform build of github-to-beanstalk
#
# read config file
#
. .github/scripts/build.config
#
# delete build folder if necessary
#
if [ -d "build" ]; then
  echo "deleting build folder..."
  rm -rf ./build
fi
#
# create build folder
#
  echo "creating build folder..."
  mkdir -v ./build
#
# copy files to build folder
#
echo "copying files to build folder..."
cp -vr $BUILD_SOURCES  ./build
#
# make edits to source file
#
echo "making edits to $SED_SOURCE_FILE..."
cd build
sed -i ".bak" -e "s/$SED_SEARCH_STRING/$SED_REPLACE_STRING/g" $SED_SOURCE_FILE
rm $SED_SOURCE_FILE.bak
cd ..
#
# install production node modules into build folder
#
echo "installing node modules into build folder..."
cd build
npm install --only=production
cd ..
#
# list the directory
#
echo ""
echo "build complete, ls:"
ls -alR build*

