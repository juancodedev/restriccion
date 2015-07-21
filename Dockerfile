FROM iojs

# Main application dir on /app
# current directory contents will be copied to /app
RUN mkdir /app
WORKDIR /app
ADD . /app

# Install npm deps
RUN npm run docker
