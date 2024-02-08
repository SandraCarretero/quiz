import { gameElement } from './dom';
import { answerSelection, startGame } from './quiz-functions';

startGame();

gameElement.addEventListener('click', event => {
	if (event.target.classList.contains('answer')) {
		answerSelection(event);
	}
});
