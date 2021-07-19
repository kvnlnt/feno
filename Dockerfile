FROM node:12-alpine
ENV PORT 8080

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install http-server -g
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
# RUN npm run build
EXPOSE 8080

# Running the app
CMD "yarn" "run" "dev"