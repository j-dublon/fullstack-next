import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  const url = `mongodb+srv://fullstack-next:${process.env.MONGODB_PASSWORD}@cluster0.qtrcbub.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // TO DO: improve validation
    if (!email.includes("@") || !name || !text) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    await client.connect();
    const db = client.db("fullstack-next");
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;

    res.status(201).json({ message: "Comment added", comment: newComment });
  } else if (req.method === "GET") {
    await client.connect();
    const db = client.db("fullstack-next");
    const comments = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json(comments);
  }

  client.close();
}
