# Description: Dockerfile for the backend NODE SERVER service
FROM node:20.16.0

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm" , "run" , "dev"]