FROM node:10.7.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY build /usr/src/app

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -s
