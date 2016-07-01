# docker-event-webhooks
A Docker container providing webhooks for Docker events on the host that the container runs on.

A local config file is expected to be provided with the details of the webhook endpoint, and the filters for which matching events will be forwarded.  The filter should be structured like this:

```
      "filter": {
        "event": [ "start", "stop", "kill", "pause", "restart", "unpause", "die" ] ,
        "type": "container"
      }
```

The Docker event is sent as a JSON object, with an added property of dockerHost set to the IP address of the Docker host.

## Installation

__NB:__ the Node application is not intended to be built in-situ, the purpose of this repo is to provide the Dockerfile and contents to be copied into the container.

On the Docker host of interest run:

```bash
./build.sh [/path/to/a/local/config.json]
```