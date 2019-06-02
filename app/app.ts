// lib/app.ts
import span from "@google-cloud/spanner";
import express = require('express');
import {Spanner} from "@google-cloud/spanner";

// Create a new express application instance
const app: express.Application = express();

// const projectId: string = 'florinc-test-project-2';

console.log('The value of GOOGLE_APPLICATION_CREDENTIALS is:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

app.get('/', async function (req, res) {
  // res.send('Hello World!');
  const rows = await listBooks();
  console.log(rows);
  res.send(rows);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

async function listBooks(
  projectId: string = 'florinc-test-project-2',
  instanceId: string = 'nodejs-demo-03',
  databaseId: string = 'nodejs-demo-03',
) {

  // span.Spanner()

  // Creates a client
  const spanner = new Spanner({
    projectId: projectId
  });
  // const spanner = sessionConfig.store;

  // Gets a reference to a Cloud Spanner instance and database
  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);

  // The query to execute
  const query = {
    sql: 'SELECT * FROM Books',
  };

  // Execute a simple SQL statement
  const [rows] = await database.run(query);
  console.log(`Query: ${rows.length} found.`);
  return rows.map(row => row.toJSON());
}