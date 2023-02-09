export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // TO DO: improve validation
    if (!email.includes("@") || !name || !text) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res.status(201).json({ message: "Comment added", comment: newComment });
  } else if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Suzy", text: "Amazing" },
      { id: "c2", name: "Mike", text: "Rubbish" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}
