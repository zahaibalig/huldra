/** DO NOT REMOVE ANY FIREBASE IMPORTS */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
/************/
// import { useEffect, useState } from 'react';
import axios from "axios";
import _ from "lodash";

/* GET FIREBASE ENVIRONMENT VARIABLES. */
const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_ROOT_DIRECTORY,
} = process.env;
/* INITIALIZE FIREBASE CONFIGURATION OBJECT */
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

/* INITIALIZE A FIREBASE APP */
const getFirebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized"); // Debugging line
  } else {
    firebase.app();
  }
};
getFirebaseApp();
/* AUTHENTICATE FIREBASE ANONYMOUSLY */
const anonymousAuthentication = async () => {
  let user = await firebase.auth().signInAnonymously();
  return user.user.uid;
};
/* GET A REFERENCE TO THEK STORAGE BUCET */
const getStorageReference = () => {
  return firebase.storage().ref();
};

const listfolders = async (path) => {
  let folders = [];
  let response = await (await getFolderReference(path).listAll()).prefixes;
  response.map((item) => folders.push(item._delegate._location.path_.split("/").pop()));
  return folders;
};

const listFiles = async (path, substring) => {
  let galleryItems = [];
  let result = await getFolderReference(REACT_APP_FIREBASE_ROOT_DIRECTORY.concat(path)).listAll();
  result._delegate["items"]
    .filter((e) => e._location.path_.includes(substring))
    .map((e) => {
      let fullPath = e._location.path_.split("/");
      fullPath.shift();
      galleryItems.push(`/${fullPath.join("/")}`);
      return null;
    });
  console.log("list files gallery items: " + result);
  return galleryItems;
};

const getFolderReference = (path) => {
  return getStorageReference().child(path);
};

