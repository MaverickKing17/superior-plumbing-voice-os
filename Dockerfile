# 1. Use a stable Node.js version
FROM node:20

# 2. Create app directory
WORKDIR /usr/src/app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your code
COPY . .

# 5. Start the agent
CMD [ "npm", "start" ]
