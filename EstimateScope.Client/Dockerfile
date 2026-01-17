# Stage 1: Build Angular
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy hasil build Angular ke folder default Nginx
COPY --from=build /app/dist/EstimateScope.Client/browser /usr/share/nginx/html

# Tambahkan config Nginx biar refresh page gak 404
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]