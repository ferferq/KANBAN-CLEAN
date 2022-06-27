FROM node 

WORKDIR /usr/back

COPY BACK/package.json ./

RUN npm install

COPY BACK /usr/back

EXPOSE 5000

CMD ["npm", "run","server"]