FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
RUN npm install container-id
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html