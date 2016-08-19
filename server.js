'use strict';

const listener = require('request');
// Use a second instantiation of request as it does not work if called in an event handler of its own.
const webhook = require('request');
const querystring = require('querystring');
const config = require('config').get('_');

const query = querystring.escape(JSON.stringify({
  filter: config.filter,
  until: 9999999999 // listen as long as the (this) container is running.
}));

listener
  .get(
    { 
      url: `http://unix:${config.dockerSocket}:/events?${query}` ,
      headers: {
        Host: config.dockerSocket,
      }
    }
  )
  .on( 'data', (data) =>{ 
    // Convert the buffer to an object
    const payload = JSON.parse(data.toString());

    // Inject our data
    payload.dockerHost = process.env.DOCKER_HOST_IP;

    // Fire the webhook(s)
    config.webhooks.forEach((url) => {
      webhook.post( {
        url: url,
        json: true,
        body: payload,
      }, function(err){if(err){console.error(err)}});
    })
  })
  .on('end', () => {
    console.log('Unexpected end.  Exiting to force restart.');
    exit(1);
  })
  .on('close', () => {
    console.log('Unexpected close.  Exiting to force restart.');
    exit(1);
  })
  .on( 'error', (err) =>{ console.error( err ) });

console.log( 'Monitoring Docker events for webhook executions.' );