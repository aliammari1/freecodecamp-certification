# syntax=docker/dockerfile:1
FROM oven/bun:1.3.14-alpine

WORKDIR /app

# Install only this service's dependencies
COPY package.json ./
RUN bun install --production

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["bun", "run", "start"]
