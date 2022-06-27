FROM node 

WORKDIR /usr/web

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run","start"]