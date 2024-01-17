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

# Copy the renamed script
COPY snap-app.sh /usr/share/nginx/html/snap-app.sh
RUN chmod +x /usr/share/nginx/html/snap-app.sh

# Configure Nginx to serve the renamed script
COPY nginx-env-vars.conf /etc/nginx/conf.d/default.conf