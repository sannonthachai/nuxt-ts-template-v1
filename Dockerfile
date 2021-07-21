FROM node:12.13.0

ENV HOST 0.0.0.0
ARG BASE_URL

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install --no-optional

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]