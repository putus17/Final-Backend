FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ensure tsc is executable
RUN chmod +x ./node_modules/.bin/tsc

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]
