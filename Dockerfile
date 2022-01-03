FROM node:14 as build

ADD . /monitjs-node-server
WORKDIR /monitjs-node-server
RUN npm install --registry=https://registry.npm.taobao.org

FROM node:14-alpine
COPY --from=build /monitjs-node-server /monitjs-node-server
EXPOSE 8233
WORKDIR /monitjs-node-server
CMD ["npm", "start"]