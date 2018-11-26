FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Set the 'docker' NODE_ENV to read accordingly the configuration
ENV NODE_ENV=docker

EXPOSE 3000
CMD [ "npm", "start" ]
