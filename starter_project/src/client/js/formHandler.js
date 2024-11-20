// Replace checkForName with a function that checks the URL
import { checkForName } from "./nameChecker";

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = "https://localhost:8000/api";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  makeRequest();
  // Get the URL from the input field
  const formText = document.getElementById("name").value;

  // This is an example code that checks the submitted name. You may remove it from your code
  //   checkForName(formText);

  // Check if the URL is valid

  // If the URL is valid, send it to the server using the serverURL constant above
}

const makeRequest = () => {
   const formdata = new FormData();
  formdata.append("key", "baff2a8e891118765dce51191d26e648");
  formdata.append("txt", "I love vodfone company, they have amazing services");
  formdata.append("lang", "es"); // 2-letter code, like en es fr ...

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = fetch(
    "https://api.meaningcloud.com/sentiment-2.1",
    requestOptions
  )
    .then((response) => ({
      status: response.status,
      body: response.json(),
    }))
    .then(({ status, body }) => console.log(status, body))
    .catch((error) => console.log("error", error));
};

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };
