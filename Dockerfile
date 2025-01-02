FROM node:23-bookworm AS build

WORKDIR /app

COPY . /app
#RUN --mount=type=cache,target=/root/.npm npm install

ARG FIREBASE_REALTIMEDATABASE_URL
ENV FIREBASE_REALTIMEDATABASE_URL=$FIREBASE_REALTIMEDATABASE_URL

ARG AUTH_SALT
ENV AUTH_SALT=$AUTH_SALT

RUN env
RUN npm install
RUN npm run build

FROM node:23-bookworm-slim

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./build
COPY --from=build /app/.firebase_token ./

CMD ["node", "build"]