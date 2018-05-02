const expect = chai.expect;

describe("index", () => {
  let questionContainer;
  const questions = [
    {
      questionText: "Lightning never strikes in the same place twice",
      answer: false
    },
    {
      questionText:
        "Humans can distinguish between over one trillion different smells",
      answer: true
    },
    {
      questionText: "Goldfish only have a memory of about three seconds",
      answer: false
    }
  ];

  function mockRandom(values) {
    let notRandom = (function* random() {
      yield* values;
    })();

    sinon.stub(Math, "random").callsFake(function() {
      return notRandom.next().value;
    });
  }

  beforeEach(function() {
    questionContainer = document.querySelector(".question-container");
    questionContainer.innerHTML = "";
  });

  afterEach(function() {
    // restore original random, if it's been mocked
    Math.random.restore && Math.random.restore();
  });

  describe("getQuestion", () => {
    it("returns a question from the list of questions", function() {
      expect(questions.includes(getQuestion(questions))).to.be.ok;
    });

    it("returns the question randomly", function() {
      mockRandom([0.4, 0.8, 0]);

      // FIXME: assumes a particular implementation of getQuestion
      expect(getQuestion(questions)).to.equal(questions[1]);
      expect(getQuestion(questions)).to.equal(questions[2]);
      expect(getQuestion(questions)).to.equal(questions[0]);
    });
  });

  describe("appendQuestion", () => {
    it("appends the question to the question-container", function() {
      questions.forEach(question => {
        appendQuestion(question);
        expect(questionContainer.innerHTML).to.eq(question.questionText);
        questionContainer.innerHTML = "";
      });
    });
  });

  describe("removeQuestion", () => {
    let question = questions[0];

    it("removes the question to the question-container", function() {
      appendQuestion(question);
      expect(document.querySelector(".question-container").innerHTML).to.eq(
        "Lightning never strikes in the same place twice"
      );
      removeQuestion();
      expect(document.querySelector(".question-container").innerHTML).to.eq("");
    });
  });

  describe("trueAndFalseButtons", function() {
    it("selects and returns the true and false buttons in the index.html file", function() {
      expect(trueAndFalseButtons().length).to.eq(2);
      expect(trueAndFalseButtons()[0].innerText).to.eq(" True ");
      expect(trueAndFalseButtons()[1].innerText).to.eq(" False ");
    });
  });

  describe("hideTrueAndFalseButtons", function() {
    it("changes displayed true and false buttons to hidden", function() {
      trueAndFalseButtons().forEach(function(btn) {
        btn.classList.remove("hide");
      });
      hideTrueAndFalseButtons();
      let btns = document
        .querySelector(".true-false-list")
        .querySelectorAll(".btn");
      expect(Array.from(btns[0].classList)).to.include("hide");
      expect(Array.from(btns[1].classList)).to.include("hide");
    });
  });

  describe("showTrueAndFalseButtons", function() {
    it("changes true and false buttons to displayed", function() {
      trueAndFalseButtons().forEach(function(btn) {
        btn.classList.add("hide");
      });
      showTrueAndFalseButtons();
      let btns = document
        .querySelector(".true-false-list")
        .querySelectorAll(".btn");
      expect(Array.from(btns[0].classList)).to.not.include("hide");
      expect(Array.from(btns[1].classList)).to.not.include("hide");
    });
  });

  describe("askQuestionThen", () => {
    let question = getQuestion(questions);
    let clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();
    });

    it("should append the question", function() {
      askQuestionThen(question, 5);
      expect(document.querySelector(".question-container").innerHTML).to.eq(
        question.questionText
      );
    });

    it("should return a promise", function() {
      expect(askQuestionThen(question, 10)).to.be.a("promise");
    });

    it("promise should resolve with the question after the time passes", function(done) {
      askQuestionThen(question, 10).then(function(resolvedValue) {
        expect(resolvedValue).to.equal(question);
        done();
      });
      clock.tick(11);
    });
  });

  describe("askQuestionThenRemoveQuestion", function() {
    let clock;
    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();
    });

    it("should append the question for 10 seconds and then remove the question when the promise resolves", function(done) {
      mockRandom([0]);
      let resolvingPromise = askQuestionThenRemoveQuestion(
        questions,
        10 * 1000
      );
      expect(questionContainer.innerHTML).to.eq(questions[0].questionText);
      resolvingPromise.then(result => {
        expect(questionContainer.innerHTML).to.equal("");
        done();
      });
      clock.tick(10 * 1000 + 1);
    });
  });

  describe("attachAskAwayListener", function() {
    let event;
    let clock;
    beforeEach(function() {
      // use the first question
      mockRandom([0]);

      // set up event
      event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });

      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();
    });

    it("it displays the question for after a click event to the button", function() {
      attachAskAwayListener();
      let btn = document.querySelector(".btn");
      btn.dispatchEvent(event);
      expect(questionContainer.innerHTML).to.eq(
        "Lightning never strikes in the same place twice"
      );
    });

    it("also displays the true and false buttons", function() {
      attachAskAwayListener();
      let btn = document.querySelector("a.btn");
      btn.dispatchEvent(event);
      let btns = document
        .querySelector(".true-false-list")
        .querySelectorAll(".btn");
      setTimeout(function() {
        expect(Array.from(btns[0].classList)).to.not.include("hide");
        expect(Array.from(btns[1].classList)).to.not.include("hide");
      }, 500);
    });
  });
});
