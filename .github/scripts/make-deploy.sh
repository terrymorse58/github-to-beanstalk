#!/usr/bin/env bash
# Make a zip file of the build folder contents
#
#
#
# Make zip file
echo "making a zip file of build folder..."
cd build
zip -r ../deploy.zip *
cd ..
#
# ls the deploy folder
echo ""
echo "deploy.zip complete, ls:"
ls -l deploy.zip
echo ""
