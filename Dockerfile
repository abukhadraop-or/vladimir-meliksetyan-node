FROM node:16

ENV NODE_PATH=./src

WORKDIR /app

COPY . /app

RUN rm -rf node_modules

RUN npm ci && npm cache clean --force --silent

EXPOSE 80

CMD ["npm", "run", "dev"]
