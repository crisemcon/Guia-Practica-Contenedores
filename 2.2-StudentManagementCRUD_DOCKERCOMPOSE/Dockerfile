FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY script.js ./

EXPOSE 8080

CMD ["node","script.js"]

