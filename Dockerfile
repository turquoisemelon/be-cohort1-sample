FROM node:10
# Create app directory
WORKDIR /app

RUN npm install -g nodemon
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY knexfile.js ./
RUN yarn run db:migrate:latest

EXPOSE 8080

COPY . /app
CMD [ "yarn", "start" ]