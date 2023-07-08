import * as f from "../handleConfigVars";

describe("fetchConfigVariable", () => {
  test("should return a string when reading REACT_APP_FIREBASE_ROOT_DIRECTORY", () => {
    const result = f.fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");

    expect(typeof result).toBe("string");
  });

  test("should return an array when reading REACT_APP_background, and the elements of the array are objects", () => {
    const result = f.fetchConfigVariable("REACT_APP_background");

    expect(typeof result).toBe("object");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((item) => typeof item === "object")).toBe(true);
  });

  test("should return an object when reading REACT_APP_general, and the object should contain a property 'appName' which is 'Huldra'", () => {
    const result = f.fetchConfigVariable("REACT_APP_general");

    expect(typeof result).toBe("object");
    expect(result.appName).toBe("Huldra");
  });
});

describe("fetchConfigVariablesBatch", () => {
  test("should return an object with the same keys as the input array", () => {
    const result = f.fetchConfigVariablesBatch([
      "REACT_APP_FIREBASE_ROOT_DIRECTORY",
      "REACT_APP_background",
      "REACT_APP_general",
    ]);

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("REACT_APP_FIREBASE_ROOT_DIRECTORY");
    expect(result).toHaveProperty("REACT_APP_background");
    expect(result).toHaveProperty("REACT_APP_general");
  });
});
