FROM node:lts-alpine


WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY tsconfig.json ./
COPY src ./

CMD ["yarn","start"]