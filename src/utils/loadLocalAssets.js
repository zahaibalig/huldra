/**
 * return the names of valid cases, and save the file names of the valid cases in localStorage
 * @returns {Promise<Array.<string>>} - an array of valid cases
 * @affects {localStorage} - sets the "validCaseFiles" item in localStorage
 */
const fetchCases = async () => {
  // read from config.json
  const cases = [
    "image-test",
    "image-flower",
    "audio-bird",
    "video-bird",
    "hybrid-flowerbird",
  ];

  // the names of the valid cases
  const validCases = [];
  // the file names of the valid cases
  const validCaseFiles = [];
  for (let i = 0; i < cases.length; i++) {
    const caseFiles = await validateCase(cases[i]);
    // console.log(cases[i], caseFiles);
    if (caseFiles) {
      validCases.push(cases[i]);
      validCaseFiles.push(caseFiles);
    }
  }

  // console.log("validCases = ", validCases);
  // console.log("validCaseFiles = ", validCaseFiles);

  localStorage.setItem("validCaseFiles", JSON.stringify(validCaseFiles));

  return validCases;
};

/**
 * check if a case is valid (i.e. all necessary assets exist) and return the file names that exist
 * @param {string} caseName - the name of the case
 * @returns {Promise<Array.<string>|false>} - an array of file names that exist, or false if the case is not valid (i.e. some assets are missing)
 */
const validateCase = async (caseName) => {
  const path = "/gallery/cases/";

  // supported file extensions
  const extensions = {
    image: ["jpg", "jpeg", "png", "gif"],
    audio: ["mp3", "wav", "ogg", "aac", "flac"],
    video: ["mp4", "webm", "mov"],
  };

  const type = caseName.split("-")[0];
  const fileNameBase = `${path}${caseName}/${caseName}`;

  // the files that exist
  let files = [];

  if (type === "image") {
    const fileName1 = `${fileNameBase}.json`;
    const fileExists1 = await fileExists(fileName1, "json");
    if (!fileExists1) {
      return false;
    }

    const fileNameArrayArray = [
      extensions.image.map((ext) => `${fileNameBase}.${ext}`),
      extensions.image.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.image.map((ext) => `${fileNameBase}-b.${ext}`),
    ];

    const group = await getFileNameGroup(fileNameArrayArray, "image");
    if (!group) {
      return false;
    }

    files = [fileName1].concat(group);
  } else if (type === "audio") {
    const fileNameArrayArray = [
      extensions.audio.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.audio.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const group = await getFileNameGroup(fileNameArrayArray, "audio");
    if (!group) {
      return false;
    }

    files = group;
  } else if (type === "video") {
    const fileNameArrayArray = [
      extensions.video.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.video.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const group = await getFileNameGroup(fileNameArrayArray, "video");
    if (!group) {
      return false;
    }

    files = group;
  } else if (type === "hybrid") {
    const fileName1ArrayArray = [
      extensions.video.map((ext) => `${fileNameBase}.${ext}`),
    ];
    const group1 = await getFileNameGroup(fileName1ArrayArray, "video");
    if (!group1) {
      return false;
    }

    const fileName2ArrayArray = [
      extensions.image.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.image.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const group2 = await getFileNameGroup(fileName2ArrayArray, "image");
    if (!group2) {
      return false;
    }

    files = group1.concat(group2);
  }

  return files;
};

/** check if a file exists
 * @param {string} fullPath - the full path of the file
 * @param {string} fileType - the type of the file
 * @returns {Promise<boolean>} - true if the file exists, false otherwise
 */
const fileExists = async (fullPath, fileType) => {
  try {
    const response = await fetch(fullPath, { method: "HEAD" });

    // the React app will always return response.ok = true and the index.html, even if the file we request doesn't exist
    // so we have to check the content-type header to see if the file is the correct type
    const types = {
      json: "application/json",
      image: "image",
      audio: "audio",
      video: "video",
    };

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.startsWith(types[fileType])) {
      return true;
    }
  } catch (err) {}

  return false;
};

/**
 * check if a group of files exist and return the file names that exist
 * @param {Array.<Array.<string>>} fileNameArrayArray - an array of arrays. the files in a file group have the same file type, but different file names. for each file name, we check if any of the supported file extensions exist
 * @param {string} fileType - the type of the files
 * @returns {Promise<Array.<string>|false>} - an array of file names that exist, or false if none exist for any of the file names
 */
const getFileNameGroup = async (fileNameArrayArray, fileType) => {
  let group = [];
  for (let i = 0; i < fileNameArrayArray.length; i++) {
    const fileNameArray = fileNameArrayArray[i];
    let fileNameExists = false;
    for (let j = 0; j < fileNameArray.length; j++) {
      const fileName = fileNameArray[j];
      // loop through the supported extensions. stop at the first one that exists
      const exists = await fileExists(fileName, fileType);
      if (exists) {
        fileNameExists = true;
        group.push(fileName);
        break;
      }
    }
    if (!fileNameExists) {
      return false;
    }
  }
  return group;
};

const getAsset = async (path) => {
  fetchCases();
  // console.log("getAsset: path = ", path);

  // for local assets, returning the path is enough
  return path;
};

export { fetchCases, getAsset };