const getAssetDownloadUrl = async (path) => {
  try {
    let appendedPath = `${REACT_APP_FIREBASE_ROOT_DIRECTORY}${path}`;
    let split = appendedPath.split("/");
    let fileName = split.pop();
    let newPath = split.join("/");
    let test = await getStorageReference().child(newPath).listAll();
    test = test._delegate.items.filter((item) => item._location.path_.endsWith(fileName));

    if (test.length > 0) {
      let imagePath = test[0]._location.path_;
      try {
        let url = await getStorageReference().child(imagePath).getDownloadURL();
        return url;
      } catch (downloadError) {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const getFileDownloadUrl = async (path) => {
  console.log("Downloaded URL:", path);
  return getStorageReference()
    .child(path)
    .getDownloadURL()
    .catch((err) => {
      console.log(err);
    });
};
const fetchJsonAttributeValue = async (jsonPath, attributeName) => {
  let url = await await getFileDownloadUrl(jsonPath);
  let attributeValue = await axios.get(url).then((res) => {
    return res.data[attributeName];
  });
  return attributeValue;
};

const checkAssets = async (folderPath, caseType, validExtensions) => {
  let result;
  switch (caseType) {
    case "image": {
      let assets = await listFiles(`${folderPath}`, "");
      let galleryItems = await listFiles(`${folderPath}`, "similar");
      let baseItems = assets.filter((e) => galleryItems.indexOf(e) < 0);
      result = baseItems.length >= 3;
      break;
    }
    case "audio": {
      let assets = await listFiles(folderPath, "");
      result = assets.length >= 2;
      break;
    }
    case "text": {
      let assets = await listFiles(folderPath, "");
      result = assets.length >= 2;
      break;
    }
    case "video": {
      let assets = await listFiles(folderPath, "");
      result = assets.length >= 2;
      break;
    }
    case "hybrid": {
      let assets = await listFiles(folderPath, "");
      result = assets.length >= 3;
      break;
    }
    case "videoannotation": {
      let assets = await listFiles(folderPath, "");
      result = assets.some((asset) => validExtensions.includes(asset.split(".").pop()));
      break;
    }
    case "audioannotation": {
      let assets = await listFiles(folderPath, "");
      result = assets.some((asset) => validExtensions.includes(asset.split(".").pop()));
      break;
    }
    case "multiranking": {
      let assets = await listFiles(folderPath, "");
      result =
        assets.filter((asset) => validExtensions.includes(asset.split(".").pop())).length >= 4;
      break;
    }
    default:
      result = false;
  }
  return result;
};

const validateCases = async (cases) => {
  let lookup = {
    audio: "audio",
    video: "video",
    hybrid: "hybrid",
    text: "text",
    videoannotation: "videoannotation",
    audioannotation: "audioannotation",
    multiranking: "multiranking",
  };
  return Promise.all(
    cases.map(async (e) => {
      return (
        (await checkAssets(
          `zohaib-study/gallery/cases/${e}`,
          lookup[e.split("-").shift().toLowerCase()] || "image"
        )) === true
      );
    })
  );
};

const fetchCases = async (configExists, path, cases, shuffle) => {
  let videoCases = [];
  let imageCases = [];
  let audioCases = [];
  let hybridCases = [];
  let textCases = [];
  let videoannotationCases = [];
  let audioannotationcCases = [];
  let multirankingCases = [];
  let check;
  let validCases;

  if (configExists) {
    check = await validateCases(cases);
    validCases = cases.filter((e) => check[cases.indexOf(e)] === true);
    validCases.map((element) => {
      let prefix = element.split("-")[0].toLowerCase();
      return prefix === "video"
        ? videoCases.push(element)
        : prefix === "audio"
        ? audioCases.push(element)
        : prefix === "hybrid"
        ? hybridCases.push(element)
        : prefix === "audioannotation"
        ? audioannotationcCases.push(element)
        : prefix === "videoannotation"
        ? videoannotationCases.push(element)
        : prefix === "multiranking"
        ? multirankingCases.push(element)
        : prefix === "text"
        ? textCases.push(element)
        : imageCases.push(element);
    });

    if (shuffle === "categorized") {
      let res = [
        ..._.shuffle(imageCases),
        ..._.shuffle(hybridCases),
        ..._.shuffle(videoCases),
        ..._.shuffle(audioCases),
        ..._.shuffle(videoannotationCases),
        ..._.shuffle(audioannotationcCases),
        ..._.shuffle(multirankingCases),
      ];
      return res;
    } else if (shuffle === "full") {
      return [..._.shuffle(validCases)];
    } else {
      return validCases;
    }
  } else {
    let cases = await listfolders(path);
    check = await validateCases(cases);
    validCases = cases.filter((e) => check[cases.indexOf(e)] === true);
    validCases.map((element) => {
      let prefix = element.split("-")[0].toLowerCase();
      return prefix === "video"
        ? videoCases.push(element)
        : prefix === "audio"
        ? audioCases.push(element)
        : prefix === "audioannotation"
        ? audioannotationcCases.push(element)
        : prefix === "videoannotation"
        ? videoannotationCases.push(element)
        : prefix === "multiranking"
        ? multirankingCases.push(element)
        : prefix === "text"
        ? textCases.push(element)
        : prefix === "hybrid"
        ? hybridCases.push(element)
        : imageCases.push(element);
    });
    localStorage.setItem("ValidCaseFiles", JSON.stringify(validCases));
    return [
      ..._.shuffle(imageCases),
      ..._.shuffle(hybridCases),
      ..._.shuffle(videoCases),
      ..._.shuffle(audioCases),
      ..._.shuffle(textCases),
      ..._.shuffle(videoannotationCases),
      ..._.shuffle(audioannotationcCases),
      ..._.shuffle(multirankingCases),
    ];
  }
};

export {
  getFirebaseApp,
  anonymousAuthentication,
  getStorageReference,
  listfolders,
  getFolderReference,
  getAssetDownloadUrl,
  getFileDownloadUrl,
  fetchJsonAttributeValue,
  listFiles,
  fetchCases,
};
