# Fase di build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Installa yarn
RUN npm install -g yarn

# Copia i file di dipendenze
COPY package*.json ./
COPY yarn.lock ./

# Installa dipendenze usando yarn
RUN yarn install --frozen-lockfile

# Copia tutto il resto
COPY . .

# Esegui build per produzione (vite o CRA)
RUN yarn build

# Fase produzione con nginx
FROM nginx:stable-alpine

# Copia build da builder
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Configurazione nginx (opzionale ma consigliato)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
