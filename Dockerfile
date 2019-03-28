FROM node:8.12.0-alpine as base

WORKDIR /app

ENV NODE_ENV production

COPY package.json package-lock.json ./

RUN npm ci

COPY ./ ./

#--

FROM base as built

RUN npm run build

#--

FROM node:dubnium-alpine as prod

WORKDIR /app
COPY --from=built /app/output ./output
COPY ./run.js ./
