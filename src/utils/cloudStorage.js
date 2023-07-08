import { getStorageReference, getFirebaseApp } from "../utils/firebase";
import { fetchConfigVariable } from "./handleConfigVars";

const pushToBucket = () => {
  const rootDirectory = fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");

  /* GET CURRENT FIREBASE APP */
  getFirebaseApp();
  /* GET CURRENT STORAGE REFERENCE */
  const storageRef = getStorageReference();

  const storeToBucket = {};
  const outputJson = fetchConfigVariable("REACT_APP_general").outputJson;
  outputJson.map((prop) => {
    storeToBucket[prop] = JSON.parse(localStorage.getItem(prop));
    return null;
  });
  const jsonString = JSON.stringify(storeToBucket);
  const blob = new Blob([jsonString], { type: "application/json" });
  const fileRef = storageRef.child(
    `${rootDirectory}/responses/${storeToBucket["ParticipantInfo"].ParticipantId}.json`
  );
  fileRef.put(blob).catch((err) => console.log(err));
};

export { pushToBucket };
