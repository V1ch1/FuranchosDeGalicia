// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CNN;

const initializeMongoDB = async (dbName) => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };

    if (!uri) {
        throw new Error("Please add your Mongo URI to .env");
    }

    const client = new MongoClient(process.env.MONGODB_CNN, options);
    await client.connect();

    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return client.db(dbName);
};

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default initializeMongoDB;
