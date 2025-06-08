FROM node:16-alpine
WORKDIR /app
COPY app.js ./
RUN npm init -y && npm install express cors
EXPOSE 3000
CMD ["node", "app.js"]
