# Use an official Node.js image as a parent image
FROM node:20

ENV VITE_API_BASE_URL=http://0.0.0.0:5000

# Copy the package.json and yarn.lock first to leverage Docker cache
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that Vite's dev server runs on
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "yarn run build && yarn run preview"]