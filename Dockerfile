
# Use Node.js 24 on Alpine Linux
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application source code
COPY src ./src

# Document the port used by the application
EXPOSE 5000

# Start the API
CMD ["npm", "start"]
