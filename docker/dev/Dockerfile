FROM node:carbon

LABEL MAINTAINER="Harith Javed <harith.bakhrani@andela.com>"
LABEL application="travella-frontend"

ENV TERM=xterm-256color

WORKDIR /usr/app

# In order to allow this command to use the cache if
# the package.json file has not changed
COPY package.json /usr/app

RUN yarn install
