FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

ENV HOSTNAME=$HOSTNAME \
    SNAP_ENV=$SNAP_ENV

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html