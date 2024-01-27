FROM node:18


WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5200


CMD [ "node","src/app.js" ]