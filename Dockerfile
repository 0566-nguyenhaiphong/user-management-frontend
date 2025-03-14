# Sử dụng image Node.js để build ứng dụng
FROM node:18 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json trước để cache dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng Nginx để serve frontend
FROM nginx:alpine

# Copy file build từ bước trước vào thư mục Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
