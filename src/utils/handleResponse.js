import { fetchConfigVariable } from "./handleConfigVars";
import getConfig from "../utils/handleStorageConfig";
import { pushToBucket } from "../utils/cloudStorage";

/**
 * generate a blob from a json string and download it
 * @param {string} jsonString the content of the file
 * @param {string} fileName the name of the file
 */
const downloadResponse = (jsonString, fileName) => {
  const blob = new Blob([jsonString], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};

/**
 * push data to the bucket if the config variable is set so
 */
const conditionalPushToBucket = () => {
  const storageConfig = getConfig();
  if (storageConfig.responsesStorageType === "firebase") {
    pushToBucket();
  }
};

/**
 * handle the final response according to the config variable.
 * if the config variable is set to "download", download the response. if the config variable is set to "firebase", push the response to the bucket.
 * only items in the outputJson array will be contained in the response
 */
const handleFinalResponse = () => {
  const storageConfig = getConfig();
  if (storageConfig.responsesStorageType === "download") {
    const storeToBucket = {};
    const outputJson = fetchConfigVariable("REACT_APP_general").outputJson;
    outputJson.map((prop) => {
      storeToBucket[prop] = JSON.parse(localStorage.getItem(prop));
      return null;
    });
    const jsonString = JSON.stringify(storeToBucket);
    const fileName = `${storeToBucket["ParticipantInfo"].ParticipantId}.json`;
    downloadResponse(jsonString, fileName);
  } else if (storageConfig.responsesStorageType === "firebase") {
    pushToBucket();
  }
};

export { conditionalPushToBucket, handleFinalResponse };
