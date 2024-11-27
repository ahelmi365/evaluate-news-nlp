var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");
app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key
// You could call it aylienapi, or anything else
const textapi = {
  application_key: process.env.API_KEY,
};

app.get("/", function (req, res) {
  res.send("./dist/index.html");
});

// POST Route
app.post("/checkText", async (req, res) => {
  console.log(req.body);
  //   const response = await makeRequest(req.body.text);
  //   const data = await response.json()
  //   console.log({ response });
  const data = await makeRequest(req.body);
  res.send({ ok: true, message: "SUCCESS", data: data });
});

const makeRequest = async (formText) => {
  console.log({formText})
  const formdata = new FormData();
  formdata.append("key", "baff2a8e891118765dce51191d26e648");
  formdata.append("url", formText.text);
  formdata.append("lang", "auto"); // 2-letter code, like en es fr ...
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(
    "https://api.meaningcloud.com/sentiment-2.1",
    requestOptions
  );
  const data = await response.json();
  data.formText = formText;
  // console.log({ data });

  return data;
};
// Designates what port the app will listen to for incoming requests
app.listen(8001, function () {
  console.log("Example app listening on port 8001!");
});
