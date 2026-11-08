FROM mcr.microsoft.com/playwright:v1.59.1-jammy

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

CMD [ "npm", "test" ]