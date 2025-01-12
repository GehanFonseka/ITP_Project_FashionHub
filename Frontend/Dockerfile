FROM node:20.16.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm" , "run" , "dev"]
