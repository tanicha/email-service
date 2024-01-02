const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' });

'use strict';

module.exports.sendEmail = async (event) => {
  const params = {
    Destination: {
      ToAddresses: ['tanijcha@gmail.com'], 
    },
    Message: {
      Body: {
        Text: {
          Data: 'This is a message generated automatically from a Lambda function.',
        },
      },
      Subject: {
        Data: 'Hello from Lambda',
      },
    },
    Source: 'tanijcha@gmail.com', 
  };
  await ses.sendEmail(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Email sent to ${params.Destination.ToAddresses}`,
        input: event,
      },
      null,
      2
    ),
  };
};
