### cpgqls-client-js

Basic promise-based ECMAScript sketch of a client which communicates with an instance of the Code Property Graph Query Language Server. 

### Caveats

Not production-ready: API hasn't been simplified enough, only tested with Node 12 even though Node 10+ should work, no attention has been paid to integration non-Node environments like web pages.

### Requirements

NodeJS v10 and newer

### Setup

```
npm install
```

### Example usage

```
// run this example with `node example.js`

const CPGQLSClient = require('./client.js');

console.log('Executing a query...');

const client = new CPGQLSClient('localhost:8080', 'username', 'password');
client.execute('val a = 1', function(response, error) {
  if (error) {
    console.log('Received an error: ' + error);

  } else {
    console.log('Received the response: ' + JSON.stringify(response));
  }
});

```


