// Imports the Google Cloud client library
import {Spanner} from '@google-cloud/spanner';

async function createDatabase(
  databaseId: string = 'nodejs-demo-03',
  instanceId: string = 'nodejs-demo-03',
  projectId: string = 'florinc-test-project-2',
) {
  console.log(`projectId: ${projectId}`)
  console.log(`instanceId: ${instanceId}`)
  console.log(`databaseId: ${databaseId}`)

  // Create a client
  const spanner: Spanner = new Spanner({
    projectId: projectId,
  });

  // Get a reference to a Cloud Spanner instance
  const instance = spanner.instance(instanceId);

  // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so they
  // must be converted to strings before being inserted as INT64s
  const request = {
    schema: [
      `CREATE TABLE Books (
      BookId STRING(MAX) NOT NULL,
      Description STRING(MAX),
      Title STRING(MAX),
    ) PRIMARY KEY (BookId)`,
      `CREATE TABLE Chapters (
      BookId STRING(MAX) NOT NULL,
      ChapterId STRING(MAX) NOT NULL,
      Description STRING(MAX),
      Page INT64,
      Title STRING(MAX),
    ) PRIMARY KEY (BookId, ChapterId),
    INTERLEAVE IN PARENT Books ON DELETE CASCADE`,
    ],
  };

  // Create a database
  const [database, operation] = await
    instance.createDatabase(
      databaseId,
      request
    );

  console.log(`Waiting for operation on ${database.id} to complete...`);
  await
    operation.promise();

  console.log(`Created database ${databaseId} on instance ${instanceId}.`);
}

const args = process.argv.slice(2);
createDatabase(...args).catch(console.error);