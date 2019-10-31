FROM node:12 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --production
COPY --from=builder /usr/src/app/public/ ./public/
COPY --from=builder /usr/src/app/server/ ./server/
ENV NODE_ENV production
CMD [ "npm", "run", "start" ]