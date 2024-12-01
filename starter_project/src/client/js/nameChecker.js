function isValidURL(inputText) {
  try {
    new URL(inputText);
    return true;
  } catch (error) {
    alert("Invalid URL, please try again");
    return false;
  }
}

export { isValidURL };
