
# Configuration File Documentation

  

This documentation provides a comprehensive guide to the parameters in the config file. It describes each parameter and its purpose. Make sure to follow the instructions and guidelines mentioned for each parameter.

  

## Table of Contents

 1. [REACT_APP_warning](#react-app-warning)
	 - [warningMessage](#warning-message)
	 - [title](#title)
2. [REACT_APP_home](#react-app-home)
	 - [title](#home-title)
	  - [introText](#intro-text)
	  - [signupText](#signup-text)
	  - [additionalText](#additional-text)
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

### Usage

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



### Usage

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


### Usage

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








