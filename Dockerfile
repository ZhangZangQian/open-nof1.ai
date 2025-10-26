# Dockerfile for the Next.js application in development mode
FROM oven/bun:1-slim

# Install system dependencies
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy Prisma schema and generated client
COPY prisma ./prisma/
COPY node_modules/.prisma ./node_modules/.prisma/

# Copy the rest of the application
COPY . .

# Set environment variables for cross-platform compatibility
ENV PRISMA_CLIENT_ENGINE_TYPE="binary"
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run in development mode
CMD ["bun", "dev"]