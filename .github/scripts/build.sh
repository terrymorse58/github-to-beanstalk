#!/usr/bin/env bash
# Perform build of github-to-beanstalk
#
# delete build folder if necessary
if [ -d "build" ]; then
  echo "deleting build folder..."
  rm -rf ./build
fi
#
# create build folder
  echo "creating build folder..."
  mkdir -v ./build
#
# copy files to build folder
echo "copying files to build folder..."
cp -vr app.js index.html package.json images ./build
#
# install production modules into build folder
echo "installing modules into build folder"
cd build
npm install --only=production
cd ..
#
# list the directory
echo ""
echo "build complete, ls:"
ls -alR build*

