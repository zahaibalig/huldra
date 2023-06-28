const fetchCases = async () => {
  // read from config.json
  const cases = [
    "image-test",
    "image-flower",
    "audio-bird",
    "video-bird",
    "hybrid-flowerbird",
  ];

  // loop through the cases and check if the assets with possible extensions exist. stop at the first one that exists
  const validCases = [];
  for (let i = 0; i < cases.length; i++) {
    const isValid = await validateCase(cases[i]);
    console.log(cases[i], isValid);
    if (isValid) {
      validCases.push(cases[i]);
    }
  }

  console.log("validCases = ", validCases);

  return cases;
};

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

    const groupExists = await fileGroupExists(fileNameArrayArray, "image");
    return groupExists;
  } else if (type === "audio") {
    const fileNameArrayArray = [
      extensions.audio.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.audio.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const groupExists = await fileGroupExists(fileNameArrayArray, "audio");
    return groupExists;
  } else if (type === "video") {
    const fileNameArrayArray = [
      extensions.video.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.video.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const groupExists = await fileGroupExists(fileNameArrayArray, "video");
    return groupExists;
  } else if (type === "hybrid") {
    const fileName1ArrayArray = [
      extensions.video.map((ext) => `${fileNameBase}.${ext}`),
    ];
    const group1Exists = await fileGroupExists(fileName1ArrayArray, "video");
    if (!group1Exists) {
      return false;
    }

    const fileName2ArrayArray = [
      extensions.image.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.image.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const group2Exists = await fileGroupExists(fileName2ArrayArray, "image");
    return group2Exists;
  }

  return true;
};

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
};

// fileNameArrayArray is an array of arrays. the files in a file group have the same file type, but different file names. for each file name, we check if any of the supported file extensions exist. if any of them exist, we return true.
const fileGroupExists = async (fileNameArrayArray, fileType) => {
  for (let i = 0; i < fileNameArrayArray.length; i++) {
    const fileNameArray = fileNameArrayArray[i];
    let fileNameExists = false;
    for (let j = 0; j < fileNameArray.length; j++) {
      const fileName = fileNameArray[j];
      const exists = await fileExists(fileName, fileType);
      // console.log(fileName, exists);
      if (exists) {
        fileNameExists = true;
        break;
      }
    }
    if (!fileNameExists) {
      return false;
    }
  }
  return true;
};

const getAsset = async (path) => {
  console.log("getAsset: path = ", path);

  // for local assets, returning the path is enough
  return path;
};


export { fetchCases, getAsset };
