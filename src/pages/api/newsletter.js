import { MongoClient } from "mongodb";

const connectDatabase = () => {
  const url = `mongodb+srv://fullstack-next:${process.env.MONGODB_PASSWORD}@cluster0.qtrcbub.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  return client;
};

const insertDocument = async (client, document) => {
  await client.connect();

  const db = client.db("fullstack-next");
  await db.collection("emails").insertOne(document);
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // TO DO: improve validation
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    let client;

    try {
      client = connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to the database" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting email failed" });
      return;
    }

    res.status(201).json({ message: "You have been signed up" });
  }
}
