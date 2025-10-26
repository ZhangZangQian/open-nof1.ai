# Dockerfile for the Next.js application in development mode
FROM oven/bun:1

# Install OpenSSL and other dependencies for Prisma
RUN apt-get update -y && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json bun.lockb* ./

# Install dependencies with legacy peer deps to avoid conflicts
RUN bun install --legacy-peer-deps

# Copy Prisma schema
COPY prisma ./prisma/

# Set Prisma environment variables for better compatibility
ENV PRISMA_CLIENT_ENGINE_TYPE="binary"
ENV PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK=true

# Install Prisma CLI and generate client with error handling
RUN bun add -d prisma @prisma/client && \
    echo "Generating Prisma Client..." && \
    bunx prisma generate || \
    (echo "Prisma generate failed, trying with npx..." && npx prisma generate)

# Copy the rest of the application
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run in development mode
CMD ["bun", "dev"]