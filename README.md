# Huldra: A Framework for Collecting Crowdsourced Feedback on Multimedia Assets

Collecting crowdsourced feedback to evaluate, rank, or score multimedia content can be cumbersome and time consuming. Most of the existing survey tools are complicated, hard to customize, or tailored for a specific asset type. In this repository, we present an open source framework called Huldra, designed explicitly to address the challenges associated with user studies involving crowdsourced feedback collection. The web-based framework is built in a modular and configurable fashion to allow for the easy adjustment of the user interface (UI) and the multimedia content, while providing integrations with reliable and stable backend solutions to facilitate the collection and analysis of responses.
Our proposed framework can be used as an online survey tool by researchers working on different topics such as Machine Learning (ML), audio, image, and video quality assessment, Quality of Experience (QoE), and require user studies for the benchmarking of various types of multimedia content.

Example use-cases of Huldra include [HOST-XAI](https://host-xai.herokuapp.com), a survey for the collection of feedback from medical experts about how they perceive different eXplainable Artificial Intelligence (XAI) methods demonstrated on images from the gastrointestinal (GI) tract, and [HOST-ATS](https://host-ats.herokuapp.com), a survey for the collection of feedback from the general public about how they perceive alternative thumbnails for a given soccer video clip, both of which use customized versions of Huldra.

## How to deploy from scratch

### 1. Set up a Firebase project

Currenty Huldra uses Google Firebase to store assets and responses (we may support other types of servers in the future).

- Login to https://firebase.google.com/ with your Google account.
- Click **Go to console**.
- Click **+ Add project** and follow the prompts to create a project.
- Click the **</>** icon to create a web app.
- Once it is created, the project configuration page is open, where you can see Firebase connection parameters, such as apiKey and appId. Save this for later use. (If you forget, you can find this info under **Project Overview** -> **Project settings** -> **General**.)

### 2. Upload assets

Huldra uses assets in Firebase Storage to automatically generate survey pages.

- In Firebase console, find **Storage** in **All Products**.
- You can create holders here. Huldra reads assets from `gallery` folder by default (this may become configurable in the future), so upload your assets (images, audios or videos) in that folder.

See [Assets](#assets) below for details about assets.

### 3. Run on your local computer

You need to have [Node.js](https://nodejs.org/) installed on your computer.

- Clone or download the source code of Huldra.
- Inside the folder of the source (where `package.json` is located), run `npm install`.
- Create a file named `.env` in the same folder as `package.json`. The content of the file should be in the following format:

````
REACT_APP_FIREBASE_API_KEY="Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp"
REACT_APP_FIREBASE_APP_ID="Hmp4B8AgT@n!6*p@"
REACT_APP_FIREBASE_AUTH_DOMAIN="foobar.firebaseapp.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="1234567890"
REACT_APP_FIREBASE_PROJECT_ID="foobar"
REACT_APP_FIREBASE_STORAGE_BUCKET="foobar.appspot.com"
REACT_APP_FIREBASE_ROOT_DIRECTORY="dev"
````

Don't use the values given as examples above because they are only dummy content. You should replace them with the Firebase connection parameters you get in the last step of **Set up a Firebase project**.

For `REACT_APP_FIREBASE_ROOT_DIRECTORY` you can choose whatever directory you like. Just make sure that your `gallery` folder is under it. For instance, if your folder structure is `dev/gallery`, you should put `REACT_APP_FIREBASE_ROOT_DIRECTORY="dev"`

- Run `npm start` and wait a little while. Then you should see your browser opens Huldra at http://localhost:3000/ in development mode. Enjoy!

### 4. Deploy to a server

You can delopy Huldra to servers that support Node.js, such as [Heroku](https://heroku.com/), [Netlify](https://www.netlify.com/) or [GitHub Pages](https://pages.github.com/).

For Heroku, you can set Firebase connection parameters in the Heroku interface as config vars for your app (from the project page: **Settings** -> **Config Vars**). See [Heroku's documantation](https://devcenter.heroku.com/articles/github-integration) if you need help on how to deploy to Heorku from GitHub.

For Netlify, you can set variables under **Site settings** - **Build & deploy** -> **Environment** > **Environment variables**.

For GitHub Pages, go to your repository's **Setting** -> **Secrets** to enter the Firebase connection parameters.

# More About Huldra

## Configuration

Update configuration parameters in the `src/config.json` file as needed, to customize your instance.
Note that you can also specify configuration parameters through the Heroku interface (e.g., if you do not want to make any code changes).

## Assets

### Overview
Set up the folder structure in your Firebase storage bucket, prepare and upload the multimedia assets corresponding to your desired cases.

If `cases` is set in `config.json` under `REACT_APP_caseOrder`, the app uses these case;
if empty, the app fetches all cases from Firebase.

"shuffle": "categorized": the order of the cases is shuffled within each media type, but the order of the types is hardcoded (image, hybrid, video, and audio)
"shuffle": "full": all the cases are shuffled

If you changed case order, sometimes you have to restart the browser or clear the local storage for it to take effect.

### Naming convention
The assets have to adhere to the following naming convention:

- Folder: `<type>-<label>`
- Main asset: `<type>-<label>.<extension>`
- Option A: `<type>-<label>-a.<extension>`
- Option B: `<type>-<label>-b.<extension>`

`<type>` has to be one of the following: `audio`, `video`, `image`, and `hybrid`.

### Directories Tree

```
gallery
└───cases
│   └───audio-lorem
|       └───audio-lorem-a.mp3
|       └───audio-lorem-b.mp3
│   └───video-ipsum
|       └───video-ipsum-a.mp4
|       └───video-ipsum-b.mp4
│   └───hybrid-amet
|       └───hybrid-amet.mp4
|       └───hybrid-amet-a.jpeg
|       └───hybrid-amet-b.jpeg
│   └───image-sit
|       └───image-sit.jpeg
|       └───image-sit-a.jpeg
|       └───image-sit-b.jpeg
|       └───image-sit.json
```

For an image case, a json file is also necessary. An image case needs 4 files minimum.

### Supported File Extensions

| Audio Format | Support |
| ------------- | ------------- |
| `AAC`  | ✅   |
| `AIFF`  | ❌  |
| `FLAC`  | ✅   |
| `MP3`  | ✅   |
| `OGG`  | ✅   |
| `WAW`  | ✅   |
| `WMA`  | ❌  |

| Video Format | Support |
| ------------- | ------------- |
| `AVI`  | ❌  |
| `FLV`  | ❌  |
| `MKV`  | ❌  |
| `MOV`  | ✅   |
| `MP4`  | ✅   |
| `WEBM`  | ✅   |
| `WMV`  | ❌  |

| Image Format | Support |
| ------------- | ------------- |
| `JPEG`  | ✅   |
| `PNG`  | ✅  |

## Outputs

You can retrieve participant response files from your Firebase storage bucket (`<root directory>` -> `responses`) at your convenience.

## References
* [Huldra: a framework for collecting crowdsourced feedback on multimedia assets](https://dl.acm.org/doi/abs/10.1145/3524273.3532887)
* [Automatic thumbnail selection for soccer videos using machine learning](https://dl.acm.org/doi/abs/10.1145/3524273.3528182)
* [HOST-ATS: automatic thumbnail selection with dashboard-controlled ML pipeline and dynamic user survey](https://dl.acm.org/doi/abs/10.1145/3524273.3532908)
* [Visual explanations for polyp detection: How medical doctors assess intrinsic versus extrinsic explanations
](https://arxiv.org/abs/2204.00617)

 ## Citation
 If you find our work useful for your research, please include the following citation:
```
@inproceedings{Hammou2022,
  doi = {10.1145/3524273.3532887},
  url = {https://doi.org/10.1145/3524273.3532887},
  year = {2022},
  month = jun,
  publisher = {{ACM}},
  author = {Malek Hammou and Cise Midoglu and Steven A. Hicks and Andrea Stor{\aa}s and Saeed Shafiee Sabet and Inga Str\"{u}mke and Michael A. Riegler and P{\aa}l Halvorsen},
  title = {Huldra},
  booktitle = {Proceedings of the 13th {ACM} Multimedia Systems Conference}
}
```
