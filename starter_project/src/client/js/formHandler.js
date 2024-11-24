// Replace checkForName with a function that checks the URL
import { checkForName } from "./nameChecker";

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = "https://localhost:8000/api";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name").value;
  // await makeRequest(formText);
  const data = await checkText(formText);
  updateUI(data);
}

const makeRequest = async (formText) => {
  const formdata = new FormData();
  formdata.append("key", "baff2a8e891118765dce51191d26e648");
  formdata.append("txt", formText);
  formdata.append("lang", "en"); // 2-letter code, like en es fr ...

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
  console.log({ data });

  updateUI(data);
};

const checkText = async (text) => {
  try {
    const res = await fetch("http://localhost:8001/checkText", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    console.log({ data });
    return data
  } catch (error) {
    console.log(error);
  }
};
// Function to send data to the server

const updateUI = (data) => {
  const polarities = {
    "P+": " Strong Positive",
    P: " Positive",
    NEU: " Neutral",
    N: " Negative",
    "N+": " Strong Negative",
    NONE: " Without Polarity",
  };
  const formTextElm = document.getElementById("formText");
  const polarityElm = document.getElementById("polarity");
  const subjectivityElm = document.getElementById("subjectivity");
  console.log({ data });
  const result = data.data;
  formTextElm.textContent = result.formText.text;
  const selectedPolarity = polarities[result.score_tag];
  polarityElm.textContent = `(${result.score_tag}) ${selectedPolarity}`;
  subjectivityElm.textContent =
    result.subjectivity[0] + result.subjectivity.toLowerCase().slice(1);
};
// Export the handleSubmit function
export { handleSubmit };
