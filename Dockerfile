FROM mcr.microsoft.com/playwright:v1.65.0-jammy

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

CMD [ "npm", "test" ]