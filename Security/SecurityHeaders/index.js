const express = require("express");
const app = express();

// if not want the even first http request and redirect to https
const redirectToHttps = (req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    // Redirect to HTTPS
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  next();
};

app.use(redirectToHttps);

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer"); // setting referrer info
  res.removeHeader("X-Powered-By"); // to remove the info of application Or framework info
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});

app.use(express.static("public"));

app.get("/list", (req, res) => {
  res.send([
    {
      id: 1,
      title: "Namaste Frontend System Design",
    },
  ]);
  // res.sendFile(__dirname + "/public/hello.html");
});

const port = process.env.PORT || 5012;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
