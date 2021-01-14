const preguntas = {
    preguntas: [
        {
            titulo: "EL titulo de la pregunta",
            respuestas: [
                "respuesta1",
                "respuesta2",
                "respuesta3",
                "respuesta4"
            ],
            respuestaCorrecta: 2
        },
        {
            titulo: "EL titulo de la pregunta",
            respuestas: [
                "respuesta1",
                "respuesta2",
                "respuesta3",
                "respuesta4"
            ],
            respuestaCorrecta: 2
        },
        {
            titulo: "EL titulo de la pregunta",
            respuestas: [
                "respuesta1",
                "respuesta2",
                "respuesta3",
                "respuesta4"
            ],
            respuestaCorrecta: 2
        }
    ]
};
/*  let questionText = preguntas.preguntas[questionNumber].titulo;
    let answerText1 = preguntas.preguntas[questionNumber].respuestas[0];
    let answerText2 = preguntas.preguntas[questionNumber].respuestas[1];
    let answerText3 = preguntas.preguntas[questionNumber].respuestas[2];
    let answerText4 = preguntas.preguntas[questionNumber].respuestas[3];
    let correct = preguntas.preguntas[questionNumber].respuestaCorrecta; */


let BODY = document.querySelector('body');
let welcome = document.querySelector('#welcome');
let start = document.querySelector('#welcome button');
let questionNumber = 0;
let question;


//Class -> Question
class Question{
    constructor(question, answer1, answer2, answer3, answer4, correctAnswer){
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer;
        this.value = 4;
    }
    appear(){
        let questionWrapper = document.createElement("section");
        questionWrapper.id = "questionWrapper";
        BODY.appendChild(questionWrapper);

        let questionElement = document.createElement('p');
        questionElement.innerText = this.question;
        questionElement.id = "question";
        questionWrapper.appendChild(questionElement);

        let answers = document.createElement('div');
        answers.id = "answers";
        questionWrapper.appendChild(answers);

        let answerText1 = document.createElement("p");
        answerText1.id = "answer1";
        answerText1.className = "answer";
        answerText1.innerText = this.answer1;
        answers.appendChild(answerText1);
        answerText1.dataset.correct=0;
        answerText1.addEventListener("click", check);

        let answerText2 = document.createElement("p");
        answerText2.id = "answer2";
        answerText2.className = "answer";
        answerText2.innerText = this.answer2;
        answerText2.dataset.correct=0;
        answers.appendChild(answerText2);
        answerText2.addEventListener("click", check);

        let answerText3 = document.createElement("p");
        answerText3.id = "answer3";
        answerText3.className = "answer";
        answerText3.innerText = this.answer3;
        answerText3.dataset.correct=0;
        answers.appendChild(answerText3);
        answerText3.addEventListener("click", check);

        let answerText4 = document.createElement("p");
        answerText4.id = "answer4";
        answerText4.className = "answer";
        answerText4.innerText = this.answer4;
        answerText4.dataset.correct=0;
        answers.appendChild(answerText4);
        answerText4.addEventListener("click", check);

        if(this.correctAnswer===0)
            answerText1.dataset.correct=1;
        if(this.correctAnswer===1)
            answerText2.dataset.correct=1;
        if(this.correctAnswer===2)
            answerText3.dataset.correct=1;
        if(this.correctAnswer===3)
            answerText4.dataset.correct=1;
    }
    fail(){
        if(this.value !== 0)
            this.value = this.value -1;
            console.log(this.value);
    }
}

function check(){
    if(this.dataset.correct==="1"){
        questionWrapper.remove();
        question = new Question("pregunta2", "respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4", 3);
        question.appear();
    }else{
        question.fail();
    }
}
start.addEventListener("click", ()=>{
    welcome.remove();
    question = new Question("pregunta", "respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4", 2);
    question.appear();
    questionNumber++;
} );


