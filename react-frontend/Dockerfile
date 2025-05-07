
FROM node:18

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN npm ci

COPY . .

RUN yarn build

EXPOSE 3005

CMD ["yarn", "dev"]