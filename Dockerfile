# Use Debian as the base image
FROM debian:latest AS base

# Install necessary tools
RUN apt-get update && \
    apt-get install -y \
        curl \
        python3 \
        python3-pip \
        git && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js (version 18) and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Stage 1: Build the frontend
FROM base AS frontend-build
WORKDIR /app/frontend
COPY sre-app/ /app/frontend
RUN npm install && npm run build

# Stage 2: Setup the backend
FROM base AS backend
WORKDIR /app/backend
COPY sre-backend/requirements.txt .
RUN pip3 install -r requirements.txt

# Copy backend code
COPY sre-backend/ /app/backend

# Copy frontend build to the backend
COPY --from=frontend-build /app/frontend/dist /app/backend/static

# Expose ports
EXPOSE 5000  

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]
