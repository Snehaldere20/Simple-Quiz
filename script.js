const questions=[
    {
      question: "what is the sum of 130+125+191?",
      answers: [
           {text:"335",correct:false},
           {text:"456",correct:false},
           {text:"446",correct:true},
           {text:"426",correct:false}
      ]
    },
    {
        question: "50 times of 8 is equal to ?",
        answers: [
             {text:"80",correct:false},
             {text:"800",correct:false},
             {text:"400",correct:true},
             {text:"8000",correct:false}
        ]
      },
      {
        question: "110 divided by 10 is:",
        answers: [
             {text:"11",correct:true},
             {text:"10",correct:false},
             {text:"5",correct:false},
             {text:"none",correct:false}
        ]
      },
      {
        question: "20+(90/2) is equal to:",
        answers: [
             {text:"50",correct:false},
             {text:"55",correct:false},
             {text:"65",correct:true},
             {text:"60",correct:false}
        ]
      }

];
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

 let currentQuestionIndex=0;
 let score=0;


 function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();

 }

 function showQuestion(){
     resetState();
     let currentQuestion = questions[currentQuestionIndex];
     let questionNo= currentQuestionIndex+1;
     questionElement.innerHTML=questionNo+". "+ currentQuestion.question;

     currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
     });

   
 }
 
  function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;

    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block"
  }
  function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
  }
  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
       showQuestion(); 
    }
    else{
        showScore();
    }
  }
  nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
       handleNextButton();
    }else{
        startQuiz();
    }
  })
 startQuiz();