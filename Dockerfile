# Gunakan image Node.js terbaru
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke container
COPY . .

# Expose port
EXPOSE 3000

# Jalankan server
CMD ["npm", "start"]
