FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve Angular application using Nginx
FROM nginx:alpine

# ENV NGINX_PORT=$NGINX_PORT

COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular artifacts to Nginx directory
COPY --from=builder /app/dist/covid /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 4201

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]