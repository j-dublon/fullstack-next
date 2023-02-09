import { connectDatabase, insertDocument } from "@helpers/db-util";

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
      await insertDocument(client, "emails", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting email failed" });
      return;
    }

    res.status(201).json({ message: "You have been signed up" });
  }
}
