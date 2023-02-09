import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@helpers/db-util";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Failed to connect to the database" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // TO DO: improve validation
    if (!email.includes("@") || !name || !text) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Comment added", comment: newComment });
    } catch (err) {
      res.status(500).json({ message: "Adding comment failed" });
    }
  } else if (req.method === "GET") {
    let comments;

    try {
      comments = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: "Fetching all comments failed" });
    }
  }

  client.close();
}
