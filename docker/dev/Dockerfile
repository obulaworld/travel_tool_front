FROM node:carbon

LABEL MAINTAINER="Harith Javed <harith.bakhrani@andela.com>"
LABEL application="travella-frontend"

ENV TERM=xterm-256color

WORKDIR /usr/app

COPY . /usr/app

RUN yarn install
