# question-store [![NPM version](https://badge.fury.io/js/question-store.svg)](http://badge.fury.io/js/question-store)

> Ask questions, persist the answers. Basic support for i18n and storing answers based on current working directory.

Similar to [question-cache](https://github.com/jonschlinkert/question-cache), but persists answers to disk and supports locales and storing answers based on current working directory.

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  * [Questions](#questions)
  * [Question](#question)
- [Related projects](#related-projects)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i question-store --save
```

## Usage

```js
var Questions = require('question-store');
```

## API

### Questions

### [Questions](index.js#L23)

Create an instance of `Questions` with the given `options`.

**Params**

* `options` **{Object}**: question store options

**Example**

```js
var Questions = new Questions(options);
```

### [.set](index.js#L55)

Queue up a question to be asked at a later point. Creates an instance of [Question](#question), so any `Question` options or settings may be used.

**Params**

* `value` **{Object|String}**: Question object, message (string), or options object.
* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
questions.set('drink', 'What is your favorite beverage?');
// or
questions.set('drink', {
  type: 'input',
  message: 'What is your favorite beverage?'
});
// or
questions.set({
  name: 'drink'
  type: 'input',
  message: 'What is your favorite beverage?'
});
```

### [.question](index.js#L92)

Get the `question` instance stored for the given `name`. This is the entire `Question` object, with all answers for all locales and directories.

**Params**

* `name` **{String}**
* `returns` **{Object}**: Returns the question instance.

**Example**

```js
var name = questions.question('name');
```

### [.get](index.js#L116)

Get the answer object for question `name`, for the current locale and cwd.

**Params**

* `name` **{String}**
* `locale` **{String}**
* `returns` **{Object}**: Returns the question object.

**Example**

```js
var name = questions.get('name');
//=> {name: 'Jon'}

// specify a locale
var name = questions.get('name', 'fr');
//=> {name: 'Jean'}
```

### [.isAnswered](index.js#L132)

Return true if question `name` has been answered for the current locale and the current working directory.

**Params**

* `name` **{String}**: Question name
* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.isAnswered(locale);
```

### [.del](index.js#L147)

Delete the answer for question `name` for the current (or given) locale.

**Params**

* `name` **{String}**: Question name
* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.del(locale);
```

### [.erase](index.js#L162)

Erase all answers for question `name` from the file system.

**Params**

* `name` **{String}**: Question name

**Example**

```js
question.erase(name);
```

### [.answer](index.js#L189)

Get the answer value for question `name`, for the current locale and cwd. Similar to `questions.get`, but only returns the answer value instead of the entire object.

**Params**

* `name` **{String}**
* `locale` **{String}**
* `returns` **{Object}**: Returns the question object.

**Example**

```js
var name = questions.answer('name');
//=> 'Jon'

// specify a locale
var name = questions.answer('name', 'fr');
//=> 'Jean'
```

### [.ask](index.js#L211)

Ask one or more questions, with the given `options` and callback.

**Params**

* `queue` **{String|Array}**: Name or array of question names.
* `options` **{Object|Function}**: Question options or callback function
* `callback` **{Function}**: callback function

**Example**

```js
questions.ask(['name', 'description'], function(err, answers) {
  console.log(answers);
});
```

### Question

### [Question](lib/question.js#L24)

Create new `Question` store `name`, with the given `options`.

**Params**

* `name` **{String}**: The question property name.
* `options` **{Object}**: Store options

**Example**

```js
var question = new Question(name, options);
```

### [.set](lib/question.js#L53)

Set the answer to the question for the current (or given) locale, at the current working directory.

**Params**

* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.set('foo');
```

### [.get](lib/question.js#L69)

Get the answer for the current (or given) locale for the current working directory.

**Params**

* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.get(locale);
```

### [.isAnswered](lib/question.js#L84)

Return true if the question has been answered for the current locale and the current working directory.

**Params**

* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.isAnswered(locale);
```

### [.setDefault](lib/question.js#L99)

Set the default answer to use for the current (or given) locale, at the current working directory.

**Params**

* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.setDefault('foo');
```

### [.hasDefault](lib/question.js#L116)

Return true if the question has been given a default answer for the current (or given) locale, at the current working directory.

**Params**

* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.hasDefault('foo');
```

### [.ask](lib/question.js#L137)

Ask the question.

* If an answer has already been stored for the current locale and cwd it will be returned directly without asking the question.
* If `options.force` is **true**, the answer will be asked asked even if the answer is already stored.
* If `options.save` is **false**, the answer will not be persisted to the file system, and the question will be re-asked each time `.ask()` is called (which means it's also not necessary to define `force` when `save` is false).

**Params**

* `options` **{Object|Function}**: Question options or callback function
* `callback` **{Function}**: callback function

**Example**

```js
question.ask({force: true}, function(err, answer) {
  console.log(answer);
});
```

### [.del](lib/question.js#L179)

Delete the answer for the current (or given) locale.

**Params**

* `locale` **{String}**: Optionally pass a locale

**Example**

```js
question.del(locale);
```

### [.erase](lib/question.js#L193)

Delete the answer store (all answers for the question) from the file system.

**Example**

```js
question.erase();
```

### [.save](lib/question.js#L208)

Persist the answer for the current locale and cwd to disk.

**Example**

```js
question.save();
```

## Related projects

* [answer-store](https://www.npmjs.com/package/answer-store): Store answers to user prompts, based on locale and/or current working directory. | [homepage](https://github.com/jonschlinkert/answer-store)
* [inquirer](https://www.npmjs.com/package/inquirer): A collection of common interactive command line user interfaces. | [homepage](https://github.com/sboudrias/Inquirer.js#readme)
* [question-cache](https://www.npmjs.com/package/question-cache): A wrapper around inquirer that makes it easy to create and selectively reuse questions. | [homepage](https://github.com/jonschlinkert/question-cache)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/question-store/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 24, 2015._