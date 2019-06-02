import {Spanner} from '@google-cloud/spanner';

async function quickstart(
  projectId: string = 'florinc-test-project-2',
  instanceId: string = 'nodejs-demo-03',
  databaseId: string = 'nodejs-demo-03',
) {
  // Creates a client
  const spanner = new Spanner({projectId});

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
  rows.forEach(row => console.log(row));
}

const args = process.argv.slice(2);
quickstart(...args).catch(console.error);