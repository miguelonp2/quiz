let BODY = document.querySelector("body");
let game;
let question;
let gameTime;
let jsonQuestions = new Array();
const API_KEY = "UhxM2PRBoE1juxjvdUghazZCbmpvpp8nwgQqII7Y";
fetch(
  `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=code&difficulty=Easy&limit=${5}&tags=JavaScript`
)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);
    jsonQuestions = data;
  });

class PantallaInicio {
  constructor(title, img, text) {
    this.welcome = document.createElement("section");
    this.welcome.id = "welcome";

    this.title = document.createElement("h1");
    this.title.innerText = title;

    this.gif = document.createElement("img");
    this.gif.src = img;

    this.text = document.createElement("p");
    this.text.innerText = text;

    this.button = document.createElement("button");
    this.button.innerText = "¡Jugar!";
    this.button.addEventListener("click", this.desappear);
  }
  appear() {
    BODY.appendChild(this.welcome);
    this.welcome.appendChild(this.title);
    this.welcome.appendChild(this.gif);
    this.welcome.appendChild(this.text);
    this.welcome.appendChild(this.button);
  }
  desappear() {
    welcome.remove();
    game = new Juego();
    game.appear();
  }
}

class CountDown {
  constructor(tiempo = 30) {
    this.tiempo = tiempo;
    this.chronometer = document.createElement("div");
    this.chronometer.id = "chronometer";
    this.seconds = document.createElement("p");
    this.seconds.innerText = tiempo;
    this.chronometer.appendChild(this.seconds);
    BODY.appendChild(this.chronometer);
    this.intervalo = setInterval(() => {
      if(this.tiempo===0){
        this.timeOut();
      }else{
        this.oneSecondLess();
      }
    }, 1000);
  }
  timeOut(){
    this.chronometer.style.backgroundColor="rgb(255, 122, 122)";
    game.puntuation=0;
    clearInterval(this.intervalo);
  }
  oneSecondLess(){
    this.tiempo=this.tiempo-1;
    this.seconds.innerText=this.tiempo;
  }
}

class Tiempo {
  constructor() {
    this.start = new Date();
  }
  finish() {
    this.end = new Date();
  }
  elapseTime() {
    this.diff = this.end - this.start;
    let seg = this.diff / 1000;
    let min = Math.floor(seg / 60);
    seg = Math.floor(seg - min * 60);
    console.log(min + " minutos y " + seg + " segundos");
  }
}

class Juego {
  constructor(x = 5) {
    this.questionWrapper = document.createElement("div");
    this.questionWrapper.id = "questionWrapper";
    this.numberOfQuestions = x;
    this.questionNumber = 0;
    this.puntuation = 0;
  }
  appear() {
    BODY.appendChild(this.questionWrapper);
    this.createQuestion();
    question.appear();
    gameTime = new Tiempo();
    //console.log(gameTime);
  }
  createQuestion() {
    //console.log(this.questionNumber);
    this.correct = new Array(
      jsonQuestions[this.questionNumber].correct_answers.answer_a_correct,
      jsonQuestions[this.questionNumber].correct_answers.answer_b_correct,
      jsonQuestions[this.questionNumber].correct_answers.answer_c_correct,
      jsonQuestions[this.questionNumber].correct_answers.answer_d_correct
    );

    question = new Pregunta(
      jsonQuestions[this.questionNumber].question,
      jsonQuestions[this.questionNumber].answers.answer_a,
      jsonQuestions[this.questionNumber].answers.answer_b,
      jsonQuestions[this.questionNumber].answers.answer_c,
      jsonQuestions[this.questionNumber].answers.answer_d,
      this.correct.indexOf("true")
    );
  }
}

