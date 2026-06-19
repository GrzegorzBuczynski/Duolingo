// --- LOGIKA QUIZU: renderowanie pytań, sprawdzanie, nawigacja ---

async function startLesson(lesson) {
    try {
        const res = await fetch(lesson.file);
        currentLessonData = await res.json();
        currentLessonId = lesson.id;
        currentQuestionIndex = 0;
        correctCount = 0;
        document.getElementById('quizTitle').innerText = currentLessonData.lessonTitle;

        enterQuiz();
        renderQuestion();
    } catch (e) {
        alert("Błąd ładowania pliku lekcji!");
    }
}

function getFilteredQuestions() {
    return currentLessonData.questions.filter(q => settings.types.includes(q.type));
}

function renderQuestion() {
    isAnswered = false;
    selectedAnswer = null;
    selectedBlocks = [];
    const questions = getFilteredQuestions();
    if (currentQuestionIndex >= questions.length) return finishLesson();
    const q = questions[currentQuestionIndex];
    document.getElementById('questionText').innerText = q.question;
    document.getElementById('quizContent').innerHTML = '';
    resetFeedbackUI();
    if (q.type === 'multiple_choice') renderMultipleChoice(q);
    else if (q.type === 'typing') renderTyping(q);
    else if (q.type === 'word_blocks') renderWordBlocks(q);
}

// --- RENDEROWANIE TYPÓW PYTAŃ ---

function renderMultipleChoice(q) {
    const container = document.getElementById('quizContent');
    const grid = document.createElement('div');
    grid.className = 'options';
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerText = opt;
        btn.onclick = () => selectMultipleChoice(btn, opt);
        grid.appendChild(btn);
    });
    container.appendChild(grid);
}

function selectMultipleChoice(btn, answer) {
    if (isAnswered) return;
    selectedAnswer = answer;
    document.querySelectorAll('.answer-btn').forEach(b => b.style.borderColor = '#e5e5e5');
    btn.style.borderColor = '#b0b0b0';
    toggleSubmitState(true);
}

function renderTyping(q) {
    const container = document.getElementById('quizContent');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-input';
    input.id = 'typingInput';
    input.placeholder = "Wpisz odpowiedź...";
    input.oninput = () => toggleSubmitState(input.value.trim().length > 0);
    container.appendChild(input);
}

function renderWordBlocks(q) {
    selectedBlocks = [];
    const container = document.getElementById('quizContent');
    const dropzone = document.createElement('div');
    dropzone.className = 'blocks-container';
    dropzone.id = 'blockDropzone';
    dropzone.onclick = (e) => { if (e.target.className === 'block') removeBlock(e.target.innerText); };

    const pool = document.createElement('div');
    pool.className = 'block-pool';
    q.blocks.forEach(b => {
        const block = document.createElement('div');
        block.className = 'block';
        block.innerText = b;
        block.style.cssText = 'padding:10px 15px; border:2px solid var(--border); border-radius:8px; cursor:pointer; background:#fff; font-weight:bold;';
        block.onclick = () => addBlock(b);
        pool.appendChild(block);
    });
    container.appendChild(dropzone);
    container.appendChild(pool);
}

// --- LOGIKA BLOCZKÓW TEKSTOWYCH ---

function addBlock(text) {
    if (isAnswered) return;
    selectedBlocks.push(text);
    updateBlockDropzone();
    toggleSubmitState(selectedBlocks.length > 0);
}

function removeBlock(text) {
    if (isAnswered) return;
    selectedBlocks = selectedBlocks.filter(b => b !== text);
    updateBlockDropzone();
    toggleSubmitState(selectedBlocks.length > 0);
}

function updateBlockDropzone() {
    const dropzone = document.getElementById('blockDropzone');
    dropzone.innerHTML = '';
    selectedBlocks.forEach(b => {
        const block = document.createElement('div');
        block.className = 'block';
        block.innerText = b;
        block.style.cssText = 'padding:10px 15px; border:2px solid var(--primary); border-radius:8px; cursor:pointer; background:#e7f9d4; color:var(--primary-dark); font-weight:bold;';
        dropzone.appendChild(block);
    });
}

// --- SPRAWDZANIE I NAWIGACJA ---

function handleSubmit() {
    if (!isAnswered) checkAnswer();
    else nextStep();
}

function checkAnswer() {
    const q = getFilteredQuestions()[currentQuestionIndex];
    let isCorrect = false;
    if (q.type === 'multiple_choice') isCorrect = selectedAnswer === q.correct;
    else if (q.type === 'typing') isCorrect = q.correct.includes(document.getElementById('typingInput').value.trim());
    else if (q.type === 'word_blocks') isCorrect = JSON.stringify(selectedBlocks) === JSON.stringify(q.correct_order);
    if (isCorrect) correctCount++;
    showFeedback(isCorrect, q);
    isAnswered = true;
    document.getElementById('submitBtn').innerText = 'Dalej';
}

function showFeedback(isCorrect, q) {
    const feedback = document.getElementById('feedback');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.classList.remove('hidden');
    if (isCorrect) {
        feedback.innerText = "Brawo! Prawidłowa odpowiedź.";
    } else {
        let correctAns = q.type === 'multiple_choice' ? q.correct : (q.type === 'typing' ? q.correct[0] : q.correct_order.join(' '));
        feedback.innerText = `Źle. Poprawna to: ${correctAns}`;
    }
}

function nextStep() {
    currentQuestionIndex++;
    renderQuestion();
}

function finishLesson() {
    const accuracy = Math.round((correctCount / getFilteredQuestions().length) * 100);
    if (!progress[currentCourseId]) progress[currentCourseId] = {};
    progress[currentCourseId][currentLessonId] = { completed: true, accuracy: accuracy };
    saveLocalState();
    alert(`Ukończono lekcję! Twój wynik: ${accuracy}%`);
    showHome();
}