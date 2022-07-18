const airtable = require('airtable');

exports.handler = function(context, event, callback) {
  let client = context.getTwilioClient();
  const base = new airtable({apiKey: context.AIRTABLE_API_KEY}).base(context.AIRTABLE_BASE_ID)
  base(context.USER_TABLE_NAME).select().all()
    .then(users => {
        users.forEach(function(user){
            console.log(user.fields.phone, " is the phone number")
            client.studio.v2.flows(context.QUIZ_FLOW_SID)
                            .executions
                            .create({parameters: {
                                quiz_num: event.quiz_num
                             }, to: user.fields.phone, from: context.QUIZ_PHONE_NUMBER})
                            .then(execution => callback(null, execution.sid));
        })}
    )
};
