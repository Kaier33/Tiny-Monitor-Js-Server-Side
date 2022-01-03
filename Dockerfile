FROM node:14 as build

ADD . /monit-js-server
WORKDIR /monit-js-server
RUN npm install --registry=https://registry.npm.taobao.org

FROM node:14-alpine
COPY --from=build /monit-js-server /monit-js-server
EXPOSE 8233
WORKDIR /monit-js-server
CMD ["npm", "start"]