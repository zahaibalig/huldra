# Huldra: A Framework for Collecting Crowdsourced Feedback on Multimedia Assets

Collecting crowdsourced feedback to evaluate, rank, or score multimedia content can be cumbersome and time consuming. Most of the existing survey tools are complicated, hard to customize, or tailored for a specific asset type. In this repository, we present an open source framework called Huldra, designed explicitly to address the challenges associated with user studies involving crowdsourced feedback collection. The web-based framework is built in a modular and configurable fashion to allow for the easy adjustment of the user interface (UI) and the multimedia content, while providing integrations with reliable and stable backend solutions to facilitate the collection and analysis of responses.
Our proposed framework can be used as an online survey tool by researchers working on different topics such as Machine Learning (ML), audio, image, and video quality assessment, Quality of Experience (QoE), and require user studies for the benchmarking of various types of multimedia content.

Example use-cases of Huldra include [HOST-XAI](https://host-xai.herokuapp.com), a survey for the collection of feedback from medical experts about how they perceive different eXplainable Artificial Intelligence (XAI) methods demonstrated on images from the gastrointestinal (GI) tract, and [HOST-ATS](https://host-ats.herokuapp.com), a survey for the collection of feedback from the general public about how they perceive alternative thumbnails for a given soccer video clip, both of which use customized versions of Huldra.

## Quick Start

This section describes how to deploy Huldra from scratch and run entirely on your local computer.

<!-- 
### Quick start - Run on your local computer

- You need to have [Node.js](https://nodejs.org/) installed on your computer.
- Clone or download the source code of Huldra.
- Inside the folder of the source (where `package.json` is located), run `npm install`.
- Run `npm start` and wait a little while. Then you should see your browser opens Huldra at http://localhost:3000/ in development mode. Enjoy!

### Configuration and custom assets

You can customize your instance by changing configuration parameters in the `.env` file or the `src/config.json` file.
`.env` takes precedence over `config.json`.

- See [CONFIGURATION-PARAMETERS.md](CONFIGURATION-PARAMETERS.md) for more information about the configuration parameters.
- The `.env` file is not included in the repository. It's only necessary if you want to put your assets or participant responses in Firebase. See [Assets and responses storage](#assets-and-responses-storage) below for more information.

The assets are the images, audio and/or video clips that you want to collect feedback on. Huldra can automatically generate survey pages based on the assets you provide.

- They should be put in the `public/gallery` folder. We have put some examples there. You can add your own assets.
- The names of the asset folders and asset files should follow the naming convention described in [Assets](#assets) below.
- You also need to specify the names of the asset folders in `config.json` under `REACT_APP_general` -> `caseOrder` -> `cases` if you run Huldra locally.
- See [Assets](#assets) below for more details.

### Assets and responses storage

By default, Huldra reads assets from the `public/gallery` folder.

You can change this by setting `REACT_APP_general` -> `storage` -> `assetsStorageType` to `"firebase"` in `config.json`. Then Huldra will read assets from your Firebase storage bucket.

As for participant responses, by default Huldra will prompt the participant to download a file containing the responses at the end of the survey. You can change this by setting `REACT_APP_general` -> `storage` -> `responsesStorageType` to `"firebase"` in `config.json`. Then Huldra will store responses in your Firebase storage bucket.

This two parameters are independent of each other, which means you can have the following combinations:

- `assetsStorageType` is `"local"` and `responsesStorageType` is `"download"` (default)
- `assetsStorageType` is `"local"` and `responsesStorageType` is `"firebase"`
- `assetsStorageType` is `"firebase"` and `responsesStorageType` is `"download"`
- `assetsStorageType` is `"firebase"` and `responsesStorageType` is `"firebase"`

If you want to put either your assets or responses in Firebase, you need to do the following:

<details>
  <summary>Click me to see the details</summary>

#### Set up a Firebase project

In order to use Google Firebase to store assets and/or responses, you need to set up a Firebase project first.

- Login to https://firebase.google.com/ with your Google account.
- Click **Go to console**.
- Click **+ Add project** and follow the prompts to create a project.
- Click the **</>** icon to create a web app.
- Once the web app is created, the project configuration page will be opened automatically. Here you can see Firebase connection parameters such as `apiKey` and `appId`. Save these for later use. (If you forget, you can find this info under **Project Overview** -> **Project settings** -> **General**.)
- In your project, go to **All Products** -> **Authentication**. On the **Sign-in Methods** page, enable the **Anonymous** sign-in method

#### Upload assets

If you want to put your assets in Firebase, you need to upload them to your Firebase storage bucket.

- In Firebase console, find **Storage** in **All Products**.
- You can create folders in your storage bucket. Huldra reads assets from the `gallery` folder by default, so upload your assets (images, audio and/or video clips) in this folder.

See [Assets](#assets) below for details about assets.

#### Create a `.env` file

Create a file named `.env` in the same folder as `package.json`. The content of the file should be in the following format:

```
REACT_APP_FIREBASE_API_KEY="Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp"
REACT_APP_FIREBASE_AUTH_DOMAIN="foobar.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="foobar"
REACT_APP_FIREBASE_STORAGE_BUCKET="foobar.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="1234567890"
REACT_APP_FIREBASE_APP_ID="Hmp4B8AgT@n!6*p@"
REACT_APP_FIREBASE_ROOT_DIRECTORY="/dev"
```

Don't use the values given as examples above because they are only dummy content. You should replace them with the Firebase connection parameters you get in the last step of [Set up a Firebase project](#set-up-a-firebase-project).

For `REACT_APP_FIREBASE_ROOT_DIRECTORY` you can choose whatever directory you like. Just make sure that your `gallery` folder is under it. For instance, if your folder structure is `/dev/gallery`, you should put `REACT_APP_FIREBASE_ROOT_DIRECTORY="/dev"` in the file. Don't forget to place a forward slash at the start of the path.

#### Run on your local computer

- You need to have [Node.js](https://nodejs.org/) installed on your computer.
- Clone or download the source code of Huldra.
- Edit `src/config.json` and set `REACT_APP_general` -> `storage` -> `assetsStorageType` to `"firebase"` if you want to put your assets in Firebase, or set `REACT_APP_general` -> `storage` -> `responsesStorageType` to `"firebase"` if you want to put your responses in Firebase.
- Inside the folder of the source (where `package.json` is located), run `npm install`.
- Run `npm start` and wait a little while. Then you should see your browser opens Huldra at http://localhost:3000/ in development mode. Enjoy!

#### Deploy to a server

You can delopy Huldra to servers that support Node.js, such as [Heroku](https://heroku.com/), [Netlify](https://www.netlify.com/) or [GitHub Pages](https://pages.github.com/).

For Heroku, you can set Firebase connection parameters in the Heroku interface as config vars for your app (from the project page: **Settings** -> **Config Vars**). See [Heroku's documantation](https://devcenter.heroku.com/articles/github-integration) if you need help on how to deploy to Heroku from GitHub.

For Netlify, you can set variables under **Site settings** -> **Build & deploy** -> **Environment** -> **Environment variables**.

For GitHub Pages, go to your repository's **Setting** -> **Secrets** to enter the Firebase connection parameters.

#### Other issues about deployment

##### CORS error messages from Firabase

You can change Firebase settings to suit your needs.

If you see CORS error messages from Firabase in the console, that means you must [configure your Cloud Storage bucket for cross-origin access (CORS)](https://firebase.google.com/docs/storage/web/download-files#cors_configuration). [Here](https://stackoverflow.com/a/71193349/802678) is a guide on how to do it.

</details>

-->

## Detailed Information

This section provides detailed information about Huldra.

<!-- (add TOC here)

## Configuration

You can customize your instance by changing configuration parameters in the `.env` file or the `config.json` file. `.env` takes precedence over `config.json`.

When you deploy to a server such as Heroku, you can specify configuration parameters through the Heroku interface (see [Deploy to a server](#deploy-to-a-server) for more information), which also takes precedence over `config.json`. This can be useful if you want to customize your instance without changing any code.

See [CONFIGURATION-PARAMETERS.md](CONFIGURATION-PARAMETERS.md) for more information about the configuration parameters.

### Color scheme

To specify a color scheme, you need to navigate to `/src/config.json`. Inside this file, you will find an element named `REACT_APP_general`. Within this element, you can define the color scheme using the `color` element, as shown below:

```
"REACT_APP_general": {
  "color": {
    "themeColor" : "<value>",
    "buttonColor" : "<value>"
  }
}
```

Supported values are: `green`, `purple`, `yellow`, `teal`, and `orange`.

If no color/an invalid value is specified, the default themeColor is `blue`, the default buttonColor is `yellow`.

The values of the colors are:

- blue: $\color{#38c3f2}{■}$ (#38c3f2)
- green: $\color{#6db784}{■}$ (#6db784);
- purple: $\color{#9b45b2}{■}$ (#9b45b2);
- yellow: $\color{#f9e45b}{■}$ (#f9e45b);
- teal: $\color{#2b6777}{■}$ (#2b6777);
- orange: $\color{#eb6b40}{■}$ (#eb6b40);

## Assets

### Overview

The assets can be placed either locally or in your Firebase bucket. You can congifure this in `config.json` under `REACT_APP_general` -> `storage` -> `assetsStorageType`:

- Default value: `"local"`
- Possible values: `"local"`, `"firebase"`

We look for assets in `/public/gallery` if `assetsStorageType` is `local`, and
`<Firebase root>/gallery` (`<Firebase root>` is set with `REACT_APP_FIREBASE_ROOT_DIRECTORY` in `.env`) if `assetsStorageType` is `firebase`.

If `assetsStorageType` is `local`, `REACT_APP_general` -> `caseOrder` -> `cases` in `config.json` must be populated with the list of case foldernames.

As the cases are fetched at the beginning of the survey, if you change the value of these parameters, you need to go to the home page and restart the survey from scratch by clicking the "Get participant ID" button.

In either storage type, the assets have to adhere to the following folder structure and naming convention.

If a case folder is missing any of the required files, the case will be skipped.

### Directory tree

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

For an image case, a json file is also necessary. The json file should contain the description of the image and the description will be used on the page for that image case. An example of the json file is as follows:

```
{
  "description": "Write your description here."
}
```

### Naming convention

The assets have to adhere to the following naming convention:

- Folder: `<type>-<label>`
- Main asset: `<type>-<label>.<extension>`
- Option A: `<type>-<label>-a.<extension>`
- Option B: `<type>-<label>-b.<extension>`
- JSON file: `<type>-<label>.json`

`<type>` has to be one of the following: `audio`, `video`, `image`, or `hybrid`.

Refer to the **Directory tree** section for which assets are required for each type.

### Supported file extensions

```
image: ["jpg", "jpeg", "png", "gif"],
audio: ["mp3", "wav", "ogg", "aac", "flac"],
video: ["mp4", "webm", "mov"],
```

The file extensions must be lowercase.

This is also the order in which the app will look for assets. For example, if you have `image-sit.jpg` and `image-sit.png`, the app will use `image-sit.jpg`.

### Case order

If `assetsStorageType` is `local`, `REACT_APP_general` -> `caseOrder` -> `cases` in `config.json` must be populated with the list of case foldernames.

If `assetsStorageType` is `firebase`, the `cases` array can be empty.
If `cases` is not empty, the app uses these cases; if empty, the app fetches all cases from Firebase.

The app only uses valid cases (cases with all the necessary assets) and the order of cases is decided by the `shuffle` parameter as described below.

The `shuffle` parameter under `caseOrder` has the following effects:

- If `cases` is empty: categorized shuffle
- If `cases` is not empty:
  - `"shuffle": "categorized"`: the order of the cases is shuffled within each case type, but the order of the types is hardcoded (image, hybrid, video, and audio)
  - `"shuffle": "full"`: all the cases are shuffled
  - If `shuffle` is not specified: the app uses the order specified in `cases`

If you change the value of these parameters, you need to go to the home page and restart the survey from scratch by clicking the "Get participant ID" button

### Example assets

We put some example assets in `/public/gallery` (minimal working example with all case types, as well as placeholder images and example assets for other pages), so that when you clone the repo and [run directly](#run-on-your-local-computer), you can have a fully working example locally.
The case assets were downloaded from [Pexels](https://www.pexels.com/), which allows free use of their images and videos without attribution, as well as modification (see https://www.pexels.com/license/ for details).

## Outputs

The app will generate a file containing the responses of the participant. The file can either be downloaded or pushed to Firebase, depending on the value of `REACT_APP_general` -> `storage` -> `responsesStorageType` in `config.json`:

- Default value: `"download"`
- Possible values: `"download"`, `"firebase"`

In case of `firebase`, the responses will be stored in `<Firebase root>/responses` folder (`<Firebase root>` is set with `REACT_APP_FIREBASE_ROOT_DIRECTORY` in `.env`).

-->


## Resources

<!--

- [Huldra: a framework for collecting crowdsourced feedback on multimedia assets](https://dl.acm.org/doi/abs/10.1145/3524273.3532887)
- [Experiences and Lessons Learned from a Crowdsourced-Remote Hybrid User Survey Framework](https://ieeexplore.ieee.org/document/10019678)
- [Automatic thumbnail selection for soccer videos using machine learning](https://dl.acm.org/doi/abs/10.1145/3524273.3528182)
- [HOST-ATS: automatic thumbnail selection with dashboard-controlled ML pipeline and dynamic user survey](https://dl.acm.org/doi/abs/10.1145/3524273.3532908)
- [Visual explanations for polyp detection: How medical doctors assess intrinsic versus extrinsic explanations](https://arxiv.org/abs/2204.00617)

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
-->

## Internal Notes

<!--
### Guidelines

- `DEVELOPMENT-GUIDELINES.md`
- `RELEASE-GUIDELINES.md`

### Keyboard Shortcuts

`Enter`: imitates the press of the Next button, with all its requirements where applicable (e.g., if the cases need to be viewed before the button can be pressed, `Enter` also doesn't work until then)

`Shift + Enter`: forcefully skip to the next page (also possible to skip to the next case without answering the current one)

`Shift + F`: on the registration page which opens after clicking `Get participant ID`, automatically fill out the form and make the "Start Survey" button clickable (applicable fields are filled with the string "NA", in order to facilitate the filtering of such development/test/debug responses from Firebase later on)
-->

