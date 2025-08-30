# ----------------------
# Build stage
# ----------------------
FROM node:18 AS build

WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy source code
COPY . .

# Build the project (if you have a build step, else skip this)
# RUN npm run build

# ----------------------
# Production stage
# ----------------------
FROM node:18-slim AS production

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/data ./data
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/models ./models
COPY --from=build /app/public ./public


# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

# CMD ["node", "dist/server.js"]
CMD ["node", "server.js"]