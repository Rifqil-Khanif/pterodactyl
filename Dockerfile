# Base image for Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all other files
COPY . .

# Expose port 3000 for the app
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
