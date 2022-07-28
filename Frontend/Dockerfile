FROM node AS development
ENV NODE_ENV development
WORKDIR /Frontend
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
