FROM node:22-alpine

WORKDIR /app
COPY . .

RUN rm package-lock.json
RUN rm node_modules
RUN npm i -g @angular/cli
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0", "--port" , "9002", "--disable-host-check"]
