# Use an official Node.js image as a parent image
FROM node:20

ENV VITE_API_BASE_URL=http://0.0.0.0:5001

# Copy the package.json and yarn.lock first to leverage Docker cache
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Expose the port that Vite's dev server runs on
EXPOSE 3001

# Start the application
CMD ["yarn", "preview"]