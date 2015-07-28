FROM iojs

ADD package.json /app/package.json
ADD npm-shrinkwrap.json /app/npm-shrinkwrap.json
WORKDIR /app
RUN npm install
RUN npm install pm2 -g

ADD . /app

RUN npm run build

VOLUME ["/app/public"]
