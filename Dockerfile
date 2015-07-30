FROM iojs

ADD package.json /app/package.json
ADD npm-shrinkwrap.json /app/npm-shrinkwrap.json
WORKDIR /app
RUN npm install
RUN npm install pm2 -g

VOLUME /app/public
COPY . /app

ENTRYPOINT entrypoint.sh

CMD pm2 start index.js --no-daemon
