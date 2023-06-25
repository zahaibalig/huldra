const fetchCases = () => {
	const path = "src/assets/gallery/cases/";

	const validCases = [
		"image-flower",
		"audio-bird",
		"video-bird",
		"hybrid-flowerbird",
	];

	return validCases;
}

const getAsset = (path) => {
	console.log("getAsset: path = ", path);

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


export { fetchCases, getAsset };
