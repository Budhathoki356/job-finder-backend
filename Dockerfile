# Dockerfile

# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 5002

# Start the app
CMD ["npm", "start"]
