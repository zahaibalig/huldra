

# Configuration File Documentation

  
# Configuration File Documentation

  
The HULDRA framework comprises eight pages, i.e., Warning_, Home, Registration, Background, Demonstration, Case, Summary and Feedback Page.
Summary about the configurable pages:
- Warning Page: Error page to communicate users if there is a problem.
- Home Page: Landing page, where the users can log in with an existing participant id or can go to the registration page.
- Background Page: A page that can be configured to show the background or information about the study._
- Demonstration Page: Page where media checks can be performed._
- Case Pages: Pages where survey questions are shown._
- Summary and Feedback Page: Page which displays the summary of the questions and collects feedback on it._
- End Page: The last page displayed when users complete the survey_

  
Please refer this paper to understand more about these pages on HULDRA: https://dl.acm.org/doi/pdf/10.1145/3524273.3532887

  

All of these pages are configurable using a config.json file. This documentation provides a comprehensive guide to the parameters in the config file. It describes each parameter and its purpose. Make sure to follow the instructions and guidelines mentioned for each parameter.

The names in the table of content directly refer to the name of the configurable property. The properties which are next to the numbered list represent the page type that the particular parameter can configure, and the properties that are next to the bullet points represent the component of that page that it configures. 

## Table of Contents

 1. [REACT_APP_warning](#react-app-warning)
	 - [warningMessage](#warning-message)
	 - [title](#title)
-  [Use](#react-app-warning-use)
2. [REACT_APP_home](#react-app-home)
	 - [title](#home-title)
	  - [introText](#intro-text)
	  - [signupText](#signup-text)
	  - [additionalText](#additional-text)
-  [Use](#react-app-home-use) 
3. [REACT_APP_registration](#react-app-registration)
	 - [Q1](#q1)
		 - [label](#q1-label)
	 - [Q2](#q2)
		 - [label](#q2-label)
	 - [Q3](#q3)
		 - [label](#q3-label)
		 - [showTooltip](#q3-show-tooltip)
		 - [tooltipMessage](#q3-tooltip-message)
	 - [Q4](#q4)
		 - [label](#q4-label)
	 - [Q5](#q5)
		 - [label](#q5-label)
		 - [showTooltip](#q3-show-tooltip)
		 - [tooltipMessage](#q3-tooltip-message)
	 - [Q6](#q6)
		 - [label](#q6-label)
		 - [showTooltip](#q6-show-tooltip)
		 - [tooltipMessage](#q6-tooltip-message)
	 - [Q7](#q7)
		 - [label](#q7-label)
		 - [showTooltip](#q7-show-tooltip)
		 - [tooltipMessage](#q7-tooltip-message)
	 - [Q8](#q8)
		 - [label](#q8-label)
	 - [Q9](#q9)
		 - [label](#q9-label)
-  [Use](#react-app-registration-use) 
3. [REACT_APP_background](#react-app-background)
	 - [sectionTitle](#section-title)
	 - [sectionText](#section-text)
	 - 	 [sectionClassName](#section-class-name)
	 - 	 [sectionTitleClassName](#section-title-class-name)
	 - [sectionTextClassName](#section-text-class-name)
	 - [sectionContent](#section-content)
		 - [title](#subsection-title)
		 - [sectionText](#subsection-text)
		 - [className](#subsection-class-name)
		 - [imagePath](#subsection-image-path)
		 - [imageClassName](#subsection-image-class-name)
		 - [imageAlternativeText](#subsection-image-alternative-text)
		 - [descriptionClassName](#subsection-description-class-name)
		 -  [titleClassName](#subsection-title-class-name)
		 -  [textClassName](#subsection-text-class-name)
-  [Use](#react-app-background-use) 
-  [Styling Classes](#styling-classes) 
4. [REACT_APP_demonstration](#react-app-demonstration)
	 - [textBefore](#text-before)
	 - [textAfter](#text-after)
	 - 	[hasImage](#has-image)
	 - [imagePath](#image-path)
	 - [imageClassName](#image-class-name)
	 - [hasVideo](#has-video)
	 - [videoPath](#video-path)
	 - [videoHeight](#video-height)
	 - [videoWidth](#video-width)
	 - [hasAudio](#has-audio)
	 - [audioPath](#audio-path)
	 - [audioHeight](#audio-height)
	 - [audioWidth](#audio-width)
 - [Use](#react-app-demonstration-use) 
4. [REACT_APP_caseImage](#react-app-case-image)
	 - [caseImageColumnLeft](#case-image-column-left)
		 - [label](#case-image-column-left-label)
	 - [caseImageColumnMiddle](#case-image-column-middle)
		 - [title](#case-image-column-middle-title)
		 - [text](#case-image-column-middle-text)
		 - [leftSectionTitle](#case-image-column-middle-left-section-title)
		 - [leftSectionButtonlabel](#case-image-column-middle-left-section-button-label)
		 - [leftSectionTextWithIconsLabel](#case-image-column-middle-left-section-text-with-icons-label)
		 - [rightSectionTitle](#case-image-column-middle-right-section-title)
		 - [rightSectionButtonlabel](#case-image-column-middle-right-section-button-label)
		 - [rightSectionTextWithIconsLabel](#case-image-column-middle-right-section-text-with-icons-label)
		 - [popupA](#case-image-column-middle-popupa)
		 - [popupB](#case-image-column-middle-popupb)
			 - [mainTitle](#case-image-column-middle-popupa-main-title)
			 - [leftImageTitle](#case-image-column-middle-popup-left-image-title)
			 - [rightImageTitle](#case-image-column-middle-popup-right-image-title)
			 - [descriptionTitle](#case-image-column-middle-popup-description-title)
			 - [descriptionText](#case-image-column-middle-popup-description-text)
			 - [gallerySubstring](#case-image-column-middle-popupb-gallery-substring)
    - [caseImageColumnRight](#case-image-column-right)
        - [title](#case-image-column-right-title)
        - [text](#case-image-column-right-text)


 - [Use](#react-app-case-image-use) 

	 









  

## React App Warning

-  **Exact Name**: `REACT_APP_warning`

-  **Type**: container element
-  **mandatory**: no

-  **Description**: When the user's screen resolution is less than 1200 x 800, then with this element a message is displayed to the user. This is just a container element which has 2 sub-elements.

### Warning Message

-  **Exact Name**: `warningMessage`

-  **Type**: child element
-  **mandatory**: no

-  **Description**: The actual message displayed to the user when the screen resolution is less than 1200 x 800 is defined by this element. 

### Title

-  **Exact Name**: `title`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: The heading of actual message displayed to the user when the screen resolution is less than 1200 x 800 is defined by this element. 

### React App Warning Use

```json
"REACT_APP_warning": {
"warningMessage": "Please view this page on a device with a screen resolution of at least 1200 x 800.",
"title": "Huldra"
}
```

## React App Home

-  **Exact Name**: `REACT_APP_home`

-  **Type**: container element
-   **mandatory**: no


-  **Description**: This element is used to configure the content on home page i.e., the first page the user lands on.

### Home Title

-  **Exact Name**: `title`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: This element is used to show the title on the home page.

### Intro Text

-  **Exact Name**: `introText`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: This element is used to configure the introduction text shown at the home page
- 
### Signup Text

-  **Exact Name**: `signupText`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: This element is used to configure the subheading, signup text shown at the home page

### Additional Text

-  **Exact Name**: `additionalText`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: This element configures the additional text shown on the home page.



### React App Home Use

```json
"REACT_APP_home": {
"title": "Huldra: Sample Title",
"introText": "This is a sample subtitle or introduction text.",
"signupText": "If you don't have a participant ID, you can have one by clicking the button below.",
"additionalText": "Please view this application in full-screen mode."
}
```


## React App Registration

-  **Exact Name**: `REACT_APP_registration`

-  **Type**: container element
-  **mandatory**: no

-  **Description**:  The components of these element are used to configure the regestration page. Nine diffrerent questions can be configured. If you are creating a REACT_APP_registration element, make sure to include all the 9 questions inside. 

### Q1

-  **Exact Name**: `Q1`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 1st question on the registration page

### Q1 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 1st question. 

### Q2

-  **Exact Name**: `Q2`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 2nd question on the registration page

### Q2 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 2nd question. 

### Q3

-  **Exact Name**: `Q3`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 3rd question on the registration page

### Q3 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 3rd question. 

### Q3 Show Tooltip

-  **Exact Name**: `showTooltip`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: A bool to set whether to show the tooltip for the question or not. 

### Q3 Tooltip Message

-  **Exact Name**: `tooltipMessage`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the tooltip.


### Q4

-  **Exact Name**: `Q4`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 4th question on the registration page

### Q4 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 4th question. 

### Q5

-  **Exact Name**: `Q5`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 5th question on the registration page

### Q5 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 5th question. 

### Q5 Show Tooltip

-  **Exact Name**: `showTooltip`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: A bool to set whether to show the tooltip for the question or not. 

### Q5 Tooltip Message

-  **Exact Name**: `tooltipMessage`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the tooltip.

### Q6

-  **Exact Name**: `Q6`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 6th question on the registration page

### Q6 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 6th question. 

### Q6 Show Tooltip

-  **Exact Name**: `showTooltip`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: A bool to set whether to show the tooltip for the question or not. 

### Q6 Tooltip Message

-  **Exact Name**: `tooltipMessage`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the tooltip.

### Q7

-  **Exact Name**: `Q7`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 7th question on the registration page

### Q7 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 7th question. 

### Q7 Show Tooltip

-  **Exact Name**: `showTooltip`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: A bool to set whether to show the tooltip for the question or not. 

### Q7 Tooltip Message

-  **Exact Name**: `tooltipMessage`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the tooltip.

### Q8

-  **Exact Name**: `Q8`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 8th question on the registration page

### Q8 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 8th question. 

### Q9

-  **Exact Name**: `Q9`

-  **Type**: container element
-  **mandatory**: yes

-  **Description**:  Element used to display the 9th question on the registration page

### Q9 Label

-  **Exact Name**: `label`

-  **Type**: child element
-  **mandatory**: no


-  **Description**: Element to describe the label/heading of the 9th question. 


### React App Registration Use

```json
"REACT_APP_registration": {

"Q1": {

"label": "Name"

},

"Q2": {

"label": "E-mail address"

},

"Q3": {

"label": "Country",

"showTooltip": true,

"tooltipMessage": "This field is mandatory."

},

"Q4": {

"label": "Comments"

},

"Q5": {

"label": "Degree",

"showTooltip": true,

"tooltipMessage": "This field is mandatory."

},

"Q6": {

"label": "Mandatory question",

"showTooltip": true,

"tooltipMessage": "This field is mandatory."

},

"Q7": {

"label": "Optional question",

"showTooltip": true,

"tooltipMessage": "This field is mandatory and must be a number."

},

"Q8": {

"label": "Text for mandatory tickbox."

},

"Q9": {

"label": "Text for optional tickbox."

}

}
```

  

## React App Background

  

-  **Exact Name**: `REACT_APP_background`

  

-  **Type**: container array element

-  **mandatory**: yes

  

-  **Description**: This element is used to define the information on background page. This is defined as an array, since multipule sections for information can be defined here. Every section is one object.

  

### Section-Title

  

-  **Exact Name**: `sectionTitle`

  

-  **Type**: child element

-  **mandatory**: no

  

-  **Description**: Title of the section is defined with this property.

  

### Section-Text

  

-  **Exact Name**: `sectionText`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Text of the section is defined with this property.

  
  

### Section Class Name

  

-  **Exact Name**: `sectionClassName`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of section is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

  
  

### Section Title Class Name

  

-  **Exact Name**: `sectionTitleClassName`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of title of the section is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

  

### Section Text Class Name

  

-  **Exact Name**: `sectionTextClassName`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of text of the section is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

  
  

## Section Content

  

-  **Exact Name**: `sectionContent`

  

-  **Type**: container array element

-  **mandatory**: yes

  

-  **Description**: This element is used to define the subsections under sections. Create multipule objects under the array to create multipule subsections, i.e., every subsection is one object.

  
  

### Subsection Title

  

-  **Exact Name**: `title`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Title of the subsection is defined by this property.

  

### Subsection Text

  

-  **Exact Name**: `sectionText`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Text of the subsection is defined by this property.

  
  

### Subsection Class Name

  

-  **Exact Name**: `className`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

  
  

### Subsection Image Path

  

-  **Exact Name**: `imagePath`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Define the path of the image located on firebase to here to display the image on subsection.

  

### Subsection Image Class Name

  

-  **Exact Name**: `imageClassName`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of image on the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

  
  

### Subsection Image Alternative Text

  

-  **Exact Name**: `imageAlternativeText`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Alternative text to be displayed, if the image is not available is defined here.

  

### Subsection Description Class Name

  

-  **Exact Name**: `descriptionClassName`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of description on the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

  
  

### Subsection Title Class Name

  

-  **Exact Name**: `titleClassName`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of title of the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

  

### Subsection Text Class Name

  

-  **Exact Name**: `textClassName`

  

-  **Type**: child element

-  **mandatory**: no

  
  

-  **Description**: Styling of text of the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.


### React App Background Use

```json
"REACT_APP_background": [
    {
      "sectionTitle": "Background",
      "sectionText": "Lorem ipsum dolor ",
      "sectionClassName": "background-section",
      "sectionTitleClassName": "background-section-title",
      "sectionTextClassName": "background-text-content",
      "sectionContent": [
        {
          "title": "Sample Subsection Title",
          "text": "Lorem ipsum dolor ",
          "className": "background-single-block",
          "imagePath": "/gallery/sample-image.png",
          "imageClassName": "explanation-background-image",
          "imageAlternativeText": "sample-image",
          "descriptionClassName": "background-single-block-description-content",
          "titleClassName": "background-single-block-description-label",
          "textClassName": "background-text-content"
        }
      ]
    }
  ]
```
### Styling Classes

```json
".background {
    height: 100%;
    overflow-y: auto;
    text-align: left;
    padding: 0 0.8em 0.8em 0.8em;
}

.background-section-title {
    font-weight: 700;
    font-size: 1.5em;
}

.background-section {
    margin-top: 2em;
}

.background-single-block {
    margin-left: 1.3em;
    margin-top: 2em;
    align-items: flex-start;
    display: flex;
}

.background-single-block-description-content {
    padding-left: 0.8em;
    height: 100%;
}

.background-single-block-description-label {
    font-weight: 700;
    font-size: 1em;
}

.background::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0.4em;
    background-color: #f5f5f5;
}

.background::-webkit-scrollbar {
    width: 0.3em;
    background-color: #f5f5f5;
}

.background::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #9c9393;
}

.background-text-content {
    text-align: justify;
}"
```


### React App Demonstration

  

-  **Exact Name**: `REACT_APP_demonstration`

  

-  **Type**: parent array element

-  **mandatory**: yes

  
-  **Description**: This element is used to configure the demonstartion page. You can demonstrate image, video, and audio to the user. It is mandatody to have this array. The number of objects in this array define the number of demonstartion pages. To have no demonstartion page at all, make this as an empty array. The demonstration page is comprised of the elements below:

### Text Before

  

-  **Exact Name**: `textBefore`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Text written on line 1 can be configured here

### Text After

  

-  **Exact Name**: `textAfter`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Text written on line 2 can be configured here


### Has Image

  

-  **Exact Name**: `hasImage`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: A bool. Set it true to display an image on the demonstartion page.


### Image Path

  

-  **Exact Name**: `imagePath`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Define the path of the image located on firebase to here to display the image on the demonstartion page. Note: hasImage bool has to be set true in order to put the image on the demonstartion page


### Image Class Name

  

-  **Exact Name**: `imageClassName`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: The class used to define styling of the image on demonstration page. As of now there is only one class available to define the image styling. The class name is "demonstration-image", whose height is defined as 22em and width is auto adjusted.

 
### Has Video

  

-  **Exact Name**: `hasVideo`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: A bool. Set it true to display a video on the demonstartion page.



### Video Path

  

-  **Exact Name**: `videoPath`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Define the path of the video on firebase to here to display the video on the demonstartion page. Note: hasVideo bool has to be set true in order to put the video on the demonstartion page


### Video Height

  

-  **Exact Name**: `videoHeight`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Define the height of the video player in px.

### Video Width

  

-  **Exact Name**: `videoWidth`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Define the width of the video player in px.

### Has Audio

  

-  **Exact Name**: `hasAudio`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: A bool. Set it true to put an audio on the demonstartion page.

### Audio Path

  

-  **Exact Name**: `audioPath`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Define the path of the audio on firebase to here to put the audio on the demonstartion page. Note: hasAudio bool has to be set true in order to put the audio on the demonstartion page.

### Audio Height

  

-  **Exact Name**: `audioHeight`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Define the height of the audio player in px.

### Audio Width

  

-  **Exact Name**: `audioWidth`


-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: Define the width of the audio player in px.

### React App Demonstration Use

```json
  "REACT_APP_demonstration": [
    {
      "textBefore": "You can have a demonstration page with a single image.",
      "textAfter": "You can use this page to describe how the rest of the survey works.",
      "hasImage": true,
      "imagePath": "/gallery/sample-image.png",
      "imageClassName": "demonstration-image"
    },
    {
      "textBefore": "You can have a demonstration page with a single video player (custom size).",
      "textAfter": "You can use this page to run a video check, or to display a tutorial video showing how the rest of the survey works.",
      "hasVideo": true,
      "videoPath": "/gallery/countdown.mp4",
      "videoHeight": "300px",
      "videoWidth": "450px"
    },
    {
      "textBefore": "You can have a demonstration page with a single audio player (custom size).",
      "textAfter": "You can use this page to run a sound check, or to play a tutorial audio describing how the rest of the survey works.",
      "hasAudio": true,
      "audioPath": "/gallery/audio-sample.mp3",
      "audioHeight": "300px",
      "audioWidth": "450px"
    }
  ]
```


### React App Case Image

  

-  **Exact Name**: `REACT_APP_caseImage`

  

-  **Type**: parent element

-  **mandatory**: yes

  
-  **Description**: This element is used to configure the Image Case page, where a user can rank 2 images. 

### Case Image Column Left

  

-  **Exact Name**: `caseImageColumnLeft`

  

-  **Type**: parent element

-  **mandatory**: yes

  
-  **Description**: This element is used to configure the left column of case image page. The left coulumn can be configured acording to the parameter(s) below:

### Case Image Column Left Label

  

-  **Exact Name**: `label`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the heading on the left column of case image page.


### Case Image Column Middle

  

-  **Exact Name**: `caseImageColumnMiddle`

  

-  **Type**: parent element

-  **mandatory**: yes

  
-  **Description**: This element is used to configure the middle column of case image page. The middle coulumn can be configured acording to the parameter(s) below:

### Case Image Column Middle Title

  

-  **Exact Name**: `title`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the heading on the middle column of case image page.


### Case Image Column Middle Text

  

-  **Exact Name**: `text`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the descriptive text on the middle column of case image page.


### Case Image Column Middle Left Section Title

  

-  **Exact Name**: `leftSectionTitle`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the heading text over the left image on the middle column of case image page.

### Case Image Column Middle Left Section Button Label

  

-  **Exact Name**: `leftSectionButtonlabel`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the text of the button located below the left image on the middle column of case image page.

### Case Image Column Middle Left Section Text With Icons Label

  

-  **Exact Name**: `leftSectionTextWithIconsLabel`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the text below the button located below the left image on the middle column of case image page. This text is only visible when the user has clicked on the mentioned button.

### Case Image Column Middle Right Section Title

  

-  **Exact Name**: `rightSectionTitle`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the heading text over the right image on the middle column of case image page.

### Case Image Column Middle Right Section Button Label

  

-  **Exact Name**: `rightSectionButtonlabel`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the text of the button located below the right image on the middle column of case image page.

### Case Image Column Middle Right Section Text With Icons Label

  

-  **Exact Name**: `rightSectionTextWithIconsLabel`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the text below the button located below the right image on the middle column of case image page. This text is only visible when the user has clicked on the mentioned button.



### Case Image Column Middle PopupA

  

-  **Exact Name**: `popupA`

  

-  **Type**: parent element

-  **mandatory**: yes

  
-  **Description**: This element is used to configure the popup which opens after clicking on the button located below the left image on the middle column of case image page.

### Case Image Column Middle PopupB

  

-  **Exact Name**: `popupB`

  

-  **Type**: parent element

-  **mandatory**: yes

  
-  **Description**: This element is used to configure the popup which opens after clicking on the button located below the right image on the middle column of case image page.


### Case Image Column Middle Popup Main Title

  

-  **Exact Name**: `mainTitle`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: 
When the  button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the main heading on the popup, which is positioned above the first image on the popup (the large one).



### Case Image Column Middle Popup Left Image Title

  

-  **Exact Name**: `leftImageTitle`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the heading for the second image, which is the left one among the two small images, on the popup.

### Case Image Column Middle Popup Right Image Title

  

-  **Exact Name**: `leftImageTitle`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the heading for the third image, which is the right one among the two small images, on the popup.

### Case Image Column Middle Popup Description Title

  

-  **Exact Name**: `descriptionTitle`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**:
When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the description heading of the popup. The description heading is positioned below the 2 smaller images.


### Case Image Column Middle Popup Description Text

  

-  **Exact Name**: `descriptionText`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the description text of the popup.

### Case Image Column Middle PopupB Gallery Substring

  

-  **Exact Name**: `descriptionText`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures the string below the larger image(1st one). NOTE: This is exclusive to popup B (the one which opens after clicking on the button located below the right image on the middle column of case image page.)

### Case Image Column Right

  

-  **Exact Name**: `caseImageColumnRight`

  

-  **Type**: parent element

-  **mandatory**: yes

  
-  **Description**: This element is used to configure the right column of case image page. The left coulumn can be configured acording to the parameter(s) below:

### Case Image Column Right Title

  

-  **Exact Name**: `label`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the heading on the right column of case image page.


### Case Image Column Right text

  

-  **Exact Name**: `label`

  

-  **Type**: child element

-  **mandatory**: no

  
-  **Description**: This element is used to configure the text description on the right column of case image page.



### React App Case Image Use

```json
  "REACT_APP_caseImage": {
    "caseImageColumnLeft": { "label": "Case" },
    "caseImageColumnMiddle": {
      "title": "Answer Options",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "leftSectionTitle": "Option A",
      "leftSectionButtonlabel": "View details",
      "leftSectionTextWithIconsLabel": "Viewed",
      "rightSectionTitle": "Option B",
      "rightSectionButtonlabel": "View details",
      "rightSectionTextWithIconsLabel": "Viewed",
      "popupA": {
        "mainTitle": "Sample Title for Popup A",
        "leftImageTitle": "Original",
        "rightImageTitle": "Option A",
        "descriptionTitle": "Description",
        "descriptionText": "Lorem ipsum dolor sit amet, ."
      },
      "popupB": {
        "mainTitle": "Sample Title for Popup B",
        "leftImageTitle": "Original",
        "rightImageTitle": "Option B",
        "descriptionTitle": "Description",
        "descriptionText": "Lorem ipsum dolor sit amet,.",
        "gallerySubstring": "similar"
      }
    },
    "caseImageColumnRight": {
      "title": "Your Answer",
      "text": "Please click on one of the thumbnails (option A or B) to place it on top. Do not drag and drop the image. The top image is your preferred option for this case."
    }
  }
```
