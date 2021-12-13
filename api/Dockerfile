FROM node:17

WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig*.json ./
COPY ./src ./
COPY ./test ./

RUN npm install

CMD ["npm", "run", "start:dev"]