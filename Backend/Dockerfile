FROM node:22-alpine

WORKDIR /app

COPY ./package*.json .
COPY ./tsconfig.json ./tsconfig.json
COPY ./source ./source
COPY ./source/views ./source/views
COPY ./public ./public
COPY ./uploads ./uploads

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
