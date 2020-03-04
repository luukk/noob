# NOOB

# Commands
* Install - `npm install`
* NOOB client - `npm run dev-client`
* Server - `npm run dev-server`
* Or to run them concurrently - `npm run dev`

# Production enviroment
* Create docker image with `docker image build  -t <name>:<version> .`
* Spin up docker container: `docker run --publish 8085:8085 -d <name>:<version>`

