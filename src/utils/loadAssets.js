import { fetchConfigVariable } from "../utils/handleConfigVars";
import { getImageDownloadUrl } from "../utils/firebase";

const getAssetFromLocal = (path) => {
  // if path begins with a slash, remove it
  if (path[0] === "/") {
    path = path.slice(1);
  }

  // try to get the asset from the local assets folder. if it doesn't exist, return null
  let url = null;
  try {
    url = require(`../assets/${path}`);
  } catch (err) {
    console.log(err);
  }

  return url;
};

const getAssetFromFirebase = async (path) => {
  let url = await getImageDownloadUrl(path);
  return url;
}

const getAsset = async (path) => {
  const defaults = {
    "assetsStorageType": ["local", "firebase"],
    "assetsStoragePath": ["/src/assets/gallery", "/dev/gallery"],
    "responsesStorageType": "firebase",
    "responsesStoragePath": "/dev"
  };

  // read the configs. if the parameters under "storage" under "REACT_APP_general" are defined, use them; otherwise, use the default values
  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
  let config = defaults;
  if (REACT_APP_general && REACT_APP_general.storage) {
    config.assetsStorageType = REACT_APP_general.storage.assetsStorageType || defaults.assetsStorageType;
    config.assetsStoragePath = REACT_APP_general.storage.assetsStoragePath || defaults.assetsStoragePath;
    config.responsesStorageType = REACT_APP_general.storage.responsesStorageType || defaults.responsesStorageType;
    config.responsesStoragePath = REACT_APP_general.storage.responsesStoragePath || defaults.responsesStoragePath;
  }

  let url = getAssetFromLocal(path);
  if (!url) {
    url = await getAssetFromFirebase(path);
  }
  return url;
};

export default getAsset;
