import { QUESTIONS, colorAnswer } from './constant';
import { gameElement } from './dom';

let currentQuestionIndex = 0;
const userAnswers = [];

const printQuestion = () => {
	const newQuestion = document.createElement('h2');
	newQuestion.classList.add('question');
	newQuestion.textContent = QUESTIONS[currentQuestionIndex].question;

	gameElement.innerHTML = '';
	gameElement.append(newQuestion);
};

const printAnswers = () => {
	const fragment = document.createDocumentFragment();

	const answerContainer = document.createElement('div');
	answerContainer.classList.add('answers-container');

	QUESTIONS[currentQuestionIndex].options.forEach(option => {
		const newAnswer = document.createElement('p');
		newAnswer.classList.add('answer');
		newAnswer.textContent = option;
		answerContainer.appendChild(newAnswer);
	});

	fragment.append(answerContainer);
	gameElement.append(fragment);
};

const changeQuestion = () => {
	currentQuestionIndex++;
};

const answerSelection = event => {
	const selectedAnswer = event.target.textContent;
	const currentQuestion = QUESTIONS[currentQuestionIndex];

	currentQuestion.selectedAnswer = selectedAnswer;
	userAnswers.push({ question: currentQuestion, selectedAnswer });

	changeQuestion();

	if (currentQuestionIndex < QUESTIONS.length) {
		printQuestion();
		printAnswers();
	} else {
		console.log('¡Has completado todas las preguntas!');
		showAllQuestionsAndAnswers();
	}
};

const showScore = () => {
	const correctAnswersCount = userAnswers.filter(
		answer => answer.selectedAnswer === answer.question.correctAnswer
	).length;
	const totalQuestions = QUESTIONS.length;

	const scoreContainer = document.createElement('div');
	scoreContainer.classList.add('score-container');

	const scoreElement = document.createElement('p');
	scoreElement.textContent = `${correctAnswersCount} / ${totalQuestions} `;
	scoreContainer.append(scoreElement);
	gameElement.append(scoreContainer);
};

const showAllQuestionsAndAnswers = () => {
	gameElement.innerHTML = '';

	const fragment = document.createDocumentFragment();

	userAnswers.forEach(answer => {
		const currentQuestion = answer.question;
		const correctAnswer = currentQuestion.correctAnswer;
		const selectedAnswer = answer.selectedAnswer;

		let color = '';

		if (selectedAnswer === correctAnswer) {
			color = colorAnswer.correct;
		} else {
			color = colorAnswer.incorrect;
		}

		const newQuestionContainer = document.createElement('div');
		newQuestionContainer.classList.add('question-container');

		const newQuestion = document.createElement('p');
		newQuestion.classList.add('question-result');
		newQuestion.textContent = currentQuestion.question;

		const newCorrectAnswer = document.createElement('span');
		newCorrectAnswer.textContent = `${correctAnswer} - `;
		newCorrectAnswer.classList.add(colorAnswer.right);

		const newSelectedAnswer = document.createElement('span');
		newSelectedAnswer.textContent = `${selectedAnswer}`;
		newSelectedAnswer.classList.add(color);

		newQuestionContainer.appendChild(newQuestion);
		newQuestionContainer.appendChild(newCorrectAnswer);
		newQuestionContainer.appendChild(newSelectedAnswer);

		fragment.appendChild(newQuestionContainer);
	});
	showScore();
	gameElement.appendChild(fragment);
};

const startGame = () => {
	printQuestion();
	printAnswers();
};

export { answerSelection, startGame };
