#specify the image we want to build docker container from
FROM node:8

#Create app directory
WORKDIR /usr/app/todo

COPY package*.json ./

RUN npm install

# BUNDLE app source
COPY . .

EXPOSE 3001

CMD ["npm", "start"]