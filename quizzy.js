(function(){
  function buildQuiz() {
	// we'll need a place to store the html output
	const output = [];

	//for each question
	myQuestions.forEach(
		(currentQuestion, questionNumber) => {


			//we'll want to store the list of answer choices
			const answers = [];


			//and for each available answer
			for(letter in currentQuestion.answers) {


				//add an html radio button
				answers.push(
					`<label>

					<input type="radio" name="question${questionNumber}" value="${letter}">
					${letter} :
					${currentQuestion.answers[letter]}
					</label>`
					);
			}


			//add this question and its answers to the output
			output.push(
				`<div class="question"> ${currentQuestion.question}
				</div>
				<div class="answers"> ${answers.join("")}</div>`
				);
		}
	);

	//finally combine our ouput list into one string of HTML and put it on page
	quizContainer.innerHTML = output.join("");
}

function showResults() {
	

	//gather answer containers from our quiz
	const answerContainers = quizContainer.querySelectorAll(".answers");


	//keep track of users answers
	let numCorrect = 0;


	//for each question
	myQuestions.forEach((currentQuestion, questionNumber) => {


		//find answer selected
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector)|| {}).value;


		//if answer is correct
		if (userAnswer===currentQuestion.correctAnswer) {
			//add to the number of correct answers
			numCorrect++;


			//color the answers green
			answerContainers[questionNumber].style.color = "lightgreen";
		}
		//if answer is wrong or blank
		else{
			//color answers red
			answerContainers[questionNumber].style.color = "red";

		}
	});

	//show number of correct answers out of total
	resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const myQuestions = [
{
	question: "Who is the strongest?"
	answers: {
		a: "The Hulk",
		b: "Thanos",
		c: "Wolverine"
	}
	correctAnswer: "b"
}
{
	question: "Who is the smartest?"
	answers: {
		a: "Tony Stark",
		b: "Bruce Banner",
		c: "Peter Parker",
	}
	correctAnswer: "a"
}
{
	question: "Who is the fastest?"
	answers: {
		a: "Captain America",
		b: "Black Panther",
		c: "Quicksilver",
	}
	correctAnswer: "c"
}
];

//display quiz right away
buildQuiz();


//on submit, show results

submitButton.addEventListener('click', showResults);
})();