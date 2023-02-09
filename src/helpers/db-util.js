import { MongoClient } from "mongodb";

export const connectDatabase = () => {
  const url = `mongodb+srv://fullstack-next:${process.env.MONGODB_PASSWORD}@cluster0.qtrcbub.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  return client;
};

export const insertDocument = async (client, collection, document) => {
  await client.connect();

  const db = client.db("fullstack-next");
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db("fullstack-next");
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
};
