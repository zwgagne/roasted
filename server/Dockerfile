FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN apk add --update python make g++\
&& rm -rf /var/cache/apk/*
RUN npm i
COPY . .
CMD ["npm", "run", "start"]