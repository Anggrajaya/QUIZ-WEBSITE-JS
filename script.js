const question = [
    {
        question: "Bika Ambon Berasal dari mana ?",
        answer: [
            {text:"Medan , Sumatera Utara", correct:true},
            {text:"Ambon , Maluku", correct:false},
            {text:"Jakarta , DKI Jakarta", correct:false},
            {text:"Bandung , Jaawa Barat", correct:false},
        ]
    },
    {
        question: "Soto Sokaraja Berasal Dari Mana ?",
        answer: [
            {text:"Pemalang ,  Jawa Tengah.", correct:false},
            {text:"Bogor ,  Jawa Barat.", correct:false},
            {text:"Sokaraja , Banyumas, Jawa Tengah.", correct:true},
            {text:"Medan , Sumatra Utara", correct:false},
        ]
    },
    {
        question : "Tempat Lahir Imam Bonjol adalah ? ",
        answer:[
            { text :"Bonjol, Sumatra Barat", correct : true },
            { text :"Surabaya, Jawa Timur", correct : false },
            { text :"Malang, Jawa Timur", correct : false },
            { text :"Yogyakarta, DIY", correct : false },
        ]
    },
    {
        question : "Nama Ibu Kota Negeri ini adalah ?",
        answer :[
            { text :"Bandung", correct : false },
            { text :"Surabaya", correct : false },
            { text :"Makassar", correct : false },
            { text :"Jakarta", correct : true },
        ]
    },
    {
        question : "Pendiri Kesultnan Yogyakarta  Adalah ?",
        answer :[
            { text :"Abdullah bin Al-Ma'mun", correct : false },
            { text :"Sultan Hamangkuubwana 1", correct : true },
            { text :"Ali bin Abi Thalib", correct : false },
            { text :"Imam Bonjol", correct : false },
        ] 
    },
    {
        question: "Kota Terbesar di Propinsi Aceh adalah ?",
        answer: [
            { text : "Banda Aceh", correct : true },
            { text : "Lhokseumawe", correct : false },
            { text :"Sabang", correct : false },
            { text :"Aceh Gayo", correct : false }
        ]
    },
    {
        question :"Gunung Rinjani terletak di mana ?",
        answer: [
            {text:"Jawa Tengah",correct:false},
            {text:"Banten",correct:false},
            {text:"Jawa Barat",correct:false},
            {text:"Jawa Timur",correct:true},
         ],
    },
    {
        question  : "Soakarno Lahir di Mana ? ",
        answer:[
            {text:"Surabaya",correct:true},
            {text:"Dki Jakarta",correct:false},
            {text:"Yogyakarta",correct:false},
            {text:"Bali",correct:false}
        ]
    },
    {
        question : "Mohammad Hatta Lahir di ?",
        answer:[
            {text:"Bukittinggi",correct:true},
            {text:"Bandung",correct:false},
            {text:"Surabaya",correct:false},
            {text:"Batavia",correct:false},
        ]
    },
    {
        question : "Siapa Pendiri Kasunanan Surakarta ?",
        answer:[
            {text:"Pangeran Adipati Moerdina, S.H.",correct:false},
            {text:"Sri Susuhunan Pakubwana II",correct:true},
            {text:"Pangeran Adiwiyata, S.H.",correct:false},
            {text:"Pangeran Ngaglik, S.H.",correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = question[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Skor Anda: ${score} dari ${question.length}!`;
    nextButton.innerHTML = 'Main Lagi';
    nextButton.style.display = 'block';
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", startQuiz);
}

function handleNextButton() {
    if (currentQuestionIndex < question.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
