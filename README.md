# docker-event-webhooks
A Docker container providing webhooks for Docker events on the host that the container runs on.

A local config file is expected to be provided with the details of the webhook endpoint, and the filters for which matching events will be forwarded.  The filter should be structured like this:

```
      "webhooks": [],
      "filter": {
        "event": [ "start", "stop", "kill", "pause", "restart", "unpause", "die" ] ,
        "type": "container"
      }
```

The Docker event with an added property of dockerHost set to the IP address of the Docker host is POSTed to the webhook url specified in the config file.

## Installation

__NB:__ the Node application is not intended to be built (npm) or run (node) directly, the purpose of this repo is to provide the Dockerfile and contents to be copied into the container, where the node application is built and run.

On the Docker host of interest run:

```bash
./build.sh [/path/to/a/local/config.json]
```