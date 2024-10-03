FROM ghcr.io/puppeteer/puppeteer:23.5.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["node", "dist/index.js"]