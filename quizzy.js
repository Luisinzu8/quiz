// timer begins when start buttom is clicked
function startTimer(m,s)
      {
        document.getElementById('timer').innerHTML= m+":"+s;
        if (s==0)
        {
          if (m == 0)
          {
            return;
          }
          else if (m != 0)
          {
            m = m-1;
            s = 60;
          }
        }
        s = s-1;
        t=setTimeout(function(){startTimer(m,s)},1000);
      }

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    if (numCorrect === myQuestions.correctAnswer) {
    	console.log('great!!')
    } else {
    	undefined
    }
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Who is the current All-time MLB homerun leader?",
      answers: {
        a: "Babe Ruth",
        b: "Hank Aaron",
        c: "Barry Bonds"
      },
      correctAnswer: "c"
    },
    {
      question: "When was the last time the Los Angeles Dodgers won a World Series?",
      answers: {
        a: "1988",
        b: "1968",
        c: "2018"
      },
      correctAnswer: "a"
    },
    {
      question: "How many Hits does Ichiro have in the MLB?",
      answers: {
        a: "4127",
        b: "3000",
        c: "2999",
        d: "3089"
      },
      correctAnswer: "d"
    },
    {
    	question: "Who is the All-time stolen base leader in the MLB?",
    	answers: {
    	a: "Juan Pierre",
    	b: "Ricky Henderson",
    	c: "Tim Raines",
    	d: "Lou Brock"
      },
      correctAnswer: "b"
    },
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();