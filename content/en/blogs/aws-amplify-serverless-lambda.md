---
title: "AWS Amplify - Serverless Functions for External Data with Modern UI Frontend (React, Angular, Vue)"
date: 2020-02-19
path: "/blog/aws-amplify-serverless-lambda-react"
tags: ["react", "serverless", "amplify", "lambda", "aws"]
imageUrl: "https://sam-hamburger.netlify.com/assets/aws-amplify-sls-lambda-react.jpg"
devCommUrl: "https://dev.to/sh786/aws-amplify-serverless-functions-for-external-data-with-modern-ui-frontend-react-angular-vue-3dl9"
---

As a frontend developer, using a serverless backend can help minimize backend development work, allowing you to focus almost entirely on client-side development. Although most cloud service providers have serverless capabilities, this article will be focused on AWS, using their Amplify framework to structure the backend

## Amplify Framework

From [AWS Amplify](https://aws.amazon.com/amplify/):

> AWS Amplify is a development platform for building secure, scalable mobile and web applications. It makes it easy for you to authenticate users, securely store data and user metadata, authorize selective access to data, integrate machine learning, analyze application metrics, and execute server-side code. Amplify covers the complete mobile application development workflow from version control, code testing, to production deployment, and it easily scales with your business from thousands of users to tens of millions. The Amplify libraries and CLI, part of the Amplify Framework, are open source and offer a pluggable interface that enables you to customize and create your own plugins.

Amplify is constantly evolving and improving, and currently contains features for:

- **Real-time data retrieval and storage** via pre-structured (and modifiable) **GraphQL** and **REST** API queries, including auto authentication features and connections to Amazon DymanoDB databases out-of-the-box
- **Authentication APIs** using Amazon Cognito user pools, including optional federated logins and sign-ups via social providers (Google, Facebook, Amazon, etc.)
- **Analytics** for applications with built-in support for Amazon Pinpoint and Amazon Kinesis
- **AI and ML** services for predictions, primarily for NLP and text recognition from images
- **Interactions** for AI-powered chatbots
- **Storage** buckets (public, protected, or private) via Amazon S3 for managing user and global content
- **PubSub** for cloud-based message middleware, push notifications, etc.
- **AR and VR** services

## Setup, Configure and Invoke Lambda Function in a React + Amplify Project

For this tutorial, we will use a React web app, but you can choose other frameworks including React Native, Angular, Ionic, Vue, or Vanilla JavaScript at the [Amplify Getting Started](https://aws-amplify.github.io/docs/js/start?platform=react) webpage.

### 1. Initialize a Client-Side Application

```bash
$ npx create-react-app amplify-sls-app
$ cd amplify-sls-app
$ npm i @aws-amplify/api
```

We install the @aws-amplify/api package for use later in this tutorial.

_Note: ensure you use npx, and do not have create-react-app globally installed. If you do, you must run: npm uninstall -g create-react-app first, or else the npx command will not provide a starter app_

### 2. Install Amplify CLI and Configure

This needs to be done once to connect and configure with your AWS account.

```shell
$ npm i -g @aws-amplify/cli
$ amplify configure
```

This will prompt you to sign into AWS console in your browser. Do so, and take a note of the region you are in (upper right hand corner). Follow the steps in the CLI, and click through all default options on the AWS console in your browser.

### 3. Initialize a New Amplify Project

This needs to be done for each new Amplify project, in the root of the project's directory (root of React app).

```shell
$ amplify init
```

Follow the steps, choosing default options where applicable. See my responses below:

- _Enter a name for the project_ **❯ amplify-sls-app**
- _Enter a name for the environment_ **❯ dev**
- \*Choose your default editor: **❯ Visual Studio Code**
- _Choose the type of app that you're building_ **❯ javascript**
- _What javascript framework are you using_ **❯ react**
- _Source Directory Path:_ **❯ src**
- _Distribution Directory Path:_ **❯ build**
- _Build Command:_ **❯ npm run-script build**
- _Start Command:_ **❯ npm run-script start**
- _Do you want to use an AWS profile?_ **❯ Yes**
- _Please choose the profile you want to use_ **❯ sls-profile**

In the last step, choose the profile you configured with amplify configure, or use a previously created profile.

### 4. Create an API and a Lambda Function

To use an express server in your Lambda function, initialize an API for your Amplify app. You can create additional APIs in the future, but for now we will create a REST API named _mainApi_.

We will be hitting the [Unsplash API](https://unsplash.com/developers) to get a stock photo for a given query.

```shell
$ amplify add api
```

Follow below answers to the follow-up questions asked in the command-line:

- _Please select from one of the below mentioned services_ **❯ REST**
- _Provide a friendly name for your resource to be used as a label for this category in the project_ **❯ mainApi**
- _Provide a path_ (e.g., /items) **❯ /photo**
- _Choose a Lambda source_ **❯ Create a new Lambda function**
- _Provide a friendly name for your resource to be used as a label for this category in the project_ **❯ getPhoto**
- _Provide the AWS Lambda function name_ **❯ getPhoto**
- _Choose the function template that you want to use_ **❯ Serverless express function**
- _Do you want to access other resources created in this project from your Lambda function?_ **❯ No**
- _Do you want to edit the local lambda function now?_ **❯ No**
- _Restrict API access_ **❯ No**
- _Do you want to add another path?_ **❯ No**

In the future, if you create a new function with _amplify add function_, ensure to run _amplify update api_ to connect the new function with your previously created REST API.

### 5. Push Amplify Changes to AWS

To push your updated Amplify app including the new API and function, run:

```shell
$ amplify push
```

### 6. Verify Local Invocation of Lambda Function

Ensure all dependencies are installed locally for your function:

```shell
$ cd amplify/backend/function/getPhoto/src
$ npm install
```

To verify that your lambda can can be invoked, in any directory in the command-line, run:

```shell
$ amplify invoke function getPhoto
```

Choose all of the default responses.

This starts the function's express server, and you should be able to test a GET call to http://localhost:3000/photo (via Postman or Insomnia) and get a successful response.

### 7. Create an Unsplash Developer Account for Free API Access

Follow this to get an API App Key for Unsplash API: [Join Unsplash](https://unsplash.com/join).

### 8. Customize Lambda Function

Locally, your function code will be under _amplify/backend/function/getPhoto_.

In the _src_ folder, you will see an _index.js_ file, which acts as the function handler, and proxies requests through the express endpoints auto-generated in _app.js_ in the same directory.

Although the CLI creates auto-generated endpoints in _app.js_, feel free to delete, modify or edit as needed.

#### Configure Unsplash

In the _app.js_ file, under all of the require statements add with your Unsplash App Key:

```javascript
const UNSPLASH_APP_ID = "<your-unsplash-app-id>"
```

#### Axios

In the _amplify/backend/function/getPhoto/src_ directory, run:

```shell
$ npm i axios
```

In _app.js_, at the top, add:

```javascript
const axios = require("axios")
```

#### Make Request

We will setup the photo to be pulled from Unsplash on the GET /photo endpoint. We will make it an async function, await the axios GET request and then send back the sample response, with a photo field added with the value of the response from the Unsplash request.

```javascript
app.get("/photo", async function(req, res) {
  // Add your code here
  const photo = await axios
    .get("https://api.unsplash.com/search/photos", {
      params: {
        query: "skiing",
        page: 1,
        per_page: 1,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_APP_ID}`,
      },
    })
    .catch(err => {
      console.log("Error happened during fetching!", err)
    })
  console.log(photo.data)
  res.json({ success: "get call succeed!", urL: req.url, photo: photo.data })
})
```

I am doing a sample query for a 'skiing' photo. Additionally, I pass through a param to return a photo that has 'landscape' orientation. You can visit the [Unsplash API Documentation](https://unsplash.com/documentation) for other requests.

#### Push to AWS

After any changes to your lambda function, you will want to run _amplify push_ in order to keep your cloud application in-sync with your local modifications.

```shell
$ amplify push
```

### 9. Invoke Function via React App

To verify that your lambda can can be invoked, in any directory in the command-line, run:

```shell
$ amplify invoke function getPhoto
```

Test a GET call to http://localhost:3000/photo (via Postman or Insomnia).

The response should show you success message as well as the photo data from Unsplash in the photo field of the JSON response:

```json
{
  "success": "get call succeed!",
  "urL": "/photo",
  "photo": {
    "total": 1319,
    "total_pages": 1319,
    "results": [
      {
        "id": "pmfJcN7RGiw",
        "created_at": "2019-03-04T06:24:23-05:00",
        "updated_at": "2020-02-14T00:03:35-05:00",
        "promoted_at": null,
        "width": 6000,
        "height": 4000,
        "color": "#200B13",
        "description": "Full speed ahead!",
        "alt_description": "man ice skiing on hill",
        "urls": {
          "raw": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExNTM4Mn0",
          "full": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjExNTM4Mn0",
          "regular": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNTM4Mn0",
          "small": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExNTM4Mn0",
          "thumb": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjExNTM4Mn0"
        },
        "links": {
          "self": "https://api.unsplash.com/photos/pmfJcN7RGiw",
          "html": "https://unsplash.com/photos/pmfJcN7RGiw",
          "download": "https://unsplash.com/photos/pmfJcN7RGiw/download",
          "download_location": "https://api.unsplash.com/photos/pmfJcN7RGiw/download"
        },
...
```

### 10. Display Image in React App

In App.js (or feel free to create a new component), import _useState_ and _useEffect_, as well as _API_ from _@aws-amplify/api_, and ensure to configure it.

```javascript
import React, { useState, useEffect } from "react"

import API from "@aws-amplify/api"

import awsconfig from "./aws-exports"

// Configure Amplify once in your app (importing API in subcomponents afterwords will be 		auto-configured)
API.configure(awsconfig)
```

Change your App function to:

```javascript
function App() {
  const [photoData, setPhotoData] = useState(null)

  useEffect(() => {
    const getPhoto = async () => {
      const photoResponse = await API.get("mainApi", "/photo")
      console.log(photoResponse)
      setPhotoData(photoResponse)
    }

    getPhoto()

    // adding the empty [] parameter will ensure this function only runs on the first mount of the component
  }, [])

  return (
    <div>
      {photoData && photoData.photo ? (
        <img src={photoData.photo.results[0].urls.small} />
      ) : (
        <p>Photo loading...</p>
      )}
    </div>
  )
}
```

- The _aws-exports.js_ file is auto-generated from the Amplify CLI, never edit it manually.
- We use the useState hook to add state to our functional component
- We use the useEffect hook with a second parameter of [] in order to run the async function inside only once

Run your React app in the root project directory and see your photo:

```shell
$ npm run start
```

## Conclusion

The steps above can be expanded to access any external or internal APIs, and further expansion can accomplish some really cool functionalities for your app. Some use cases can be found [here](https://www.simform.com/serverless-examples-aws-lambda-use-cases/). Feel free to share this with your peers and comment with any suggestions or discussion points!