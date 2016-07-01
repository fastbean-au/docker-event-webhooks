#!/bin/bash

if [ -z "$DOCKER_HOST_IP" ]; then
    export DOCKER_HOST_IP=$(docker-machine ip)
fi

#-------------------------------------------------------------------------------
# local config file
if [ -z "$1" ] && [ -z "$configfile" ]; then
    read -p "Location of local config file: " configfile
fi
if [ -z "$configfile" ]; then
    export configfile=$1
fi
if ! [ -f $configfile ]; then
    echo "The local config file does not exist or is not a file"
    exit 1
fi
cp -f $configfile config

# Build the Docker image
docker build -t docker-event-webhooks .

# Run the Docker image
docker run --restart=always --detach --env DOCKER_HOST_IP=$DOCKER_HOST_IP --volume=/var/run/docker.sock:/var/run/docker.sock --name=docker-event-webhooks docker-event-webhooks
