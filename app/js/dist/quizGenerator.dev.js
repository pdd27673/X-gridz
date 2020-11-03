"use strict";

//Declaring most global variables
var rows = localStorage.getItem('Row');
var columns = localStorage.getItem('Column');
var questionCount = 0;
var questionNumber = localStorage.getItem('questionNumber');
var stage = 'container1';
var stage2 = 'container2';
var data, rightAnswer, rnd;
var questionLock = false;
var score = 0; //Declaring array that holds questions

var questions = new Array(); //Start Loading of JSON file

var request = new XMLHttpRequest();
request.open('GET', '/activity.json', true); //When JSON Loaded

request.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    //Function to shuffle the images in the array
    var shuffleArray = function shuffleArray(array) {
      for (var _i = array.length - 1; _i > 0; _i--) {
        var j = Math.floor(Math.random() * _i);
        var temp = array[_i];
        array[_i] = array[j];
        array[j] = temp;
      }
    }; //Function that displays the final slide


    var displayFinalSlide = function displayFinalSlide(stage) {
      var div = document.getElementById(stage); //create element to be displayed on page

      var result = "<h1>Results</h1> <p>You got ".concat(score, " out of ").concat(questionNumber, "</p>"); //div to hold element

      var resultDisplay = document.createElement('div'); //display text in resultDisplay div

      resultDisplay.className = 'result';
      resultDisplay.innerHTML = result; //assign div a child

      div.appendChild(resultDisplay);
    }; //function that'll change question once they've been answered


    var changeQuestion = function changeQuestion() {
      //increment question count
      questionCount++; //depending on what stage program is on go to following stage

      if (stage == 'container1') {
        stage2 = 'container1';
        stage = 'container2';
      } else {
        stage2 = 'container2';
        stage = 'container1';
      } //declaring jstage and jstage2 as the jquery variables needed
      //to use .animate() function from jQuery Library


      var jstage2 = '#' + stage2;
      var jstage = '#' + stage; //animating the switching to the next page

      $(jstage2).animate({
        left: '+=80vh'
      }, 'slow', function () {
        $(jstage2).css('left', '-80vh');
      }); //hide stage2

      $(jstage).animate({
        left: '+=89vh'
      }, 'slow', function () {
        questionLock = false;
      }); //show stage 1, and unlock question

      if (questionCount < questionNumber) {
        //if not at the last question
        //delete previous slide
        var s2 = document.getElementById(stage2);

        while (s2.firstChild) {
          s2.removeChild(s2.firstChild);
        } //shuffle the array to have different image positioning


        shuffleArray(questions); //remake another questions

        makeRows(stage, rows, columns);
      } else {
        var s2 = document.getElementById(stage2);

        while (s2.firstChild) {
          s2.removeChild(s2.firstChild);
        } //if at the end
        //show results


        displayFinalSlide(stage);
      }
    }; //Function to randomize and assign the baby image randomly


    var assignCorrectAnswer = function assignCorrectAnswer() {
      //creates random number from 0 to number of cells
      rnd = Math.floor(Math.random() * (rows * columns) + 1); //pulling random image from div

      var img = document.getElementById("img".concat(rnd)); //assigning

      img.src = '/app/img/baby.png';
    }; //function to check clicked on image


    var checkAnswer = function checkAnswer() {
      //pulling all <img> elements
      var img = document.getElementsByTagName('img'); //looping thru each elements and assigning it an onclick function

      for (var i = 0; i < img.length; i++) {
        img[i].onclick = function () {
          //on click run next code block
          if (questionLock == false) {
            //lock the question
            questionLock = true; //perform check

            if (this.id === "img".concat(rnd)) {
              //correct answer
              //increment score
              score++;
              console.log('correct answer'); //get cell holding the image

              var cell = document.getElementById("cell".concat(rnd)); //make border green

              cell.style.border = 'solid green'; //set a timeout before changing question

              setTimeout(function () {
                changeQuestion();
              }, 1500);
            } else {
              //wrong answer
              console.log('wrong answer'); //get the id of clicked element

              var str = this.id; //pulling numbers only from that string

              var res = str.replace(/\D/g, ''); //pulling corresponding div cell

              var cell = document.getElementById("cell".concat(res)); //making cell border red

              cell.style.border = 'solid red'; //set timeout before next question

              setTimeout(function () {
                changeQuestion();
              }, 1500);
            }
          } else {
            //in case question has been answered
            alert('question has already been answered');
            setTimeout(function () {
              changeQuestion();
            }, 1000);
          }
        };
      }
    }; //Function to make rows with cells in them


    var makeRows = function makeRows(stageI, rows, cols) {
      //setting css grid row/cols properties
      var container = document.getElementById(stageI);
      container.style.setProperty('--grid-rows', rows);
      container.style.setProperty('--grid-cols', cols); //loop to append cells

      for (c = 0; c < rows * cols; c++) {
        //create elements
        var cell = document.createElement('div');
        var img = document.createElement('img'); //set img attributes and src

        img.src = '/app/img/' + questions[c]; // img.className = 'cell';

        cell.id = "cell".concat(c + 1);
        img.id = "img".concat(c + 1); //append img to cell and then cell to container

        cell.appendChild(img);
        container.appendChild(cell).className = 'grid-item';
      } //calling functions


      assignCorrectAnswer();
      checkAnswer();
    };

    //Starting quiz generation with open JSON
    data = JSON.parse(this.response); //Extract image titles from JSON

    for (var i = 0; i < rows * columns; i++) {
      questions[i] = data.images[i];
    }

    makeRows(stage, rows, columns);
  } else {
    console.log('Error');
  }
};

request.onerror = function () {// There was a connection error of some sort
};

request.send(); //end of request