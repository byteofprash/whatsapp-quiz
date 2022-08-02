const airtable = require("airtable");

exports.handler = function (context, event, callback) {
  let client = context.getTwilioClient();
  const base = new airtable({ apiKey: context.AIRTABLE_API_KEY }).base(
    context.AIRTABLE_BASE_ID
  );

  if (!isFormattedCorrectly(event)) {
    const startKeyError = {
      statusCode: 400,
      message: "Missing quiz_key parameter in body",
    };
    callback(JSON.stringify(startKeyError));
  }

  if (isAuthorized(event, context)) {
    base(context.USER_TABLE_NAME)
      .select()
      .all()
      .then((users) => {
        users.forEach(function (user) {
          console.log(user.fields.phone, " is the phone number");

          const toNumber = user.fields.phone;

          client.studio.v2
            .flows(context.QUIZ_FLOW_SID)
            .executions.create({
              parameters: {
                quiz_num: event.quiz_num,
              },
              to: toNumber,
              from: context.QUIZ_MESSAGING_SERVICE,
            })
            .then((execution) => callback(null, execution.sid));
        });
      })
      .catch((err) => console.log(err));
  } else {
    const unauthorizedError = { statusCode: 401, message: "Unauthorized" };
    callback(JSON.stringify(unauthorizedError));
  }
};

const isAuthorized = (event, context) => {
  const quiz_key = context.QUIZ_KEY;
  console.log(event);
  if (event.quiz_key === quiz_key) {
    return true;
  } else {
    return false;
  }
};

const isFormattedCorrectly = (event) => {
  if (event.quiz_key) {
    return true;
  } else {
    return false;
  }
};
