# A Whatsapp quiz powered by Twilio

### What do you need

1. Twilio Account
2. Airtable for storing your questions and user data

### How does it work

```bash
npm i
cd frontend
npm i --force
cd ..
npm run build-deploy
```

Then you should see the URL of the function assets. This URL contains the funtion id, e.g. `waquiz-1860-dev` in `https://waquiz-1860-dev.twil.io`. Take this ID and replace all occures of `<replace-with-function-id>` with it.

Then go to <https://twilio.com/console/studio> and create two new flows `quiz-flow` and `orchestrator-flow` based on the files in `/studio-flows`.

Fix the `orchestrator-flow` so that it links to the `quiz-flow`

Create a messaging service and add your number and WhatsApp number to the sender pool and the `webhook URL` of the `orchestrator-flow` as the integration.

Create a new Airtable base and copy the `.env_example` to `.env` and replace all values before running the deploy command once again: //TODO: The varibable name is QUIZ_FLOW_SID but we actually need to link to the Orchestrator flow. This was confusing to me

```bash
npm run build-deploy
```

TODO: Add how Airtable needs to be structured and which data need to be added manually

## Start the quiz

```bash
curl -d quiz_key=123456 -d quiz_num=1 https://<replace-with-function-id>.twil.io/quiz/start
```

### Folder structure

#### Frontend:

The frontend code is present inside the `frontend` folder.

The entire setup is hosted on Twilio Serverless and the frontend is served as static pages.

While the frontend is a react app, to update the frontend.

Build the react app

```bash
npm run build
```

Copy the build static assets to the serverless assets folder

```bash
cp ./build ../assets/
```

Deploy the project to your environment

```bash
twilio serverless:deploy
```
