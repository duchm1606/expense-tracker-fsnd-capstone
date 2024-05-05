FROM node:20

WORKDIR /app

# Copy package.jcon and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . ./

# Build next.js application
RUN npm run build

# Start the server
CMD ["npm", "start"]
