FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]

# docker build -t generic_forum_be .
# docker run --name forum_be --rm -it -v /home/generic_forum/generic-forum-be:/app -v /app/node_modules -p 3001:3001 generic_forum_be