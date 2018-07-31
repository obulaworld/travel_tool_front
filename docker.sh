#!/bin/bash

APP_PATH=$(pwd)

yarn install

if [ "$1" == "development" ];then
  docker build -t travel_tool_front_dev -f dev.dockerfile .
  docker run -it --name travel_tool_front_dev_app -p 3000:3000 -v $APP_PATH:/usr/src/app -v /usr/src/app/node_modules --rm travel_tool_front_dev
elif [ "$1" == "production" ]
then
  yarn run build
  docker build -t travel_tool_front_prod .
  docker run -it --name travel_tool_front_prod_app -p 5000:5000 --rm travel_tool_front_prod
else
  printf "\n\n==============\nUSAGE:\n==============\n\n"
  printf "Command for development and live editing:\n"
  printf "./docker development\n\n"
  printf "Command for production: \n"
  printf "./docker production\n\n"
fi
