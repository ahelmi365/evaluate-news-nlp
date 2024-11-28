// Replace checkForName with a function that checks the URL
import { checkForName } from "./nameChecker";

const serverURL = "https://localhost:8000/api";

const form = document.getElementById("urlForm");
const formText = document.getElementById("url");
const urlTextElm = document.getElementById("urlText");
const tableBody = document.getElementById("tableBody");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  urlTextElm.textContent = "URL:";
  tableBody.innerHTML = "";
  // Get the URL from the input field
  // const formText = document.getElementById("name").value;
  if (!formText.value) return;
  // await makeRequest(formText);
  const data = await checkText(formText.value);
  console.log(data.data);
  updateUI(data.data);
}

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
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to send data to the server

const updateUI = (data) => {
  urlTextElm.textContent += formText.value;
  formText.value = "";
  // update table ui
  const fragment = document.createDocumentFragment();

  data.forEach((entity, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <tr>
        <td>${index + 1}</td>
        <td>${entity.matchedText}</td>
        <td>${entity.confidenceScore}</td>
        <td>${entity.relevanceScore}</td>
        <td><a href="${entity.wikiLink}" target="_blank">${entity.wikiLink}</a></td>
      </tr>
    `;
    fragment.appendChild(tr);
    tableBody.append(fragment);
  });
};
// Export the handleSubmit function
export { handleSubmit };
