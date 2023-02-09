export default function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // TO DO: improve validation
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "You have been signed up" });
  }
}
