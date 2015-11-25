'use strict';

var Questions = require('..');
var questions = new Questions();

questions
  .set('name', 'What is the project name?')
  .set('desc', 'What is the project description?', {
    force: true
  });

questions.get('name')
  .ask(function(err, answer) {
    console.log(answer)
  });


console.log(questions.getAnswer('name'))
