FROM node:14 as build

ADD . /node-server
WORKDIR /node-server
RUN npm install --registry=https://registry.npm.taobao.org

FROM node:14-alpine
COPY --from=build /node-server /node-server
EXPOSE 3333
WORKDIR /node-server
CMD ["npm", "start"]