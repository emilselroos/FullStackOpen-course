FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]

#FROM node:16 AS build-stage
#WORKDIR /usr/src/app
#COPY . .
#RUN npm ci
#RUN CI=true npm run test
#RUN npm run build

#FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
#COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
