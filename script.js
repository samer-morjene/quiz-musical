const quizData = [
  {
    question: 'What is the name of this Lana Del Rey album?',
    options: [
      'The Loneliest Time ','Chemtrails Over the Country Club ',
      'born to die','Norman Fucking Rockwell!',
  ],
    answer: 'Norman Fucking Rockwell!',
  },
  {
    question: 'What is the name of this the weeknd album?',
    options: ['After Hours', 'Starboy', 'Dawn FM', 'Beauty Behind the Madness'],
    answer: 'After Hours',
  },
  {
    question: 'What is the name of this travis scott album?',
    options: ['Rodeo', 'Utopia', 'Astroworld', 'Days Before Rodeo'],
    answer: 'Astroworld',
  },
  {
    question: 'What is the name of this drake album?',
    options: [
      'her loss',
      'for all the dogs',
      'take care',
      'Certified Lover Boy',
    ],
    answer: 'her loss',
  },
  { 
    question: 'What is the name of this the weeknd album?',
    options: ['after hours', 'starboy', 'Dawn FM', 'Beauty Behind the Madness'],
    answer: 'starboy',
  },
  { 
    question: 'What is the name of this metro boomin album?',
    options: ['Heroes & Villains', 'Savage Mode II', 'metro boomin not all heroes wear capes', 'metro boomin double or nothing'],
    answer: 'Heroes & Villains',
  },
  { 
    question: 'What is the name of this lil uzi vert album?',
    options: ['Luv Is Rage 2', 'pink tape', 'Eternal Atake', 'Luv Is Rage 1'],
    answer: 'pink tape',
  },
  { 
    question: 'What is the name of this kanye west album?',
    options: ['Vultures 1', 'Graduation', 'donda', 'The Life of Pablo'],
    answer: 'Graduation',
  },
  { 
    question: 'What is the name of ariana grande album?',
    options: ['Eternal Sunshine', 'positons', 'my everything', 'sweetener'],
    answer: 'sweetener',
  },
  { 
    question: 'What is the name of this beyoncé album?',
    options: ['beyoncé', 'Renaissance', 'Cowboy Carter', 'lemonade'],
    answer: 'Cowboy Carter',
  },
];
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}


function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();