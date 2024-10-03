FROM node:18-alpine3.20

WORKDIR /app



RUN apk update

RUN apk add git 