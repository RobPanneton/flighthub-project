FROM node:14

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1337

CMD ["sh", "-c", "node initDb.js && npm run dev"]