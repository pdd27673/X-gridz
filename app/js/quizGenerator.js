//Declaring most global variables
var rows = localStorage.getItem('Row');
var columns = localStorage.getItem('Column');
var questionNumber = 5;
const container = document.getElementById('container');
var data, rightAnswer, rnd;
var questionLock = false;

//Declaring array that holds questions
var questions = new Array();

//Start Loading of JSON file
var request = new XMLHttpRequest();
request.open('GET', '/activity.json', true);

//When JSON Loaded
request.onload = function () {
	if (this.status >= 200 && this.status < 400) {
		//Starting quiz generation with open JSON
		data = JSON.parse(this.response);

		//Extract image titles from JSON
		for (var i = 0; i < rows * columns; i++) {
			questions[i] = data.images[i];
		}

		//Function to randomize and assign the baby image randomly
		function assignCorrectAnswer() {
			//creates random number from 0 to number of cells
			rnd = Math.floor(Math.random() * (rows * columns) + 1);
			//pulling random image from div
			var img = document.getElementById(`cell${rnd}`);
			//assigning
			img.src = '/app/img/baby.png';
		}

		// function checkAnswer() {
		// 	var el = document.getElementsByTagName('img');

		// 	var clickFunction = function (event) {
		// 		var id = event.target.id;
		// 		return id;
		// 	};

		// 	for (var i = 0; i < el.length; i++) {
		//         el[i].addEventListener('click', clickFunction, false);
		// 	}

		// 	if (questionLock == false) {
		// 		questionLock = true;
		// 		if (clickFunction == `cell${rnd}`) {
		// 		}
		// 	}
		// }

		//Function to make rows with cells in them
		function makeRows(rows, cols) {
			//setting css grid row/cols properties
			container.style.setProperty('--grid-rows', rows);
			container.style.setProperty('--grid-cols', cols);

			//loop to append cells
			for (c = 0; c < rows * cols; c++) {
				//create elements
				let cell = document.createElement('div');
				let img = document.createElement('img');
				//set img attributes and src
				img.src = '/app/img/' + questions[c];
				img.alt = questions[c];
				img.id = `cell${c + 1}`;
				//append img to cell and then cell to container
				cell.appendChild(img);
				container.appendChild(cell).className = 'grid-item';
			}
			//
			assignCorrectAnswer();
		}

		makeRows(rows, columns);
	} else {
		console.log('Error');
	}
};

request.onerror = function () {
	// There was a connection error of some sort
};

request.send();

// document.addEventListener('DOMContentLoaded', function (event) {
// 	// Your code to run since DOM is loaded and ready
// 	var questionNumber = 0;
// 	var questionBank = new Array();
// 	var stage = '#game1';
// 	var stage2 = new Object();
// 	var questionLock = false;
// 	var numberOfQuestions;
// 	var score = 0;

// 	$.getJSON('activity.json', function (data) {
// 		for (i = 0; i < data.quizlist.length; i++) {
// 			questionBank[i] = new Array();
// 			questionBank[i][0] = data.quizlist[i].question;
// 			questionBank[i][1] = data.quizlist[i].option1;
// 			questionBank[i][2] = data.quizlist[i].option2;
// 			questionBank[i][3] = data.quizlist[i].option3;
// 		}
// 		numberOfQuestions = questionBank.length;

// 		displayQuestion();
// 	}); //gtjson

// 	fillDB();

// 		$('.pix').click(function () {
// 			if (questionLock == false) {
// 				questionLock = true;
// 				//correct answer
// 				if (this.id == rnd) {
// 					$(stage).append('<div class="feedback1">CORRECT</div>');
// 					score++;
// 				}
// 				//wrong answer
// 				if (this.id != rnd) {
// 					$(stage).append('<div class="feedback2">WRONG</div>');
// 				}
// 				setTimeout(function () {
// 					changeQuestion();
// 				}, 1000);
// 			}
// 		});
// 	} //display question

// 	function changeQuestion() {
// 		questionNumber++;

// 		if (stage == '#game1') {
// 			stage2 = '#game1';
// 			stage = '#game2';
// 		} else {
// 			stage2 = '#game2';
// 			stage = '#game1';
// 		}

// 		if (questionNumber < numberOfQuestions) {
// 			displayQuestion();
// 		} else {
// 			displayFinalSlide();
// 		}

// 		$(stage2).animate({ right: '+=800px' }, 'slow', function () {
// 			$(stage2).css('right', '-800px');
// 			$(stage2).empty();
// 		});
// 		$(stage).animate({ right: '+=800px' }, 'slow', function () {
// 			questionLock = false;
// 		});
// 	} //change question

// 	function displayFinalSlide() {
// 		$(stage).append(
// 			'<div class="questionText">You have finished the quiz!<br><br>Total questions: ' +
// 				numberOfQuestions +
// 				'<br>Correct answers: ' +
// 				score +
// 				'</div>'
// 		);
// 	} //display final slide
// }); //doc ready
