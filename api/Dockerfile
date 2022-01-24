FROM node:17

WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig*.json ./
COPY ./src ./src
COPY ./test ./test

RUN npm install

CMD ["npm", "run", "start:dev"]