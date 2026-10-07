# ==========================================
# Multi-Stage Dockerfile for React SPA (Vite)
# Practical 11: Containerization
# ==========================================

# Stage 1: Build the production static distribution
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies required for Vite build)
RUN npm install

# Copy source code and build config
COPY . .

# Build production bundle with route-level code splitting
RUN npm run build

# ==========================================
# Stage 2: Production preview/serve image
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only production dependencies to keep image lean
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled dist bundle and config from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.js ./

# Expose Vite preview port
EXPOSE 5173

# Serve using Vite preview bound to all interfaces
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
