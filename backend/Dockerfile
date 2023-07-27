FROM node:alpine

WORKDIR /backend-tambang

COPY package*.json ./
RUN npm i --silent
COPY . ./
EXPOSE 8081