FROM node:18.15.0

WORKDIR /test-soyyo

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
