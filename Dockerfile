FROM iojs

# Main application dir
# current directory contents will be copied to /app
ADD package.json /tengo-restriccion/package.json
ADD npm-shrinkwrap.json /tengo-restriccion/npm-shrinkwrap.json
WORKDIR /tengo-restriccion
RUN npm install
ADD . /tengo-restriccion

# Install npm deps
RUN npm install pm2 -g
RUN npm run build
