import getConfig from "./handleStorageConfig";
import {
  fetchCases as fetchCasesFirebase,
  getAssetDownloadUrl as getAssetFirebase,
  fetchJsonAttributeValue as fetchJsonFirebase,
  getFirebaseApp,
  anonymousAuthentication,
} from "../utils/firebase";
import {
  fetchCases as fetchCasesLocal,
  getAsset as getAssetLocal,
  fetchJsonAttributeValue as fetchJsonLocal,
} from "../utils/loadLocalAssets";
import { get } from "lodash";

// fetch cases at the start of the app
const fetchCases = async (configExists, path, cases, shuffle) => {
  const config = getConfig();
  let validCases;

  if (config.assetsStorageType === "local") {
    validCases = await fetchCasesLocal(configExists, path, cases, shuffle);
  } else if (config.assetsStorageType === "firebase") {
    getFirebaseApp();
    await anonymousAuthentication();
    validCases = await fetchCasesFirebase(configExists, path, cases, shuffle);
  }

  return validCases;
};

const getAsset = async (path) => {
  const config = getConfig();
  let url;

  if (config.assetsStorageType === "local") {
    url = getAssetLocal(path);
  } else if (config.assetsStorageType === "firebase") {
    console.log("Fetching Firebase asset:", path); // Debugging line
    url = await getAssetFirebase(path);
    console.log("Fetching Firebase asset:", url); // Debugging line
  }

  return url;
};

const fetchJsonAttributeValue = async (path, attribute) => {
  const config = getConfig();

  let value;

  if (config.assetsStorageType === "local") {
    value = await fetchJsonLocal(path, attribute);
  } else if (config.assetsStorageType === "firebase") {
    value = await fetchJsonFirebase(path, attribute);
  }

  return value;
};

export { fetchCases, getAsset, fetchJsonAttributeValue };
