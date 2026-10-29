const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, comments, newsletter sign up, and submit button

// http://localhost:5001/submit should return all the data the user entered

// This lets Express read the data sent by an HTML form (req.body)
app.use(express.urlencoded({ extended: true }));

// Replaces special characters so user input can't run as HTML/JavaScript
function escapeHtml(text) {
  text = String(text);
  text = text.replace(/&/g, "&amp;");
  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");
  text = text.replace(/"/g, "&quot;");
  return text;
}

app.get("/form", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send(
    "<h1>Sign Up Form</h1>" +
      '<form action="/submit" method="POST">' +
      "<p>" +
      '<label for="username">Username:</label> ' +
      '<input type="text" id="username" name="username" required />' +
      "</p>" +
      "<p>" +
      '<label for="email">Email:</label> ' +
      '<input type="email" id="email" name="email" required />' +
      "</p>" +
      "<p>" +
      '<label for="comments">Comments:</label><br />' +
      '<textarea id="comments" name="comments" rows="4" cols="40"></textarea>' +
      "</p>" +
      "<p>" +
      '<input type="checkbox" id="newsletter" name="newsletter" value="yes" /> ' +
      '<label for="newsletter">Sign me up for the newsletter</label>' +
      "</p>" +
      "<p>" +
      '<input type="submit" value="Submit" />' +
      "</p>" +
      "</form>",
  );
});

app.post("/submit", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const comments = req.body.comments;

  // An unchecked checkbox is not sent at all, so it will be undefined
  let newsletter = "No";
  if (req.body.newsletter) {
    newsletter = "Yes";
  }

  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send(
    "<h1>Form Submitted</h1>" +
      "<p><strong>Username:</strong> " +
      escapeHtml(username) +
      "</p>" +
      "<p><strong>Email:</strong> " +
      escapeHtml(email) +
      "</p>" +
      "<p><strong>Comments:</strong> " +
      escapeHtml(comments) +
      "</p>" +
      "<p><strong>Newsletter:</strong> " +
      newsletter +
      "</p>" +
      '<p><a href="/form">Back to form</a></p>',
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
