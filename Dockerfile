# Step 1: Build the application
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Run the application
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Expose the port used by Render
EXPOSE 10000

# Start the app using the script we added above
CMD ["npm", "run", "start"]
