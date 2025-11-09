# build stage

FROM node:22-alpine AS build

WORKDIR /client 

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage

FROM node:22-alpine AS production

WORKDIR /client

COPY package*.json ./

RUN npm i -g serve

COPY --from=build /client/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]