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
  // console.log(req.body);
  //   const response = await makeRequest(req.body.text);
  //   const data = await response.json()
  //   console.log({ response });
  const data = await makeRequest(req.body);
  res.send({ ok: true, message: "SUCCESS", data: data });
});

const makeRequest = async (formText) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-textrazor-key": textapi.application_key,
    },
    body: new URLSearchParams({
      extractors: "entities,entailments",
      url: formText.text,
    }),
  };

  try {
    const response = await fetch("https://api.textrazor.com/", requestOptions);
    const data = await response.json();
    data.formText = formText;
    // console.log({ data });
    const entities = data.response.entities;
    const uniqueEntities = getUniqeEntities(entities);
    const sortedEntities = sortEntitiesByConfidenceScore(uniqueEntities);
    return sortedEntities.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
};

const sortEntitiesByConfidenceScore = (entities) => {
  // convert to set
  // back to list
  // sort
  // get top 10
  const sortedEntities = entities.sort(
    (entityA, entityB) => entityB.confidenceScore - entityA.confidenceScore
  );

  return sortedEntities;
};

const getUniqeEntities = (entities) => {
  const seen = new Set();
  const uniqueEntities = entities.filter((entity) => {
    if (seen.has(entity.matchedText.toLowerCase())) {
      return false;
    } else {
      seen.add(entity.matchedText.toLowerCase());
      return true;
    }
  });

  return uniqueEntities;
};
// Designates what port the app will listen to for incoming requests
app.listen(8001, function () {
  console.log("Example app listening on port 8001!");
});
