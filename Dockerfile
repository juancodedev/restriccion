FROM iojs:2.5

ADD package.json /app/package.json
ADD npm-shrinkwrap.json /app/npm-shrinkwrap.json
WORKDIR /app
RUN npm install
RUN npm install pm2 -g

COPY . /app

ENTRYPOINT ["./docker-entrypoint.sh"]

VOLUME /app/public

CMD ["pm2 start index.js --no-daemon"]
