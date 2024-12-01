import { isValidURL } from "../src/client/js/nameChecker.js";
// Mock the alert function
global.alert = jest.fn();

describe("Testing the isValidURL functionality", () => {
  test("Testing the isValidURL() function is workig with valid url", () => {
    const validURL = "https://learn.udacity.com/";
    const expectedOutput = true;
    expect(isValidURL).toBeDefined();

    expect(isValidURL(validURL)).toEqual(expectedOutput);
  });
  test("Testing the isValidURL() function is workig with vinalid url", () => {
    const invalidURL = "this is not valid url";
    const expectedOutput = false;
    expect(isValidURL).toBeDefined();

    expect(isValidURL(invalidURL)).toEqual(expectedOutput);
    expect(alert).toHaveBeenCalledWith("Invalid URL, please try again");
  });
});
