#!/bin/bash

clear

echo "********************************"
echo "*        CLEAN INSTALL         *"
echo "********************************"
echo ""
echo "* Removing package-lock.json..."

if [ -f ./package-lock.json ]; then
    rm ./package-lock.json
    echo "   └──Removed"
else
    echo "   └──Couldn't find package-lock.json"
fi

echo "* Removing node_modules..."

if [ -d ./node_modules ]; then
    rm -rf ./node_modules
    echo "   └──Removed"
else
    echo "   └──Couldn't find node_modules"
fi

echo "* Installing packages..."
npm install

echo ""
echo "********************************"
echo "*     NPM Install Complete     *"
echo "********************************"
