FROM node:15.4-alpine3.12
RUN apk add --no-cache bash
WORKDIR /workdir
RUN yarn add amqplib
RUN yarn install
CMD ["/bin/bash"]

