FROM iojs

# Main application dir on /app
# current directory contents will be copied to /app
ADD package.json /app/package.json
ADD . /app
WORKDIR /app

# Install npm deps
RUN npm install pm2 -g
RUN npm run docker
