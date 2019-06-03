FROM node:10
# Create app directory
WORKDIR /app

RUN npm install -g nodemon
COPY package.json ./
COPY yarn.lock ./
RUN yarn

EXPOSE 8080

COPY . /app

COPY ./entrypoint.sh /
RUN ["chmod", "+x", "/entrypoint.sh"]

ENTRYPOINT [ "/entrypoint.sh" ]