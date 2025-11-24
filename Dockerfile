FROM node:18-alpine

WORKDIR /app

# Copy client package files
COPY client/package*.json ./client/
# Install client dependencies
RUN cd client && npm ci

# Copy server package files
COPY server/package*.json ./server/
# Install server dependencies
RUN cd server && npm ci

# Copy source code
COPY client ./client
COPY server ./server

# Build client
RUN cd client && npm run build

# Build server
RUN cd server && npx tsc

# Generate Prisma Client
RUN cd server && npx prisma generate

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start server
CMD ["node", "server/dist/index.js"]
