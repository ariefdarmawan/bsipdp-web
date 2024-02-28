FROM registry.kanosolution.net/devops/node:git-alpine3.18

RUN apk update && apk upgrade && apk add git
RUN mkdir -p /source/lib/suimjs
RUN git clone https://github.com/sebarcode/suimjs /source/lib/suimjs
WORKDIR /source/lib/suimjs
RUN npm install --force

WORKDIR /source/app/bsipdp-web
COPY package.json /source/app/bsipdp-web/package.json
RUN npm install

COPY . /source/app/bsipdp-web
COPY devops/dev/.env.file /source/app/bsipdp-web/.env
RUN npm run build

EXPOSE 37080
CMD ["npm","run","preview"]