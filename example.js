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
