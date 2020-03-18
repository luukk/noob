# NOOB

# Commands
* Install - `npm install`
* NOOB client - `npm run dev-client`
* Server - `npm run dev-server`
* Or to run them concurrently - `npm run dev`

# Production enviroment
* Make a `.env` file from the [example](.env.example)
* Pull docker image with: `docker pull nkvl1/noob`
* Create docker container: `docker create --name noob -p 8085:8085 --restart=always --env-file ./.env nkvl1/noob:latest`
* Start docker container: `docker start noob`
