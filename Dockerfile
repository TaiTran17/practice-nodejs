# Use the official Node.js 18 image from the Docker Hub
FROM node:18

# Create and change to the app directory
WORKDIR /home/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
