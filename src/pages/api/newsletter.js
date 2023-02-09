import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // TO DO: improve validation
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    const url = `mongodb+srv://fullstack-next:${process.env.MONGODB_PASSWORD}@cluster0.qtrcbub.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(url);

    await client.connect();

    const db = client.db("fullstack-next");
    await db.collection("emails").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "You have been signed up" });
  }
}
