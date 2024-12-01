// Replace isValidURL with a function that checks the URL
import { isValidURL } from "./nameChecker";

const serverURL = "https://localhost:8000/api";

const form = document.getElementById("urlForm");
const formText = document.getElementById("url");
const urlTextElm = document.getElementById("urlText");
const tableBody = document.getElementById("tableBody");
const loading = document.getElementById("loading");

form?.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  loading.style.display = "block";
  urlTextElm.textContent = "URL:";
  tableBody.innerHTML = "";
  // Get the URL from the input field
  // const formText = document.getElementById("name").value;
  if (!formText.value) return;
  if (!isValidURL(formText.value)) {
    console.log("not valid URL");
    loading.style.display = "none";
    return;
  }
  // await makeRequest(formText);
  const data = await checkText(formText.value);
  if (data.data) {
    // console.log(data.data);
    updateUI(data.data);
  }
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
  if (!data) {
    return;
  } else {
    if (urlTextElm) {
      urlTextElm.textContent += formText.value;
    }
    if (formText) {
      formText.value = "";
    }
    // update table ui
    const fragment = document.createDocumentFragment();

    data.forEach((entity, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = createHTMLFragment(index, entity);

      fragment.appendChild(tr);
      if (tableBody) {
        tableBody.append(fragment);
      }
    });

    if (loading) {
      loading.style.display = "none";
    }
  }
};

const createHTMLFragment = (index, entity) => {
  return `<tr>
        <td>${index + 1}</td>
        <td>${entity.matchedText}</td>
        <td>${entity.confidenceScore}</td>
        <td>${entity.relevanceScore}</td>
        <td><a 
        href='${entity?.wikiLink ? entity?.wikiLink : ""}' 
        target='${entity?.wikiLink ? "_blank" : ""}'>${
    entity.wikiLink ? entity?.wikiLink : "No link found"
  }</a></td>
      </tr>`;
};
// Export the handleSubmit function
export { handleSubmit, updateUI, createHTMLFragment };
