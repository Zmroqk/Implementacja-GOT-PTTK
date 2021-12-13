FROM node:17

WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig*.json ./
COPY ./src ./
COPY ./public ./

RUN npm install

CMD ["npm", "run", "start"]