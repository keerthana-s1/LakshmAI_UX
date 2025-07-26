# Use official Node.js image to build the app
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Use a lightweight web server to serve static files
FROM node:18-slim AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"] 