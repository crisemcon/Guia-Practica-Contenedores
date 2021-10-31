FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY script.js ./

CMD ["nodemon","script.js"]