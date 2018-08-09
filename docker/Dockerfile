FROM node:carbon

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY build /usr/src/app

# Install `serve` to run the application.
RUN npm install -g serve@9.4.0

