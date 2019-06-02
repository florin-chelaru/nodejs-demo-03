// Imports the Google Cloud client library
import {Spanner} from '@google-cloud/spanner';

async function populate(projectId: string = 'florinc-test-project-2',
                        instanceId: string = 'nodejs-demo-03',
                        databaseId: string = 'nodejs-demo-03',
) {

// Creates a client
  const spanner = new Spanner({
    projectId: projectId,
  });

// Gets a reference to a Cloud Spanner instance and database
  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);

  database.runTransaction(async (err, transaction) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const [rowCount] = await transaction.runUpdate({
        sql: `INSERT Books (BookId, Title, Description) VALUES
      ('master-margarita', 'The Master and Margarita', 'A book about cats and demons'),
      ('the-idiot', 'The Idiot', 'The Idiot is a novel by the 19th-century Russian author Fyodor Dostoevsky.')`,
      });
      console.log(`${rowCount} records inserted.`);
      await transaction.commit();
    } catch (err) {
      console.error('ERROR:', err);
    } finally {
      // Close the database when finished.
      database.close();
    }
  });
}

const args = process.argv.slice(2);
populate(...args).catch(console.error);