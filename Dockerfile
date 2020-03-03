FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE 8085

CMD ["yarn", "dev-server"]