FROM node

WORKDIR /app

COPY ./generic-forum/package.json .

RUN npm install

COPY . .
ENV HOST 0.0.0.0

EXPOSE 5173

CMD [ "npm", "run", "dev"]