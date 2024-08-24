# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Set the command to start the web server on port 80
CMD ["serve", "-s", "build", "-l", "80"]

# Expose port 80
EXPOSE 80

