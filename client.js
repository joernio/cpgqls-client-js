const axios = require('axios');
const WebSocket = require('ws');

class CPGQLSClient {

  constructor(endpoint, basic_auth_username, basic_auth_password) {
    this.endpoint = endpoint;
    this.basic_auth_username = basic_auth_username;
    this.basic_auth_password = basic_auth_password;
  }

  execute(query, completion) {
    const WS_MSG_CONNECTED = 'connected'
    const connectEndpoint = 'ws://' + this.endpoint +'/connect';
    const postQueryEndpoint = 'http://' + this.endpoint + '/query';
    const getResultEndpoint = 'http://' + this.endpoint + '/result/';
    var postResponseData = undefined;

    const authUsername = this.basic_auth_username;
    const authPassword = this.basic_auth_password;


    const ws = new WebSocket(connectEndpoint);
    ws.on('message', function incoming(data) {
      if (data === WS_MSG_CONNECTED) {
        axios.post(postQueryEndpoint, {
          query: query
        }, {
          auth: {
            username: authUsername,
            password: authPassword,
          }
        }).then(function (response) {
          if (response.data) {
            postResponseData = response.data;
          } else {
            completion(undefined, 'Did not receive a valid respone for the POST request');
            ws.close();
          }
        }).catch(function (error) {
          console.log('error: ' + error);
          completion(undefined, 'Could not post the query to the HTTP endpoint');
          ws.close();
        });
      } else if (postResponseData) {
        axios.get(getResultEndpoint + postResponseData.uuid, {
          auth: {
            username: authUsername,
            password: authPassword,
          }
        }).then(function (response) {
          completion(response.data, undefined);
          ws.close();
        }).catch(function (error) {
          completion(undefined, 'Could not retrieve the query result via the HTTP endpoint');
          ws.close();
        });
      } else {
        completion(undefined, 'Received unexpected response on the web socket');
        ws.close();
      }
    });
  }
}

module.exports = CPGQLSClient;
