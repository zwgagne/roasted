# Roasted

## Command line create Docker image

```shell
docker-compose up --build
```

To see the web app
http://localhost:3050


**DOCKER - M1 ONLY
Add to every dockerfile berfore RUN npm i

RUN apk add --update python make g++\
&& rm -rf /var/cache/apk/*

**MIGRATE SCHEMA
cd server
npx prisma migrate dev
