FROM iojs

# Main application dir
# current directory contents will be copied
ADD package.json /app/package.json
ADD npm-shrinkwrap.json /app/npm-shrinkwrap.json
WORKDIR /app
RUN npm install

ADD . /app

# Install npm deps
RUN npm install pm2 -g
