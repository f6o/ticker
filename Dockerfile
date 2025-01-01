FROM node:23-bookworm AS build

WORKDIR /app

COPY . /app
#RUN --mount=type=cache,target=/root/.npm npm install
RUN npm install
RUN env | grep AUTH_SALT >> .env
RUN npm run build

FROM node:23-bookworm-slim

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./build
COPY --from=build /app/.firebase_token ./

CMD ["node", "build"]