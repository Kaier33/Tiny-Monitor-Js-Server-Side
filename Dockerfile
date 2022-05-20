FROM node:14.18.3-alpine as build

ADD . /monitjs-node-server
WORKDIR /monitjs-node-server
RUN npm install --registry=https://registry.npmmirror.com

FROM node:14.18.3-alpine
COPY --from=build /monitjs-node-server /monitjs-node-server
EXPOSE 8233
WORKDIR /monitjs-node-server
CMD ["npm", "start"]