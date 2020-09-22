FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN yarn install --quiet

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]
