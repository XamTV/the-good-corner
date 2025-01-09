FROM node:20-alpine3.21

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY  vite.config.ts tsconfig.app.json tsconfig.json tsconfig.node.json ./
COPY tailwind.config.js postcss.config.js ./
COPY index.html ./
COPY public ./
COPY src ./ 

CMD ["yarn","dev"]