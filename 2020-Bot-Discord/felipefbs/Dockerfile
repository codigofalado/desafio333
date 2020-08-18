FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json /usr/src/bot
RUN yarn 

COPY . /usr/src/bot

CMD ["node", "src/index.js"]


