FROM node:alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]