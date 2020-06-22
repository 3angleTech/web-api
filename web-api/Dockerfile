FROM node:12.13-alpine as build-stage
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ /usr/src/app

RUN npm run build
#
#FROM node:12.13-alpine as run-stage
#WORKDIR /usr/share/nodeapi/
#
#RUN mkdir dist
#
#COPY --from=build-stage /usr/src/app/dist/ /usr/share/nodeapi/dist
#
#RUN ls -alt /usr/share/nodeapi

EXPOSE 3000

CMD ["node", "dist/index.js"]
