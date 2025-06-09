FROM node:16-alpine

WORKDIR /app

# Copiamos todo para que también estén los archivos de test y package.json
COPY . .

# Instalamos TODAS las dependencias, incluyendo devDependencies
RUN npm install

# Exponemos el puerto para el servidor
EXPOSE 3000

# Comando por defecto para producción
CMD ["node", "server.js"]
