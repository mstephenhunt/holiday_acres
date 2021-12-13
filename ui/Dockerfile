FROM node:14.17.5-alpine
WORKDIR /app/ui

COPY package.json yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 3000
