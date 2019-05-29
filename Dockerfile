FROM node:10
# Create app directory
WORKDIR /app

RUN npm install -g nodemon
COPY package.json ./
COPY yarn.lock ./
RUN yarn

EXPOSE 8080

COPY . /app
RUN yarn run db:migrate:latest
CMD [ "yarn", "start" ]