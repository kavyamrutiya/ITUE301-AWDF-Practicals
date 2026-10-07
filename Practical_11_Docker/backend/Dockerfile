# ==========================================
# Dockerfile for Node.js / Express REST API
# Practical 11: Containerization
# ==========================================

FROM node:18-alpine

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package manifests
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Expose Express backend port
EXPOSE 5001

# Start server
CMD ["node", "server.js"]
