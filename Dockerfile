FROM node:18.8-alpine AS build

WORKDIR /build

RUN apk add openssl

COPY package*.json .
COPY prisma prisma

RUN npm ci

COPY src src
COPY tsconfig*.json .

RUN npm run build
RUN npm prune --omit dev


FROM node:18.8-alpine

WORKDIR /app

COPY --chown=node:node --from=build /build/dist dist
COPY --chown=node:node --from=build /build/node_modules node_modules
COPY --chown=node:node --from=build /build/package.json .
COPY --chown=node:node --from=build /build/prisma prisma

USER node

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
