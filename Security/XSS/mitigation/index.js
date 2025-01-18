const express = require("express");

const PORT = 3010;
const app = express();

// middleware
app.use((req, res, next) => {
  // default-src 'self' will only let you load soruces that is from your own route (current localhost:3010)
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';" +
      "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com;" // self and list ('nonce=random key , unsage inline , unsecure.com)
    // unsage-inline : execute inline scripts
    // nonce : to define the trusted script which need to be loaded
    // if nonce is not provided all the script will be loaded
  );
  next();
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(req.url);
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
