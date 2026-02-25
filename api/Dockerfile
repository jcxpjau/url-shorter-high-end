# Builder
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
# gera o Prisma Client sem depender do banco
RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .
RUN npm run build

# Final
FROM node:20
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]