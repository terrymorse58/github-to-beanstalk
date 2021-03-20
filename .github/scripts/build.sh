#!/usr/bin/env bash
# Perform build of github-to-beanstalk
#
# delete build folder if necessary
if [ -d "build" ]; then
  echo "deleting build folder..."
  rm -rf ./build
fi
# create build folder
  echo "creating build folder..."
  mkdir -v ./build
#
# copy index.html to build folder
echo "copying index.html to build folder..."
cp -v ./src/index.html ./build/index.html
#
# copy package.json to build folder
echo "copying package.json to build folder..."
cp -v ./package.json ./build/package.json
#
# install production modules into build folder
echo "installing modules into build folder"
cd build
npm install --only=production
cd ..
#
# Make a zip file of build contents
echo "making a zip file of build contents..."
cd build
zip ../build.zip *
cd ..
#
# list the directory
echo ""
echo "build complete, ls:"
ls -alR build*

