const express = require("express");
const app = express();

app.use((req, res, next) => {
  // ! setting headers so website can't be open in the iframe
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");

  res.cookie("sessionID", "12345", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  next();
});

// Serve static files (optional)
app.use(express.static("public"));

// Define your routes
app.get("/iframe-webisite1", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-webisite1.html");
});

app.get("/iframe-webisite2", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-webisite2.html");
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