class Pregunta {
  constructor(question, answer1, answer2, answer3, answer4, correctAnswer) {
    this.wrapper = document.createElement("div");

    this.questionValue = 4;
    this.questionElement = document.createElement("p");
    this.questionElement.innerText = question;
    this.questionElement.id = "question";

    this.answers = document.createElement("div");
    this.answers.id = "answers";

    this.answers1 = document.createElement("div");
    this.answers1.id = "answers1";
    this.answers1.className = "answersGroup";

    this.answers2 = document.createElement("div");
    this.answers2.id = "answers2";
    this.answers2.className = "answersGroup";

    this.answerText1 = document.createElement("p");
    this.answerText1.id = "answer1";
    this.answerText1.className = "answer";
    this.answerText1.innerText = answer1;
    this.answerText1.dataset.correct = 0;
    this.answerText1.addEventListener("click", this.check);

    this.answerText2 = document.createElement("p");
    this.answerText2.id = "answer2";
    this.answerText2.className = "answer";
    this.answerText2.innerText = answer2;
    this.answerText2.dataset.correct = 0;
    this.answerText2.addEventListener("click", this.check);

    this.answerText3 = document.createElement("p");
    this.answerText3.id = "answer3";
    this.answerText3.className = "answer";
    this.answerText3.innerText = answer3;
    this.answerText3.dataset.correct = 0;
    this.answerText3.addEventListener("click", this.check);

    this.answerText4 = document.createElement("p");
    this.answerText4.id = "answer4";
    this.answerText4.className = "answer";
    this.answerText4.innerText = answer4;
    this.answerText4.dataset.correct = 0;
    this.answerText4.addEventListener("click", this.check);

    if (correctAnswer === 0) this.answerText1.dataset.correct = 1;
    if (correctAnswer === 1) this.answerText2.dataset.correct = 1;
    if (correctAnswer === 2) this.answerText3.dataset.correct = 1;
    if (correctAnswer === 3) this.answerText4.dataset.correct = 1;
  }
  appear() {
    let chronometer = new CountDown();
    questionWrapper.appendChild(this.wrapper);
    this.wrapper.appendChild(this.questionElement);
    this.wrapper.appendChild(this.answers);
    this.answers.appendChild(this.answers1);
    this.answers.appendChild(this.answers2);
    this.answers1.appendChild(this.answerText1);
    this.answers1.appendChild(this.answerText2);
    this.answers2.appendChild(this.answerText3);
    this.answers2.appendChild(this.answerText4);
  }
  desappear() {
    this.wrapper.remove();
  }
  check() {
    //console.log("Cheking...");
    if (this.dataset.correct === "1") {
      game.puntuation += question.questionValue;
      console.log(game.puntuation);
      game.questionNumber++;
      //console.log(game.puntuation);
      this.style.borderColor = "green";
      this.style.borderWidth = "3px";
      setTimeout(() => {
        question.desappear();
        if (game.questionNumber !== game.numberOfQuestions) {
          let chronometer = document.querySelector("#chronometer");
          chronometer.remove();
          game.createQuestion();
          question.appear();
        } else {
          let end = new PantallaFinal();
          end.appear();
        }
      }, 1500);
    } else {
      question.questionValue--;
      this.style.borderColor = "red";
      this.style.borderWidth = "3px";
    }
  }
}

class PantallaFinal {
  constructor() {
    let chronometer = document.querySelector("#chronometer");
    chronometer.remove();
    this.text = document.createElement("p");
    this.text.id="endText";
    this.text.innerText = "FIIIIIIIIIN";
    this.score = document.createElement("div");
    this.score.id="score";
    this.textScore = document.createElement("p");
    this.textScore.innerText="puntuación: "+game.puntuation+"/20";
    this.score.appendChild(this.textScore);
  }
  appear() {
    BODY.appendChild(this.text);
    BODY.appendChild(this.score);
  }
  desappear() {
    this.text.remove();
  }
}

let pantallaInicio = new PantallaInicio(
  "Quiz - The Bridge",
  "https://raw.githubusercontent.com/TheBridge-FullStackDeveloper/proyectos-quiz/master/secondary.gif",
  "¿Te atreves a jugar?"
);
pantallaInicio.appear();
