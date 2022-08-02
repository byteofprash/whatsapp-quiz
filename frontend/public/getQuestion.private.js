

const airtable = require('airtable');

const getQuestion = (questionTable, base, event) => {
  return new Promise((resolve, reject) => {
    base(questionTable).select({filterByFormula: `AND(({question_num} = "${event.fields.question_num}"), ({quiz_num} = "${event.fields.quiz_num}") )`})
      .firstPage((err, questions) => {
        if(err){
          console.error(err)
          reject(err)
        }
        if(questions.length < 1){
          reject()
        }
        if(!err && questions.length > 0){
          resolve(questions[0].fields)
        }
      })
  })
}

module.exports = getQuestion;