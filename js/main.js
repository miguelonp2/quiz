const preguntas = {
  preguntas: [
    {
      titulo: "¿Cuántas zonas horarias tiene en Rusia?",
      respuestas: ["1", "4", "7", "11"],
      respuestaCorrecta: 3,
    },
    {
      titulo: "¿Cuál es la flor nacional de Japón?",
      respuestas: ["Flor de Naranjo", "Flor de Cerezo", "Flor de Loto", "No tiene flor nacional"],
      respuestaCorrecta: 1,
    },
    {
      titulo: "¿Cuántas franjas tiene la bandera de Estados Unidos? ",
      respuestas: ["11", "12", "13", "14"],
      respuestaCorrecta: 2,
    },
    {
        titulo: "¿Cuál es el animal nacional de Australia?",
        respuestas: ["Araña", "Canguro", "Cerdo", "Perezoso"],
        respuestaCorrecta: 1,
      },
      {
        titulo: "¿Cuál de los siguientes imperios no tenía un idioma escrito?",
        respuestas: ["Inca", "Aztecas", "Egipcios", "Romanos"],
        respuestaCorrecta: 0,
      },
      {
        titulo: "¿Cómo se llamaba Istanbul antes de 1923?",
        respuestas: ["No existia", "Burgos", "Constantinopla", "Cartago"],
        respuestaCorrecta: 2,
      },
  ],
};

let BODY = document.querySelector("body");
let welcome = document.querySelector("#welcome");
let start = document.querySelector("#welcome button");
let questionNumber = 0;
let questions = preguntas.preguntas.length;
//console.log(questions);
let question;
let time;
let x = 0;

//Class -> Question
class Question {
  constructor(question, answer1, answer2, answer3, answer4, correctAnswer) {
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correctAnswer = correctAnswer;
    this.value = 4;
  }
  appear() {
    let chronometer = new CountDown();
    let questionWrapper = document.createElement("section");
    questionWrapper.id = "questionWrapper";
    BODY.appendChild(questionWrapper);

    let questionElement = document.createElement("p");
    questionElement.innerText = this.question;
    questionElement.id = "question";
    questionWrapper.appendChild(questionElement);

    let answers = document.createElement("div");
    answers.id = "answers";
    questionWrapper.appendChild(answers);

    let answers1 = document.createElement("div");
    answers1.id = "answers1";
    answers1.className = "answersGroup";
    answers.appendChild(answers1);

    let answers2 = document.createElement("div");
    answers2.id = "answers2";
    answers2.className = "answersGroup";
    answers.appendChild(answers2);

    let answerText1 = document.createElement("p");
    answerText1.id = "answer1";
    answerText1.className = "answer";
    answerText1.innerText = this.answer1;
    answers1.appendChild(answerText1);
    answerText1.dataset.correct = 0;
    answerText1.addEventListener("click", check);

    let answerText2 = document.createElement("p");
    answerText2.id = "answer2";
    answerText2.className = "answer";
    answerText2.innerText = this.answer2;
    answerText2.dataset.correct = 0;
    answers1.appendChild(answerText2);
    answerText2.addEventListener("click", check);

    let answerText3 = document.createElement("p");
    answerText3.id = "answer3";
    answerText3.className = "answer";
    answerText3.innerText = this.answer3;
    answerText3.dataset.correct = 0;
    answers2.appendChild(answerText3);
    answerText3.addEventListener("click", check);

    let answerText4 = document.createElement("p");
    answerText4.id = "answer4";
    answerText4.className = "answer";
    answerText4.innerText = this.answer4;
    answerText4.dataset.correct = 0;
    answers2.appendChild(answerText4);
    answerText4.addEventListener("click", check);

    if (this.correctAnswer === 0) answerText1.dataset.correct = 1;
    if (this.correctAnswer === 1) answerText2.dataset.correct = 1;
    if (this.correctAnswer === 2) answerText3.dataset.correct = 1;
    if (this.correctAnswer === 3) answerText4.dataset.correct = 1;
  }
  fail() {
    if (this.value !== 0) this.value = this.value - 1;
    console.log(this.value);
  }
}
class Tiempo{
    constructor(){
        this.start = new Date;
    }
    finish(){
        this.end = new Date;
    }
    elapseTime(){
        this.diff = (this.end-this.start);
        let seg=this.diff/1000;
        let min = Math.floor(seg/60);
        seg = Math.floor(seg - min*60);
        console.log(min+" minutos y "+seg+" segundos");
    }
}

function check() {
  if (this.dataset.correct === "1" && questionNumber !== questions) {
    x += question.value;
    console.log(x);
    questionWrapper.remove();
    question = new Question(
      preguntas.preguntas[questionNumber].titulo,
      preguntas.preguntas[questionNumber].respuestas[0],
      preguntas.preguntas[questionNumber].respuestas[1],
      preguntas.preguntas[questionNumber].respuestas[2],
      preguntas.preguntas[questionNumber].respuestas[3],
      preguntas.preguntas[questionNumber].respuestaCorrecta
    );
    time = new Tiempo();
    question.appear();
    questionNumber++;

  }else if(questions === questionNumber){
      //Pintar puntuaciones.
  }
   else {
    question.fail();
  }
}
start.addEventListener("click", () => {
  welcome.remove();
  question = new Question(
    preguntas.preguntas[questionNumber].titulo,
    preguntas.preguntas[questionNumber].respuestas[0],
    preguntas.preguntas[questionNumber].respuestas[1],
    preguntas.preguntas[questionNumber].respuestas[2],
    preguntas.preguntas[questionNumber].respuestas[3],
    preguntas.preguntas[questionNumber].respuestaCorrecta
  );
  time = new Tiempo();
  question.appear();
  questionNumber++;
});
