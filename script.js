let score = 0;
let answeredQuestions = {
    1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false
};

function checkAnswer(questionNum, correctLetter, selectedButton) {
    // Si la pregunta ya fue respondida, bloqueamos cualquier otro clic
    if (answeredQuestions[questionNum]) return;
    
    answeredQuestions[questionNum] = true;
    
    // Vinculación dinámica con las tarjetas y divs de retroalimentación
    const card = document.getElementById('q' + questionNum);
    const buttons = card.querySelectorAll('.option-btn');
    const feedbackDiv = document.getElementById('feedback-' + questionNum);
    
    // Deshabilitamos todos los botones de esta sección
    buttons.forEach(btn => {
        btn.disabled = true; 
    });

    // Extraemos la primera letra (A, B, C o D) del botón seleccionado
    const selectedLetter = selectedButton.innerText.trim().charAt(0);
    
    if (selectedLetter === correctLetter) {
        // ACCIÓN SI LA RESPUESTA ES CORRECTA
        selectedButton.classList.add('correct');
        feedbackDiv.innerHTML = "<span style='color: #2ed573;'>¡Correcto! Respuesta biológica y estadísticamente exacta. 🗸</span>";
        score++;
        document.getElementById('current-score').innerText = score;
    } else {
        // ACCIÓN SI LA RESPUESTA ES INCORRECTA
        selectedButton.classList.add('incorrect');
        feedbackDiv.innerHTML = "<span style='color: #ff6b81;'>Incorrecto. La respuesta correcta era la opción " + correctLetter + ".</span>";
        
        // Pintamos de verde la opción que sí era la correcta para educar al público
        buttons.forEach(btn => {
            if (btn.innerText.trim().charAt(0) === correctLetter) {
                btn.classList.add('correct');
            }
        });
    }
}

function resetQuiz() {
    score = 0;
    document.getElementById('current-score').innerText = score;
    answeredQuestions = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false };
    
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
    });
    
    const feedbacks = document.querySelectorAll('.feedback');
    feedbacks.forEach(fb => {
        fb.innerHTML = "";
    });
}