FROM node:lts-alpine

WORKDIR /app
COPY package*.json yarn.lock ./
RUN npm i
COPY src public index.html vite.config.ts tsconfig.app.json tsconfig.json tsconfig.node.json ./

CMD ["npm", "run", "dev"]