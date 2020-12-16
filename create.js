import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: '123', // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
//Codigo antigo
// import * as uuid from 'uuid';
// import AWS from 'aws-sdk';

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// export async function main(event, context) {
//   const data = JSON.parse(event.body);
//   const params = {
//     TableName: process.env.tableName,
//     Item: {
//       userId: '123',
//       noteId: uuid.v1(),
//       content: data.content,
//       attachment: data.attachment,
//       createdAt: Date.now(),
//     },
//   };
//   try {
//     await dynamoDb.put(params).promise().then(console.log);
//     return {
//       statusCode: 200,
//       body: JSON.stringify(params.Item),
//     };
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: e.message }),
//     };
//   }
// }
