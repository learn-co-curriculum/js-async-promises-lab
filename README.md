JS Async Promises Lab
---

## Objectives
1. Practice working with setTimeout and asynchronous code
2. Practice working with promises
3. Practice DOM manipulation

## Introduction

In this lab we'll practice using promises, as well as our other JavaScript skills, to make a quiz game.  The game will have a series of true or false questions for the contestants to answer.  When the contestant clicks the "Ask Away!" button, the first question will show, as well as the True and False buttons.  After five seconds, time is up! The question and the True and False buttons disappear.   

## Your task

We have already done some of the work for you. If you look at the `index.html` file, you can see that there is a div "question-container" where the question should be displayed, and a div of "true false list" to hold the buttons. We've also added the "materialize.css" library so that our game has some styling.

There are number of functions that we need to build to get the quiz game to work.  

+ `getQuestion` - given an array of questions, returns a random question from the array.
+ `appendQuestion` - given a question, appends the question to the div with class "question-container".
+ `removeQuestion` - takes no arguments, removes the question from the "question-container".
+ `trueAndFalseButtons` - returns the collection of true and false buttons already provided in the `index.html` file
+ `hideTrueAndFalseButtons` - adds the `'hide'` class to the buttons - `materialize.css` has a css rule that will hide elements with the `'hide'` class.
+ `showTrueAndFalseButtons` - removes the `'hide'` class from the true and false buttons, so that they show up.
+ `addQuestionListener` - adds a listener to the true-false buttons
+ `askQuestion(time)` - returns a promise that is resolved after a specified amount of time (so that we can expire the question after 5 seconds); the amount of time to wait is provided as an argument to the function
+ `askQuestionThenRemoveQuestion(time)` - it appends the question to the "question-container" and after a specified amount of time removes the question; it takes an argument of "time" indicating the amount of time the question will be displayed
+ `checkQuestion(question, answer)` - takes a question and an answer, and returns true if the answer is correct, false if the question is incorrect.
+ `attachAskAwayListener`  - adds a click event listener to the ask away button so that clicking the button adds the true and false buttons, shows a question for five seconds, then hides the question, then hides the true and false buttons

## Hints

- Check out the docs on [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), particularly the `add` and `remove` methods.

## Resources

- [Wikipedia: First-class function](https://en.wikipedia.org/wiki/First-class_function)
- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [JavaScript is Sexy: Higher-Order Functions](http://javascriptissexy.com/tag/higher-order-functions/)
