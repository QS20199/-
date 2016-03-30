FROM node

ADD ./ /code

EXPOSE 8080

CMD node /code/back-end/main.js