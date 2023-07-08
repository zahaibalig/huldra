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
 * push the response to the bucket if the config variable is set so
 */
const conditionalPushToBucket = () => {
  const storageConfig = getConfig();
  if (storageConfig.responsesStorageType === "firebase") {
    pushToBucket();
  }
};

export { downloadResponse, conditionalPushToBucket };
