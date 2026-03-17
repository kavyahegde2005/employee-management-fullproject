FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]