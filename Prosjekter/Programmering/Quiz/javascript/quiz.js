const gamingQuiz = {
    1: {
      question: "In the game 'Red Dead Redemption 2,' what is the name of the main protagonist?",
      alternatives: ["A) Arthur Morgan", "B) John Marston", "C) Dutch van der Linde", "D) Bill Williamson"],
      answer: "A",
    },
    2: {
      question: "Which popular video game series features a character named Master Chief and a fictional interstellar war?",
      alternatives: ["A) Halo", "B) Call of Duty", "C) Gears of War", "D) Destiny"],
      answer: "A",
    },
    3: {
      question: "What is the primary objective in the game 'Minecraft'?",
      alternatives: ["A) Defeat the Ender Dragon", "B) Build and explore", "C) Solve puzzles", "D) Collect power-ups"],
      answer: "B",
    },
    4: {
      question: "In the 'Assassin's Creed' series, which historical periods do players often explore through the Animus device?",
      alternatives: ["A) Ancient Egypt and Greece", "B) Feudal Japan", "C) Renaissance Italy", "D) World War II"],
      answer: "A",
    },
    5: {
      question: "What is the name of the AI companion in the 'Halo' series that assists Master Chief?",
      alternatives: ["A) Cortana", "B) Ada", "C) GLaDOS", "D) EDI"],
      answer: "A",
    },
    6: {
      question: "Which game is set in a post-apocalyptic wasteland and follows the story of the Vault Dweller?",
      alternatives: ["A) Wasteland 3", "B) Fallout: New Vegas", "C) Borderlands", "D) Rage"],
      answer: "B",
    },
    7: {
      question: "What is the objective in the game 'Dota 2'?",
      alternatives: ["A) Build the strongest army", "B) Capture enemy territory", "C) Destroy the enemy's Ancient", "D) Solve environmental puzzles"],
      answer: "C",
    },
    8: {
      question: "In 'The Sims' series, what is the main focus of gameplay?",
      alternatives: ["A) Building cities", "B) Managing a farm", "C) Creating and controlling simulated people", "D) Solving mysteries"],
      answer: "C",
    },
    9: {
      question: "Which game features a protagonist named Geralt of Rivia, who is a monster hunter for hire?",
      alternatives: ["A) Dragon Age: Inquisition", "B) The Witcher 3: Wild Hunt", "C) Dark Souls III", "D) Monster Hunter: World"],
      answer: "B",
    },
    10: {
      question: "What is the name of the fictional continent in the game 'The Legend of Zelda: Breath of the Wild'?",
      alternatives: ["A) Hyrule", "B) Azeroth", "C) Tamriel", "D) Ferelden"],
      answer: "A",
    },
};
  
let count = 1;
let correct = 0; 
let highScore = localStorage.getItem('highScore');

function startQuiz() {
    document.getElementById("startQuiz").style.display = 'none';
    const quizContainer = document.getElementById("quizContainer");

    quizContainer.innerHTML = "";

    if (count in gamingQuiz) {
        const element = gamingQuiz[count];

        let question = element.question;
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');

        const h1 = document.createElement('h1');
        h1.textContent = question;
        questionContainer.appendChild(h1);

        const radioContainer = document.createElement('div');
        radioContainer.classList.add('radio-container');

        let optionsArray = element.alternatives;
        optionsArray.forEach((option, index) => {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question_${count}`;
            input.id = `option_${index}`;
            input.value = option[0];
            input.addEventListener('click', disableRadioButtons);
            const label = document.createElement('label');
            label.textContent = option;
            label.setAttribute('for', `option_${index}`);

            radioContainer.appendChild(input);
            radioContainer.appendChild(label);
        });

        questionContainer.appendChild(radioContainer);

        quizContainer.appendChild(questionContainer);

        const button = document.createElement('button');
        button.textContent = (count === Object.keys(gamingQuiz).length) ? 'Fullfør' : 'Next';
        button.classList.add('next')
        button.addEventListener('click', handleQuestion);
        quizContainer.appendChild(button);
    } else {
        // Displays the score at the end
        const scoreContainer = document.createElement('div');
        scoreContainer.textContent = `Your score: ${correct} out of 10`;
        scoreContainer.classList.add('score')
        quizContainer.appendChild(scoreContainer);

        localStorage.setItem('quizScore', correct)

        // Updates high score if higher
        if (correct > highScore) {
          highScore = correct;
          localStorage.setItem('highScore', highScore);
        }
            // Displays the high score
    const highScoreContainer = document.createElement('div');
    const displayedHighScore = localStorage.getItem('highScore')
    highScoreContainer.textContent = `High score: ${highScore}`;
    highScoreContainer.classList.add('high-score');
    quizContainer.appendChild(highScoreContainer);

        // A restart button
        const restartButton = document.createElement('button');
        restartButton.classList.add('restart')
        restartButton.textContent = 'Restart Quiz';
        restartButton.addEventListener('click', restartQuiz);
        quizContainer.appendChild(restartButton);


    }
}

function disableRadioButtons() {
    const clickedRadio = this;
    const radioButtons = document.querySelectorAll(`input[name="${clickedRadio.name}"]`);
    radioButtons.forEach(button => {
        button.disabled = true;
        const label = button.nextElementSibling;
        label.classList.remove('correct', 'wrong');

        if (button.checked) {
            if (button.value === gamingQuiz[count].answer) {
                label.classList.add('correct');
                correct++;
            } else {
                label.classList.add('wrong');
            }
        }
    });
}

function handleQuestion() {
  const radioButtons = document.querySelectorAll(`input[name="question_${count}"]:checked`);
  const messageElement = document.getElementById('message');

  if (radioButtons.length === 0) {
      // if not selected then message to select
      messageElement.textContent = "Select answer!";
      return;
  }

  // If selected clear message
  messageElement.textContent = "";

  count++;
  startQuiz();
}

function restartQuiz() {
    count = 1;
    correct = 0;
    startQuiz();
}