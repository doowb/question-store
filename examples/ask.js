'use strict';

var Questions = require('..');
var questions = new Questions();

questions
  .set('name', 'What is the project name?', {force: true})
  .set('desc', 'What is the project description?', {force: true});

questions
  .ask(function(err, answer) {
    console.log(answer)
  });
