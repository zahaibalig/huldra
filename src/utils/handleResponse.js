import { fetchConfigVariable } from "./handleConfigVars";
import getConfig from "../utils/handleStorageConfig";
import { pushToBucket } from "../utils/cloudStorage";
import { getStorageReference, getFirebaseApp } from "../utils/firebase";

/**
 * generate a blob from a json string and download it
 * @param {string} jsonString the content of the file
 * @param {string} fileName the name of the file
 */
const downloadResponse = (jsonString, fileName) => {
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};

/**
 * push data to the bucket if the config variable is set so; otherwise, do nothing
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

/**
 * fetch saved response
 * @param {string} participantId the participant id
 * @returns {object|null} the response object or null if there is no saved response
 */
const fetchResponse = async (participantId) => {
  const storageConfig = getConfig();

  if (storageConfig.responsesStorageType === "firebase") {
    /* GET CURRENT FIREBASE APP */
    getFirebaseApp();
    /* GET CURRENT STORAGE REFERENCE */
    const storageRef = getStorageReference();

    // for firebase, the file with the name of the participant id should exist in the bucket
    const rootDirectory = fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");
    const fileRef = storageRef.child(`${rootDirectory}/responses/${participantId}.json`);
    const response = await fileRef.getDownloadURL().catch((err) => {
      console.log(err);
    });
    if (response) {
      const responseJson = await fetch(response).then((res) => res.json());
      return responseJson;
    }
    return null;
  } else if (storageConfig.responsesStorageType === "download") {
    // the participantId should be the same as the one in localStorage
    const savedId = JSON.parse(localStorage.getItem("ParticipantInfo")).ParticipantId;
    if (savedId !== participantId) {
      return null;
    }

    // for a valid locally-saved response, all these items should be in localStorage
    const neededItems = [
      "ParticipantInfo",
      "CaseOrder",
      "SessionEvents",
      "SessionInfo",
      "SoftwareInfo",
      "validCaseFiles",
    ];

    const savedResponse = {};
    let validResponse = true;
    neededItems.map((item) => {
      const itemValue = localStorage.getItem(item);
      if (itemValue) {
        savedResponse[item] = JSON.parse(itemValue);
      } else {
        validResponse = false;
      }
      return null;
    });

    if (validResponse) {
      return savedResponse;
    } else {
      return null;
    }
  }
};

export { conditionalPushToBucket, handleFinalResponse, fetchResponse };
